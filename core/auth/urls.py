from django.urls import path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .viewsets import RegisterViewSet
from .views import CustomTokenObtainPairView, LogoutView

routes = SimpleRouter()

routes.register(prefix='register', viewset=RegisterViewSet, basename='auth-register')

urlpatterns = [
    path("token/", CustomTokenObtainPairView.as_view(), name="auth.token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="auth.token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="auth.token_verify"),
    path("logout/", LogoutView.as_view(), name="auth.logout"),
    *routes.urls
]