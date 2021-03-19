from rest_framework import serializers
from api.models import Catedratico
from api.serializers import UserRegistroSerializer


class CatedraticoRegistroSerializer(serializers.ModelSerializer):
    user = UserRegistroSerializer()
    
    class Meta:
        model = Catedratico
        fields = (
            'user',
            'profesion',
        )

class CatedraticoReadSerializer(serializers.ModelSerializer):
    user = UserRegistroSerializer()
    
    class Meta:
        model = Catedratico
        fields = (
            'id',
            'user',
            'profesion',
        )
        depth = 1    