import re

from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import UserLoginRecords
from .serializers import UserSerializer, ProfileSerializer, LoginRecordsSerializer, \
    BlockUserByUsernameSerializer, BlockedUsersSerializer, UnBlockUserByUsernameSerializer, \
    UserFriendsSerializer, AddFriendByUsernameSerializer, RemoveFriendByUsernameSerializer
from .utils import SendVerificationEmail


User = get_user_model()


def check_file_size(file):
    if file.size > settings.AVATAR_MAX_FILE_SIZE:
        return
    return True


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    @action(
        methods=['get'], detail=False, serializer_class=UserFriendsSerializer,
        url_path='friends'
    )
    def user_friends(self, request) -> Response:
        user = self.get_object()
        user_friends = user.friends.all()
        serializer = self.serializer_class(user_friends, many=True)
        return Response(serializer.data)

    @action(
        methods=['post'], detail=False, serializer_class=AddFriendByUsernameSerializer,
        url_path='add-friend-by-username'
    )
    def add_friend_by_username(self, request) -> Response:
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(
        methods=['post'], detail=False, serializer_class=RemoveFriendByUsernameSerializer,
        url_path='remove-friend-by-username'
    )
    def remove_friend_by_username(self, request) -> Response:
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
