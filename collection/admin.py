import csv
import io
import json

from django import forms
from django.contrib import admin, messages
from django.shortcuts import redirect, render
from django.urls import path

from .models import Card, CollectionState


@admin.register(CollectionState)
class CollectionStateAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "session_key", "updated_at")
    search_fields = ("user__username", "session_key")
    readonly_fields = ("created_at", "updated_at")


@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    change_list_template = "admin/collection/card/change_list.html"
    list_display = ("card_id", "era", "member", "version", "has_uploaded_image", "is_active", "updated_at")
    list_filter = ("era", "member", "is_active")
    search_fields = ("card_id", "era", "version", "member")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "card_id",
                    "era",
                    "version",
                    "member",
                    "card_type",
                    "is_active",
                )
            },
        ),
        (
            "Images",
            {
                "description": "Upload a card image here to avoid pushing files to the repo. The legacy static image path still works as a fallback.",
                "fields": ("image_upload", "image"),
            },
        ),
        (
            "Timestamps",
            {
                "fields": ("created_at", "updated_at"),
            },
        ),
    )

    class ImportForm(forms.Form):
        file = forms.FileField(
            help_text="Upload .csv or .json. Required fields: card_id/id, era, member."
        )
        update_existing = forms.BooleanField(
            required=False,
            initial=True,
            help_text="When checked, existing cards with the same card_id are updated.",
        )

    @admin.display(boolean=True, description="Uploaded image")
    def has_uploaded_image(self, obj):
        return bool(obj.image_upload)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "import-cards/",
                self.admin_site.admin_view(self.import_cards_view),
                name="collection_card_import",
            ),
        ]
        return custom_urls + urls

    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context["import_cards_url"] = "admin:collection_card_import"
        return super().changelist_view(request, extra_context=extra_context)

    def import_cards_view(self, request):
        form = self.ImportForm(request.POST or None, request.FILES or None)
        if request.method == "POST" and form.is_valid():
            upload = form.cleaned_data["file"]
            update_existing = form.cleaned_data["update_existing"]
            try:
                rows = self._parse_upload(upload)
            except ValueError as exc:
                form.add_error("file", str(exc))
            else:
                created, updated, skipped, errors = self._import_rows(rows, update_existing)
                if errors:
                    for error in errors[:10]:
                        self.message_user(request, error, level=messages.ERROR)
                    if len(errors) > 10:
                        self.message_user(
                            request,
                            f"{len(errors) - 10} more errors were omitted.",
                            level=messages.WARNING,
                        )
                self.message_user(
                    request,
                    f"Import complete. Created: {created}, Updated: {updated}, Skipped: {skipped}.",
                    level=messages.SUCCESS if not errors else messages.WARNING,
                )
                return redirect("admin:collection_card_changelist")

        context = {
            **self.admin_site.each_context(request),
            "opts": self.model._meta,
            "title": "Import Cards",
            "form": form,
        }
        return render(request, "admin/collection/card/import_cards.html", context)

    def _parse_upload(self, upload):
        filename = (upload.name or "").lower()
        raw = upload.read().decode("utf-8-sig")

        if filename.endswith(".json"):
            data = json.loads(raw)
            if isinstance(data, dict):
                rows = data.get("cards", [])
            elif isinstance(data, list):
                rows = data
            else:
                raise ValueError("JSON must be a list of cards or {\"cards\": [...]} format.")
            if not isinstance(rows, list):
                raise ValueError("Invalid JSON format for cards.")
            return rows

        if filename.endswith(".csv"):
            reader = csv.DictReader(io.StringIO(raw))
            return list(reader)

        raise ValueError("Unsupported file type. Please upload .csv or .json.")

    def _to_bool(self, value, default=True):
        if value is None:
            return default
        if isinstance(value, bool):
            return value
        return str(value).strip().lower() in {"1", "true", "yes", "y", "on"}

    def _normalize_row(self, row):
        card_id = (row.get("card_id") or row.get("id") or "").strip()
        era = (row.get("era") or "").strip()
        member = (row.get("member") or "").strip()

        if not card_id or not era or not member:
            raise ValueError("Each row requires card_id (or id), era, and member.")

        return {
            "card_id": card_id,
            "era": era,
            "version": (row.get("version") or "").strip(),
            "member": member,
            "image": (row.get("image") or "").strip(),
            "card_type": (row.get("card_type") or row.get("type") or "").strip(),
            "is_active": self._to_bool(row.get("is_active"), default=True),
        }

    def _import_rows(self, rows, update_existing):
        created = 0
        updated = 0
        skipped = 0
        errors = []

        for index, row in enumerate(rows, start=1):
            try:
                payload = self._normalize_row(row)
            except Exception as exc:
                errors.append(f"Row {index}: {exc}")
                continue

            card, card_created = Card.objects.get_or_create(
                card_id=payload["card_id"],
                defaults=payload,
            )

            if card_created:
                created += 1
                continue

            if not update_existing:
                skipped += 1
                continue

            for field, value in payload.items():
                setattr(card, field, value)
            card.save()
            updated += 1

        return created, updated, skipped, errors
