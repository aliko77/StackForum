from rest_framework import routers
from .viewsets import TopicTagViewSet


router = routers.SimpleRouter()
router.register(prefix=r'', viewset=TopicTagViewSet)

urlpatterns = router.urls
