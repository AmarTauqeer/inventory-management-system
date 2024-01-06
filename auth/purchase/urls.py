from django.urls import path
from .views import *

urlpatterns = [
    path('list/', PurchaseMasterListView.as_view(), name="list of purchase master"),
    path('detail-list/', PurchaseDetailListView.as_view(), name="list of purchase detail"),
    path('create/', PurchaseMasterCreateView.as_view(), name="purchase master creation"),
    path('detail-create/', PurchaseDetailCreateView.as_view(), name="purchase detail creation"),
    path('delete/<id>', PurchaseMasterDeleteView.as_view(), name="purchase master delete"),
    path('detail-delete/<id>', PurchaseDetailDeleteView.as_view(), name="purchase detail delete"),
    path('update/<id>', PurchaseMasterUpdateView.as_view(), name="purchase master update"),
    path('detail-update/<id>', PurchaseDetailUpdateView.as_view(), name="purchase detail update"),
    path('purchase-last/', LastPurchaseView.as_view(), name="Purchase last"),

]
