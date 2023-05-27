from django.urls import path, include

# # AUTHENTICATION
# routes.register(r'auth/verify', AccountVerifyViewSet, basename='auth-verify')
# routes.register(r'auth/password', PasswordViewSet, basename='auth-password')

urlpatterns = [
    path('auth/', include('core.auth.urls')),
    path('user/', include('core.user.urls')),
]
