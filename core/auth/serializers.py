from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings

from core.user.models import User
from core.user.serializers import UserSerializer


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data = {
            'user': UserSerializer(self.user).data,
            'refreshToken': str(refresh),
            'accessToken': str(refresh.access_token)
        }

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
        fields = ['email', 'password',
                  'confirm_password', 'first_name', 'last_name']

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(
                {
                    'errors': ['Şifreler eşleşmiyor.']
                }
            )
        return attrs

    def create(self, validated_data):
        try:
            User.objects.get(email=validated_data['email'])
            raise serializers.ValidationError(
                {
                    'errors': ['Bu email zaten kullanılıyor.']
                }
            )
        except ObjectDoesNotExist:
            user_data = {
                'email': validated_data['email'],
                'password': validated_data['password'],
                'first_name': validated_data['first_name'],
                'last_name': validated_data['last_name'],
            }
            user = User.objects.create_user(**user_data)
            return user
