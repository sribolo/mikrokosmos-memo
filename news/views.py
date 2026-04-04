from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from .models import NewsItem


@require_http_methods(["GET"])
def news_api(request):
    items = NewsItem.objects.filter(is_active=True).values("title", "tag", "text", "link")
    payload = [
        {
            "title": item["title"],
            "tag": item["tag"] or "Update",
            "text": item["text"],
            "link": item["link"],
        }
        for item in items
    ]
    return JsonResponse({"news": payload})
