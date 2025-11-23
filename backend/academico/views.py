from rest_framework import viewsets, permissions, filters, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Facultad, Programa, Materia, MateriaDocente, CargaAcademica
from .serializers import (
    FacultadSerializer,
    ProgramaSerializer,
    MateriaSerializer,
    MateriaDocenteSerializer,
    CargaAcademicaSerializer,
)


class DefaultPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 200


class FacultadViewSet(viewsets.ModelViewSet):
    queryset = Facultad.objects.all().order_by("nombre_facultad")
    serializer_class = FacultadSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["nombre_facultad"]
    ordering_fields = ["created_at", "nombre_facultad"]


class ProgramaViewSet(viewsets.ModelViewSet):
    queryset = Programa.objects.all().order_by("nombre_programa")
    serializer_class = ProgramaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["nombre_programa", "facultad__nombre_facultad"]
    ordering_fields = ["created_at", "nombre_programa"]


class MateriaViewSet(viewsets.ModelViewSet):
    queryset = Materia.objects.all().order_by("nombre_materia")
    serializer_class = MateriaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["nombre_materia", "descripcion"]
    ordering_fields = ["created_at", "nombre_materia"]

    def create(self, request, *args, **kwargs):
        """
        Soportar tanto POST individual como POST con lista (bulk).
        Cuando llega una lista, many=True y usamos el ListSerializer personalizado que hace bulk_create.
        """
        is_bulk = isinstance(request.data, list)
        serializer = self.get_serializer(data=request.data, many=is_bulk)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        # Si el serializer es un ListSerializer personalizado, .save() ya hace bulk_create
        serializer.save()


class MateriaDocenteViewSet(viewsets.ModelViewSet):
    queryset = (
        MateriaDocente.objects.all()
        .select_related("docente", "materia")
        .order_by("-created_at")
    )
    serializer_class = MateriaDocenteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["docente__user__email", "materia__nombre_materia", "rol"]
    ordering_fields = ["created_at", "docente", "materia"]


class CargaAcademicaViewSet(viewsets.ModelViewSet):
    queryset = (
        CargaAcademica.objects.all()
        .select_related("programa", "materia", "docente", "aula")
        .order_by("dia", "hora")
    )
    serializer_class = CargaAcademicaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        "programa__nombre_programa",
        "materia__nombre_materia",
        "docente__user__email",
        "grupo",
    ]
    ordering_fields = ["created_at", "dia", "hora"]
