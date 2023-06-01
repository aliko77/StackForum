from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer,\
    TokenVerifySerializer
from rest_framework.serializers import ModelSerializer, CharField, EmailField, ValidationError
from .utils import SendVerificationEmail, SendPasswordResetEmail, token_generator
from core.user.models import AuthActivation
from core.user.serializers import UserSerializer
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.signals import user_logged_in
from django.conf import settings

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user_data = UserSerializer(self.user).data
        data = {
            'access_token': data['access'],
            'refresh_token': data['refresh'],
            'user': user_data,
        }
        user_logged_in.send(sender=self.user.__class__, request=self.context['request'], user=self.user)

        return data


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            del attrs['refresh']
            attrs['code'] = 'refresh_token_not_found'
            attrs['detail'] = 'Cookie değeri bulunamadı: \'refresh\''
            return attrs


class CustomTokenVerifySerializer(TokenVerifySerializer):
    token = None

    def validate(self, attrs):
        attrs['token'] = self.context['request'].COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        if attrs['token']:
            return super().validate(attrs)
        else:
            del attrs['token']
            attrs['code'] = 'acces_token_not_found'
            attrs['detail'] = 'Cookie değeri bulunamadı: \'access\''
            return attrs


class RegisterSerializer(UserSerializer):
    password = CharField(
        max_length=128, min_length=8, write_only=True, required=True)
    confirm_password = CharField(write_only=True, required=True)
    email = EmailField(
        required=True, write_only=True, max_length=128)
    username = CharField(
        write_only=True, required=True
    )

    class Meta:
        model = User
        fields = ['email', 'password',
                  'confirm_password', 'username']

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise ValidationError(
                'Şifreler eşleşmiyor.'
            )
        try:
            User.objects.get(email=attrs['email'])
            raise ValidationError(
                'Bu email zaten kullanılıyor.'
            )
        except ObjectDoesNotExist:
            pass
        return attrs

    def create(self, validated_data):
        user_data = {
            'username': validated_data['username'],
            'email': validated_data['email'],
            'password': validated_data['password'],
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
            raise ValidationError(
                "Zaten doğrulanmış."
            )

        try:
            activation = AuthActivation.objects.get(
                activation_code=activation_code, user__email=email)
        except ObjectDoesNotExist:
            raise ValidationError(
                'Geçersiz doğrulama kodu.'
            )

        if activation.is_expired():
            raise ValidationError(
                'Doğrulama kodunun süresi doldu.'
            )

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
            raise ValidationError(
                "Zaten doğrulanmış."
            )

        AuthActivation.objects.filter(
            user__email=email).delete()

        attrs['user'] = user
        return attrs

    def create(self, validated_data):
        user = validated_data['user']
        is_send = SendVerificationEmail(user)
        return is_send


class PasswordResetSerializer(ModelSerializer):
    email = EmailField(
        required=True, write_only=True, max_length=128)

    class Meta:
        model = User
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email")

        try:
            user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            raise ValidationError(
                'Geçersiz email.'
            )

        attrs['user'] = user
        return attrs

    def create(self, validated_data):
        user = validated_data['user']
        is_send = SendPasswordResetEmail(user)
        return is_send


class PasswordChangeSerializer(ModelSerializer):
    uid = CharField(
        required=True, write_only=True)
    token = CharField(
        required=True, write_only=True)
    password = CharField(
        max_length=128, min_length=8, write_only=True, required=True)
    confirmPassword = CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["uid", "token", "password", "confirmPassword"]

    def validate(self, attrs):
        uid = urlsafe_base64_decode(attrs.get("uid")).decode()
        token = attrs.get("token")
        password = attrs.get("password")
        confirmPassword = attrs.get("confirmPassword")

        try:
            user = User.objects.get(pk=uid)
        except ObjectDoesNotExist:
            raise ValidationError(
                'Geçersiz token.'
            )

        if not token_generator.check_token(user, token):
            raise ValidationError(
                'Geçersiz token.'
            )

        if password != confirmPassword:
            raise ValidationError(
                'Şifreler eşleşmiyor.'
            )

        attrs['user'] = user
        return attrs

    def create(self, validated_data):
        user = validated_data['user']
        password = validated_data['password']
        user.set_password(password)
        user.save()
        return user
