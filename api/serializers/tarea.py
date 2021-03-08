from rest_framework import serializers
from api.models import Tarea


class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = (
                'id',
                'asignacion',
                'nombre',
                'descripcion',
                'archivo',
                'fecha_entrega',
                'hora_entrega',
                'nota',
            )


class TareaRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = (
                'asignacion',
                'nombre',
                'descripcion',
                'archivo',
                'fecha_entrega',
                'hora_entrega',
                'nota',
            )
