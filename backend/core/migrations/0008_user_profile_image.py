# Generated by Django 5.1.2 on 2024-12-05 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0007_user_details_user_specialty"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="profile_image",
            field=models.ImageField(
                blank=True,
                default="default_images/default_profile.png",
                null=True,
                upload_to="profile_images/",
            ),
        ),
    ]
