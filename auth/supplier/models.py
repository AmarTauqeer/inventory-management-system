from django.db import models
from django.utils import timezone

class Supplier(models.Model):
    name = models.CharField(max_length=255, null=False)
    address = models.CharField(max_length=255, null=False)
    email = models.CharField(max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=16, null=True, blank=True)
    country = models.CharField(max_length=50, null=True, blank=True)
    city = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(default= timezone.now(), null=True)

    class Meta:
        db_table = "supplier"

    def __str__(self):
        return self.name