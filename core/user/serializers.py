from rest_framework import serializers
from .models import User, Profile, AccountActivation
from django.core.exceptions import ObjectDoesNotExist


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ['id', 'created_at', 'user', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'is_active',
                  'is_verified', 'date_joined', 'last_login', 'profile']
        read_only_field = ['date_joined', 'last_login']


class VerifySerializer(serializers.ModelSerializer):
    vcode = serializers.CharField(
        max_length=128, min_length=6, write_only=True, required=True)
    email = serializers.EmailField(
        required=True, write_only=True, max_length=128)

    class Meta:
        model = AccountActivation
        fields = [
            "email", 'vcode'
        ]

    def create(self, validated_data):
        try:
            user = User.objects.get(email=validated_data['email'])
            if user.is_verified:
                raise serializers.ValidationError(
                    {
                        'errors': ['Zaten doğrulanmış.']
                    }
                )
            else:
                try:
                    vcode = AccountActivation.objects.get(
                        activation_code=validated_data['vcode'],
                        user=user)
                    vcode.delete()
                    user.is_verified = True
                    user.save()
                    return {"status": True}
                except ObjectDoesNotExist:
                    raise serializers.ValidationError(
                        {
                            'errors': ['Bilinmeyen kod.']
                        }
                    )
        except ObjectDoesNotExist:
            raise serializers.ValidationError(
                {
                    'errors': ['Bilinmeyen veri.']
                }
            )
