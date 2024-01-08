import json
import os

import jwt
from django.core.serializers import serialize
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Product
from .serializers import ProductSerializer

from auth.check_authentication import CheckAuthentication


class ProductListView(APIView):

    def get(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=200)


class ProductCreateView(APIView):

    def post(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        if payload["id"]:
            serializer = ProductSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            print("saved")
            return Response(data=serializer.data, status=200)


class ProductDeleteView(APIView):

    def delete(self, request, id):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            product = get_object_or_404(Product, id=id)
            product_image = product.image;
            if product_image:
                os.remove(product.image.path)
            product.delete()
            return JsonResponse({"success": 'The record has been deleted successfully'})


class ProductUpdateView(APIView):

    def put(self, request, id):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            data = request.data
            product = get_object_or_404(Product, id=id)
            print(product)
            serializer = ProductSerializer(product, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
