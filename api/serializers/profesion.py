from rest_framework import serializers
from api.models import Profesion


class ProfesionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesion
        fields = (
                'id',
                'nombre',
                'descripcion'
            )


class ProfesionRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesion
        fields = (
                'nombre',
                'descripcion',
            )