from rest_framework import serializers

from .models import User, Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ['id', 'created_at', 'user', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'email', 'is_active', 'is_verified',
                  'date_joined', 'last_login', 'profile']
        read_only_field = ['date_joined', 'last_login']
