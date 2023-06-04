import uuid
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone
from django.conf import settings
import os


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
            email, password, True, verified=True, **extra_fields)
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


def get_upload_path(instance, filename):
    # Dosya adını kullanıcı ID'si ve zaman damgasıyla birleştirerek oluşturun
    user_id = "_".join(instance.user.username.split())
    timestamp = timezone.now().strftime('%Y%m%d%H%M%S')
    _, ext = os.path.splitext(filename)
    new_filename = f"{user_id}_{timestamp}{ext}"

    # Profil resimlerinin yükleneceği dosya yolunu belirleyin
    # Örneğin: media/profile_pictures/userID_20230101153000.jpg
    return f"profile_pictures/{new_filename}"

PROFILE_STATUS_CHOICES = (
    ('ONLINE', 'Çevrimiçi'),
    ('OFFLINE', 'Çevrimdışı'),
)
PROFILE_DOB_PRIVACY_CHOICES = (
    ('none', 'Hiçbir Şeyi Gösterme'),
    ('age', 'Sadece Yaş'),
    ('month_day', 'Ay ve Gün'),
    ('show', 'Her Şeyi Göster')
)

class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE)
    dob = models.DateField(null=True, blank=True)
    dob_privacy = models.CharField(max_length=20, choices=PROFILE_DOB_PRIVACY_CHOICES, default='age', blank=True)
    city = models.CharField(max_length=50, blank=True)
    about = models.TextField(max_length=500, blank=True)
    profession = models.CharField(max_length=50, blank=True)
    hobbies = models.TextField(max_length=500, blank=True)
    twitter_url = models.URLField(max_length=200, blank=True)
    github_url = models.URLField(max_length=200, blank=True)
    email_secondary = models.EmailField(max_length=254, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    status = models.CharField(max_length=20, choices=PROFILE_STATUS_CHOICES, default='OFFLINE', blank=True)
    avatar = models.ImageField(upload_to=get_upload_path, blank=True, null=True, default=settings.PROFILE_AVATAR_FILE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "user_profile"

class AuthActivation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activation_code = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - {self.activation_code}"

    def is_expired(self):
        current_time = timezone.now()
        expiration_time = self.created_at + timezone.timedelta(hours=24)
        return current_time > expiration_time

    class Meta:
        db_table = "user_activation_code"
