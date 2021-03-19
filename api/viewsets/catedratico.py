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

from api.models import Profile, Catedratico, User, Rol, Profesion
from api.serializers import UserSerializer, UserReadSerializer, CatedraticoRegistroSerializer, CatedraticoReadSerializer

from django.db import transaction
from copy import deepcopy


class CatedraticoteViewset(viewsets.ModelViewSet):
    queryset = Catedratico.objects.filter()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    #filter_fields = ("carnet",)
    #search_fields = ("carnet",)
    #ordering_fields = ("user", "carnet")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CatedraticoReadSerializer
        else:
            return CatedraticoRegistroSerializer

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
                        phone = data.get('user').get('phone'),
                        address = data.get('user').get('address'),
                        rol=rol
                        )

                    usuario.set_password(data.get('user').get('password'))
                    usuario.save()

                    if(data.get('profesion')):
                        idProfesion = data.get('profesion')
                        profesion = Profesion.objects.get(pk=idProfesion)

                    Catedratico.objects.create(
                        user = usuario,
                        profesion = profesion
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
    
    def update(self, request, pk):
        try:
            with transaction.atomic():
                data = request.data
                print("Data: ", data)
                if(data.get('user').get('username') is not None):
                    print("Es valido")
                    usuario = User.objects.get(username=data.get('user').get('username'))
                    print("Es valido")
                    rol = None

                    if(data.get('user').get('rol')):
                        idRol = data.get('user').get('rol')
                        rol = Rol.objects.get(pk=idRol)
                    
                    usuario.first_name = data.get('user').get('first_name')
                    usuario.last_name = data.get('user').get('last_name')
                    usuario.phone = data.get('user').get('phone')
                    usuario.address = data.get('user').get('address')
                    usuario.rol=rol

                    if(data.get('user').get('password')!='Temporal'):
                        usuario.set_password(data.get('user').get('password'))

                    catedratico = Catedratico.objects.get(user=usuario)
                    usuario.save()

                    if(data.get('profesion')):
                        idProfesion = data.get('profesion')
                        profesion = Profesion.objects.get(pk=idProfesion)

                    catedratico.profesion = profesion

                    catedratico.save()
                    #headers = self.get_success_headers(serializer.data)
                    #serializer = self.get_serializer(data=request.data)
                    return Response(data, status=status.HTTP_201_CREATED)
                else:
                    print("no es valido")
                    Response(serializer.errors,
                             status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(str(e))
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

