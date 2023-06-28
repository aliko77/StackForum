from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse
from django.contrib import admin

urlpatterns = [
   path('', lambda request: HttpResponse("Bilinmeyen işlem."), name='default'),
   path('v1/', include(('core.routers', 'core'), namespace='core-api')),
   path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
