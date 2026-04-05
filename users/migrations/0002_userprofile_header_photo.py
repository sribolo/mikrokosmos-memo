from django.db import migrations, models
import users.models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofile",
            name="header_photo",
            field=models.FileField(blank=True, upload_to=users.models.user_header_photo_upload_to),
        ),
    ]
