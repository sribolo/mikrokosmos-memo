import json

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from django.urls import reverse

from .models import Card, CollectionState


@override_settings(ALLOWED_HOSTS=["testserver", "localhost", "127.0.0.1"])
class CollectionStateApiTests(TestCase):
    def test_get_state_requires_authentication(self):
        response = self.client.get("/api/state/")

        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {"error": "Authentication required."})
        self.assertEqual(CollectionState.objects.count(), 0)

    def test_post_state_requires_authentication(self):
        payload = {
            "state": {
                "owned": {"card-1": True},
                "wishlist": {"card-2": True},
            }
        }
        response = self.client.post(
            "/api/state/",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {"error": "Authentication required."})
        self.assertEqual(CollectionState.objects.count(), 0)

    def test_authenticated_user_state_is_tied_to_user(self):
        user_model = get_user_model()
        user = user_model.objects.create_user(username="army", password="test-pass-123")
        self.client.login(username="army", password="test-pass-123")

        payload = {"state": {"owned": {"jin-card": True}, "wishlist": {}}}
        response = self.client.post(
            "/api/state/",
            data=json.dumps(payload),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)

        state_record = CollectionState.objects.get(user=user)
        self.assertEqual(state_record.state, payload["state"])
        self.assertIsNone(state_record.session_key)

    def test_cards_api_returns_active_cards(self):
        Card.objects.create(
            card_id="proof-jin",
            era="Proof",
            version="Standard",
            member="Jin",
            image="images/proof-standard-jin.jpeg",
            card_type="BTS",
            is_active=True,
        )
        Card.objects.create(
            card_id="hidden-card",
            era="Hidden",
            member="RM",
            is_active=False,
        )

        response = self.client.get("/api/cards/")

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIn("cards", payload)
        self.assertEqual(len(payload["cards"]), 1)
        self.assertEqual(payload["cards"][0]["id"], "proof-jin")

    def test_cards_api_prefers_uploaded_image_when_present(self):
        card = Card.objects.create(
            card_id="proof-v",
            era="Proof",
            version="Collector",
            member="V",
            image="images/proof-collector-wv-v.jpeg",
            card_type="BTS",
            is_active=True,
        )
        upload = SimpleUploadedFile(
            "proof-v.png",
            b"fake-image-content",
            content_type="image/png",
        )
        card.image_upload.save("proof-v.png", upload, save=True)

        response = self.client.get("/api/cards/")

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertTrue(payload["cards"][0]["image"].startswith("http://testserver/media/card_images/"))

    def test_admin_import_cards_csv_creates_records(self):
        user_model = get_user_model()
        admin_user = user_model.objects.create_superuser(
            username="adminuser",
            email="admin@example.com",
            password="strong-pass-123",
        )
        self.client.force_login(admin_user)

        csv_payload = (
            "card_id,era,version,member,image,card_type,is_active\n"
            "proof-jin,Proof,Standard,Jin,images/proof-standard-jin.jpeg,BTS,true\n"
        )
        upload = SimpleUploadedFile(
            "cards.csv",
            csv_payload.encode("utf-8"),
            content_type="text/csv",
        )

        response = self.client.post(
            reverse("admin:collection_card_import"),
            data={"file": upload, "update_existing": "on"},
            follow=True,
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue(Card.objects.filter(card_id="proof-jin").exists())

    def test_admin_import_cards_json_updates_existing(self):
        user_model = get_user_model()
        admin_user = user_model.objects.create_superuser(
            username="adminuser2",
            email="admin2@example.com",
            password="strong-pass-123",
        )
        self.client.force_login(admin_user)

        Card.objects.create(
            card_id="proof-jin",
            era="Proof",
            version="Old",
            member="Jin",
            image="images/old.jpeg",
            card_type="BTS",
            is_active=True,
        )

        json_payload = {
            "cards": [
                {
                    "card_id": "proof-jin",
                    "era": "Proof",
                    "version": "Standard",
                    "member": "Jin",
                    "image": "images/proof-standard-jin.jpeg",
                    "card_type": "BTS",
                    "is_active": True,
                }
            ]
        }
        upload = SimpleUploadedFile(
            "cards.json",
            json.dumps(json_payload).encode("utf-8"),
            content_type="application/json",
        )

        response = self.client.post(
            reverse("admin:collection_card_import"),
            data={"file": upload, "update_existing": "on"},
            follow=True,
        )

        self.assertEqual(response.status_code, 200)
        card = Card.objects.get(card_id="proof-jin")
        self.assertEqual(card.version, "Standard")
