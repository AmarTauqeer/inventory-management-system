import json

import jwt

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category
from .serializers import CategorySerializer
from django.http import JsonResponse
from auth.check_authentication import CheckAuthentication


# Create your views here.
class CategoryListView(APIView):

    def get(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            categories = Category.objects.all()
            serializer = CategorySerializer(categories, many=True)
            return Response(serializer.data, status=200)
        return JsonResponse({"errors": 'There are some issues to view the record.'})


class CategoryCreateView(APIView):

    def post(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            serializer = CategorySerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(data=serializer.data, status=200)


class CategoryDeleteView(APIView):

    def delete(self, request, id):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            category = get_object_or_404(Category, id=id)
            category.delete()
            return JsonResponse({"success": 'The record has been deleted successfully'})


class CategoryUpdateView(APIView):

    def put(self, request, id):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            data = request.data
            category = get_object_or_404(Category, id=id)
            print(category)
            serializer = CategorySerializer(category, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
