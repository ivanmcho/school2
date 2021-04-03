from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from api.models import Vehiculo, Servicio, User
from api.serializers import VehiculoSerializer, ServicioSerializer, UserReporteSerializer, UserTTSerializer
from django.db.models import Q, Count, Sum

class ReporteView(GenericViewSet):
    queryset = User.objects.all()
    
    @action(detail=False, methods=['get'])
    def reportePrincipal(self, request):
        try:
            print("Bienv")
            id_usuario = int(request.query_params.get('usuario'))
            print("Usuario: ", id_usuario)
            #listado de vehiculos
            listado_vehiculos = Vehiculo.objects.all()

            #listado de servicios
            listado_servicios = Servicio.objects.all()

            #total de vehiculos por propietario
            usuarios_vehiculo = User.objects.annotate(
                total_gastado = Sum("vehiculo_user__servicio_vehiculo__precio"),
                total_vehiculos = Count("vehiculo_user__id")
            )

            #cuantos servicios tienen los vehiculos con un precio mayor a 1000
            total_vehi = Servicio.objects.values('vehiculo__nombre').annotate(cantidad = Count('precio',filter=(
                Q(precio__gte=1000)
            )))

            #cantidad y gastado en servicios agrupados por modelos de vehiculos
            total_modelo = Servicio.objects.values('vehiculo__modelo').annotate(
                cantidad = Count('vehiculo'),
                suma = Sum('precio')
            )

            # cantidad de vehiculos agrupados rol de 
            atol = User.objects.values('rol__nombre').annotate(
                total_gastado = Sum("vehiculo_user__servicio_vehiculo__precio"))
            
            # todos los vehiculos que de los usuarios que sean estudiantes
            estudent_vehiculos = Vehiculo.objects.filter(propietario__rol__nombre="Estudiante")

            # todos los servicios de los usuarios que sean estudiantes
            estudent_servicio = Servicio.objects.filter(vehiculo__propietario__rol__nombre="Estudiante")

            print(estudent_servicio)
            
            if id_usuario > 0:
                usuarios_vehiculo = usuarios_vehiculo.filter(id=id_usuario)
            
            total_acumulado = 0
            queryset = Servicio.objects.aggregate(total=Sum('precio'))
            if queryset is not None:
                total_acumulado = queryset['total']
            
            print(total_acumulado)

            data = {
                'listado_vehiculos': VehiculoSerializer(listado_vehiculos, many=True).data,
                'listado_servicios': ServicioSerializer(listado_servicios, many=True).data,
                'listado_con_vehiculos': UserReporteSerializer(usuarios_vehiculo, many=True).data,
                'total': total_acumulado
            }

            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
