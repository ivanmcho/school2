from django.db import models
from api.models.m_users import User
from api.models.asignacion import Asignacion

class Estudiante(models.Model):
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="Estudiante")
    carnet = models.CharField(max_length=250)
    contacto = models.CharField(max_length=250)
    direccion_contacto = models.CharField(max_length=250)
    telefono_contacto = models.CharField(max_length=250)
    asignaciones = models.ManyToManyField(Asignacion)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.carnet

    def delete(self, *args):
        user = self.user
        user.is_active = False
        user.save()
        self.active = False
        self.save()
        return True