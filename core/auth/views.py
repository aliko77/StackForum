from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from django.conf import settings
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken 
from django.middleware import csrf
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.signals import user_logged_out
from rest_framework import status

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError:
            raise InvalidToken()

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
        response.data = tokens
        response['x-csrftoken'] = csrf.get_token(request)
        return response


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError:
            response = Response(status=status.HTTP_401_UNAUTHORIZED)
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
            response.delete_cookie("csrftoken")
            response["x-csrftoken"] = None
            response.data = {
                'code': InvalidToken.default_code,
                'detail': InvalidToken.default_detail
            }
            return response
        return super().post(request)


class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError:
            response = Response(status=status.HTTP_401_UNAUTHORIZED)
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
            response.data = {
                'code': InvalidToken.default_code,
                'detail': InvalidToken.default_detail
            }
            return response
        return super().post(request)


@method_decorator(csrf_protect, name='dispatch')
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ['post']

    def post(self, request):
        try:
            refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
            token = RefreshToken(refresh_token)
            token.blacklist()

            response = Response()
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
            response.delete_cookie("csrftoken")
            response["x-csrftoken"] = None
            response.data = {
                'status' : True,
            }
            user_logged_out.send(sender=request.user.__class__, request=request, user=request.user)
            return response
        except TokenError:
            raise InvalidToken("Bilinmeyen token.")