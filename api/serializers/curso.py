from rest_framework import serializers
from api.models import Curso


class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = (
                'id',
                'nombre',
                'descripcion',
            )

class CursoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = (
                'nombre',
                'descripcion',
            )