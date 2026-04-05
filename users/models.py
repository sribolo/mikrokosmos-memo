from django.conf import settings
from django.db import models


def user_profile_photo_upload_to(instance, filename):
    extension = filename.rsplit(".", 1)[-1].lower() if "." in filename else "jpg"
    return f"profile_photos/user_{instance.user_id}.{extension}"


def user_header_photo_upload_to(instance, filename):
    extension = filename.rsplit(".", 1)[-1].lower() if "." in filename else "jpg"
    return f"profile_headers/user_{instance.user_id}.{extension}"


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="user_profile",
    )
    photo = models.FileField(upload_to=user_profile_photo_upload_to, blank=True)
    header_photo = models.FileField(upload_to=user_header_photo_upload_to, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"UserProfile({self.user_id})"
