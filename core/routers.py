from rest_framework.routers import SimpleRouter

from .auth.viewsets import LoginViewSet, RegistrationViewSet, LogoutViewSet, RefreshViewSet, VerifyViewSet, PasswordViewSet
from .user.viewsets import UserViewSet

routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet,
                basename='auth-register')
routes.register(r'auth/logout', LogoutViewSet, basename="auth-logout")
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
routes.register(r'auth/verify', VerifyViewSet, basename='auth-verify')
routes.register(r'auth/password', PasswordViewSet, basename='auth-password')

# USER
routes.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    *routes.urls
]
