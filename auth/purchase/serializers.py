from rest_framework import serializers
from .models import PurchaseMaster, PurchaseDetail


class PurchaseMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseMaster
        fields = '__all__'


class PurchaseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseDetail
        fields = '__all__'
