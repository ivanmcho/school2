from rest_framework import serializers
from api.models import Grado


class GradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grado
        fields = (
                'id',
                'nombre',
                'descripcion',
                'nivel',
            )
        depth = 1

class GradoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grado
        fields = (
                'nombre',
                'descripcion',
                'nivel',
            )