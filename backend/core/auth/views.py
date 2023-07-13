from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.conf import settings
from django.contrib.auth.signals import user_logged_out
from django.middleware import csrf
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .serializers import RegisterSerializer, VerifySerializer, VerifyResendSerializer, \
    PasswordForgotSerializer, PasswordResetSerializer

AUTH_COOKIE = settings.SIMPLE_JWT['AUTH_COOKIE']
AUTH_COOKIE_REFRESH = settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH']
REFRESH_TOKEN_LIFETIME = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME']
AUTH_COOKIE_SECURE = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE']
AUTH_COOKIE_HTTP_ONLY = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY']
AUTH_COOKIE_SAMESITE = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']


def set_cookie(response, key, value):
    response.set_cookie(
        key=key,
        value=value,
        expires=REFRESH_TOKEN_LIFETIME,
        secure=AUTH_COOKIE_SECURE,
        httponly=AUTH_COOKIE_HTTP_ONLY,
        samesite=AUTH_COOKIE_SAMESITE
    )


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            tokens = serializer.validated_data
            response = Response(tokens)
            return response
        except TokenError:
            raise InvalidToken()

    def finalize_response(self, request, response, *args, **kwargs):
        refresh_token = response.data.get("refresh")
        access_token = response.data.get("access")

        if refresh_token:
            set_cookie(
                response, AUTH_COOKIE_REFRESH, refresh_token)
            del response.data["refresh"]
        if access_token:
            set_cookie(
                response, AUTH_COOKIE, access_token
            )
            response['x-csrftoken'] = csrf.get_token(request)

        return super().finalize_response(request, response, *args, **kwargs)


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            tokens = serializer.validated_data
            response = Response(data=tokens)
            return response
        except TokenError as e:
            response = self.handle_token_error(e)
            return response

    def handle_token_error(self, e):
        response = Response()
        response.delete_cookie(AUTH_COOKIE_REFRESH)
        response.delete_cookie(AUTH_COOKIE)
        response.delete_cookie("csrftoken")
        response["x-csrftoken"] = None
        response.data = {
            'code': InvalidToken.default_code,
            'detail': InvalidToken.default_detail
        }
        return response

    def finalize_response(self, request, response, *args, **kwargs):
        refresh_token = response.data.get("refresh")
        access_token = response.data.get("access")

        if refresh_token:
            set_cookie(
                response, AUTH_COOKIE_REFRESH, refresh_token)
            del response.data["refresh"]
        if access_token:
            set_cookie(
                response, AUTH_COOKIE, access_token
            )
            response['x-csrftoken'] = csrf.get_token(request)
        return super().finalize_response(request, response, *args, **kwargs)


class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = Response()
        response.data = serializer.validated_data
        return response


@method_decorator(csrf_protect, name='dispatch')
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get(
                AUTH_COOKIE_REFRESH)
            token = RefreshToken(refresh_token)
            token.blacklist()
            response = Response()
            response.delete_cookie(AUTH_COOKIE)
            response.delete_cookie(AUTH_COOKIE_REFRESH)
            response.delete_cookie("csrftoken")
            response["x-csrftoken"] = None
            response.data = {
                'status': True,
            }
            user_logged_out.send(sender=request.user.__class__,
                                 request=request, user=request.user)
            return response
        except TokenError:
            raise InvalidToken("Bilinmeyen token.")


class RegisterView(APIView):
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_protect, name='dispatch')
class UserVerifyView(APIView):
    permission_classes = [IsAuthenticated]
    
    @staticmethod
    def post(request):
        serializer = VerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        is_verified = user.is_verified
        return Response({ 'status': is_verified }, status=status.HTTP_200_OK)


@method_decorator(csrf_protect, name='dispatch')
class UserVerifyResendView(APIView):
    permission_classes = [IsAuthenticated]
    
    @staticmethod
    def post(request):
        serializer = VerifyResendSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        is_send = serializer.save()
        return Response({ 'status': is_send }, status=status.HTTP_200_OK)


class PasswordResetView(APIView):
    @staticmethod
    def post(request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({ 'status': True }, status=status.HTTP_200_OK)


class PasswordForgotView(APIView):
    @staticmethod
    def post(request):
        serializer = PasswordForgotSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        is_sended = serializer.save()
        return Response({ 'status': is_sended }, status=status.HTTP_200_OK)