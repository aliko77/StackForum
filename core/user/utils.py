import random
import string
from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from user_agents import parse
from .models import AuthActivation



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

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

class UserAgent:
    def __init__(self, ua_string):
        user_agent = parse(ua_string)
        self.browser = user_agent.browser.family
        self.os = user_agent.os.family
        self.device = user_agent.device.family

def get_client_agent(request):
    ua_string = request.META.get('HTTP_USER_AGENT')
    return UserAgent(ua_string)