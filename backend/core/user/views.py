import re
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed


from .utils import SendVerificationEmail
from .serializers import VerifySerializer, VerifyResendSerializer, \
    PasswordForgotSerializer, PasswordResetSerializer, UserSerializer, \
    ProfileSerializer, LoginRecordsSerializer, BlockedUsersSerializer, \
    BlockUserByUsernameSerializer, UnBlockUserByUsernameSerializer, \
    UserFriendsSerializer, AddFriendByUsernameSerializer, RemoveFriendByUsernameSerializer
    
from .models import UserLoginRecords


User = get_user_model()


class UserMeView(APIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def handle_exception(self, exc):
        if isinstance(exc, AuthenticationFailed):
            response = Response({'detail': 'Kullanıcı bulunamadı.'}, status=401)
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
            response.delete_cookie("csrftoken")
            response["x-csrftoken"] = None
            return response
        return super().handle_exception(exc)
    
    def get(self, request) -> Response:
        serializer = self.serializer_class(self.request.user)
        return Response(serializer.data)


@method_decorator(csrf_protect, name='dispatch')
class ProfileUpdateView(APIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request) -> Response:
        profile = self.request.user.profile
        serializer = self.serializer_class(profile, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(status=status.HTTP_200_OK, data=serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST,data=serializer.errors)


@method_decorator(csrf_protect, name='dispatch')
class ProfileAvatarUpdateView(APIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    @staticmethod
    def check_file_size(file):
        if file.size > settings.AVATAR_MAX_FILE_SIZE:
            return
        return True
    
    def post(self, request) -> Response:
        avatar_file = request.FILES.get('avatar')
        if not avatar_file:
            return Response(
                data={'error': 'Avatar dosyası yüklenemedi.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not self.check_file_size(avatar_file):
            return Response(
                data={'error': 'Dosya boyutu çok büyük.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        profile = self.request.user.profile
        if profile.avatar != settings.PROFILE_AVATAR_FILE:
            profile.avatar.delete()
            profile.save()

        serializer = self.serializer_class(profile, data={}, partial=True)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save(avatar=avatar_file)
            return Response(
                data={
                    'status': True,
                    'avatar': settings.BASE_URL + user.avatar.url
                }, status=status.HTTP_200_OK
            )
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_protect, name='dispatch')
class ProfileAvatarDeleteView(APIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        profile = self.request.user.profile
        if profile.avatar != settings.PROFILE_AVATAR_FILE:
            profile.avatar.delete()
            profile.save()
            serializer = self.serializer_class(profile, data={}, partial=True)
            if serializer.is_valid(raise_exception=True):
                default_avatar = settings.PROFILE_AVATAR_FILE
                user = serializer.save(avatar=default_avatar)
                return Response(
                    data={
                        'status': True,
                        'avatar': settings.BASE_URL + user.avatar.url
                    }, status=status.HTTP_200_OK
                )
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_protect, name='dispatch')
class ProfileSignatureUpdateView(APIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        profile = self.request.user.profile
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
            return Response(
                {
                    'status': True,
                    'signature': profile.signature
                }, status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_protect, name='dispatch')
class UserChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = self.request.user
        password = request.data.get('password')
        new_password = request.data.get('new_password')
        new_confirm_password = request.data.get('new_confirm_password')

        if not user.check_password(password):
            return Response(
                {'error': 'Mevcut parola yanlış.'}, status=status.HTTP_400_BAD_REQUEST
            )

        if new_password != new_confirm_password:
            return Response(
                {'error': 'Yeni parolalar eşleşmiyor.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(new_password)
        user.save()
        return Response({'status': True}, status=status.HTTP_200_OK)


@method_decorator(csrf_protect, name='dispatch')
class UserChangeEmailView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = self.request.user
        password = request.data.get('password')
        new_email = request.data.get('new_email')

        if not user.check_password(password):
            return Response(
                {'error': 'Mevcut parola yanlış.'}, status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=new_email).exists():
            return Response(
                {'error': 'Bu e-posta adresini kullanamazsınız.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.email = new_email
        user.is_verified = False
        user.save()
        SendVerificationEmail(user)
        return Response({'status': True}, status=status.HTTP_200_OK)


class UserLastLoginRecordsView(APIView):
    serializer_class = LoginRecordsSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = self.request.user
        last_logins = UserLoginRecords.objects.filter(
            user=user).order_by('-login_time')[:10]
        serializer = self.serializer_class(last_logins, many=True)
        return Response(serializer.data)
    

class UserBlockUserView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = self.request.user
        blocked_users = user.blocked_users.all()
        serializer = BlockedUsersSerializer(blocked_users, many=True)
        return Response(serializer.data)
    
    
    def post(self, request):
        serializer = BlockUserByUsernameSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request):
        serializer = UnBlockUserByUsernameSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class UserFriendsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = self.request.user
        user_friends = user.friends.all()
        serializer = UserFriendsSerializer(user_friends, many=True)
        return Response(serializer.data)
    
    
    def post(self, request):
        serializer = AddFriendByUsernameSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request):
        serializer = RemoveFriendByUsernameSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@method_decorator(csrf_protect, name='dispatch')
class UserVerifyView(APIView):
    permission_classes = [IsAuthenticated]
    
    @staticmethod
    def post(request):
        serializer = VerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        is_verified = user.is_verified
        return Response({ 'status': is_verified }, status=status.HTTP_200_OK)


@method_decorator(csrf_protect, name='dispatch')
class UserVerifyResendView(APIView):
    permission_classes = [IsAuthenticated]
    
    @staticmethod
    def post(request):
        serializer = VerifyResendSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        is_send = serializer.save()
        return Response({ 'status': is_send }, status=status.HTTP_200_OK)


class PasswordResetView(APIView):
    @staticmethod
    def post(request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({ 'status': True }, status=status.HTTP_200_OK)


class PasswordForgotView(APIView):
    @staticmethod
    def post(request):
        serializer = PasswordForgotSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        is_sended = serializer.save()
        return Response({ 'status': is_sended }, status=status.HTTP_200_OK)
