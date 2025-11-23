from rest_framework import viewsets, permissions, filters
from rest_framework.pagination import PageNumberPagination
from .models import (
    Microcurriculo,
    ContenidoCompetenciasEspecificas,
    PlanMicrocurriculo,
    DetallePlanMicrocurriculo,
)
from .serializers import (
    MicrocurriculoSerializer,
    ContenidoCompetenciasSerializer,
    PlanMicrocurriculoSerializer,
    DetallePlanSerializer,
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


class MicrocurriculoViewSet(viewsets.ModelViewSet):
    queryset = Microcurriculo.objects.select_related("programa","materia").all().order_by("-created_at")
    serializer_class = MicrocurriculoSerializer
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["programa__nombre_programa", "materia__nombre_materia", "descripcion_asignatura"]
    ordering_fields = ["created_at"]

    def get_permissions(self):
        # lectura abierta, escritura autenticada. Si hay permiso personalizado lo aplicamos.
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        if CUSTOM_PERMISSION is not None:
            return [permissions.IsAuthenticated(), CUSTOM_PERMISSION()]
        return [permissions.IsAuthenticated()]


class ContenidoCompetenciasViewSet(viewsets.ModelViewSet):
    queryset = ContenidoCompetenciasEspecificas.objects.select_related("microcurriculo").all().order_by("created_at")
    serializer_class = ContenidoCompetenciasSerializer
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["unidad_tematica", "competencias_especificas"]
    ordering_fields = ["created_at"]

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        if CUSTOM_PERMISSION is not None:
            return [permissions.IsAuthenticated(), CUSTOM_PERMISSION()]
        return [permissions.IsAuthenticated()]


class PlanMicrocurriculoViewSet(viewsets.ModelViewSet):
    queryset = PlanMicrocurriculo.objects.select_related("microcurriculo","docente","materia").all().order_by("-created_at")
    serializer_class = PlanMicrocurriculoSerializer
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["microcurriculo__programa__nombre_programa", "docente__user__email", "periodo_academico"]
    ordering_fields = ["created_at"]

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        if CUSTOM_PERMISSION is not None:
            return [permissions.IsAuthenticated(), CUSTOM_PERMISSION()]
        return [permissions.IsAuthenticated()]


class DetallePlanViewSet(viewsets.ModelViewSet):
    queryset = DetallePlanMicrocurriculo.objects.select_related("plan").all().order_by("semana")
    serializer_class = DetallePlanSerializer
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["tema", "actividades"]
    ordering_fields = ["semana"]

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        if CUSTOM_PERMISSION is not None:
            return [permissions.IsAuthenticated(), CUSTOM_PERMISSION()]
        return [permissions.IsAuthenticated()]
