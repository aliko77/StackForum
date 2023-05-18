from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile, User
from core.auth.utils import SendVerificationEmail


@receiver(post_save, sender=User)
def after_create_user(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        SendVerificationEmail(instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()
