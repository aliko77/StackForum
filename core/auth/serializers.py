from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings

from core.user.models import User
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
   email = serializers.EmailField(
      required=True, write_only=True, max_length=128)

   class Meta:
      model = User
      fields = ['id', 'email', 'password']

   def create(self, validated_data):
      try:
         User.objects.get(email=validated_data['email'])
         raise ValidationError({'error': 'This email is already taken.'})
      except ObjectDoesNotExist:
         user_data = {
            'email': validated_data['email'],
            'password': validated_data['password'],
            'confirmPassword': validated_data['confirmPassword'],
         }
         user = User.objects.create_user(**user_data)
         if user:
            pass
      return user
