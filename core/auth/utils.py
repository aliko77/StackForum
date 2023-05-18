from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
import random
import string
from core.user.models import AuthActivation
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes


class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            str(user.pk) + str(timestamp) + str(user.is_active)
        )


token_generator = TokenGenerator()


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
    is_send = email.send()
    return True if is_send else False


def SendPasswordResetEmail(user):
    token = token_generator.make_token(user)

    mail_subject = "Şifre Sıfırlama İsteği"
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    url = f'{settings.REACT_APP_URL}/auth/password/change/{uid}/{token}'

    message = render_to_string("email/password-reset.html", {
        "url": url
    })
    to_email = user.email
    email = EmailMessage(
        mail_subject, message, to=[to_email]
    )
    email.content_subtype = "html"
    is_send = email.send()
    return True if is_send else False
