from rest_framework import serializers
from .models import (
    Microcurriculo,
    ContenidoCompetenciasEspecificas,
    PlanMicrocurriculo,
    DetallePlanMicrocurriculo,
)
from usuarios.models import Docente
from academico.models import Programa, Materia

# ContenidoCompetenciasEspecificas
class ContenidoCompetenciasSerializer(serializers.ModelSerializer):
    microcurriculo = serializers.PrimaryKeyRelatedField(queryset=Microcurriculo.objects.all())

    class Meta:
        model = ContenidoCompetenciasEspecificas
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")


# DetallePlanMicrocurriculo
class DetallePlanSerializer(serializers.ModelSerializer):
    plan = serializers.PrimaryKeyRelatedField(queryset=PlanMicrocurriculo.objects.all(), required=False)

    class Meta:
        model = DetallePlanMicrocurriculo
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")


# PlanMicrocurriculo (con detalles anidados)
class PlanMicrocurriculoSerializer(serializers.ModelSerializer):
    microcurriculo = serializers.PrimaryKeyRelatedField(queryset=Microcurriculo.objects.all())
    docente = serializers.PrimaryKeyRelatedField(queryset=Docente.objects.all(), allow_null=True, required=False)
    materia = serializers.PrimaryKeyRelatedField(queryset=Materia.objects.all(), allow_null=True, required=False)
    detalles = DetallePlanSerializer(many=True, required=False)

    class Meta:
        model = PlanMicrocurriculo
        fields = [
            "id", "microcurriculo", "docente", "materia", "creditos",
            "tipo_asignatura", "naturaleza_asignatura", "anio_lectivo",
            "periodo_academico", "fecha_inicio", "total_horas",
            "fecha_terminacion", "activo", "detalles", "created_at", "updated_at"
        ]
        read_only_fields = ("id", "created_at", "updated_at")

    def create(self, validated_data):
        detalles_data = validated_data.pop("detalles", None)
        plan = PlanMicrocurriculo.objects.create(**validated_data)
        if detalles_data:
            detalles_objs = []
            for d in detalles_data:
                d["plan"] = plan
                detalles_objs.append(DetallePlanMicrocurriculo(**{k: v for k, v in d.items() if k != "id"}))
            DetallePlanMicrocurriculo.objects.bulk_create(detalles_objs)
        return plan

    def update(self, instance, validated_data):
        detalles_data = validated_data.pop("detalles", None)
        for attr, val in validated_data.items():
            setattr(instance, attr, val)
        instance.save()

        if detalles_data is not None:
            # reemplazar detalles existentes por los nuevos
            instance.detalles.all().delete()
            detalles_objs = []
            for d in detalles_data:
                d["plan"] = instance
                detalles_objs.append(DetallePlanMicrocurriculo(**{k: v for k, v in d.items() if k != "id"}))
            DetallePlanMicrocurriculo.objects.bulk_create(detalles_objs)

        return instance


# Microcurriculo (con contenidos anidados)
class MicrocurriculoSerializer(serializers.ModelSerializer):
    programa = serializers.PrimaryKeyRelatedField(queryset=Programa.objects.all())
    materia = serializers.PrimaryKeyRelatedField(queryset=Materia.objects.all(), allow_null=True, required=False)
    contenidos = ContenidoCompetenciasSerializer(many=True, required=False, source="contenidos_competencias")
    planes = PlanMicrocurriculoSerializer(many=True, required=False, read_only=True)

    class Meta:
        model = Microcurriculo
        fields = [
            "id", "programa", "materia",
            "nivel_superior", "nivel_normal", "nivel_bajo", "nivel_deficiente",
            "prerequisitos", "departamento_oferente", "tipo_asignatura",
            "naturaleza_asignatura", "descripcion_asignatura", "objetivo_general",
            "objetivos_especificos", "competencias_genericas",
            "estrategias_pedagogicas_metodologicas", "referencias_bibliograficas",
            "primer_parcial", "segundo_parcial", "tercer_parcial",
            "activo", "contenidos", "planes", "created_at", "updated_at"
        ]
        read_only_fields = ("id", "created_at", "updated_at")

    def create(self, validated_data):
        contenidos_data = validated_data.pop("contenidos", None)
        micro = Microcurriculo.objects.create(**validated_data)
        if contenidos_data:
            objs = []
            for c in contenidos_data:
                c["microcurriculo"] = micro
                objs.append(ContenidoCompetenciasEspecificas(**{k: v for k, v in c.items() if k != "id"}))
            ContenidoCompetenciasEspecificas.objects.bulk_create(objs)
        return micro

    def update(self, instance, validated_data):
        contenidos_data = validated_data.pop("contenidos", None)
        for attr, val in validated_data.items():
            setattr(instance, attr, val)
        instance.save()

        if contenidos_data is not None:
            # Reemplazar contenidos existentes
            instance.contenidos_competencias.all().delete()
            objs = []
            for c in contenidos_data:
                c["microcurriculo"] = instance
                objs.append(ContenidoCompetenciasEspecificas(**{k: v for k, v in c.items() if k != "id"}))
            ContenidoCompetenciasEspecificas.objects.bulk_create(objs)
        return instance
