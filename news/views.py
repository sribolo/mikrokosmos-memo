from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django_ratelimit.decorators import ratelimit

from .models import NewsItem

@ratelimit(key="ip", rate="30/m", block=True)
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
