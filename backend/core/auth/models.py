from django.db import models
from django.utils import timezone
from core.user.models import User


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
        db_table = "auth_activation_code"