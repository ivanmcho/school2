from django.db import models
from api.models.cicloEscolar import CicloEscolar

class Evento(models.Model):
    titulo = models.CharField(max_length=250)
    ciclo_escolar = models.ForeignKey(CicloEscolar, on_delete=models.CASCADE, related_name="evento_ciclo")
    descripcion = models.CharField(max_length=250)
    fecha = models.DateField()
    hora = models.TimeField()

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.titulo

    def delete(self, *args):
        self.activo = False
        self.save()
        return True