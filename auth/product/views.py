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


class ProductListView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        print(token)

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            print(payload)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data, status=200)


class ProductCreateView(APIView):

    def post(self, request):
        token = request.COOKIES.get('jwt')
        # print(request.FILES['image'])
        print(request.data)

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            if payload:
                print(request.data)
                serializer = ProductSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                print("saved")
                return Response(data=serializer.data, status=200)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')


class ProductDeleteView(APIView):

    def delete(self, request, id):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            print(payload)
            if payload:
                product = get_object_or_404(Product, id=id)
                product_image = product.image;
                if product_image:
                    os.remove(product.image.path)
                product.delete()
                return JsonResponse({"success": 'The record has been deleted successfully'})

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')


class ProductUpdateView(APIView):

    def put(self, request, id):
        token = request.COOKIES.get('jwt')
        # print(token, id)

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            print(payload)
            if payload:
                data = request.data
                product = get_object_or_404(Product, id=id)
                print(product)
                serializer = ProductSerializer(product, data=data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
