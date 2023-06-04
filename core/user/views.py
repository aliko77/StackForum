from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from .serializers import VerifySerializer, VerifyResendSerializer, \
    PasswordForgotSerializer, PasswordResetSerializer


@method_decorator(csrf_protect, name='dispatch')
class UserVerifyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = VerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        is_verified = user.is_verified
        return Response({'status': is_verified}, status=status.HTTP_200_OK)


@method_decorator(csrf_protect, name='dispatch')
class UserVerifyResendView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = VerifyResendSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        is_send = serializer.save()
        return Response({'status': is_send}, status=status.HTTP_200_OK)


class PasswordResetView(APIView):
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status': True}, status=status.HTTP_200_OK)


class PasswordForgotView(APIView):
    def post(self, request):
        serializer = PasswordForgotSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        is_sended = serializer.save()
        return Response({'status': is_sended}, status=status.HTTP_200_OK)
