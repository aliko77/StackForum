from rest_framework.routers import SimpleRouter

from .auth.viewsets import LoginViewSet, RegistrationViewSet,\
    LogoutViewSet, CookieTokenRefreshViewSet,\
    AccountVerifyViewSet, PasswordViewSet
from .user.viewsets import UserViewSet

routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/refresh-token', CookieTokenRefreshViewSet, basename='auth-refresh-token')
routes.register(r'auth/register', RegistrationViewSet,
                basename='auth-register')
routes.register(r'auth/logout', LogoutViewSet, basename="auth-logout")
routes.register(r'auth/verify', AccountVerifyViewSet, basename='auth-verify')
routes.register(r'auth/password', PasswordViewSet, basename='auth-password')

# USER
routes.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    *routes.urls
]
