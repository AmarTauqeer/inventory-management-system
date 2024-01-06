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


class SupplierListView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        print(token)

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            print(payload)
            if payload:
                suppliers = Supplier.objects.all()
                serializer = SupplierSerializer(suppliers, many=True)
                return Response(serializer.data, status=200)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')


class SupplierCreateView(APIView):

    def post(self, request):
        token = request.COOKIES.get('jwt')
        # print(request.FILES['image'])
        print(request.data)

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            if payload:
                # print(request.data)
                serializer = SupplierSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                # print("saved")
                return Response(data=serializer.data, status=200)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')


class SupplierDeleteView(APIView):

    def delete(self, request, id):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            # print(payload)
            if payload:
                supplier = get_object_or_404(Supplier, id=id)
                supplier.delete()
                return JsonResponse({"success": 'The record has been deleted successfully'})

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')


class SupplierUpdateView(APIView):

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
                supplier = get_object_or_404(Supplier, id=id)
                # my_datetime = supplier.created_at
                # print(my_datetime.astimezone(pytz.timezone('Europe/Berlin')))
                serializer = SupplierSerializer(supplier, data=data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
