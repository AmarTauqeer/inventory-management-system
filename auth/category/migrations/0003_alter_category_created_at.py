# Generated by Django 4.2.3 on 2024-01-04 10:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0002_alter_category_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 1, 4, 10, 20, 9, 818145, tzinfo=datetime.timezone.utc), null=True),
        ),
    ]