from rest_framework import serializers
from api.models import Asignacion


class AsignacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignacion
        fields = (
                'id',
                'ciclo_escolar',
                'grado',
                'seccion',
                'curso',
                'catedratico',
                'imagen_portada',
                'descripcion',
            )


class AsignacionRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignacion
        fields = (
                'ciclo_escolar',
                'grado',
                'seccion',
                'curso',
                'catedratico',
                'imagen_portada',
                'descripcion',
            )
