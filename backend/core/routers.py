from django.urls import path, include

urlpatterns = [
    path('auth/', include('core.auth.urls')),
    path('user/', include('core.user.urls')),
    path('topic-tags/', include('core.topic_tags.urls')),
]
