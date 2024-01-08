import jwt
from django.http import JsonResponse
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Customer
from .serializers import CustomerSerializer

from auth.check_authentication import CheckAuthentication


class CustomerListView(APIView):

    def get(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            customers = Customer.objects.all()
            serializer = CustomerSerializer(customers, many=True)
            return Response(serializer.data, status=200)


class CustomerCreateView(APIView):

    def post(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            serializer = CustomerSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            # print("saved")
            return Response(data=serializer.data, status=200)


class CustomerDeleteView(APIView):

    def delete(self, request, id):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            customer = get_object_or_404(Customer, id=id)
            customer.delete()
            return JsonResponse({"success": 'The record has been deleted successfully'})


class CustomerUpdateView(APIView):

    def put(self, request, id):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            data = request.data
            customer = get_object_or_404(Customer, id=id)
            # print(customer)
            serializer = CustomerSerializer(customer, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
