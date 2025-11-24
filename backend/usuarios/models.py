from django.db import models

SEXO_CHOICES = (
    ("M", "Masculino"),
    ("F", "Femenino"),
    ("O", "Otro"),
)


class Usuario(models.Model):
    email = models.EmailField(unique=True, max_length=255)
    password = models.CharField(max_length=128)
    tipo_documento = models.CharField(max_length=30, blank=True, null=True)
    numero_documento = models.CharField(
        max_length=30, unique=True, null=True, blank=True
    )
    fecha_expedicion = models.DateField(blank=True, null=True)
    nombre = models.CharField(max_length=120, null=True, blank=True)
    apellido = models.CharField(max_length=120, null=True, blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES, default="O")
    celular = models.CharField(max_length=20, null=True, blank=True)
    direccion = models.CharField(max_length=255, null=True, blank=True)
    ciudad = models.CharField(max_length=100, null=True, blank=True)
    departamento = models.CharField(max_length=100, null=True, blank=True)
    pais = models.CharField(max_length=100, null=True, blank=True)
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.email:
            return self.email
        return f"{self.nombre or ''} {self.apellido or ''}".strip()


class Administrador(models.Model):
    user = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,
        related_name="administrador_profile",
    )
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} ({self.user.numero_documento or ''})"


class Docente(models.Model):
    user = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,
        related_name="docente_profile",
    )
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        nombre = self.user.nombre or ""
        apellido = self.user.apellido or ""
        return f"{self.user.email} - {nombre} {apellido}".strip()


class Coordinador(models.Model):
    user = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,
        related_name="coordinador_profile",
    )
    programa = models.ForeignKey(
        "academico.Programa",
        on_delete=models.PROTECT,
        db_index=True,
        related_name="coordinadores",
    )
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.user.nombre or ''} {self.user.apellido or ''}".strip()


class Estudiante(models.Model):
    user = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,
        related_name="estudiante_profile",
    )
    puntaje_icfes = models.SmallIntegerField(blank=True, null=True)
    nombre_acudiente = models.CharField(max_length=120, blank=True, null=True)
    apellido_acudiente = models.CharField(max_length=120, blank=True, null=True)
    celular_acudiente = models.CharField(max_length=20, blank=True, null=True)
    sisben = models.CharField(max_length=20, blank=True, null=True)
    facultad = models.ForeignKey(
        "academico.Facultad",
        on_delete=models.PROTECT,
        db_index=True,
        related_name="estudiantes",
    )
    programa = models.ForeignKey(
        "academico.Programa",
        on_delete=models.PROTECT,
        db_index=True,
        related_name="estudiantes",
    )
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.user.nombre or ''} {self.user.apellido or ''}".strip()
