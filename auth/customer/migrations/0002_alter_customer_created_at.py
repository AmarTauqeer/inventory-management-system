# Generated by Django 4.2.3 on 2024-01-04 10:17

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 1, 4, 10, 17, 35, 9707, tzinfo=datetime.timezone.utc), null=True),
        ),
    ]
