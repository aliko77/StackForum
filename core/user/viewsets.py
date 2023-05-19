from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from .serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class UserViewSet(ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [DjangoFilterBackend]
    ordering_fields = ['id']
    ordering = ['-id']

    def get_queryset(self):
        return User.objects.all()
        if self.request.user.is_superuser:
            pass

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]
        try:
            obj = User.objects.get(id=lookup_field_value)
        except User.DoesNotExist:
            raise NotFound({'error': 'Kullanıcı bulunamadı.'})
        self.check_object_permissions(self.request, obj)
        return obj
