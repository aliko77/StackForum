from rest_framework.routers import SimpleRouter
from .viewsets import UserViewSet
from django.urls import path
from .views import UserVerifyView, UserVerifyResendView, \
    PasswordForgotView, PasswordResetView

routes = SimpleRouter()

routes.register(prefix='', viewset=UserViewSet, basename='user')

urlpatterns = [
    path('verify/', UserVerifyView.as_view(), name='verify'),
    path('verify/resend/', UserVerifyResendView.as_view(),
         name='verify-resend'),
    path('password/reset/', PasswordResetView.as_view(), name='password-reset'),
    path('password/forgot/', PasswordForgotView.as_view(), name='password-forgot'),
    *routes.urls
]
