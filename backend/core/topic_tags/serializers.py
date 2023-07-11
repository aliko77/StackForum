from rest_framework.serializers import ModelSerializer, SerializerMethodField, StringRelatedField
from rest_framework.exceptions import PermissionDenied
from .models import Tag
import random


class TagSerializer(ModelSerializer):
    total_Q = SerializerMethodField()
    new_total_Q = SerializerMethodField()
    creator = StringRelatedField(source='creator.username')

    class Meta:
        model = Tag
        fields = ['name', 'description', 'synonym',
                  'creator', 'total_Q', 'new_total_Q', 'created_at']
        extra_kwargs = {
            'creator': {'required': False}
        }

    def get_total_Q(self, obj):
        return random.randint(50, 100)

    def get_new_total_Q(self, obj):
        return 1

    def create(self, validated_data):
        user = self.context['request'].user
        if (not user.is_superuser or not user.is_staff) and not user.groups.filter(name='MOD').exists():
            raise PermissionDenied(
                'Bu eylemi gerçekleştirme izniniz yok.')
        validated_data['creator'] = user
        return super().create(validated_data)
