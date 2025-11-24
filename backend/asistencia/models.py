from django.db import models


class Aula(models.Model):
    nombre_aula = models.CharField(max_length=100, unique=True)
    capacidad = models.IntegerField()
    bloque = models.CharField(max_length=10)
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre_aula


class SensorAsistencia(models.Model):
    codigo_aula = models.ForeignKey(
        Aula,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="sensores",
        db_index=True,
    )
    identificador_sensor = models.CharField(max_length=100, unique=True)
    descripcion = models.CharField(max_length=150, blank=True, null=True)
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.identificador_sensor


class Asistencia(models.Model):
    docente = models.ForeignKey(
        "usuarios.Docente",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="asistencias",
        db_index=True,
    )
    materia = models.ForeignKey(
        "academico.Materia",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="asistencias",
        db_index=True,
    )
    grupo = models.CharField(max_length=20, blank=True, null=True)
    tema = models.CharField(max_length=150, blank=True, null=True)
    fecha = models.DateField()
    hora = models.TimeField()
    aula = models.ForeignKey(
        Aula,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="asistencias",
        db_index=True,
    )
    sensor = models.ForeignKey(
        SensorAsistencia,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="asistencias",
        db_index=True,
    )
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Asistencia {self.pk} - {self.fecha} {self.hora}"


class DetalleAsistencia(models.Model):
    ESTADO_CHOICES = (
        ("Presente", "Presente"),
        ("Ausente", "Ausente"),
        ("Tarde", "Tarde"),
        ("Justificado", "Justificado"),
    )
    asistencia = models.ForeignKey(
        Asistencia, on_delete=models.CASCADE, related_name="detalles", db_index=True
    )
    estudiante = models.ForeignKey(
        "usuarios.Estudiante",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="detalles_asistencia",
        db_index=True,
    )
    identificacion = models.CharField(max_length=30, blank=True, null=True)
    nombre = models.CharField(max_length=120, blank=True, null=True)
    apellido = models.CharField(max_length=120, blank=True, null=True)
    correo = models.EmailField(max_length=191, blank=True, null=True)
    estado = models.CharField(max_length=12, choices=ESTADO_CHOICES)
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.estudiante or self.identificacion} - {self.estado}"
