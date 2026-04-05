from django.urls import include, path

from .views import logout_view, profile, profile_photo_api, signup, upload_profile_photo


urlpatterns = [
    path("signup/", signup, name="signup"),
    path("profile/", profile, name="profile"),
    path("profile/photo/", profile_photo_api, name="profile_photo_api"),
    path("profile/photo/upload/", upload_profile_photo, name="upload_profile_photo"),
    path("logout/", logout_view, name="logout"),
    path("", include("django.contrib.auth.urls")),
]
