from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth import get_user_model
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
        return User.objects.filter(pk=self.request.user.pk).first()

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
            response.data = {
                "profile": serializer.data
            }
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(
        methods=['post'],
        detail=False,
        serializer_class=ProfileSerializer,
        url_path='profile/avatar/update'
    )
    def profile_avatar_update(self, request, *args, **kwargs):
        instance = self.get_object()
        profile = instance.profile
        if request.data.get('remove_avatar'):
            vdata = {
                'avatar': 'profile_pictures/default.jpg'
            }
        serializer = self.serializer_class(profile, data=vdata)
        if serializer.is_valid():
            serializer.save()
            new_avatar = serializer.data.get('avatar')
            response = Response(status=status.HTTP_200_OK)
            response.data = {
                'avatar': new_avatar
            }
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
