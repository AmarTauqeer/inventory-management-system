from django.utils import timezone

from django.db import models

from supplier.models import Supplier
from product.models import Product


class PurchaseMaster(models.Model):
    created_at = models.DateTimeField(default=timezone.now(), null=True)
    purchase_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)

    class Meta:
        db_table = "purchase_master"


class PurchaseDetail(models.Model):
    purchase_id = models.ForeignKey(PurchaseMaster, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    amount_per_product = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = "purchase_detail"
