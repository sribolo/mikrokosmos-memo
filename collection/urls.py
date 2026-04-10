from django.urls import path

from . import views


urlpatterns = [
    path("", views.home, name="home"),
    path("collection/", views.collection_page, name="collection"),
    path("owned/", views.owned, name="owned"),
    path("wishlist/", views.wishlist, name="wishlist"),
    path("stats/", views.stats, name="stats"),
    path("credits/", views.credits, name="credits"),
    path("api/cards/", views.cards_api, name="cards_api"),
    path("api/state/", views.collection_state_api, name="collection_state_api"),
]
