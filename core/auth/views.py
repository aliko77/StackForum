from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from django.conf import settings
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken 
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.signals import user_logged_out

def set_cookie(response, key, value):
        response.set_cookie(
            key=key,
            value=value,
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
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
            set_cookie(response, settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'], refresh_token)
            del response.data["refresh"]
        if access_token:
            set_cookie(response, settings.SIMPLE_JWT['AUTH_COOKIE'], access_token)

        response["X-CSRFToken"] = request.COOKIES.get("csrftoken")
        return super().finalize_response(request, response, *args, **kwargs)


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            tokens = serializer.validated_data
            response = Response(tokens)
            return response
        except TokenError as e:
            response = self.handle_token_error(e)
            return response
    
    def handle_token_error(self, e):
        response = Response()
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
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
            set_cookie(response, settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'], refresh_token)
            del response.data["refresh"]
        if access_token:
            set_cookie(response, settings.SIMPLE_JWT['AUTH_COOKIE'], access_token)

        response["X-CSRFToken"] = request.COOKIES.get("csrftoken")
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