from rest_framework.routers import SimpleRouter

from .auth.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet
from .user.viewsets import UserViewSet, VerifyViewSet, VerifyResendViewSet

routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet,
                basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
routes.register(r'account/verify', VerifyViewSet, basename='account-verify')
routes.register(r'account/verify/resend', VerifyResendViewSet, basename='account-verify-resend')

# USER
routes.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    *routes.urls
]
