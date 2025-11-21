from django.db import models

DIA_CHOICES = (
        ('Lunes','Lunes'),('Martes','Martes'),('Miercoles','Miercoles'),
        ('Jueves','Jueves'),('Viernes','Viernes'),('Sabado','Sabado'),('Domingo','Domingo')
    )

class HorarioEstudiante(models.Model):
    estudiante = models.ForeignKey(
        'usuarios.Estudiante',
        on_delete=models.CASCADE,
        related_name='horarios',
        db_index=True
    )
    materia = models.ForeignKey(
        'academico.Materia',
        on_delete=models.PROTECT,
        related_name='horarios_estudiante',
        db_index=True
    )
    aula = models.ForeignKey(
        'asistencia.Aula',
        on_delete=models.SET_NULL,
        blank=True, null=True,
        related_name='horarios_estudiante',
        db_index=True
    )
    hora = models.TimeField()
    grupo = models.CharField(max_length=100)
    dia = models.CharField(max_length=10, choices=DIA_CHOICES)
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('estudiante', 'materia', 'hora', 'dia', 'grupo')

    def __str__(self):
        return f"{self.estudiante} - {self.materia} ({self.dia} {self.hora})"

class HorarioDocente(models.Model):
    docente = models.ForeignKey(
        'usuarios.Docente',
        on_delete=models.SET_NULL,
        blank=True, null=True,
        related_name='horarios',
        db_index=True
    )
    materia = models.ForeignKey(
        'academico.Materia',
        on_delete=models.PROTECT,
        related_name='horarios_docente',
        db_index=True
    )
    aula = models.ForeignKey(
        'asistencia.Aula',
        on_delete=models.PROTECT,
        related_name='horarios_docente',
        db_index=True
    )
    hora = models.TimeField()
    grupo = models.CharField(max_length=100)
    dia = models.CharField(max_length=10, choices=DIA_CHOICES)
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('docente', 'materia', 'hora', 'dia', 'grupo')

    def __str__(self):
        return f"{self.docente} - {self.materia} ({self.dia} {self.hora})"
