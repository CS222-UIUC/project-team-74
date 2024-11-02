# Generated by Django 5.1.2 on 2024-10-31 18:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0002_jobposting"),
    ]

    operations = [
        migrations.AlterField(
            model_name="jobposting",
            name="user",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="job_postings",
                to="core.user",
            ),
        ),
    ]
