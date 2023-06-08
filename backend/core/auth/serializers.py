from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer,\
    TokenVerifySerializer
from rest_framework.serializers import CharField, EmailField, ValidationError
from core.user.serializers import UserSerializer
from django.contrib.auth.signals import user_logged_in
from django.conf import settings
from django.db.models import Q
from django.core.validators import RegexValidator

User = get_user_model()

AUTH_COOKIE_REFRESH = settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH']
AUTH_COOKIE = settings.SIMPLE_JWT['AUTH_COOKIE']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user_data = UserSerializer(self.user).data
        data['user'] = user_data
        user_logged_in.send(sender=self.user.__class__, request=self.context['request'], user=self.user)
        return data


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get(AUTH_COOKIE_REFRESH)
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
        attrs['token'] = self.context['request'].COOKIES.get(AUTH_COOKIE)
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
        write_only=True, required=True, min_length=3, max_length=32,
            validators=[
                RegexValidator(
                    regex=r'^(?!.*[-_.]{2})[a-zA-Z0-9_.çÇğĞıİöÖşŞüÜ-]+$',
                    message='Sadece "_", ".", "-" karakterlerine izin verilmektedir ve ard arda kullanılamaz.'
                )
            ]
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

        try:
            User.objects.get(Q(username__iexact=attrs['username']))
            raise ValidationError(
                'Bu kullanıcı adı zaten kullanılıyor.'
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

