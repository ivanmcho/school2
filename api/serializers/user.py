from rest_framework import serializers
from api.models.m_users import User
from api.models import Profile, Estudiante

import jwt
from rest_framework.settings import api_settings
from django.conf import settings

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'profile',
            'password',
            'rol'
        )
        depth = 1

class UserReadSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
            'rol',
        )
        depth = 1

class UserReporteSerializer(serializers.ModelSerializer):
    total_vehiculos = serializers.IntegerField(default=0)
    total_gastado = serializers.FloatField(default=0)
    class Meta:
        model = User
        fields = (
            'username',
            'total_vehiculos',
            'total_gastado',
        )
class UserTTSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'password',
            'address',
            'phone',
            'rol',
        )

class UserAccountVerificationSerializer(serializers.Serializer):
    """User Account verification by token
    """
    token = serializers.CharField()

    def validate_token(self, data):
        """Validate token
        here we validate that the token is correct and it is valid
        """
        try:
            payload = jwt.decode(data, settings.SECRET_KEY,
                                 algorithms=['HS256'])
        except jwt.ExpiredSignature:
            raise serializers.ValidationError('verification link has expired')
        except jwt.PyJWTError:
            raise serializers.ValidationError('Invalid Token')
        if payload['type'] != 'email_confirmation':
            raise serializers.ValidationError('Invalid Token')

        self.context['payload'] = payload

    def save(self):
        """Update the verification status in user"""
        payload = self.context['payload']
        user = User.objects.get(username=payload['user'])
        user.is_verify = True
        user.save()
