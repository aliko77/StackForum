from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .models import User
from .serializers import UserSerializer
import django_filters.rest_framework

class UserViewSet(ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer
    # permission_classes = (IsAuthenticated,)
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    ordering_fields = ['id']
    ordering = ['-id']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]
        obj = User.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)
        return obj
