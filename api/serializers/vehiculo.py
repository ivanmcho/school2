from rest_framework import serializers
from api.models import Vehiculo


class VehiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehiculo
        fields = '__all__'
        depth = 1


class VehiculoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehiculo
        fields = (
                'nombre',
                'modelo'
            )


class VehiculoReporteSerializer(serializers.ModelSerializer):
    total_vehiculos = serializers.IntegerField(default=0)
    total_gastado = serializers.FloatField(default=0)
    class Meta:
        model = Vehiculo
        fields = (
            'username',
            'total_vehiculos',
            'total_gastado',
        )