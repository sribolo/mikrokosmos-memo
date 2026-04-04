from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render

from collection.models import CollectionState

from .forms import SignUpForm


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
    record = CollectionState.objects.filter(user=request.user).first()
    state = record.state if record else {}

    owned_count = len((state or {}).get("owned", {}))
    wishlist_count = len((state or {}).get("wishlist", {}))

    context = {
        "owned_count": owned_count,
        "wishlist_count": wishlist_count,
        "total_marked": owned_count + wishlist_count,
    }
    return render(request, "profile.html", context)


def logout_view(request):
    logout(request)
    return redirect("home")
