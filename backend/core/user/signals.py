from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Profile, User, UserLoginRecords, BlockedUser, Friend
from .utils import get_client_ip, get_client_agent
from core.auth.utils import SendVerificationEmail


@receiver(post_save, sender=User)
def after_create_user(sender, instance, created, **kwargs):
    if created:
        # Kullanıcı oluşturulduğunda çalışacak
        Profile.objects.create(user=instance)  # Profil oluşturulacak
        SendVerificationEmail(instance)  # Doğrulama maili gönderilecek


@receiver(user_logged_in, sender=User)
def user_logged_in_handler(sender, user, request, **kwargs):
    # Kullanıcı giriş yaptığında burası çalışacak
    profile = user.profile  # Profili almak için uygun şekilde değiştirin
    profile.status = 'ONLINE'
    profile.save()

    ip_address = get_client_ip(request)
    agent = get_client_agent(request)
    UserLoginRecords.objects.create(
        user=user,
        browser=agent.browser,
        os=agent.os,
        device=agent.device,
        ip_address=ip_address
    )


@receiver(user_logged_out, sender=User)
def user_logged_out_handler(sender, user, request, **kwargs):
    # Kullanıcı çıkış yaptığında burası çalışacak
    profile = user.profile  # Profili almak için uygun şekilde değiştirin
    profile.status = 'OFFLINE'
    profile.save()


@receiver(post_save, sender=BlockedUser)
def remove_friendship(sender, instance, created, **kwargs):
    if created:
        blocked_by = instance.blocked_by
        blocked_user = instance.blocked_user

        friend_check = Friend.objects.filter(
            user=blocked_by, friend=blocked_user)
        if friend_check.exists():
            # Remove the Friend between blocked_by and blocked_user
            friend_check.delete()
        friend_check = Friend.objects.filter(
            user=blocked_user, friend=blocked_by)
        if friend_check.exists():
            # Remove the Friend between blocked_user and blocked_by
            friend_check.delete()
