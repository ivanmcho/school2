from rest_framework import serializers
from api.models import Evento


class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = (
                'id',
                'titulo',
                'ciclo_escolar',
                'descripcion',
                'fecha',
                'hora', 
            )


class EventoegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = (
                'titulo',
                'ciclo_escolar',
                'descripcion',
                'fecha',
                'hora', 
            )
