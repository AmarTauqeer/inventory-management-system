# Generated by Django 4.2.3 on 2024-01-06 11:34

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sale', '0004_rename_purchase_amount_salemaster_sale_amount_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salemaster',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 1, 6, 11, 34, 49, 171471, tzinfo=datetime.timezone.utc), null=True),
        ),
    ]
