from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer,\
    VerifyResendSerializer, VerifySerializer, PasswordResetSerializer,\
    PasswordChangeSerializer
from rest_framework.decorators import action
from core.user.serializers import UserSerializer
from django.conf import settings
from django.middleware import csrf


class RegisterViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = RegisterSerializer
    http_method_names = ['post']

    def create(self, request):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        refresh_token = str(refresh)
        access_token = str(refresh.access_token)

        response = Response(status=status.HTTP_201_CREATED)
        response.data = {
            "user": UserSerializer(user).data,
            "refresh_token": refresh_token,
            "access_token": access_token
        }
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=access_token,
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value=refresh_token,
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        response['x-csrftoken'] = csrf.get_token(request)
        return response


class AccountVerifyViewSet(ModelViewSet):
    serializer_class = VerifySerializer
    http_method_names = ['post']

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        is_verified = user.is_verified
        return Response({'status': is_verified}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def resend(self, request):
        serializer = VerifyResendSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        is_send = serializer.save()
        return Response({'status': is_send}, status=status.HTTP_200_OK)


class PasswordViewSet(ModelViewSet):
    http_method_names = ['post']

    @action(detail=False, methods=['post'])
    def reset(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        is_sended = serializer.save()
        return Response({'status': is_sended}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def change(self, request):
        serializer = PasswordChangeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status': True}, status=status.HTTP_200_OK)
