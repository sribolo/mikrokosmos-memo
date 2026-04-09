import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django_ratelimit.decorators import ratelimit
from .models import Card, CollectionState



def home(request):
    return render(request, "index.html")


def collection_page(request):
    return render(request, "collection.html")


def owned(request):
    return render(request, "owned.html")


def wishlist(request):
    return render(request, "wishlist.html")


def stats(request):
    return render(request, "stats.html")


def _get_or_create_collection_state(request):
    state, _ = CollectionState.objects.get_or_create(
        user=request.user,
        defaults={"state": {}},
    )
    return state


@ratelimit(key="ip", rate="30/m", block=True)
@require_http_methods(["GET", "POST"])
def collection_state_api(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Authentication required."}, status=401)

    state_record = _get_or_create_collection_state(request)

    if request.method == "GET":
        return JsonResponse({"state": state_record.state or {}})

    try:
        payload = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON payload."}, status=400)

    incoming_state = payload.get("state")
    if not isinstance(incoming_state, dict):
        return JsonResponse({"error": "'state' must be an object."}, status=400)

    state_record.state = incoming_state
    state_record.save(update_fields=["state", "updated_at"])
    return JsonResponse({"ok": True})


@ratelimit(key="ip", rate="30/m", block=True)
@require_http_methods(["GET"])
def cards_api(request):
    cards = Card.objects.filter(is_active=True)
    payload = [
        {
            "id": card.card_id,
            "era": card.era,
            "version": card.version or "",
            "member": card.member,
            "image": card.image_upload or card.image or "",
            "type": card.card_type or "",
        }
        for card in cards
    ]
    return JsonResponse({"cards": payload})
