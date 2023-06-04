from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from .serializers import UserSerializer, ProfileSerializer

User = get_user_model()


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.pk)

    def get_object(self):
        return self.get_queryset().first()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(
        methods=['post'],
        detail=False,
        serializer_class=ProfileSerializer,
        url_path='profile/update'
    )
    def profile_update(self, request, *args, **kwargs):
        instance = self.get_object()
        profile = instance.profile
        serializer = self.serializer_class(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            response = Response(status=status.HTTP_200_OK)
            response.data = serializer.data
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(
        methods=['post'],
        detail=False,
        serializer_class=ProfileSerializer,
        url_path='profile/avatar/delete'
    )
    def profile_avatar_delete(self, request, *args, **kwargs):
        instance = self.get_object()
        profile = instance.profile
        if profile.avatar != settings.PROFILE_AVATAR_FILE:
            profile.avatar.delete()
            profile.save()
            serializer = self.get_serializer(profile, data=request.data)
            if serializer.is_valid(raise_exception=True):
                default_avatar = settings.PROFILE_AVATAR_FILE
                user = serializer.save(avatar=default_avatar)
                response_data = {
                    'avatar': settings.BASE_URL + user.avatar.url
                }
                return Response(response_data, status=status.HTTP_200_OK)
        return Response(data={'error': 'Bir hata oluştu.'}, status=status.HTTP_400_BAD_REQUEST)
