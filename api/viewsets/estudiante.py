import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from api.models.m_users import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Profile, Estudiante, User, Rol
from api.serializers import UserSerializer, UserReadSerializer, EstudianteRegistroSerializer

from django.db import transaction
from copy import deepcopy


class EstudianteViewset(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_active=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("username", "first_name")
    search_fields = ("username", "first_name")
    ordering_fields = ("username", "first_name")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EstudianteRegistroSerializer
        else:
            return EstudianteRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                data = request.data
                print("Data: ", data)
                serializer = self.get_serializer(data=request.data)
                if(serializer.is_valid(raise_exception=True)):
                            
                    print("Es valido")
                    rol = None

                    if(data.get('user').get('rol')):
                        idRol = data.get('user').get('rol')
                        rol = Rol.objects.get(pk=idRol)
                    
                    usuario = User.objects.create(
                        username=data.get('user').get('username'),
                        first_name = data.get('user').get('first_name'),
                        last_name = data.get('user').get('last_name'),
                        phone = data.get('user').get('nivel'),
                        address = data.get('user').get('nivel'),
                        rol=rol
                        )

                    usuario.set_password(data.get('user').get('password'))
                    usuario.save()

                    Estudiante.objects.create(
                        user = usuario,
                        carnet = data.get('carnet'),
                        contacto = data.get('contacto'),
                        direccion_contacto = data.get('direccion_contacto'),
                        telefono_contacto = data.get('telefono_contacto')
                    )
                    headers = self.get_success_headers(serializer.data)
                    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
                else:
                    print("no es valido")
                    Response(serializer.errors,
                             status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(str(e))
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
