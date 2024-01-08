from django.contrib import admin
from .models import SaleMaster, SaleDetail

# Register your models here.

admin.site.register(SaleMaster)
admin.site.register(SaleDetail)
