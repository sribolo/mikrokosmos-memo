import json

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings

from .models import UserProfile


@override_settings(ALLOWED_HOSTS=["testserver", "localhost", "127.0.0.1"])
class ProfilePhotoApiTests(TestCase):
    def test_profile_photo_requires_authentication(self):
        response = self.client.get("/accounts/profile/photo/")

        self.assertEqual(response.status_code, 302)

    def test_authenticated_user_can_upload_profile_photo(self):
        user = get_user_model().objects.create_user(
            username="army",
            email="army@example.com",
            password="strong-pass-123",
        )
        self.client.login(username="army", password="strong-pass-123")

        upload = SimpleUploadedFile(
            "profile.png",
            b"fake-image-content",
            content_type="image/png",
        )

        response = self.client.post(
            "/accounts/profile/photo/upload/",
            data={"photo": upload, "kind": "photo"},
        )

        self.assertEqual(response.status_code, 200)
        payload = json.loads(response.content)
        self.assertIn("photo_url", payload)
        self.assertTrue(payload["photo_url"].endswith(".png"))
        self.assertTrue(UserProfile.objects.filter(user=user).exists())

    def test_authenticated_user_can_upload_header_photo(self):
        user = get_user_model().objects.create_user(
            username="army-header",
            email="header@example.com",
            password="strong-pass-123",
        )
        self.client.login(username="army-header", password="strong-pass-123")

        upload = SimpleUploadedFile(
            "header.webp",
            b"fake-image-content",
            content_type="image/webp",
        )

        response = self.client.post(
            "/accounts/profile/photo/upload/",
            data={"photo": upload, "kind": "header"},
        )

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIn("header_photo_url", payload)
        self.assertTrue(payload["header_photo_url"].endswith(".webp"))

    def test_upload_rejects_invalid_extension(self):
        user = get_user_model().objects.create_user(
            username="army2",
            email="army2@example.com",
            password="strong-pass-123",
        )
        self.client.login(username="army2", password="strong-pass-123")

        upload = SimpleUploadedFile(
            "profile.txt",
            b"not-an-image",
            content_type="text/plain",
        )

        response = self.client.post(
            "/accounts/profile/photo/upload/",
            data={"photo": upload, "kind": "photo"},
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"error": "Upload a JPG, PNG, WEBP, or GIF image."})
