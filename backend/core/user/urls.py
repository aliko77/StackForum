from django.urls import path

from .views import UserMeView, ProfileUpdateView, \
    ProfileAvatarUpdateView, ProfileAvatarDeleteView, \
    UserChangePasswordView, UserChangeEmailView, \
    ProfileSignatureUpdateView, \
    UserLastLoginRecordsView, \
    UserBlockUserView, \
    UserFriendsView

# routes.register(prefix='', viewset=UserViewSet, basename='user')

urlpatterns = [
    # Kullanıcın etkinlikleri
    path('@me/', UserMeView.as_view(), name='me-info'),
    # Profil etkinlikleri
    path('profile/update/', ProfileUpdateView.as_view(), name='profile-update'),
    path('avatar/update/', ProfileAvatarUpdateView.as_view(), name='profile-avatar-update'),
    path('avatar/delete/', ProfileAvatarDeleteView.as_view(), name='profile-avatar-delete'),
    path('signature/update/', ProfileSignatureUpdateView.as_view(), name='profile-signature-update'),
    path('password/change/', UserChangePasswordView.as_view(), name='user-change-password'),
    path('email/change/', UserChangeEmailView.as_view(), name='user-change-email'),
    
    # Son Giriş etkinlikleri
    path('last-login-records/', UserLastLoginRecordsView.as_view(), name='user-last-login-records-list'),
    
    # Kullanıcı Engelleme etkinlikleri
    path('blocked-users/', UserBlockUserView.as_view(), name='user-block-user'),
    
    # Kullanıcı Arkadaşlar etkinlikleri
    path('friends/', UserFriendsView.as_view(), name='user-friends'),
]
