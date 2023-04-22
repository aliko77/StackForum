from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'is_active', 'is_verified', 'created', 'updated']
        read_only_field = ['is_active', 'created', 'updated']
