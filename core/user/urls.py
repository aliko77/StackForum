from rest_framework.routers import SimpleRouter
from .viewsets import UserViewSet
from django.urls import path
from .views import UserVerifyView, UserVerifyResendView, \
    PasswordResetView, PasswordChangeView

routes = SimpleRouter()

routes.register(prefix='', viewset=UserViewSet, basename='user')

urlpatterns = [
    path('verify/', UserVerifyView.as_view(), name='verify'),
    path('verify/resend/', UserVerifyResendView.as_view(),
         name='verify-resend'),
    path('password/reset/', PasswordChangeView.as_view(), name='password-reset'),
    path('password/change/', PasswordResetView.as_view(), name='password-change'),
    *routes.urls
]
