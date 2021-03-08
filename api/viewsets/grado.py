import json
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from api.models import Grado, Nivel
from api.serializers import GradoRegistroSerializer, GradoSerializer

from django.db import transaction
from copy import deepcopy

class GradoViewset(viewsets.ModelViewSet):
    queryset = Grado.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", )
    search_fields = ("nombre",)
    ordering_fields = ("nombre", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return GradoSerializer
        else:
            return GradoRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                data = request.data
                print("Data", data)
                serializer = GradoRegistroSerializer(data=data)
                if(serializer.is_valid()):
                    print("Es valido")
                    id_nivel = data.get('nivel')
                    nivel = Nivel.objects.get(pk=id_nivel)
                    print("Es valido")
                    Grado.objects.create(
                        nivel=nivel,
                        descripcion=data.get('descripcion'),
                        nombre=data.get('nombre'),
                    )
                    print("Es valido")
                    return Response(data, status=status.HTTP_201_CREATED)
                else:
                    print("no es valido")
                    Response(serializer.errors,
                             status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    
    def update(self, request, pk,*args, **kwargs):
        try:
            with transaction.atomic():
                data = request.data
                print("Data", data)
                serializer = GradoRegistroSerializer(data=data)
                if(serializer.is_valid()):
                    print("Es valido")
                    grado = Grado.objects.get(pk=pk)
                    id_nivel = data.get('nivel')
                    nivel = Nivel.objects.get(pk=id_nivel)

                    grado.nivel = nivel
                    grado.nombre = data.get('nombre')
                    grado.descripcion = data.get('descripcion')
                    grado.save()

                    print("Es valido")
                    return Response(data, status=status.HTTP_201_CREATED)
                else:
                    print("no es valido")
                    Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
