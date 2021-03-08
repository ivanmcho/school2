from django.db import models
from django.contrib.auth.models import User
#from api.models.empresa import Empresa

class Nivel(models.Model):
    nombre = models.CharField(max_length=250)
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

class Seccion(models.Model):
    nombre = models.CharField(max_length=250)
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.nombre

    def delete(self, *args):
        self.activo = False
        self.save()
        return True

class Curso(models.Model):
    nombre = models.CharField(max_length=250)
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

class CicloEscolar(models.Model):
    anio = models.IntegerField()
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.anio

    def delete(self, *args):
        self.activo = False
        self.save()
        return True

class Profesion(models.Model):
    nombre = models.CharField(max_length=250)
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

#ticket = models.ForeignKey(Tickets, on_delete=models.CASCADE, related_name="imagenes_ticket")
#imagen = models.FileField(upload_to='Imagenes', null=True, blank=True)
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

    def delete(self, *args):
        user = self.user
        user.is_active = False
        user.save()
        self.active = False
        self.save()
        return True

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

class Tarea(models.Model):
    asignacion = models.ForeignKey(Asignacion, on_delete=models.CASCADE, related_name="asignacion_tarea")
    nombre = models.CharField(max_length=250)
    descripcion = models.CharField(max_length=250)
    archivo = models.FileField(upload_to='Archivos', null=True, blank=True)
    fecha_entrega = models.DateField()
    hora_entrega = models.TimeField()
    nota = models.DecimalField(max_digits=30, decimal_places=15)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True

class TareaEstudiante(models.Model):
    tarea = models.ForeignKey(Tarea, on_delete=models.CASCADE, related_name="asignacion_tarea")
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name="asignacion_tarea")
    fecha_entrega = models.CharField(max_length=250)
    archivo = models.FileField(upload_to='Archivos', null=True, blank=True)
    text = models.TextField()
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True

class MaterialClase(models.Model):
    asignacion = models.ForeignKey(Asignacion, on_delete=models.CASCADE, related_name="material_asignacion")
    titulo = models.CharField(max_length=250)
    descripcion = models.CharField(max_length=250)
    archivo = models.FileField(upload_to='Archivos', null=True, blank=True)
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True


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
        return self.nombre

    def delete(self, *args):
        self.activo = False
        self.save()
        return True

