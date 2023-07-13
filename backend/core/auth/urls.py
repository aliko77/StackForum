from django.urls import path
from .views import CustomTokenObtainPairView, CustomTokenVerifyView, CustomTokenRefreshView, \
    UserVerifyView, UserVerifyResendView,\
    PasswordResetView, PasswordForgotView, \
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
    # Hesap doğrulama
    path('verify/', UserVerifyView.as_view(), name='verify'),
    path(
        'verify/resend/', UserVerifyResendView.as_view(),
        name='verify-resend'
    ),
    # Şifre etkinlikleri
    path('password/reset/', PasswordResetView.as_view(), name='password-reset'),
    path('password/forgot/', PasswordForgotView.as_view(), name='password-forgot'),
]
