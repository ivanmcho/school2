from rest_framework import serializers
from api.models import TareaEstudiante


class TareaEstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TareaEstudiante
        fields = (
                'tarea',
                'estudiante',
                'fecha_entrega',
                'archivo',
                'text', 
            )


class TareaEstudianteRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = TareaEstudiante
        fields = (
                'tarea',
                'estudiante',
                'fecha_entrega',
                'archivo',
                'text', 
            )
