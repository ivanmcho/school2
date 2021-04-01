import json
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from api.models import Asignacion, CicloEscolar, Grado, Seccion, Curso, Catedratico
from api.serializers import AsignacionRegistroSerializer, AsignacionSerializer

from django.db import transaction
from copy import deepcopy

class AsignacionViewset(viewsets.ModelViewSet):
    queryset = Asignacion.objects.filter(activo=True)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AsignacionSerializer
        else:
            return AsignacionRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def create(self, request):
        try:
            data = request.data
            print("Data: ", data)
            imagen_portada = data.get('imagen_portada')
            print("archivo: ", imagen_portada)
            data = json.loads(data["data"])
            
            serializer = AsignacionRegistroSerializer(data=data)
            #busquedas
            id_ciclo = data.get('ciclo_escolar')
            ciclo_escolar = CicloEscolar.objects.get(pk=id_ciclo)
            print("hola")
            grado = Grado.objects.get(pk=data.get('grado'))
            seccion = Seccion.objects.get(pk=data.get('seccion'))
            curso = Curso.objects.get(pk=data.get('curso'))
            catedratico = Catedratico.objects.get(pk=data.get('catedratico'))
            print("hola")
            if serializer.is_valid():
                Asignacion.objects.create(
                    ciclo_escolar = ciclo_escolar,
                    grado = grado,
                    seccion = seccion,
                    curso = curso,
                    catedratico = catedratico,
                    imagen_portada = File(imagen_portada),
                    descripcion = data.get('descripcion')
                )
                return Response(data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(str(e))
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)