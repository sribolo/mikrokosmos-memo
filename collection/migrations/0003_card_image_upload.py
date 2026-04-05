from django.db import migrations, models
import collection.models


class Migration(migrations.Migration):
    dependencies = [
        ("collection", "0002_card"),
    ]

    operations = [
        migrations.AddField(
            model_name="card",
            name="image_upload",
            field=models.FileField(blank=True, upload_to=collection.models.card_image_upload_to),
        ),
    ]
