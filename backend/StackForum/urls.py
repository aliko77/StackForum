from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('/v1/', include(('core.routers', 'core'), namespace='core-api')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
