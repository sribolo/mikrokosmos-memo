from django.test import TestCase

from .models import NewsItem


class NewsApiTests(TestCase):
    def test_news_api_returns_only_active_items(self):
        NewsItem.objects.create(
            title="BTS Wins Big",
            tag="Awards",
            text="A new milestone was achieved.",
            link="https://example.com/news-1",
            is_active=True,
            sort_order=1,
        )
        NewsItem.objects.create(
            title="Hidden Draft",
            tag="Draft",
            text="Should not be returned.",
            link="https://example.com/news-2",
            is_active=False,
        )

        response = self.client.get("/api/news/")

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIn("news", payload)
        self.assertEqual(len(payload["news"]), 1)
        self.assertEqual(payload["news"][0]["title"], "BTS Wins Big")
