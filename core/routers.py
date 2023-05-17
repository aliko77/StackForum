from rest_framework.routers import SimpleRouter

from .auth.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet, VerifyViewSet
from .user.viewsets import UserViewSet, VerifyResendViewSet, PasswordResetViewSet

routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet,
                basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
routes.register(r'auth/verify', VerifyViewSet, basename='auth-verify')
routes.register(r'auth/verify-resend',
                VerifyResendViewSet, basename='verify-resend')
routes.register(r'auth/reset-password',
                PasswordResetViewSet, basename='password-reset')

# USER
routes.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    *routes.urls
]
