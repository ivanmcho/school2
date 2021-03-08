from rest_framework import serializers
from api.models import Seccion


class SeccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seccion
        fields = (
                'id',
                'nombre',
            )

class SeccionRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seccion
        fields = (
                'nombre',
            )