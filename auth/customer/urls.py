from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import CustomerListView, CustomerCreateView, CustomerDeleteView, CustomerUpdateView

urlpatterns = [
                  path('list/', CustomerListView.as_view(), name="list of customer"),
                  path('create/', CustomerCreateView.as_view(), name="customer creation"),
                  path('delete/<id>', CustomerDeleteView.as_view(), name="customer delete"),
                  path('update/<id>', CustomerUpdateView.as_view(), name="customer update"),

              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
