"""Users model"""
# django
from django.contrib.auth.models import AbstractUser
from django.db import models

from api.models.rol import Rol



class User(AbstractUser):
    """User class
    Used the AbstractUser as it's base and Utilities
    extend the functionality.
    """
    rol = models.ForeignKey(Rol, blank=True, null=True, on_delete=models.CASCADE, related_name='user_rol')
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.CharField(max_length=250, null=True, blank=True)
