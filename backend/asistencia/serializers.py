from rest_framework import serializers
from .models import Aula, SensorAsistencia, Asistencia, DetalleAsistencia
from usuarios.models import Estudiante, Docente
from academico.models import Materia

class AulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aula
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")


class SensorAsistenciaSerializer(serializers.ModelSerializer):
    codigo_aula = serializers.PrimaryKeyRelatedField(queryset=Aula.objects.all(), allow_null=True, required=False)

    class Meta:
        model = SensorAsistencia
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")


class DetalleAsistenciaSerializer(serializers.ModelSerializer):
    estudiante = serializers.PrimaryKeyRelatedField(queryset=Estudiante.objects.all(), allow_null=True, required=False)

    class Meta:
        model = DetalleAsistencia
        fields = [
            "id",
            "asistencia",
            "estudiante",
            "identificacion",
            "nombre",
            "apellido",
            "correo",
            "estado",
            "activo",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ("id", "created_at", "updated_at")

    def validate(self, data):
        # validar que tenga al menos identificación o estudiante si no hay nombre completo
        if not data.get("estudiante") and not (data.get("identificacion") or data.get("nombre")):
            raise serializers.ValidationError("Debe proporcionar 'estudiante' o al menos 'identificacion'/'nombre'.")
        return data

    def create(self, validated_data):
        # Si viene estudiante, rellenar información personal automáticamente si viene vacía
        estudiante = validated_data.get("estudiante")
        if estudiante:
            # completar campos si vienen vacíos
            if not validated_data.get("identificacion"):
                validated_data["identificacion"] = estudiante.user.numero_documento
            if not validated_data.get("nombre"):
                validated_data["nombre"] = estudiante.user.nombre
            if not validated_data.get("apellido"):
                validated_data["apellido"] = estudiante.user.apellido
            if not validated_data.get("correo"):
                validated_data["correo"] = estudiante.user.email
        return super().create(validated_data)


class AsistenciaSerializer(serializers.ModelSerializer):
    docente = serializers.PrimaryKeyRelatedField(queryset=Docente.objects.all(), allow_null=True, required=False)
    materia = serializers.PrimaryKeyRelatedField(queryset=Materia.objects.all(), allow_null=True, required=False)
    aula = serializers.PrimaryKeyRelatedField(queryset=Aula.objects.all(), allow_null=True, required=False)
    sensor = serializers.PrimaryKeyRelatedField(queryset=SensorAsistencia.objects.all(), allow_null=True, required=False)
    # campo anidado opcional para crear detalles en la misma petición
    detalles = DetalleAsistenciaSerializer(many=True, required=False)

    class Meta:
        model = Asistencia
        fields = [
            "id",
            "docente",
            "materia",
            "grupo",
            "tema",
            "fecha",
            "hora",
            "aula",
            "sensor",
            "activo",
            "detalles",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ("id", "created_at", "updated_at")

    def validate(self, data):
        # ejemplo: fecha y hora obligatorias
        if not data.get("fecha"):
            raise serializers.ValidationError({"fecha": "La fecha es obligatoria."})
        if not data.get("hora"):
            raise serializers.ValidationError({"hora": "La hora es obligatoria."})
        return data

    def create(self, validated_data):
        detalles_data = validated_data.pop("detalles", None)
        asistencia = Asistencia.objects.create(**validated_data)
        if detalles_data:
            detalles_objs = []
            for d in detalles_data:
                # asegurar relacion asistencia
                d["asistencia"] = asistencia
                # si viene estudiante (pk), DetalleAsistenciaSerializer.create rellenará campos
                detalles_objs.append(DetalleAsistencia(**{k: v for k, v in d.items() if k != "asistencia" or False}))
            # No usar bulk_create directo si quieres que se ejecuten signals -> pero aquí creamos a través del serializer
            created = []
            for d in detalles_data:
                d["asistencia"] = asistencia
                ser = DetalleAsistenciaSerializer(data=d)
                ser.is_valid(raise_exception=True)
                created.append(ser.save())
        return asistencia

    def update(self, instance, validated_data):
        detalles_data = validated_data.pop("detalles", None)
        # actualizar campos de asistencia
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # si se envían detalles, reemplazamos los existentes por los nuevos
        if detalles_data is not None:
            # eliminar existentes
            instance.detalles.all().delete()
            # crear nuevos a través del serializer para garantizar validación
            for d in detalles_data:
                d["asistencia"] = instance
                ser = DetalleAsistenciaSerializer(data=d)
                ser.is_valid(raise_exception=True)
                ser.save()

        return instance
