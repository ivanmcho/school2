from django.db import models
from api.models.tarea import Tarea
from api.models.estudiante import Estudiante

class TareaEstudiante(models.Model):
    tarea = models.ForeignKey(Tarea, on_delete=models.CASCADE, related_name="tareaEstudiante_tarea")
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name="tareaEstudiante_estudiante")
    fecha_entrega = models.DateTimeField(auto_now_add=True)
    archivo = models.FileField(upload_to='Archivos', null=True, blank=True)
    text = models.TextField()
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True