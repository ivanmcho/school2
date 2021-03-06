from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from api import viewsets


router = DefaultRouter()
router.register(r'user', viewsets.UserViewset)
router.register(r'nivel', viewsets.NivelViewset)
router.register(r'grado', viewsets.GradoViewset)
router.register(r'estudiante', viewsets.EstudianteViewset)
router.register(r'rol', viewsets.RolViewset)
router.register(r'profesion', viewsets.ProfesionViewset)
router.register(r'catedratico', viewsets.CatedraticoteViewset)
router.register(r'seccion', viewsets.SeccionViewset)
router.register(r'curso', viewsets.CursoViewset)
router.register(r'ciclo', viewsets.CicloEscolarViewset)
router.register(r'asignacion', viewsets.AsignacionViewset)
router.register(r'vehiculo', viewsets.VehiculoViewset)
router.register(r'servicio', viewsets.ServicioViewset)
router.register(r'reporte', viewsets.ReporteView)


urlpatterns = [
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
]
