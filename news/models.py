from django.db import models


class NewsItem(models.Model):
    title = models.CharField(max_length=220)
    tag = models.CharField(max_length=80, blank=True, default="Update")
    text = models.TextField()
    link = models.URLField(max_length=500)
    is_active = models.BooleanField(default=True)
    sort_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "-updated_at"]

    def __str__(self):
        return self.title
