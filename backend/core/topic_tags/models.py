from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

class SynonymousTagField(models.CharField):
    def __init__(self, verbose_name=None, **kwargs):
        super().__init__(verbose_name=verbose_name, max_length=100, **kwargs)

    def deconstruct(self):
        name, path, args, kwargs = super().deconstruct()
        del kwargs['max_length']
        return name, path, args, kwargs

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(null=True, blank=True)
    synonyms = SynonymousTagField(null=True, blank=True, unique=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Oluşturan")
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Konu/Soru Etiketi"
        verbose_name_plural = "Konu/Soru Etiketleri"
        db_table = "topic_tags"

    def __str__(self):
        return self.name