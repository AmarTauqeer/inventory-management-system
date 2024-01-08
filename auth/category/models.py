from django.db import models
from django.utils import timezone


class Category(models.Model):
    name = models.CharField(max_length=255, null=False)
    description = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(default=timezone.now(), null=True)

    class Meta:
        db_table = "category"

    def __str__(self):
        return self.name
