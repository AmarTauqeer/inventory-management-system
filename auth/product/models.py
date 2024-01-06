from django.db import models
from django.utils import timezone

from category.models import Category


class Product(models.Model):
    name = models.CharField(max_length=255, null=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField(null=True)
    purchase_rate = models.DecimalField(max_digits=12, decimal_places=2, null=True)
    sale_rate = models.DecimalField(max_digits=12, decimal_places=2, null=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now(), null=True)

    class Meta:
        db_table = "product"

    def __str__(self):
        return self.name
