# Generated by Django 4.2.3 on 2024-01-06 11:34

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('purchase', '0004_alter_purchasemaster_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchasemaster',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 1, 6, 11, 34, 49, 172065, tzinfo=datetime.timezone.utc), null=True),
        ),
    ]
