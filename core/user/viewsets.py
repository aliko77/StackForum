from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer, VerifySerializer, VerifyResendSerializer
from .utils import SendVerificationEmail


class UserViewSet(ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [DjangoFilterBackend]
    ordering_fields = ['id']
    ordering = ['-id']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]
        try:
            obj = User.objects.get(id=lookup_field_value)
        except User.DoesNotExist:
            raise NotFound({'error': 'User not found.'})
        self.check_object_permissions(self.request, obj)
        return obj


class VerifyViewSet(ModelViewSet):
    serializer_class = VerifySerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"status": serializer.data}, status=status.HTTP_200_OK)


class VerifyResendViewSet(ModelViewSet):
    serializer_class = VerifyResendSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        try:
            user = User.objects.get(email=request.data["email"])
            response = SendVerificationEmail(user)
            return Response({"status": response}, status=status.HTTP_200_OK)
        except:
            return Response({"errors": ["Email zorunlu."]}, status=status.HTTP_400_BAD_REQUEST)
