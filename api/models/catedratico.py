from django.db import models
from api.models.m_users import User
from api.models.profesion import Profesion

class Catedratico(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="catedratico")
    profesion = models.ForeignKey(Profesion, on_delete=models.CASCADE, related_name="catedratico_profesion")

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        user = self.user
        user.is_active = False
        user.save()
        self.active = False
        self.save()
        return True