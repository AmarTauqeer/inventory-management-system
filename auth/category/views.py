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


# Create your views here.
class CategoryListView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        # print(token)

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            print(payload)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data, status=200)


class CategoryCreateView(APIView):

    def post(self, request):
        token = request.COOKIES.get('jwt')

        # print(token)

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            print(payload)
            if payload:
                serializer = CategorySerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(data=serializer.data, status=200)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')


class CategoryDeleteView(APIView):

    def delete(self, request, id):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            print(payload)
            if payload:
                category = get_object_or_404(Category, id=id)
                category.delete()
                return JsonResponse({"success": 'The record has been deleted successfully'})

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')


class CategoryUpdateView(APIView):

    def put(self, request, id):
        token = request.COOKIES.get('jwt')
        print(token, id)

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            print(payload)
            if payload:
                data = request.data
                category = get_object_or_404(Category, id=id)
                print(category)
                serializer = CategorySerializer(category, data=data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
