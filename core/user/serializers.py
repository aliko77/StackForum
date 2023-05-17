from rest_framework.serializers import ModelSerializer, Serializer
from .models import User, Profile


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        exclude = ['id', 'created_at', 'user', 'updated_at']


class UserSerializer(ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'is_active',
                  'is_verified', 'date_joined', 'last_login', 'profile']
        read_only_field = ['date_joined', 'last_login']


class PasswordResetSerializer(Serializer):
    pass
