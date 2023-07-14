from django.urls import path, include

urlpatterns = [
    path('auth/', include('core.auth.urls')),
    path('user/', include('core.user.urls')),
    path('question-tags/', include('core.question_tags.urls')),
]
