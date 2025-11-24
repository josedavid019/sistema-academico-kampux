from django.db import models


class Microcurriculo(models.Model):
    programa = models.ForeignKey(
        "academico.Programa",
        on_delete=models.PROTECT,
        related_name="microcurriculos",
        db_index=True,
    )
    materia = models.ForeignKey(
        "academico.Materia",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="microcurriculos",
        db_index=True,
    )
    nivel_superior = models.IntegerField(default=0)
    nivel_normal = models.IntegerField(default=0)
    nivel_bajo = models.IntegerField(default=0)
    nivel_deficiente = models.IntegerField(default=0)
    prerequisitos = models.TextField(blank=True, null=True)
    departamento_oferente = models.CharField(max_length=120, blank=True, null=True)
    tipo_asignatura = models.CharField(max_length=50, blank=True, null=True)
    naturaleza_asignatura = models.CharField(max_length=50, blank=True, null=True)
    descripcion_asignatura = models.TextField(blank=True, null=True)
    objetivo_general = models.TextField(blank=True, null=True)
    objetivos_especificos = models.TextField(blank=True, null=True)
    competencias_genericas = models.TextField(blank=True, null=True)
    estrategias_pedagogicas_metodologicas = models.TextField(blank=True, null=True)
    referencias_bibliograficas = models.TextField(blank=True, null=True)
    primer_parcial = models.IntegerField(default=0)
    segundo_parcial = models.IntegerField(default=0)
    tercer_parcial = models.IntegerField(default=0)
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Micro {self.pk} - {self.programa}"


class ContenidoCompetenciasEspecificas(models.Model):
    microcurriculo = models.ForeignKey(
        Microcurriculo,
        on_delete=models.CASCADE,
        related_name="contenidos_competencias",
        db_index=True,
    )
    unidad_tematica = models.CharField(max_length=150, blank=True, null=True)
    competencias_especificas = models.TextField(blank=True, null=True)
    resultados_de_aprendizaje = models.TextField(blank=True, null=True)
    nivel_superior = models.IntegerField(default=0)
    nivel_normal = models.IntegerField(default=0)
    nivel_bajo = models.IntegerField(default=0)
    nivel_deficiente = models.IntegerField(default=0)
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Contenido {self.pk} - {self.unidad_tematica or ''}"


class PlanMicrocurriculo(models.Model):
    microcurriculo = models.ForeignKey(
        Microcurriculo, on_delete=models.PROTECT, related_name="planes", db_index=True
    )
    docente = models.ForeignKey(
        "usuarios.Docente",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="planes_micro",
        db_index=True,
    )
    materia = models.ForeignKey(
        "academico.Materia",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="planes_micro",
        db_index=True,
    )
    creditos = models.IntegerField(blank=True, null=True)
    tipo_asignatura = models.CharField(max_length=50, blank=True, null=True)
    naturaleza_asignatura = models.CharField(max_length=50, blank=True, null=True)
    anio_lectivo = models.IntegerField(blank=True, null=True)
    periodo_academico = models.CharField(max_length=20, blank=True, null=True)
    fecha_inicio = models.DateField(blank=True, null=True)
    total_horas = models.IntegerField(blank=True, null=True)
    fecha_terminacion = models.DateField(blank=True, null=True)
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Plan {self.pk} - Micro {self.microcurriculo.pk}"


class DetallePlanMicrocurriculo(models.Model):
    plan = models.ForeignKey(
        PlanMicrocurriculo,
        on_delete=models.CASCADE,
        related_name="detalles",
        db_index=True,
    )
    semana = models.IntegerField()
    tema = models.CharField(max_length=200, blank=True, null=True)
    actividades = models.TextField(blank=True, null=True)
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["semana"]

    def __str__(self):
        return f"Semana {self.semana} - {self.plan}"
