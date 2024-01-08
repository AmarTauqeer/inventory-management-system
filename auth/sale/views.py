import json

import jwt
from django.http import JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from django.db import connection
from .models import SaleMaster, SaleDetail
from .serializers import SaleMasterSerializer, SaleDetailSerializer

from auth.check_authentication import CheckAuthentication


class SaleMasterCreateView(APIView):

    def post(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            serializer = SaleMasterSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return JsonResponse(serializer.errors, status=HTTP_400_BAD_REQUEST)


class SaleDetailCreateView(APIView):

    def post(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            serializer = SaleDetailSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return JsonResponse(serializer.errors, status=HTTP_400_BAD_REQUEST)


class SaleMasterListView(APIView):

    def get(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            sales = SaleMaster.objects.all()
            serializer = SaleMasterSerializer(sales, many=True)
            return Response(serializer.data, status=200)


class SaleDetailListView(APIView):

    def get(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            sales = SaleDetail.objects.all()
            serializer = SaleDetailSerializer(sales, many=True)
            return Response(serializer.data, status=200)


class SaleMasterDeleteView(APIView):

    def delete(self, request, id):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            sale = get_object_or_404(SaleMaster, id=id)
            # delete purchase detail
            detail = get_object_or_404(SaleDetail, sale_id=id)
            detail.delete()
            sale.delete()
            return JsonResponse({"success": 'The record has been deleted successfully'},
                                status=status.HTTP_204_NO_CONTENT)


class SaleDetailDeleteView(APIView):

    def delete(self, request, id):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            sale_deatil = get_object_or_404(SaleDetail, id=id)
            sale_deatil.delete()
            return JsonResponse({"success": 'The record has been deleted successfully'},
                                status=status.HTTP_204_NO_CONTENT)


class SaleMasterUpdateView(APIView):

    def put(self, request, id):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            sale = get_object_or_404(SaleMaster, id=id)
            serializer = SaleMasterSerializer(sale, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)


class SaleDetailUpdateView(APIView):

    def post(self, request, id):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            sale_details = SaleDetail.objects.all()
            sale = sale_details.filter(sale_id=id)
            olddata = sale
            olddata.delete()

            serializer = SaleDetailSerializer(data=request.data, many=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, safe=False)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)


class StockView(APIView):

    def get(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            cursor = connection.cursor()
            query = """select  product_id ,product_name , (SUM(purchase_qty)-SUM(sale_qty)) as stock_qty 
                            from stock group by product_id, product_name order by product_name"""
            cursor.execute(query)
            rows = cursor.fetchall()
            cursor.close()
            print(len(rows))
            stock_arry = []

            for row in rows:
                data = {
                    "product_id": row[0],
                    "product_name": row[1],
                    "stock_qty": row[2],
                }
                stock_arry.append(data)
            return Response(stock_arry, status=200)


class LastSalePurchaseView(APIView):

    def get(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            cursor = connection.cursor()
            query = """select * from sale_purchase_master_data_view spmdv order by date DESC """
            cursor.execute(query)
            rows = cursor.fetchall()
            cursor.close()
            # print(len(rows))
            sale_purchase_arry = []

            for row in rows:
                data = {
                    "id": row[0],
                    "date": row[1],
                    "amount": row[2],
                    "name": row[3],
                    "type": row[4],
                }
                sale_purchase_arry.append(data)
            return Response(sale_purchase_arry, status=200)


class MonthWiseTotalSaleView(APIView):

    def get(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        if payload["id"]:
            cursor = connection.cursor()
            query = """select month(date) as months,SUM(amount) as amount 
                        from sale_purchase_master_data_view 
                        where TYPE ="sale"
                        group by months
                        order by months"""
            cursor.execute(query)
            rows = cursor.fetchall()
            cursor.close()
            # print(len(rows))
            month_wise_total_sale_arry = []
            for row in rows:
                data = {
                    "months": row[0],
                    "amount": row[1],
                }
                month_wise_total_sale_arry.append(data)
            return Response(month_wise_total_sale_arry, status=200)


class MonthWiseTotalPurchaseView(APIView):

    def get(self, request):
        payload = CheckAuthentication.app_authuntication(self, request);
        print(payload)
        if payload["id"]:
            cursor = connection.cursor()
            query = """select month(date) as months,SUM(amount) as amount 
                        from sale_purchase_master_data_view 
                        where TYPE ="purchase"
                        group by months
                        order by months"""
            cursor.execute(query)
            rows = cursor.fetchall()
            cursor.close()
            # print(len(rows))
            month_wise_total_sale_arry = []
            for row in rows:
                data = {
                    "months": row[0],
                    "amount": row[1],
                }
                month_wise_total_sale_arry.append(data)
            return Response(month_wise_total_sale_arry, status=200)
