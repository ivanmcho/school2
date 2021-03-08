from rest_framework import serializers
from api.models import Catedratico


class CatedraticoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Catedratico
        fields = (
                'id',
                'user',
                'profesion'
            )


class CatedraticoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Catedratico
        fields = (
                'user',
                'profesion',
            )