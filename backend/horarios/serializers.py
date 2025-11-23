from rest_framework import serializers
from .models import HorarioEstudiante, HorarioDocente
from usuarios.models import Estudiante, Docente
from academico.models import Materia
from asistencia.models import Aula

class HorarioEstudianteSerializer(serializers.ModelSerializer):
    estudiante = serializers.PrimaryKeyRelatedField(queryset=Estudiante.objects.all())
    materia = serializers.PrimaryKeyRelatedField(queryset=Materia.objects.all())
    aula = serializers.PrimaryKeyRelatedField(queryset=Aula.objects.all(), allow_null=True, required=False)

    class Meta:
        model = HorarioEstudiante
        fields = [
            "id",
            "estudiante",
            "materia",
            "aula",
            "hora",
            "grupo",
            "dia",
            "activo",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ("id", "created_at", "updated_at")

    def validate(self, data):
        """
        Validaciones:
        - Evitar que un mismo estudiante tenga dos horarios al mismo dia/hora.
        - Respetar unique_together del modelo.
        """
        estudiante = data.get("estudiante") or getattr(self.instance, "estudiante", None)
        materia = data.get("materia") or getattr(self.instance, "materia", None)
        hora = data.get("hora") or getattr(self.instance, "hora", None)
        dia = data.get("dia") or getattr(self.instance, "dia", None)
        grupo = data.get("grupo") or getattr(self.instance, "grupo", None)

        # Comprobar conflicto para el estudiante (si hay otro registro con mismo estudiante/dia/hora/grupo)
        qs = HorarioEstudiante.objects.filter(
            estudiante=estudiante,
            dia=dia,
            hora=hora,
            grupo=grupo,
        )
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("El estudiante ya tiene un horario para ese día/hora/grupo.")

        return data


class HorarioDocenteSerializer(serializers.ModelSerializer):
    docente = serializers.PrimaryKeyRelatedField(queryset=Docente.objects.all(), allow_null=True, required=False)
    materia = serializers.PrimaryKeyRelatedField(queryset=Materia.objects.all())
    aula = serializers.PrimaryKeyRelatedField(queryset=Aula.objects.all())

    class Meta:
        model = HorarioDocente
        fields = [
            "id",
            "docente",
            "materia",
            "aula",
            "hora",
            "grupo",
            "dia",
            "activo",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ("id", "created_at", "updated_at")

    def validate(self, data):
        """
        Validaciones:
        - Evitar que el docente tenga dos clases al mismo dia/hora/grupo.
        - Evitar que el aula esté ocupada por otra clase en la misma dia/hora (independiente de docente).
        """
        docente = data.get("docente") or getattr(self.instance, "docente", None)
        aula = data.get("aula") or getattr(self.instance, "aula", None)
        hora = data.get("hora") or getattr(self.instance, "hora", None)
        dia = data.get("dia") or getattr(self.instance, "dia", None)
        grupo = data.get("grupo") or getattr(self.instance, "grupo", None)

        # Conflicto docente
        if docente:
            qs_doc = HorarioDocente.objects.filter(
                docente=docente,
                dia=dia,
                hora=hora,
                grupo=grupo,
            )
            if self.instance:
                qs_doc = qs_doc.exclude(pk=self.instance.pk)
            if qs_doc.exists():
                raise serializers.ValidationError("El docente ya tiene una clase en ese día/hora/grupo.")

        # Conflicto aula (aula no puede tener otra clase distinta en mismo dia/hora)
        qs_aula = HorarioDocente.objects.filter(
            aula=aula,
            dia=dia,
            hora=hora,
        )
        if self.instance:
            qs_aula = qs_aula.exclude(pk=self.instance.pk)
        if qs_aula.exists():
            raise serializers.ValidationError("El aula ya está asignada a otra clase en ese día/hora.")

        return data
