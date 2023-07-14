from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(null=True, blank=True)
    synonym = models.ForeignKey(
        'self', on_delete=models.SET_NULL, null=True, blank=True)
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Oluşturan")
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Konu/Soru Etiketi"
        verbose_name_plural = "Konu/Soru Etiketleri"
        db_table = "question_tag"
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        self.name = self.name.lower().replace(' ', '-')
        return super(Tag, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class TagSynonym(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        Tag, on_delete=models.CASCADE, null=True)
    score = models.IntegerField(default=0, blank=True)
    is_accepted = models.BooleanField(default=False, blank=True)

    class Meta:
        verbose_name = "Etiket Eşanlamı"
        verbose_name_plural = "Etiket Eşanlamları"
        db_table = "question_tag_synonym"

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        return super(User, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
