import json
from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.core.management import call_command
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

        with patch("users.views.upload_image") as mock_upload:
            mock_upload.return_value = {
                "url": "https://res.cloudinary.com/demo/image/upload/v1/profile.png",
                "public_id": "mikrokosmos_memo/profiles/user_1_photo",
            }
            response = self.client.post(
                "/accounts/profile/photo/upload/",
                data={"photo": upload, "kind": "photo"},
            )

        self.assertEqual(response.status_code, 200)
        payload = json.loads(response.content)
        self.assertIn("photo_url", payload)
        self.assertIn(".png", payload["photo_url"])
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

        with patch("users.views.upload_image") as mock_upload:
            mock_upload.return_value = {
                "url": "https://res.cloudinary.com/demo/image/upload/v1/header.webp",
                "public_id": "mikrokosmos_memo/profiles/user_1_header_photo",
            }
            response = self.client.post(
                "/accounts/profile/photo/upload/",
                data={"photo": upload, "kind": "header"},
            )

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIn("header_photo_url", payload)
        self.assertIn(".webp", payload["header_photo_url"])

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


class MakeStaffCommandTests(TestCase):
    def test_make_staff_promotes_existing_user(self):
        user = get_user_model().objects.create_user(
            username="moonbearjintae",
            email="moon@example.com",
            password="strong-pass-123",
        )

        call_command("make_staff", "moonbearjintae")

        user.refresh_from_db()
        self.assertTrue(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_make_staff_can_grant_superuser(self):
        user = get_user_model().objects.create_user(
            username="adminarmy",
            email="adminarmy@example.com",
            password="strong-pass-123",
        )

        call_command("make_staff", "adminarmy", "--superuser")

        user.refresh_from_db()
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
