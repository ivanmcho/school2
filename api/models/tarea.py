from django.db import models
from api.models.asignacion import Asignacion

class Tarea(models.Model):
    asignacion = models.ForeignKey(Asignacion, on_delete=models.CASCADE, related_name="asignacion_tarea")
    nombre = models.CharField(max_length=250)
    descripcion = models.CharField(max_length=250)
    archivo = models.FileField(upload_to='Archivos', null=True, blank=True)
    fecha_entrega = models.DateField()
    hora_entrega = models.TimeField()
    nota = models.DecimalField(max_digits=5, decimal_places=2)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True