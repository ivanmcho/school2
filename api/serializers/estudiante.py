from rest_framework import serializers
from api.models import Estudiante


class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = (
                'id',
                'user',
                'carnet',
                'contacto',
                'direccion_contacto',
                'telefono_contacto',
                'asignaciones',
            )


class EstudianteRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = (
                'user',
                'carnet',
                'contacto',
                'direccion_contacto',
                'telefono_contacto',
            )
