from django.contrib import admin

from .models import NewsItem


@admin.register(NewsItem)
class NewsItemAdmin(admin.ModelAdmin):
    list_display = ("title", "tag", "is_active", "sort_order", "updated_at")
    list_filter = ("tag", "is_active")
    search_fields = ("title", "text", "tag")
