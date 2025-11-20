from django.db import models

class Facultad(models.Model):
    nombre_facultad = models.CharField(max_length=150, unique=True)

    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre_facultad


class Programa(models.Model):
    nombre_programa = models.CharField(max_length=150)
    numero_creditos = models.IntegerField()
    facultad = models.ForeignKey(
        Facultad,
        on_delete=models.PROTECT,
        related_name='programas',
        db_index=True
    )

    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre_programa


class Materia(models.Model):
    nombre_materia = models.CharField(max_length=150)
    numero_creditos = models.IntegerField()
    descripcion = models.TextField(blank=True, null=True)

    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre_materia


class MateriaDocente(models.Model):
    docente = models.ForeignKey(
        'usuarios.Docente',
        on_delete=models.PROTECT,
        related_name='materias_docente',
        db_index=True,
        null=True,
        blank=True
    )
    materia = models.ForeignKey(
        Materia,
        on_delete=models.PROTECT,
        related_name='docentes_materia',
        db_index=True
    )
    rol = models.CharField(max_length=50, blank=True, null=True)

    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('docente', 'materia', 'rol')

    def __str__(self):
        return f"{self.docente} - {self.materia} ({self.rol})"


class CargaAcademica(models.Model):
    DIA_CHOICES = (
        ('Lunes','Lunes'),('Martes','Martes'),('Miercoles','Miercoles'),
        ('Jueves','Jueves'),('Viernes','Viernes'),('Sabado','Sabado'),('Domingo','Domingo')
    )

    programa = models.ForeignKey(
        Programa,
        on_delete=models.PROTECT,
        related_name='cargas_academicas',
        db_index=True
    )
    materia = models.ForeignKey(
        Materia,
        on_delete=models.PROTECT,
        related_name='cargas_academicas',
        db_index=True
    )
    docente = models.ForeignKey(
        'usuarios.Docente',
        on_delete=models.SET_NULL,
        blank=True, null=True,
        related_name='cargas_academicas',
        db_index=True
    )
    aula = models.ForeignKey(
        'asistencia.Aula',
        on_delete=models.SET_NULL,
        blank=True, null=True,
        related_name='cargas_academicas',
        db_index=True
    )
    hora = models.TimeField()
    grupo = models.CharField(max_length=100)
    dia = models.CharField(max_length=10, choices=DIA_CHOICES)
    periodo_carga = models.CharField(max_length=20)

    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.materia} - {self.grupo} ({self.dia} {self.hora})"
