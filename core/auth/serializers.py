from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings

from core.user.models import User, Profile
from core.user.serializers import UserSerializer


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['user'] = UserSerializer(self.user).data
        data['refreshToken'] = str(refresh)
        data['accessToken'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, user=self.user)

        return data


class RegisterSerializer(UserSerializer):
    password = serializers.CharField(
        max_length=128, min_length=8, write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(
        required=True, write_only=True, max_length=128)
    first_name = serializers.CharField(
        write_only=True, required=True
    )
    last_name = serializers.CharField(
        write_only=True, required=True
    )

    class Meta:
        model = User
        fields = ['id', 'email', 'password',
                  'confirm_password', 'first_name', 'last_name']

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(['Şifreler eşleşmiyor.'])
        return attrs

    def create(self, validated_data):
        try:
            User.objects.get(email=validated_data['email'])
            raise serializers.ValidationError(['Bu email zaten kullanılıyor.'])
        except ObjectDoesNotExist:
            user_data = {
                'email': validated_data['email'],
                'password': validated_data['password'],
            }
            user = User.objects.create_user(**user_data)
            profile_data = {
                'user': user,
                'first_name': validated_data.get('first_name'),
                'last_name': validated_data.get('last_name'),
            }
            Profile.objects.filter(user=user).update(**profile_data)
        return user
