from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from .models import Tag
from .serializers import TagSerializer


class TopicTagViewSet(ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
