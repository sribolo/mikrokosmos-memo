import json
import re
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError

from collection.models import Card
from news.models import NewsItem


class Command(BaseCommand):
    help = "Seed Card and NewsItem from static/js/data.js"

    def add_arguments(self, parser):
        parser.add_argument(
            "--path",
            default="static/js/data.js",
            help="Path to data.js file (default: static/js/data.js)",
        )
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Delete existing cards and news before importing.",
        )

    def handle(self, *args, **options):
        data_js_path = Path(options["path"])
        if not data_js_path.exists():
            raise CommandError(f"File not found: {data_js_path}")

        source = data_js_path.read_text(encoding="utf-8")
        cards = self._extract_js_array(source, "CARDS")
        news_items = self._extract_js_array(source, "NEWS_ITEMS")

        if options["clear"]:
            Card.objects.all().delete()
            NewsItem.objects.all().delete()
            self.stdout.write(self.style.WARNING("Cleared existing Card and NewsItem data."))

        cards_created, cards_updated = self._upsert_cards(cards)
        news_created, news_updated = self._upsert_news(news_items)

        self.stdout.write(
            self.style.SUCCESS(
                "Import complete: "
                f"Cards created={cards_created}, updated={cards_updated}; "
                f"News created={news_created}, updated={news_updated}"
            )
        )

    def _extract_js_array(self, text, constant_name):
        match = re.search(
            rf"const\s+{re.escape(constant_name)}\s*=\s*\[(.*?)\];",
            text,
            flags=re.DOTALL,
        )
        if not match:
            raise CommandError(f"Could not find array for {constant_name} in data.js")

        array_body = match.group(1)
        array_text = f"[{array_body}]"

        # Convert JS object literal keys to JSON keys.
        array_text = re.sub(
            r'([{\[,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:',
            r'\1"\2":',
            array_text,
        )
        # Remove trailing commas before object/array close.
        array_text = re.sub(r",\s*([}\]])", r"\1", array_text)

        try:
            data = json.loads(array_text)
        except json.JSONDecodeError as exc:
            raise CommandError(f"Failed parsing {constant_name}: {exc}") from exc

        if not isinstance(data, list):
            raise CommandError(f"{constant_name} is not a list.")
        return data

    def _upsert_cards(self, cards):
        created = 0
        updated = 0

        for item in cards:
            card_id = (item.get("id") or item.get("card_id") or "").strip()
            era = (item.get("era") or "").strip()
            member = (item.get("member") or "").strip()

            if not card_id or not era or not member:
                continue

            defaults = {
                "era": era,
                "version": (item.get("version") or "").strip(),
                "member": member,
                "image": (item.get("image") or "").strip(),
                "card_type": (item.get("type") or item.get("card_type") or "").strip(),
                "is_active": bool(item.get("is_active", True)),
            }
            _, was_created = Card.objects.update_or_create(card_id=card_id, defaults=defaults)
            if was_created:
                created += 1
            else:
                updated += 1

        return created, updated

    def _upsert_news(self, news_items):
        created = 0
        updated = 0

        for index, item in enumerate(news_items):
            title = (item.get("title") or "").strip()
            text = (item.get("text") or "").strip()
            link = (item.get("link") or "").strip()
            if not title or not text or not link:
                continue

            defaults = {
                "tag": (item.get("tag") or "Update").strip(),
                "text": text,
                "is_active": bool(item.get("is_active", True)),
                "sort_order": int(item.get("sort_order", index)),
            }
            _, was_created = NewsItem.objects.update_or_create(
                title=title,
                link=link,
                defaults=defaults,
            )
            if was_created:
                created += 1
            else:
                updated += 1

        return created, updated
