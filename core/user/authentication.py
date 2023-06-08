from rest_framework_simplejwt.authentication import JWTAuthentication


class CustomAuthentication(JWTAuthentication):
    def authenticate(self, request):
        user, validated_token = super().authenticate(request)
        return user, validated_token
