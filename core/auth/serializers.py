from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from rest_framework.serializers import ModelSerializer, CharField, EmailField, ValidationError

from core.user.models import User, AuthActivation
from core.user.serializers import UserSerializer
from core.user.utils import SendVerificationEmail

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
    password = CharField(
        max_length=128, min_length=8, write_only=True, required=True)
    confirm_password = CharField(write_only=True, required=True)
    email = EmailField(
        required=True, write_only=True, max_length=128)
    first_name = CharField(
        write_only=True, required=True
    )
    last_name = CharField(
        write_only=True, required=True
    )

    class Meta:
        model = User
        fields = ['email', 'password',
                  'confirm_password', 'first_name', 'last_name']

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise ValidationError(
                {
                    'errors': ['Şifreler eşleşmiyor.']
                }
            )
        return attrs

    def create(self, validated_data):
        try:
            User.objects.get(email=validated_data['email'])
            raise ValidationError(
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


class VerifySerializer(ModelSerializer):
    activation_code = CharField(
        max_length=128, min_length=6, write_only=True, required=True)
    email = EmailField(
        required=True, write_only=True, max_length=128)

    class Meta:
        model = AuthActivation
        fields = [
            "email", "activation_code",
        ]

    def validate(self, attrs):
        activation_code = attrs.get('activation_code')
        email = attrs.get('email')

        try:
            user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            raise ValidationError(
                'Geçersiz email.'
            )

        if user.is_verified:
            raise ValidationError("Zaten doğrulanmış.")

        try:
            activation = AuthActivation.objects.get(
                activation_code=activation_code, user__email=email)
        except ObjectDoesNotExist:
            raise ValidationError(
                'Geçersiz doğrulama kodu.'
            )

        if activation.is_expired():
            raise ValidationError('Doğrulama kodunun süresi doldu.')

        attrs['activation'] = activation
        attrs['user'] = user
        return attrs

    def create(self, validated_data):
        activation = validated_data['activation']
        activation.delete()
        user = validated_data['user']
        user.is_verified = True
        user.save()
        return user

class VerifyResendSerializer(ModelSerializer):
    email = EmailField(
        required=True, write_only=True, max_length=128)

    class Meta:
        model = AuthActivation
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email")

        try:
            user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            raise ValidationError(
                'Geçersiz email.'
            )

        if user.is_verified:
            raise ValidationError("Zaten doğrulanmış.")
        
        AuthActivation.objects.filter(
            user__email=email).delete()
        
        attrs['user'] = user
        return attrs
        

    def create(self, validated_data):
        user = validated_data['user']
        is_send = SendVerificationEmail(user)
        return is_send