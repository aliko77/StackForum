from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'is_active', 'is_verified', 'date_joined', 'last_login']
        read_only_field = ['is_active', 'date_joined', 'last_login']
