import os
import uuid

from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    def _create_user(self, email, password, is_superuser, verified=False, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            is_staff=is_superuser,
            is_active=True,
            is_verified=verified,
            is_superuser=is_superuser,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_user(self, email, password, **extra_fields):
        return self._create_user(email, password, False, **extra_fields)
    
    def create_superuser(self, email, password, **extra_fields):
        user = self._create_user(
            email, password, True, verified=True, **extra_fields
        )
        return user


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        primary_key=True,
        editable=False
    )
    username = models.CharField(max_length=16, unique=True, null=True)
    email = models.EmailField(max_length=255, unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    
    objects = UserManager()
    
    def __str__(self):
        return f"{self.email}"
    
    
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        db_table = "user"

#Profil

def get_upload_path(instance, filename):
    # Dosya adını kullanıcı username'i ve zaman damgasıyla birleştirerek oluşturun
    username = "_".join(instance.user.username.split())
    timestamp = timezone.now().strftime('%Y%m%d%H%M%S')
    _, ext = os.path.splitext(filename)
    new_filename = f"{username}_{timestamp}{ext}"
    
    # Profil resimlerinin yükleneceği dosya yolunu belirleyin
    # Örneğin: media/profile_pictures/userID_20230101153000.jpg
    return f"profile_pictures/{new_filename}"

class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE
    )
    dob = models.DateField(null=True, blank=True)
    dob_privacy = models.CharField(
        max_length=20, 
        choices=[
            ('none', 'Hiçbir Şeyi Gösterme'),
            ('age', 'Sadece Yaş'),
            ('month_day', 'Ay ve Gün'),
            ('show', 'Her Şeyi Göster')
        ], default='age', blank=True
    )
    city = models.CharField(max_length=50, blank=True, null=True)
    about = models.TextField(max_length=500, blank=True, null=True)
    profession = models.CharField(max_length=50, blank=True, null=True)
    hobbies = models.TextField(max_length=500, blank=True, null=True)
    twitter_url = models.URLField(max_length=200, blank=True, null=True)
    github_url = models.URLField(max_length=200, blank=True, null=True)
    email_secondary = models.EmailField(max_length=254, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    status = models.CharField(
        max_length=20, 
        choices=[
            ('ONLINE', 'Çevrimiçi'),
            ('OFFLINE', 'Çevrimdışı'),    
        ], 
        default='OFFLINE',
        blank=True
    )
    avatar = models.ImageField(
        upload_to=get_upload_path, blank=True, null=True, default=settings.PROFILE_AVATAR_FILE
    )
    signature = models.CharField(max_length=1024, blank=True, null=True)
    share_info = models.CharField(
        max_length=20,
        choices=[
            ("public", "Herkes"),
            ("registered", "Kayıtlı Üyeler")
        ],
        default="public",
        blank=True
    )
    allow_friend_requests = models.BooleanField(default=True, blank=True)
    allow_messages = models.CharField(
        max_length=20,
        choices=[
            ("public", "Herkes"),
            ("registered", "Kayıtlı Üyeler"),
            ("friends", "Arkadaşlarım")
        ],
        default="public",
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = "user_profile"
    
    
    def __str__(self):
        return f"{self.user.username} 's profile"


class UserLoginRecords(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    browser = models.CharField(max_length=100, null=True)
    os = models.CharField(max_length=100, null=True)
    device = models.CharField(max_length=100, null=True)
    ip_address = models.GenericIPAddressField(null=True)
    login_time = models.DateTimeField(auto_now_add=True)
    
    
    class Meta:
        db_table = "user_login_records"
    
    
    def __str__(self):
        return f"{self.user.username} - {self.device}"


class BlockedUser(models.Model):
    blocked_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blocked_users')
    blocked_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blocked_by')
    blocked_at = models.DateTimeField(auto_now_add=True)
    
    
    class Meta:
        db_table = 'user_blockeduser'
        unique_together = ('blocked_by', 'blocked_user')
        ordering = ["-blocked_at"]
    
    
    def __str__(self):
        return f'{self.blocked_by} blocked {self.blocked_user}'


class Friend(models.Model):
    user = models.ForeignKey(User, related_name='friends', on_delete=models.CASCADE)
    friend = models.ForeignKey(User, related_name='friend_of', on_delete=models.CASCADE)
    friendship_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'user_friend'
        unique_together = ('friend', 'user')
        ordering = ["-friendship_at"]
    
    def __str__(self):
        return f'{self.user.username} is friends with {self.friend.username}'
