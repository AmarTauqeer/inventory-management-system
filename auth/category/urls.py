from django.urls import path
from .views import CategoryListView, CategoryCreateView, CategoryDeleteView, CategoryUpdateView

urlpatterns = [
    path('list/', CategoryListView.as_view(), name="list of category"),
    path('create/', CategoryCreateView.as_view(), name="category creation"),
    path('delete/<id>', CategoryDeleteView.as_view(), name="category delete"),
    path('update/<id>', CategoryUpdateView.as_view(), name="category update"),

]
