from rest_framework import serializers
from api.models import MaterialClase


class MaterialClaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialClase
        fields = (
                'id',
                'asignacion',
                'titulo',
                'descripcion',
                'archivo',
            )


class MaterialClaseRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialClase
        fields = (
                'asignacion',
                'titulo',
                'descripcion',
                'archivo',
            )