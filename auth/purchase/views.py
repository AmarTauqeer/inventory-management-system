import jwt
from django.http import JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from django.db import connection
from .models import PurchaseMaster, PurchaseDetail
from .serializers import PurchaseMasterSerializer, PurchaseDetailSerializer


class PurchaseMasterCreateView(APIView):

    def post(self, request):
        token = request.COOKIES.get('jwt')

        # print(token)

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            # print(payload)
            serializer = PurchaseMasterSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return JsonResponse(serializer.errors, status=HTTP_400_BAD_REQUEST)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')


class PurchaseDetailCreateView(APIView):

    def post(self, request):
        token = request.COOKIES.get('jwt')

        # print(token)

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            # print(payload)
            serializer = PurchaseDetailSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return JsonResponse(serializer.errors, status=HTTP_400_BAD_REQUEST)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')


class PurchaseMasterListView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        # print(token)

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            # print(payload)
            purchases = PurchaseMaster.objects.all()
            serializer = PurchaseMasterSerializer(purchases, many=True)
            return Response(serializer.data, status=200)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')


class LastPurchaseView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        # print(token)

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            # print(payload)

            cursor = connection.cursor()
            cursor.execute("select MAX(id) from purchase_master")
            row = cursor.fetchone()
            cursor.close()
            # print(row[0])
            if row[0] is None:
                return HttpResponse(1)
            return HttpResponse(row[0] + 1)


        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')


class PurchaseDetailListView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        # print(token)

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            # print(payload)
            purchases = PurchaseDetail.objects.all()
            serializer = PurchaseDetailSerializer(purchases, many=True)
            return Response(serializer.data, status=200)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')


class PurchaseMasterDeleteView(APIView):

    def delete(self, request, id):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            # print(payload)
            if payload:
                purchase = get_object_or_404(PurchaseMaster, id=id)
                # delete purchase detail
                detail= get_object_or_404(PurchaseDetail, purchase_id=id)
                # print(detail)
                detail.delete()
                purchase.delete()
                return JsonResponse({"success": 'The record has been deleted successfully'},
                                    status=status.HTTP_204_NO_CONTENT)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')


class PurchaseDetailDeleteView(APIView):

    def delete(self, request, id):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            # print(payload)
            if payload:
                purchase_deatil = get_object_or_404(PurchaseDetail, id=id)
                purchase_deatil.delete()
                return JsonResponse({"success": 'The record has been deleted successfully'},
                                    status=status.HTTP_204_NO_CONTENT)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')


class PurchaseMasterUpdateView(APIView):

    def put(self, request, id):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            # print(payload)
            if payload:
                purchase = get_object_or_404(PurchaseMaster, id=id)
                serializer = PurchaseMasterSerializer(purchase, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return JsonResponse(serializer.data)
                return JsonResponse(serializer.errors,
                                    status=status.HTTP_400_BAD_REQUEST)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')


class PurchaseDetailUpdateView(APIView):

    def post(self, request, id):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            # print(payload)
            if payload:

                purchase_details = PurchaseDetail.objects.all()
                purchase = purchase_details.filter(purchase_id=id)
                olddata = purchase
                olddata.delete()

                serializer = PurchaseDetailSerializer(data=request.data, many=True)
                if serializer.is_valid():
                    serializer.save()
                    return JsonResponse(serializer.data, safe=False)
                return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
