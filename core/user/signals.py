from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile, User
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode


@receiver(post_save, sender=User)
def create_user_profile(_, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def send_verification_mail(_, instance, created, **kwargs):
    if created:
        subject = 'Activate Your Account'
        message = 'Please activate your account by clicking the link below:'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [instance.email]
        uid = urlsafe_base64_encode(force_bytes(instance.pk))
        token = account_activation_token.make_token(instance)
        activation_link = f"{settings.BASE_URL}/activate/{uid}/{token}/"
        html_message = render_to_string('verification_email.html', {
                                        'activation_link': activation_link})
        send_mail(subject, message, from_email,
                  recipient_list, html_message=html_message)
