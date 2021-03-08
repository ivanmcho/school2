from django.db import models
from api.models.cicloEscolar import CicloEscolar
from api.models.grado import Grado
from api.models.seccion import Seccion
from api.models.curso import Curso
from api.models.catedratico import Catedratico

class Asignacion(models.Model):
    ciclo_escolar = models.ForeignKey(CicloEscolar, on_delete=models.CASCADE, related_name="asignacion_ciclo")
    grado = models.ForeignKey(Grado, on_delete=models.CASCADE, related_name="asignacion_grado") 
    seccion = models.ForeignKey(Seccion, on_delete=models.CASCADE, related_name="asignacion_seccion")
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name="asignacion_curso")
    catedratico = models.ForeignKey(Catedratico, on_delete=models.CASCADE, related_name="asignacion_catedratico")
    imagen_portada = models.ImageField(upload_to='Imagenes', null=True, blank=True)
    descripcion = models.CharField(max_length=250)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True