from rest_framework import viewsets, permissions, status, filters
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import Aula, SensorAsistencia, Asistencia, DetalleAsistencia
from .serializers import (
    AulaSerializer,
    SensorAsistenciaSerializer,
    AsistenciaSerializer,
    DetalleAsistenciaSerializer,
)

# intentar importar permiso personalizado (si existe)
try:
    from usuarios.permissions import IsOwnerOrAdminOrCoordinador
    CUSTOM_PERMISSION = IsOwnerOrAdminOrCoordinador
except Exception:
    CUSTOM_PERMISSION = None

class DefaultPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 200


class AulaViewSet(viewsets.ModelViewSet):
    queryset = Aula.objects.all().order_by("nombre_aula")
    serializer_class = AulaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["nombre_aula", "bloque"]
    ordering_fields = ["created_at", "nombre_aula"]


class SensorAsistenciaViewSet(viewsets.ModelViewSet):
    queryset = SensorAsistencia.objects.all().select_related("codigo_aula").order_by("identificador_sensor")
    serializer_class = SensorAsistenciaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["identificador_sensor", "descripcion", "codigo_aula__nombre_aula"]
    ordering_fields = ["created_at", "identificador_sensor"]


class AsistenciaViewSet(viewsets.ModelViewSet):
    queryset = Asistencia.objects.all().select_related("docente", "materia", "aula", "sensor").order_by("-fecha", "-hora")
    serializer_class = AsistenciaSerializer
    # lectura abierta, escritura sólo para autenticados; si existe permiso personalizado, úsalo
    if CUSTOM_PERMISSION is not None:
        permission_classes = [permissions.IsAuthenticatedOrReadOnly, CUSTOM_PERMISSION]
    else:
        permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["docente__user__email", "materia__nombre_materia", "grupo", "fecha"]
    ordering_fields = ["created_at", "fecha", "hora"]

    # El create y update los maneja el serializer (que soporta 'detalles'), así que no hace falta override.
    # Pero devolvemos la representación completa al crear/actualizar.
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)


class DetalleAsistenciaViewSet(viewsets.ModelViewSet):
    queryset = DetalleAsistencia.objects.all().select_related("estudiante", "asistencia").order_by("-created_at")
    serializer_class = DetalleAsistenciaSerializer
    if CUSTOM_PERMISSION is not None:
        permission_classes = [permissions.IsAuthenticatedOrReadOnly, CUSTOM_PERMISSION]
    else:
        permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["nombre", "apellido", "identificacion", "estado"]
    ordering_fields = ["created_at", "nombre", "estado"]
