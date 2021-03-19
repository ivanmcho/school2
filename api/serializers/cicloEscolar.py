from rest_framework import serializers
from api.models import CicloEscolar


class CicloEscolarSerializer(serializers.ModelSerializer):
    class Meta:
        model = CicloEscolar
        fields = (
                'id',
                'anio',
            )


class CicloEscolarRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = CicloEscolar
        fields = (
                'anio',
            )