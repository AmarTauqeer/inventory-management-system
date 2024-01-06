from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import SupplierListView, SupplierCreateView, SupplierDeleteView, SupplierUpdateView

urlpatterns = [
                  path('list/', SupplierListView.as_view(), name="list of supplier"),
                  path('create/', SupplierCreateView.as_view(), name="supplier creation"),
                  path('delete/<id>', SupplierDeleteView.as_view(), name="supplier delete"),
                  path('update/<id>', SupplierUpdateView.as_view(), name="supplier update"),

              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
