from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode


class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            str(user.pk) + user.password + str(timestamp)
        )
    
account_activate_token = TokenGenerator()


def SendVerificationEmail(user):
    if user.is_verified:
        return False
    mail_subject = "Hesap Aktivasyon Maili"
    message = render_to_string("email/verification.html", {
        "user": user,
        "domain": "localhost:5173",
        "uid": urlsafe_base64_encode(force_bytes(user.pk)),
        "token": account_activate_token.make_token(user)}
    )
    to_email = user.email
    email = EmailMessage(
        mail_subject, message, to=[to_email]
    )
    email.content_subtype = "html"
    email.send()
    return True if email else False
