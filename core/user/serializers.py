from rest_framework.serializers import ModelSerializer, EmailField, CharField, \
    ValidationError, SerializerMethodField, DateTimeField, Serializer, BooleanField
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.utils.http import urlsafe_base64_decode
from django.conf import settings
from django.utils import timezone
from .models import Profile, AuthActivation, UserLoginRecords, BlockedUser
from .utils import SendVerificationEmail, SendPasswordResetEmail, token_generator

User = get_user_model()


class ProfileSerializer(ModelSerializer):
    avatar = SerializerMethodField(method_name="get_avatar")
    
    class Meta:
        model = Profile
        exclude = ['id', 'user', 'created_at', 'updated_at']

    def get_avatar(self, instance):
        if instance.avatar:
            return settings.BASE_URL + instance.avatar.url
        else:
            default_avatar = '/profile_pictures/avatar1.jpg'
            return f"{settings.BASE_URL}{settings.MEDIA_URL}{default_avatar}"
            

class UserSerializer(ModelSerializer):
    email = EmailField(required=False)
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'is_active',
                  'is_verified', 'date_joined', 'last_login', 'profile']
        read_only_fields = ['date_joined', 'last_login']


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


class PasswordForgotSerializer(ModelSerializer):
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


class PasswordResetSerializer(ModelSerializer):
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


class LoginRecordsSerializer(ModelSerializer):
    class Meta:
        model = UserLoginRecords
        exclude = ['id']

class BlockUserByUsernameSerializer(Serializer):
    username = CharField(required=True)
    avatar = SerializerMethodField(read_only=True)
    blocked_at = DateTimeField(read_only=True)
    blocked = BooleanField(read_only=True)

    def get_avatar(self, obj):
        user = obj['blocked_user']
        profile_serializer = ProfileSerializer(user.profile)
        return profile_serializer.data['avatar']

    def validate(self, attrs):
        blocked_by = self.context['request'].user
        username = attrs['username']

        try:
            blocked_user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise ValidationError("Belirtilen kullanıcı bulunamadı.")

        if blocked_by == blocked_user:
            raise ValidationError("Kendinizi engelleyemezsiniz.")
        
        if blocked_by.blocked_by.filter(blocked_user=blocked_user).exists():
            raise ValidationError("Kullanıcı zaten engellenmiş.")

        attrs['blocked'] = True
        attrs['blocked_user'] = blocked_user
        attrs['blocked_at'] = timezone.now()
        return attrs

    def create(self, validated_data):
        blocked_by = self.context['request'].user
        blocked_user = validated_data['blocked_user']
        BlockedUser.objects.get_or_create(blocked_by=blocked_by, blocked_user=blocked_user)
        return validated_data
    

class BlockedUsersSerializer(ModelSerializer):
    username = SerializerMethodField()
    avatar = SerializerMethodField()

    def get_username(self, obj):
        return obj.blocked_user.username
    
    def get_avatar(self, obj):
        profile_serializer = ProfileSerializer(obj.blocked_user.profile)
        return profile_serializer.data['avatar']

    class Meta:
        model = BlockedUser
        fields = ['username', 'avatar', 'blocked_at']

