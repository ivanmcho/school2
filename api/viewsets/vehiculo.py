import json
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from api.models import  Vehiculo, User
from api.serializers import VehiculoRegistroSerializer, VehiculoSerializer
from django.db import transaction

class VehiculoViewset(viewsets.ModelViewSet):
    queryset = Vehiculo.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", )
    search_fields = ("nombre",)
    ordering_fields = ("nombre", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return VehiculoSerializer
        else:
            return VehiculoRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                data = request.data
                print("Data", data)
                serializer = VehiculoRegistroSerializer(data=data)
                if(serializer.is_valid()):
                    print("Es valido")
                    id_propietario = data.get('propietario')
                    propietario = User.objects.get(username=id_propietario)
                    print("Es valido")
                    Vehiculo.objects.create(
                        propietario=propietario,
                        nombre=data.get('nombre'),
                        modelo=data.get('modelo'),
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
                
                if(data.get('propietario') is not None):
                    print("Es valido")
                    vehiculo = Vehiculo.objects.get(pk=pk)
                    print("Es valido")
                    id_propietario = data.get('propietario')
                    propietario = User.objects.get(username=id_propietario)
                    print("Es valido")
                    vehiculo.propietario = propietario
                    vehiculo.nombre = data.get('nombre')
                    vehiculo.modelo = data.get('modelo')
                    vehiculo.save()

                    print("Es valido")
                    return Response(data, status=status.HTTP_201_CREATED)
                else:
                    print("no es valido")
                    Response(
                                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)