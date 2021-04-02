import json
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from api.models import Servicio, Vehiculo
from api.serializers import ServicioRegistroSerializer, ServicioSerializer
from django.db import transaction

class ServicioViewset(viewsets.ModelViewSet):
    queryset = Servicio.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", )
    search_fields = ("nombre",)
    ordering_fields = ("nombre", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ServicioSerializer
        else:
            return ServicioRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                data = request.data
                print("Data", data)
                serializer = ServicioRegistroSerializer(data=data)
                if(serializer.is_valid()):
                    print("Es valido")
                    id_vehiculo = data.get('vehiculo')
                    vehiculo = Vehiculo.objects.get(pk=id_vehiculo)
                    print("Es valido")
                    Servicio.objects.create(
                        vehiculo=vehiculo,
                        nombre=data.get('nombre'),
                        precio=data.get('precio'),
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
                serializer = ServicioRegistroSerializer(data=data)
                if(serializer.is_valid()):
                    print("Es valido")
                    servicio = Servicio.objects.get(pk=pk)
                    id_vehiculo = data.get('vehiculo')
                    vehiculo = Vehiculo.objects.get(pk=id_vehiculo)

                    servicio.vehiculo = vehiculo
                    servicio.nombre = data.get('nombre')
                    servicio.precio = data.get('precio')
                    servicio.save()

                    print("Es valido")
                    return Response(data, status=status.HTTP_201_CREATED)
                else:
                    print("no es valido")
                    Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
