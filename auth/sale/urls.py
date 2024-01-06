from django.urls import path
from .views import *

urlpatterns = [
    path('list/', SaleMasterListView.as_view(), name="list of sale master"),
    path('detail-list/', SaleDetailListView.as_view(), name="list of sale detail"),
    path('create/', SaleMasterCreateView.as_view(), name="sale master creation"),
    path('detail-create/', SaleDetailCreateView.as_view(), name="sale detail creation"),
    path('delete/<id>', SaleMasterDeleteView.as_view(), name="sale master delete"),
    path('detail-delete/<id>', SaleDetailDeleteView.as_view(), name="sale detail delete"),
    path('update/<id>', SaleMasterUpdateView.as_view(), name="sale master update"),
    path('detail-update/<id>', SaleDetailUpdateView.as_view(), name="sale detail update"),
    path('stock/', StockView.as_view(), name="Stock"),
    path('last-sale-purchase/', LastSalePurchaseView.as_view(), name="last sale purchase"),
    path('month-wise-total-sale/', MonthWiseTotalSaleView.as_view(), name="month wise total sale"),
    path('month-wise-total-purchase/', MonthWiseTotalPurchaseView.as_view(), name="month wise total purchase"),
]
