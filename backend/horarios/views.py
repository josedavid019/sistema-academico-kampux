from rest_framework import viewsets, permissions, filters, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import HorarioEstudiante, HorarioDocente
from .serializers import HorarioEstudianteSerializer, HorarioDocenteSerializer

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


class HorarioEstudianteViewSet(viewsets.ModelViewSet):
    queryset = (
        HorarioEstudiante.objects.select_related("estudiante__user", "materia", "aula")
        .all()
        .order_by("dia", "hora")
    )
    serializer_class = HorarioEstudianteSerializer
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        "estudiante__user__email",
        "materia__nombre_materia",
        "dia",
        "grupo",
    ]
    ordering_fields = ["created_at", "dia", "hora"]

    def get_permissions(self):
        # lectura abierta, escritura autenticada. Si existe permiso personalizado lo aplicamos para métodos no-GET.
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        if CUSTOM_PERMISSION is not None:
            return [permissions.IsAuthenticated(), CUSTOM_PERMISSION()]
        return [permissions.IsAuthenticated()]

    # override create to return full serializer data (ya lo hace por defecto, pero lo dejamos claro)
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class HorarioDocenteViewSet(viewsets.ModelViewSet):
    queryset = (
        HorarioDocente.objects.select_related("docente__user", "materia", "aula")
        .all()
        .order_by("dia", "hora")
    )
    serializer_class = HorarioDocenteSerializer
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        "docente__user__email",
        "materia__nombre_materia",
        "dia",
        "grupo",
        "aula__nombre_aula",
    ]
    ordering_fields = ["created_at", "dia", "hora"]

    def get_permissions(self):
        # lectura abierta, escritura autenticada. Si existe permiso personalizado lo aplicamos para métodos no-GET.
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        if CUSTOM_PERMISSION is not None:
            return [permissions.IsAuthenticated(), CUSTOM_PERMISSION()]
        return [permissions.IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
