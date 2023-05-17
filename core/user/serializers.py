from rest_framework.serializers import ModelSerializer, EmailField, Serializer
from .models import User, Profile, AccountActivation


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


class VerifyResendSerializer(ModelSerializer):
    email = EmailField(
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


class PasswordResetSerializer(Serializer):
    pass
