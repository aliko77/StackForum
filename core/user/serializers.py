from rest_framework import serializers
from .models import User, Profile, AccountActivation
from django.core.exceptions import ValidationError


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ['id', 'created_at', 'user', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'is_active',
                  'is_verified', 'date_joined', 'last_login', 'profile']
        read_only_field = ['date_joined', 'last_login']


class VerifySerializer(serializers.ModelSerializer):
    vcode = serializers.CharField(
        max_length=128, min_length=6, write_only=True, required=True)
    email = serializers.EmailField(
        required=True, write_only=True, max_length=128)

    class Meta:
        model = AccountActivation
        fields = [
            "email", "vcode",
        ]

    def create(self, validated_data):
        user = User.objects.get(email=validated_data["email"])
        return user


class VerifyResendSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, write_only=True, max_length=128)

    class Meta:
        model = AccountActivation
        fields = ["email"]

    def create(self, validated_data):
        user = User.objects.get(email=validated_data["email"])
        print(user.email)
        # vEmail = SendVerificationEmail(user)
        response = {
            "status": True
        }
        return response


class PasswordResetSerializer(serializers.Serializer):
    pass
