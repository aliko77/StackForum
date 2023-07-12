from rest_framework.serializers import ModelSerializer, SerializerMethodField, StringRelatedField
from rest_framework.exceptions import PermissionDenied, ValidationError
from .models import Tag
import random


class TagSerializer(ModelSerializer):
    total_Q = SerializerMethodField()
    new_total_Q = SerializerMethodField()
    creator = StringRelatedField(source='creator.username')

    class Meta:
        model = Tag
        fields = ['id', 'name', 'description', 'synonym',
                  'creator', 'total_Q', 'new_total_Q', 'created_at']
        extra_kwargs = {
            'creator': {'required': False}
        }

    def get_total_Q(self, obj):
        return random.randint(50, 100)

    def get_new_total_Q(self, obj):
        return 1

    def validate(self, attrs):
        attrs = super().validate(attrs)
        user = self.context['request'].user
        if 'name' in attrs:
            name = attrs['name'].replace(' ', '')
            attrs['name'] = name.lower()
            if Tag.objects.filter(name=name).exists():
                raise ValidationError(
                    'Bu name alanına sahip Konu/Soru Etiketi zaten mevcut.')
            attrs['creator'] = user
        return attrs
