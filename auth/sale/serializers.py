from rest_framework import serializers
from .models import SaleMaster,SaleDetail


class SaleMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleMaster
        fields = '__all__'

class SaleDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleDetail
        fields = '__all__'
