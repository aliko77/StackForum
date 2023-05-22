from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.conf import settings
from django.middleware import csrf
from .serializers import LoginSerializer, RegisterSerializer, VerifyResendSerializer, VerifySerializer, PasswordResetSerializer, PasswordChangeSerializer, CookieTokenRefreshSerializer
from rest_framework.decorators import action
from core.user.serializers import UserSerializer


class LoginViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        tokens = serializer.validated_data

        response = Response()
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=tokens["access_token"],
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value=tokens["refresh_token"],
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        response.data = serializer.validated_data
        response['X-CSRFToken'] = csrf.get_token(request)

        return response


class RegistrationViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        refresh_token = str(refresh)
        access_token = str(refresh.access_token)

        return Response({
            "user": UserSerializer(user).data,
            "refresh_token": refresh_token,
            "access_token": access_token
        }, status=status.HTTP_201_CREATED)


class LogoutViewSet(ViewSet):
    permission_classes = (IsAuthenticated,)
    http_method_names = ['post']

    def create(self, request):
        try:
            refresh_token = request.COOKIES.get(
                settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH']
            )
            token = RefreshToken(refresh_token)
            token.blacklist()

            response = Response(status=status.HTTP_200_OK)
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
            response.delete_cookie("X-CSRFToken")
            response.delete_cookie("csrftoken")
            response["X-CSRFToken"]=None

            return response
        except TokenError:
            raise InvalidToken("Bilinmeyen token.")


class CookieTokenRefreshViewSet(ViewSet, TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=response.data['refresh'],
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )
            del response.data["refresh"]
        response["X-CSRFToken"] = request.COOKIES.get("csrftoken")
        return super().finalize_response(request, response, *args, **kwargs)


class VerifyViewSet(ModelViewSet):
    serializer_class = VerifySerializer
    permission_classes = (AllowAny,)
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
    permission_classes = (AllowAny,)
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
