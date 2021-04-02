from django.db import models
from api.models.vehiculo import Vehiculo

class Servicio(models.Model):
    vehiculo = models.ForeignKey(Vehiculo, on_delete=models.CASCADE, related_name="servicio_vehiculo")
    nombre = models.CharField(max_length=50, null=True, blank=True)
    precio = models.DecimalField(max_digits=7, decimal_places=2)
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, **args):
        self.activo = False
        self.save()
        return True