from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0002_userprofile_header_photo"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userprofile",
            name="photo",
            field=models.URLField(blank=True, default=""),
        ),
        migrations.AlterField(
            model_name="userprofile",
            name="header_photo",
            field=models.URLField(blank=True, default=""),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="photo_public_id",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="header_photo_public_id",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
    ]
