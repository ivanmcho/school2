from django.db import models
from api.models.asignacion import Asignacion

class MaterialClase(models.Model):
    asignacion = models.ForeignKey(Asignacion, on_delete=models.CASCADE, related_name="material_asignacion")
    titulo = models.CharField(max_length=250)
    descripcion = models.CharField(max_length=250)
    archivo = models.FileField(upload_to='Archivos', null=True, blank=True)
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.titulo

    def delete(self, *args):
        self.activo = False
        self.save()
        return True