from rest_framework import viewsets, permissions, filters
from rest_framework.pagination import PageNumberPagination
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


class MateriaDocenteViewSet(viewsets.ModelViewSet):
    queryset = MateriaDocente.objects.all().select_related("docente", "materia").order_by("-created_at")
    serializer_class = MateriaDocenteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["docente__user__email", "materia__nombre_materia", "rol"]
    ordering_fields = ["created_at", "docente", "materia"]


class CargaAcademicaViewSet(viewsets.ModelViewSet):
    queryset = CargaAcademica.objects.all().select_related("programa", "materia", "docente", "aula").order_by("dia", "hora")
    serializer_class = CargaAcademicaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["programa__nombre_programa", "materia__nombre_materia", "docente__user__email", "grupo"]
    ordering_fields = ["created_at", "dia", "hora"]
