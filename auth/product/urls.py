from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import ProductListView, ProductCreateView, ProductDeleteView, ProductUpdateView

urlpatterns = [
                  path('list/', ProductListView.as_view(), name="list of product"),
                  path('create/', ProductCreateView.as_view(), name="product creation"),
                  path('delete/<id>', ProductDeleteView.as_view(), name="product delete"),
                  path('update/<id>', ProductUpdateView.as_view(), name="product update"),

              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
