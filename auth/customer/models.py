from django.utils import timezone

from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=255, null=False)
    email = models.CharField(max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=16, null=True, blank=True)
    address = models.CharField(max_length=255, null=False)
    country = models.CharField(max_length=50, null=True, blank=True)
    city = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(default= timezone.now(), null=True)

    class Meta:
        db_table = "customer"

    def __str__(self):
        return self.name
