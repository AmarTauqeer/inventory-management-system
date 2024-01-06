from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('users.urls')),
    path('category/', include('category.urls')),
    path('product/', include('product.urls')),
    path('supplier/', include('supplier.urls')),
    path('customer/', include('customer.urls')),
    path('purchase/', include('purchase.urls')),
    path('sale/', include('sale.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
