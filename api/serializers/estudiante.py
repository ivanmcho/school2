from rest_framework import serializers
from api.models import Estudiante, User
from api.serializers import UserRegistroSerializer


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
    user = UserRegistroSerializer()
    
    class Meta:
        model = Estudiante
        fields = (
            'user',
            'carnet',
            'contacto',
            'direccion_contacto',
            'telefono_contacto',
        )

class EstudianteReadSerializer(serializers.ModelSerializer):
    user = UserRegistroSerializer()
    
    class Meta:
        model = Estudiante
        fields = (
            'id',
            'user',
            'carnet',
            'contacto',
            'direccion_contacto',
            'telefono_contacto',
        )