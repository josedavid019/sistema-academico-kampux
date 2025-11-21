from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from .models import Usuario, Estudiante, Docente, Coordinador, Administrador
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist
from academico.models import Facultad, Programa

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            'id', 'email', 'numero_documento', 'tipo_documento',
            'nombre', 'apellido', 'fecha_nacimiento', 'sexo',
            'celular', 'direccion', 'ciudad', 'departamento', 'pais',
            'activo', 'created_at', 'updated_at'
        ]
        read_only_fields = ('id', 'activo', 'created_at', 'updated_at')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Usuario
        fields = ['email', 'password', 'password2',
                  'numero_documento', 'tipo_documento', 'fecha_expedicion',
                  'nombre', 'apellido', 'fecha_nacimiento', 'sexo',
                  'celular', 'direccion', 'ciudad', 'departamento', 'pais']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
        return data

    def create(self, validated_data):
        validated_data.pop('password2', None)
        password = validated_data.pop('password')
        validated_data['password'] = make_password(password)
        # crear usuario
        return Usuario.objects.create(**validated_data)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        from django.contrib.auth.hashers import check_password
        try:
            user = Usuario.objects.get(email=attrs['email'])
        except Usuario.DoesNotExist:
            raise serializers.ValidationError("Credenciales inválidas.")
        if not check_password(attrs['password'], user.password):
            raise serializers.ValidationError("Credenciales inválidas.")
        if not user.activo:
            raise serializers.ValidationError("Usuario inactivo.")
        attrs['user'] = user
        return attrs

def user_has_any_profile(user):
    """
    Retorna True si el usuario ya tiene cualquiera de los perfiles.
    Usamos try/except porque el acceso a la relación ONE-TO-ONE arroja
    DoesNotExist si no existe.
    """
    try:
        if user.estudiante_profile:
            return True
    except Exception:
        pass
    try:
        if user.docente_profile:
            return True
    except Exception:
        pass
    try:
        if user.coordinador_profile:
            return True
    except Exception:
        pass
    try:
        if user.administrador_profile:
            return True
    except Exception:
        pass
    return False


class EstudianteCreateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())
    facultad = serializers.PrimaryKeyRelatedField(queryset=Facultad.objects.all())
    programa = serializers.PrimaryKeyRelatedField(queryset=Programa.objects.all())

    class Meta:
        model = Estudiante
        fields = [
            'id', 'user', 'puntaje_icfes',
            'nombre_acudiente', 'apellido_acudiente', 'celular_acudiente', 'sisben',
            'facultad', 'programa', 'activo', 'created_at', 'updated_at'
        ]
        read_only_fields = ('id', 'activo', 'created_at', 'updated_at')

    def validate_user(self, value):
        if user_has_any_profile(value):
            raise serializers.ValidationError("El usuario ya tiene asignado un perfil/rol.")
        return value

    def create(self, validated_data):
        return Estudiante.objects.create(**validated_data)


class DocenteCreateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())

    class Meta:
        model = Docente
        fields = ['id', 'user', 'activo', 'created_at', 'updated_at']
        read_only_fields = ('id', 'activo', 'created_at', 'updated_at')

    def validate_user(self, value):
        if user_has_any_profile(value):
            raise serializers.ValidationError("El usuario ya tiene asignado un perfil/rol.")
        return value

    def create(self, validated_data):
        return Docente.objects.create(**validated_data)


class CoordinadorCreateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())
    programa = serializers.PrimaryKeyRelatedField(queryset=Programa.objects.all())

    class Meta:
        model = Coordinador
        fields = ['id', 'user', 'programa', 'activo', 'created_at', 'updated_at']
        read_only_fields = ('id', 'activo', 'created_at', 'updated_at')

    def validate_user(self, value):
        if user_has_any_profile(value):
            raise serializers.ValidationError("El usuario ya tiene asignado un perfil/rol.")
        return value

    def create(self, validated_data):
        return Coordinador.objects.create(**validated_data)


class AdministradorCreateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())

    class Meta:
        model = Administrador
        fields = ['id', 'user', 'activo', 'created_at', 'updated_at']
        read_only_fields = ('id', 'activo', 'created_at', 'updated_at')

    def validate_user(self, value):
        if user_has_any_profile(value):
            raise serializers.ValidationError("El usuario ya tiene asignado un perfil/rol.")
        return value

    def create(self, validated_data):
        return Administrador.objects.create(**validated_data)
