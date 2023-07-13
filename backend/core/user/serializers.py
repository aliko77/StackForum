from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.utils import timezone
from rest_framework.serializers import ModelSerializer, EmailField, CharField, \
    ValidationError, SerializerMethodField, DateTimeField, Serializer, BooleanField

from .models import Profile, UserLoginRecords, BlockedUser, Friend


User = get_user_model()


class ProfileSerializer(ModelSerializer):
    avatar = SerializerMethodField(method_name="get_avatar")


    class Meta:
        model = Profile
        exclude = ['id', 'user', 'created_at', 'updated_at']
    
    
    @staticmethod
    def get_avatar(instance):
        if instance.avatar:
            return settings.BASE_URL + instance.avatar.url
        else:
            default_avatar = '/profile_pictures/avatar1.jpg'
            return f"{settings.BASE_URL}{settings.MEDIA_URL}{default_avatar}"


class UserSerializer(ModelSerializer):
    email = EmailField(required=False)
    profile = ProfileSerializer()
    auth_groups = SerializerMethodField(method_name="get_auth_groups")
    
    @staticmethod
    def get_auth_groups(instance):
        groups = Group.objects.filter(user=instance)
        return [group.name for group in groups]
    
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'is_active',
                  'is_verified', 'date_joined', 'last_login', 'profile', 'is_staff', 'auth_groups']
        read_only_fields = ['date_joined', 'last_login']


class LoginRecordsSerializer(ModelSerializer):
    class Meta:
        model = UserLoginRecords
        exclude = ['id']


class BlockUserByUsernameSerializer(Serializer):
    username = CharField(required=True)
    avatar = SerializerMethodField(read_only=True)
    blocked_at = DateTimeField(read_only=True)
    blocked = BooleanField(read_only=True)
    
    @staticmethod
    def get_avatar(obj):
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
        
        if blocked_by.blocked_users.filter(blocked_user=blocked_user).exists():
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


class UnBlockUserByUsernameSerializer(Serializer):
    username = CharField(required=True)
    un_blocked = BooleanField(read_only=True)
    
    def validate(self, attrs):
        un_blocked_by = self.context['request'].user
        username = attrs['username']
        
        try:
            un_blocked_user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise ValidationError("Belirtilen kullanıcı bulunamadı.")
        
        if un_blocked_by == un_blocked_user:
            raise ValidationError("Kendinize işlem yapamazsınız.")
        
        if not un_blocked_by.blocked_users.filter(blocked_user=un_blocked_user).exists():
            raise ValidationError("Kullanıcı zaten engellenmemiş.")
        
        attrs['un_blocked'] = True
        attrs['un_blocked_user'] = un_blocked_user
        return attrs
    
    def create(self, validated_data):
        un_blocked_by = self.context['request'].user
        un_blocked_user = validated_data['un_blocked_user']
        BlockedUser.objects.filter(blocked_by=un_blocked_by, blocked_user=un_blocked_user).delete()
        return validated_data


class BlockedUsersSerializer(ModelSerializer):
    username = SerializerMethodField()
    avatar = SerializerMethodField()
    
    @staticmethod
    def get_username(obj):
        return obj.blocked_user.username
    
    @staticmethod
    def get_avatar(obj):
        profile_serializer = ProfileSerializer(obj.blocked_user.profile)
        return profile_serializer.data['avatar']
    
    
    class Meta:
        model = BlockedUser
        fields = ['username', 'avatar', 'blocked_at']


class UserFriendsSerializer(ModelSerializer):
    username = SerializerMethodField()
    avatar = SerializerMethodField()
    
    @staticmethod
    def get_username(obj):
        return obj.friend.username
    
    @staticmethod
    def get_avatar(obj):
        profile_serializer = ProfileSerializer(obj.friend.profile)
        return profile_serializer.data['avatar']
    
    
    class Meta:
        model = Friend
        fields = ['username', 'avatar', 'friendship_at']


class AddFriendByUsernameSerializer(Serializer):
    username = CharField(required=True)
    avatar = SerializerMethodField(read_only=True)
    friendship_at = DateTimeField(read_only=True)
    friendship = BooleanField(read_only=True)
    
    @staticmethod
    def get_avatar(obj):
        user = obj['friend']
        profile_serializer = ProfileSerializer(user.profile)
        return profile_serializer.data['avatar']
    
    def validate(self, attrs):
        user = self.context['request'].user
        username = attrs['username']
        
        try:
            friend = User.objects.get(username=username)
        except User.DoesNotExist:
            raise ValidationError("Belirtilen kullanıcı bulunamadı.")
        
        if user == friend:
            raise ValidationError("Kendinize işlem yapamazsınız.")
        
        if user.friends.filter(friend=friend).exists():
            raise ValidationError("Kullanıcı zaten arkadaşınız.")
        
        if friend.blocked_users.filter(blocked_user=user).exists() or \
            user.blocked_users.filter(blocked_user=friend).exists():
            raise ValidationError("Bu kullanıcıyı arkadaş ekleyemezsiniz.")
        
        attrs['friendship'] = True
        attrs['friend'] = friend
        attrs['friendship_at'] = timezone.now()
        return attrs
    
    def create(self, validated_data):
        user = self.context['request'].user
        friend = validated_data['friend']
        Friend.objects.get_or_create(user=user, friend=friend)
        return validated_data


class RemoveFriendByUsernameSerializer(Serializer):
    username = CharField(required=True)
    un_friend = BooleanField(read_only=True)
    
    def validate(self, attrs):
        user = self.context['request'].user
        username = attrs['username']
        
        try:
            un_friend = User.objects.get(username=username)
        except User.DoesNotExist:
            raise ValidationError("Belirtilen kullanıcı bulunamadı.")
        
        if user == un_friend:
            raise ValidationError("Kendinize işlem yapamazsınız.")
        
        if not user.friends.filter(friend=un_friend).exists():
            raise ValidationError("Kullanıcı zaten arkadaşınız değil.")
        
        attrs['un_friend'] = True
        attrs['un_friend_user'] = un_friend
        return attrs
    
    def create(self, validated_data):
        user = self.context['request'].user
        un_friend_user = validated_data['un_friend_user']
        Friend.objects.filter(user=user, friend=un_friend_user).delete()
        return validated_data

