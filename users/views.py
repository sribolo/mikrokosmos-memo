from pathlib import Path

from collections import Counter

from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.views.decorators.http import require_GET, require_http_methods

from bts_pc_website.cloudinary_utils import destroy_image, upload_image
from collection.models import Card, CollectionState

from .forms import SignUpForm, UsernameUpdateForm
from .models import UserProfile


ALLOWED_PROFILE_PHOTO_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
MAX_PROFILE_PHOTO_SIZE = 5 * 1024 * 1024


def _get_or_create_user_profile(user):
    profile, _ = UserProfile.objects.get_or_create(user=user)
    return profile


def _build_media_url(request, file_field, profile=None):
    if not file_field:
        return ""
    absolute_url = (
        file_field
        if str(file_field).startswith(("http://", "https://"))
        else request.build_absolute_uri(str(file_field))
    )
    if not profile or not profile.updated_at:
        return absolute_url
    version = int(profile.updated_at.timestamp())
    separator = "&" if "?" in absolute_url else "?"
    return f"{absolute_url}{separator}v={version}"


def _profile_media_payload(request, profile):
    return {
        "photo_url": _build_media_url(request, profile.photo, profile),
        "header_photo_url": _build_media_url(request, profile.header_photo, profile),
    }


def signup(request):
    if request.user.is_authenticated:
        return redirect("home")

    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("home")
    else:
        form = SignUpForm()

    return render(request, "signup.html", {"form": form})


@login_required
def profile(request):
    username_form = UsernameUpdateForm(instance=request.user)
    if request.method == "POST":
        username_form = UsernameUpdateForm(request.POST, instance=request.user)
        if username_form.is_valid():
            username_form.save()
            return redirect("profile")

    record = CollectionState.objects.filter(user=request.user).first()
    profile_record = _get_or_create_user_profile(request.user)
    state = record.state if record else {}

    owned_count = len((state or {}).get("owned", {}))
    wishlist_count = len((state or {}).get("wishlist", {}))
    favorites_count = len((state or {}).get("favorites", {}))
    total_cards = Card.objects.filter(is_active=True).count()
    completion_pct = round((owned_count / total_cards) * 100) if total_cards else 0

    owned_ids = set((state or {}).get("owned", {}).keys())
    favorite_ids = set((state or {}).get("favorites", {}).keys())
    owned_cards = Card.objects.filter(is_active=True, card_id__in=owned_ids).values("member")
    favorite_cards = Card.objects.filter(is_active=True, card_id__in=favorite_ids).values("member")

    favorite_member_counter = Counter(card["member"] for card in favorite_cards)
    if not favorite_member_counter:
        favorite_member_counter = Counter(card["member"] for card in owned_cards)
    favorite_member = (
        favorite_member_counter.most_common(1)[0][0] if favorite_member_counter else "None yet"
    )

    activity_items = []
    for entry in (state or {}).get("activity", [])[:5]:
        if not isinstance(entry, dict):
            continue
        activity_items.append(
            {
                "label": entry.get("label") or entry.get("action", "Updated collection"),
                "member": entry.get("member", ""),
                "era": entry.get("era", ""),
                "version": entry.get("version", ""),
                "timestamp": entry.get("at", ""),
            }
        )

    badges = []
    if owned_count >= 1:
        badges.append({"title": "First Pull", "description": "Marked your first owned photocard."})
    if favorites_count >= 3:
        badges.append({"title": "Bias Line", "description": "Saved at least 3 favorite cards."})
    if wishlist_count >= 10:
        badges.append({"title": "Manifesting", "description": "Built a wishlist of 10 or more cards."})
    if completion_pct >= 25:
        badges.append({"title": "Quarter Complete", "description": "Reached 25% collection completion."})
    if completion_pct >= 50:
        badges.append({"title": "Halfway There", "description": "Reached 50% collection completion."})
    if completion_pct >= 100 and total_cards:
        badges.append({"title": "Archive Complete", "description": "Completed the active photocard archive."})
    if not badges:
        badges.append(
            {
                "title": "Starting Era",
                "description": "Keep collecting to unlock your first progress badge.",
            }
        )

    context = {
        "owned_count": owned_count,
        "wishlist_count": wishlist_count,
        "total_marked": owned_count + wishlist_count,
        "favorites_count": favorites_count,
        "total_cards": total_cards,
        "completion_pct": completion_pct,
        "favorite_member": favorite_member,
        "recent_activity": activity_items,
        "badges": badges,
        "username_form": username_form,
        "profile_photo_url": _build_media_url(request, profile_record.photo, profile_record),
        "header_photo_url": _build_media_url(request, profile_record.header_photo, profile_record),
    }
    return render(request, "profile.html", context)


@login_required
@require_GET
def profile_photo_api(request):
    profile = _get_or_create_user_profile(request.user)
    return JsonResponse(_profile_media_payload(request, profile))


@login_required
@require_http_methods(["POST"])
def upload_profile_photo(request):
    media_kind = request.POST.get("kind", "photo")
    field_name = "photo" if media_kind == "photo" else "header_photo" if media_kind == "header" else ""
    if not field_name:
        return JsonResponse({"error": "Invalid upload target."}, status=400)

    profile = _get_or_create_user_profile(request.user)

    if request.POST.get("remove") == "1":
        public_id_field = "photo_public_id" if field_name == "photo" else "header_photo_public_id"
        existing_public_id = getattr(profile, public_id_field)
        if existing_public_id:
            destroy_image(existing_public_id)
        setattr(profile, field_name, "")
        setattr(profile, public_id_field, "")
        profile.save(update_fields=[field_name, public_id_field, "updated_at"])
        return JsonResponse(_profile_media_payload(request, profile))

    upload = request.FILES.get("photo")
    if not upload:
        return JsonResponse({"error": "No photo uploaded."}, status=400)

    extension = Path(upload.name).suffix.lower()
    if extension not in ALLOWED_PROFILE_PHOTO_EXTENSIONS:
        return JsonResponse({"error": "Upload a JPG, PNG, WEBP, or GIF image."}, status=400)

    if upload.size > MAX_PROFILE_PHOTO_SIZE:
        return JsonResponse({"error": "Profile photo must be 5MB or smaller."}, status=400)

    public_id_field = "photo_public_id" if field_name == "photo" else "header_photo_public_id"
    existing_public_id = getattr(profile, public_id_field)
    if existing_public_id:
        destroy_image(existing_public_id)

    uploaded = upload_image(
        upload,
        folder="mikrokosmos_memo/profiles",
        public_id=f"user_{request.user.id}_{field_name}",
    )
    setattr(profile, field_name, uploaded["url"])
    setattr(profile, public_id_field, uploaded["public_id"])
    profile.save(update_fields=[field_name, public_id_field, "updated_at"])

    return JsonResponse(_profile_media_payload(request, profile))


def logout_view(request):
    logout(request)
    return redirect("home")
