import jwt
from django.http import JsonResponse
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import datetime
import pytz

from .models import Supplier
from .serializers import SupplierSerializer

from auth.check_authentication import CheckAuthentication


class SupplierListView(APIView):

    def get(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            suppliers = Supplier.objects.all()
            serializer = SupplierSerializer(suppliers, many=True)
            return Response(serializer.data, status=200)


class SupplierCreateView(APIView):

    def post(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            serializer = SupplierSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            # print("saved")
            return Response(data=serializer.data, status=200)


class SupplierDeleteView(APIView):

    def delete(self, request, id):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            supplier = get_object_or_404(Supplier, id=id)
            supplier.delete()
            return JsonResponse({"success": 'The record has been deleted successfully'})


class SupplierUpdateView(APIView):

    def put(self, request, id):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            data = request.data
            supplier = get_object_or_404(Supplier, id=id)
            # my_datetime = supplier.created_at
            # print(my_datetime.astimezone(pytz.timezone('Europe/Berlin')))
            serializer = SupplierSerializer(supplier, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
