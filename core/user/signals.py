from django.db.models.signals import post_save
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.dispatch import receiver
from .models import Profile, User
from core.auth.utils import SendVerificationEmail


@receiver(post_save, sender=User)
def after_create_user(sender, instance, created, **kwargs):
    if created:
        # Kullanıcı oluşturulduğunda çalışacak
        Profile.objects.create(user=instance) # Profil oluşturulacak
        SendVerificationEmail(instance) # Doğrulama maili gönderilecek


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs): 
    instance.profile.save()

@receiver(user_logged_in, sender=User)
def user_logged_in_handler(sender, user, request, **kwargs):
    # Kullanıcı giriş yaptığında burası çalışacak
    profile = user.profile  # Profili almak için uygun şekilde değiştirin
    profile.status = 'ONLINE'
    profile.save()

@receiver(user_logged_out, sender=User)
def user_logged_out_handler(sender, user, request, **kwargs):
    # Kullanıcı çıkış yaptığında burası çalışacak
    profile = user.profile  # Profili almak için uygun şekilde değiştirin
    profile.status = 'OFFLINE'
    profile.save()