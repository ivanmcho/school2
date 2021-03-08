from django.db import models
from api.models.nivel import Nivel

class Grado(models.Model):
    nombre = models.CharField(max_length=250)
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE, related_name="grado_nivel")
    descripcion = models.CharField(max_length=250)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.nombre

    def delete(self, *args):
        self.activo = False
        self.save()
        return True