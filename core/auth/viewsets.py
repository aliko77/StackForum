from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer,\
    VerifyResendSerializer, VerifySerializer, PasswordResetSerializer,\
    PasswordChangeSerializer
from rest_framework.decorators import action


class RegisterViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = RegisterSerializer
    http_method_names = ['post']

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = Response(status=status.HTTP_201_CREATED)
        return response


class AccountVerifyViewSet(ModelViewSet):
    serializer_class = VerifySerializer
    http_method_names = ['post']

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        is_verified = user.is_verified
        return Response({'status': is_verified}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def resend(self, request):
        serializer = VerifyResendSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        is_send = serializer.save()
        return Response({'status': is_send}, status=status.HTTP_200_OK)


class PasswordViewSet(ModelViewSet):
    http_method_names = ['post']

    @action(detail=False, methods=['post'])
    def reset(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        is_sended = serializer.save()
        return Response({'status': is_sended}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def change(self, request):
        serializer = PasswordChangeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status': True}, status=status.HTTP_200_OK)
