from django.urls import path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .viewsets import RegisterViewSet, AccountVerifyViewSet, PasswordViewSet
from .views import CustomTokenObtainPairView, CustomTokenVerifyView, CustomTokenRefreshView, \
    LogoutView

routes = SimpleRouter()

routes.register(prefix=r'register', viewset=RegisterViewSet, basename='auth-register')
routes.register(r'verify', AccountVerifyViewSet, basename='auth-verify')
routes.register(r'password', PasswordViewSet, basename='auth-password')

urlpatterns = [
    path("token/", CustomTokenObtainPairView.as_view(), name="auth.token"),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="auth.token_refresh"),
    path("token/verify/", CustomTokenVerifyView.as_view(), name="auth.token_verify"),
    path("logout/", LogoutView.as_view(), name="auth.logout"),
    *routes.urls
]