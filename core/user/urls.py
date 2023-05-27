from rest_framework.routers import SimpleRouter
from .viewsets import UserViewSet

routes = SimpleRouter()

routes.register(prefix='', viewset=UserViewSet, basename='user')

urlpatterns = [
    *routes.urls
]