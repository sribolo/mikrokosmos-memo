from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("collection", "0003_card_image_upload"),
    ]

    operations = [
        migrations.AlterField(
            model_name="card",
            name="image_upload",
            field=models.URLField(blank=True, default=""),
        ),
        migrations.AddField(
            model_name="card",
            name="image_upload_public_id",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
    ]
