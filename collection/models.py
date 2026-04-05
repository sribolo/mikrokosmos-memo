from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


def card_image_upload_to(instance, filename):
    extension = filename.rsplit(".", 1)[-1].lower() if "." in filename else "jpg"
    return f"card_images/{instance.card_id}.{extension}"


class CollectionState(models.Model):
    user = models.OneToOneField(
        User,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="collection_state",
    )
    session_key = models.CharField(max_length=40, unique=True, null=True, blank=True)
    state = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=(
                    models.Q(user__isnull=False) | models.Q(session_key__isnull=False)
                ),
                name="collection_state_has_user_or_session",
            )
        ]

    def __str__(self):
        owner = self.user.username if self.user_id else self.session_key
        return f"CollectionState({owner})"


class Card(models.Model):
    card_id = models.CharField(max_length=120, unique=True)
    era = models.CharField(max_length=200)
    version = models.CharField(max_length=120, blank=True, default="")
    member = models.CharField(max_length=60)
    image = models.CharField(max_length=255, blank=True, default="")
    image_upload = models.FileField(upload_to=card_image_upload_to, blank=True)
    card_type = models.CharField(max_length=20, blank=True, default="")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["era", "member", "version", "card_id"]

    def __str__(self):
        return f"{self.card_id} ({self.member})"
