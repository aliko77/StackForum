from django.core.mail import EmailMessage
from django.template.loader import render_to_string
import random
import string
from .models import AuthActivation


def SendVerificationEmail(user):
    if user.is_verified:
        return False

    activation_code = ''.join(random.choices(string.digits, k=6))

    AuthActivation.objects.update_or_create(
        user=user, defaults={'user': user, 'activation_code': activation_code})

    mail_subject = "Hesap Aktivasyon Maili"
    message = render_to_string("email/verification.html", {
        "activation_code": activation_code
    })
    to_email = user.email
    email = EmailMessage(
        mail_subject, message, to=[to_email]
    )
    email.content_subtype = "html"
    email.send()
    return True if email else False
