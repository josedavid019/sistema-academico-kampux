from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    """Modelo de usuario personalizado que usa el email como identificador.

    Django se encarga del hashing de contraseñas. Para crear usuarios
    usa `Usuario.objects.create_user(email, password=...)` o
    `user.set_password(password)` antes de `save()`.
    """
    username = None
    email = models.EmailField('email address', unique=True)
    numero_documento = models.CharField(max_length=30, unique=True, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class Administrador(models.Model):
    SEXO_CHOICES = (('M', 'Masculino'), ('F', 'Femenino'), ('O', 'Otro'))

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='administrador_profile',
        null=True,
        blank=True,
    )

    numero_documento = models.CharField(max_length=30, unique=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES, default='O')
    celular = models.CharField(max_length=20)
    correo = models.EmailField(unique=True, max_length=255)
    direccion = models.CharField(max_length=255, blank=True, null=True)
    ciudad = models.CharField(max_length=100, blank=True, null=True)
    departamento = models.CharField(max_length=100, blank=True, null=True)
    pais = models.CharField(max_length=100, blank=True, null=True)

    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.user:
            return f"{self.user.email} ({self.numero_documento})"
        return f"{self.nombre} {self.apellido} ({self.numero_documento})"


class Docente(models.Model):
    SEXO_CHOICES = (('M', 'Masculino'), ('F', 'Femenino'), ('O', 'Otro'))

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='docente_profile',
        null=True,
        blank=True,
    )

    numero_documento = models.CharField(max_length=30, unique=True)
    nombre_docente = models.CharField(max_length=120)
    apellido_docente = models.CharField(max_length=120)
    fecha_nacimiento = models.DateField()
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES, default='O')
    celular = models.CharField(max_length=20)
    correo = models.EmailField(unique=True, max_length=255)
    direccion = models.CharField(max_length=255, blank=True, null=True)
    ciudad = models.CharField(max_length=100, blank=True, null=True)
    departamento = models.CharField(max_length=100, blank=True, null=True)
    pais = models.CharField(max_length=100, blank=True, null=True)

    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.user:
            return f"{self.user.email} - {self.nombre_docente} {self.apellido_docente}"
        return f"{self.nombre_docente} {self.apellido_docente}"


class Coordinador(models.Model):
    SEXO_CHOICES = (('M', 'Masculino'), ('F', 'Femenino'), ('O', 'Otro'))

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='coordinador_profile',
        null=True,
        blank=True,
    )

    numero_documento = models.CharField(max_length=30, unique=True)
    nombre = models.CharField(max_length=120)
    apellido = models.CharField(max_length=120)
    fecha_nacimiento = models.DateField()
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES, default='O')
    celular = models.CharField(max_length=20)
    correo = models.EmailField(unique=True, max_length=255)
    direccion = models.CharField(max_length=255, blank=True, null=True)
    ciudad = models.CharField(max_length=100, blank=True, null=True)
    departamento = models.CharField(max_length=100, blank=True, null=True)
    pais = models.CharField(max_length=100, blank=True, null=True)

    # referencia a Programa (app academico)
    programa = models.ForeignKey(
        'academico.Programa',
        on_delete=models.PROTECT,
        db_index=True,
        related_name='coordinadores'
    )

    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.user:
            return f"{self.user.email} - {self.nombre} {self.apellido}"
        return f"{self.nombre} {self.apellido}"
    

class Estudiante(models.Model):
    SEXO_CHOICES = (('M', 'Masculino'), ('F', 'Femenino'), ('O', 'Otro'))

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='estudiante_profile',
        null=True,
        blank=True,
    )

    numero_documento = models.CharField(max_length=30, unique=True)
    tipo_documento = models.CharField(max_length=30)
    fecha_expedicion = models.DateField()
    nombre = models.CharField(max_length=120)
    apellido = models.CharField(max_length=120)
    fecha_nacimiento = models.DateField()
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES, default='O')
    celular = models.CharField(max_length=20)
    correo = models.EmailField(unique=True, max_length=255)
    estado_civil = models.CharField(max_length=20, blank=True, null=True)
    direccion = models.CharField(max_length=255, blank=True, null=True)
    ciudad = models.CharField(max_length=100, blank=True, null=True)
    departamento = models.CharField(max_length=100, blank=True, null=True)
    pais = models.CharField(max_length=100, blank=True, null=True)
    puntaje_icfes = models.IntegerField(blank=True, null=True)
    nombre_acudiente = models.CharField(max_length=120, blank=True, null=True)
    apellido_acudiente = models.CharField(max_length=120, blank=True, null=True)
    celular_acudiente = models.CharField(max_length=20, blank=True, null=True)
    sisben = models.CharField(max_length=20, blank=True, null=True)

    facultad = models.ForeignKey(
        'academico.Facultad',
        on_delete=models.PROTECT,
        db_index=True,
        related_name='estudiantes'
    )
    programa = models.ForeignKey(
        'academico.Programa',
        on_delete=models.PROTECT,
        db_index=True,
        related_name='estudiantes'
    )

    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.user:
            return f"{self.user.email} - {self.nombre} {self.apellido}"
        return f"{self.nombre} {self.apellido}"
