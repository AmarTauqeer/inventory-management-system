# Generated by Django 4.2.3 on 2024-01-02 15:21

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product', '0001_initial'),
        ('supplier', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PurchaseMaster',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=datetime.datetime(2024, 1, 2, 15, 21, 42, 122958, tzinfo=datetime.timezone.utc), null=True)),
                ('purchase_amount', models.DecimalField(blank=True, decimal_places=2, max_digits=10)),
                ('supplier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='supplier.supplier')),
            ],
            options={
                'db_table': 'purchase_master',
            },
        ),
        migrations.CreateModel(
            name='PurchaseDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.IntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('amount_per_product', models.DecimalField(decimal_places=2, max_digits=10)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product')),
                ('purchase_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='purchase.purchasemaster')),
            ],
            options={
                'db_table': 'purchase_detail',
            },
        ),
    ]
