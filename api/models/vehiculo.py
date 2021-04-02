from django.db import models
from api.models.m_users import User

class Vehiculo(models.Model):
    propietario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vehiculo_user")
    nombre = models.CharField(max_length=50, null=True, blank=True)
    modelo = models.CharField(max_length=50, null=True, blank=True)
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}({})".format(self.nombre, self.modelo)

    def delete(self, **args):
        self.activo = False
        self.save()
        return True