from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from .serializers import UserSerializer, ProfileSerializer, LoginRecordsSerializer
from .utils import SendVerificationEmail
from .models import UserLoginRecords
import re

User = get_user_model()


def check_file_size(file):
    if file.size > settings.AVATAR_MAX_FILE_SIZE:
        return False
    return True


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.pk)

    def get_object(self):
        return self.get_queryset().first()

    def retrieve(self, request, *args, **kwargs) -> Response:
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(
        methods=['post'],
        detail=False,
        serializer_class=ProfileSerializer,
        url_path='profile/update'
    )
    def profile_update(self, request, *args, **kwargs) -> Response:
        profile = self.get_object().profile
        serializer = self.serializer_class(profile, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            response = Response(status=status.HTTP_200_OK)
            response.data = serializer.data
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(
        methods=['post'],
        detail=False,
        serializer_class=ProfileSerializer,
        url_path='avatar/delete'
    )
    def profile_avatar_delete(self, request, *args, **kwargs) -> Response:
        profile = self.get_object().profile
        if profile.avatar != settings.PROFILE_AVATAR_FILE:
            profile.avatar.delete()
            profile.save()
            serializer = self.get_serializer(profile, data={}, partial=True)
            if serializer.is_valid(raise_exception=True):
                default_avatar = settings.PROFILE_AVATAR_FILE
                user = serializer.save(avatar=default_avatar)
                return Response(data={
                    'status': True,
                    'avatar': settings.BASE_URL + user.avatar.url
                }, status=status.HTTP_200_OK)
        return Response(data={'error': 'Bir hata oluştu.'}, status=status.HTTP_400_BAD_REQUEST)

    @action(
        methods=['post'],
        detail=False,
        serializer_class=ProfileSerializer,
        url_path='avatar/update'
    )
    def profile_avatar_update(self, request, *args, **kwargs) -> Response:
        avatar_file = request.FILES.get('avatar')
        if not avatar_file:
            return Response(data={'error': 'Avatar dosyası yüklenemedi.'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_file_size(avatar_file):
            return Response(data={'error': 'Dosya boyutu çok büyük.'}, status=status.HTTP_400_BAD_REQUEST)
        profile = self.get_object().profile
        if profile.avatar != settings.PROFILE_AVATAR_FILE:
            profile.avatar.delete()
            profile.save()

        serializer = self.get_serializer(profile, data={}, partial=True)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save(avatar=avatar_file)
            return Response(data={
                'status': True,
                'avatar': settings.BASE_URL + user.avatar.url
            }, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(
        methods=['post'],
        detail=False,
        url_path='password/change'
    )
    def change_password(self, request, *args, **kwargs) -> Response:
        user = self.get_object()
        password = request.data.get('password')
        new_password = request.data.get('new_password')
        new_confirm_password = request.data.get('new_confirm_password')

        if not user.check_password(password):
            return Response({'error': 'Mevcut parola yanlış.'}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != new_confirm_password:
            return Response({'error': 'Yeni parolalar eşleşmiyor.'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({'status': True}, status=status.HTTP_200_OK)

    @action(
        methods=['post'],
        detail=False,
        url_path='email/change'
    )
    def change_email(self, request, *args, **kwargs) -> Response:
        user = self.get_object()
        password = request.data.get('password')
        new_email = request.data.get('new_email')

        if not user.check_password(password):
            return Response({'error': 'Mevcut parola yanlış.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=new_email).exists():
            return Response({'error': 'Bu e-posta adresini kullanamazsınız.'}, status=status.HTTP_400_BAD_REQUEST)

        user.email = new_email
        user.is_verified = False
        user.save()
        SendVerificationEmail(user)
        return Response({'status': True}, status=status.HTTP_200_OK)

    @action(
        methods=['post'],
        detail=False,
        serializer_class=ProfileSerializer,
        url_path='signature/update'
    )
    def profile_signature_update(self, request, *args, **kwargs) -> Response:
        profile = self.get_object().profile
        signature = request.data.get('signature')
        # İmza kontrolü
        link_pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
        links = re.findall(link_pattern, signature)
        errors = []
        if len(signature) > 120:
            errors.append('İmza 120 karakterden fazla.')
        if signature.count('\n') > 2:
            errors.append('İmza 3 satırdan fazla.')
        if len(links) > 1:
            errors.append('İmza 1 den fazla link içeriyor.')
        if len(errors) > 0:
            return Response(data=errors, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(profile, data={}, partial=True)
        if serializer.is_valid(raise_exception=True):
            profile = serializer.save(signature=signature)
            return Response({
                'status': True,
                'signature': profile.signature
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(
        methods=['get'],
        detail=False,
        serializer_class=LoginRecordsSerializer,
        url_path='last-login-records'
    )
    def user_last_login_records(self, request, *args, **kwargs) -> Response:
        user = self.get_object()
        last_logins = UserLoginRecords.objects.filter(user=user).order_by('-login_time')
        serializer = self.serializer_class(last_logins, many=True)
        return Response(serializer.data)
