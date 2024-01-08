from django.utils import timezone

from django.db import models

from customer.models import Customer
from product.models import Product


class SaleMaster(models.Model):
    created_at = models.DateTimeField(default=timezone.now(), null=True)
    sale_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    class Meta:
        db_table = "sale_master"


class SaleDetail(models.Model):
    sale_id = models.ForeignKey(SaleMaster, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    amount_per_product = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = "sale_detail"
