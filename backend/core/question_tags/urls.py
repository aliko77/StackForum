from rest_framework import routers
from .viewsets import QuestionTagViewSet


router = routers.SimpleRouter()
router.register(prefix=r'', viewset=QuestionTagViewSet)

urlpatterns = router.urls
