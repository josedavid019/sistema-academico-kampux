from rest_framework import serializers
from .models import Facultad, Programa, Materia, MateriaDocente, CargaAcademica

# Si quieres presentar datos del docente o aula de forma más legible,
# puedes importar los modelos correspondientes. Por ahora usamos PKs.
from usuarios.models import Docente  # opcional: para validaciones
from asistencia.models import Aula   # opcional


class FacultadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facultad
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")


class ProgramaSerializer(serializers.ModelSerializer):
    facultad = serializers.PrimaryKeyRelatedField(queryset=Facultad.objects.all())

    class Meta:
        model = Programa
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")


class MateriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materia
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")


class MateriaDocenteSerializer(serializers.ModelSerializer):
    docente = serializers.PrimaryKeyRelatedField(
        queryset=Docente.objects.all(), allow_null=True, required=False
    )
    materia = serializers.PrimaryKeyRelatedField(queryset=Materia.objects.all())

    class Meta:
        model = MateriaDocente
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")

    def validate(self, data):
        # Validación extra: evita duplicados si rol no es None (el unique_together protege a nivel DB)
        docente = data.get("docente")
        materia = data.get("materia")
        rol = data.get("rol")
        if docente and materia and self.instance is None:
            exists = MateriaDocente.objects.filter(docente=docente, materia=materia, rol=rol).exists()
            if exists:
                raise serializers.ValidationError("Ya existe esa asignación docente-materia con ese rol.")
        return data


class CargaAcademicaSerializer(serializers.ModelSerializer):
    programa = serializers.PrimaryKeyRelatedField(queryset=Programa.objects.all())
    materia = serializers.PrimaryKeyRelatedField(queryset=Materia.objects.all())
    docente = serializers.PrimaryKeyRelatedField(
        queryset=Docente.objects.all(), allow_null=True, required=False
    )
    aula = serializers.PrimaryKeyRelatedField(
        queryset=Aula.objects.all(), allow_null=True, required=False
    )

    class Meta:
        model = CargaAcademica
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")

    def validate(self, data):
        # Ejemplo de validación simple: hora válida y no vacío de grupo
        if not data.get("grupo"):
            raise serializers.ValidationError({"grupo": "El campo 'grupo' es obligatorio."})
        # Opcional: puedes añadir validaciones de conflicto de horario aquí
        return data
