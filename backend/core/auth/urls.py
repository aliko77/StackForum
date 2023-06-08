from django.urls import path
from .views import CustomTokenObtainPairView, CustomTokenVerifyView, CustomTokenRefreshView, \
    LogoutView, \
    RegisterView

urlpatterns = [
    path("token/", CustomTokenObtainPairView.as_view(), name="auth.token"),
    path("token/refresh/", CustomTokenRefreshView.as_view(),
         name="auth.token_refresh"),
    path("token/verify/", CustomTokenVerifyView.as_view(),
         name="auth.token_verify"),
    path("register/", RegisterView.as_view(), name="auth.register"),
    path("logout/", LogoutView.as_view(), name="auth.logout"),
]
