from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    FacultadViewSet,
    ProgramaViewSet,
    MateriaViewSet,
    MateriaDocenteViewSet,
    CargaAcademicaViewSet,
)

router = DefaultRouter()
router.register(r"facultades", FacultadViewSet, basename="facultad")
router.register(r"programas", ProgramaViewSet, basename="programa")
router.register(r"materias", MateriaViewSet, basename="materia")
router.register(r"materias-docente", MateriaDocenteViewSet, basename="materiadocente")
router.register(r"cargas", CargaAcademicaViewSet, basename="cargaacademica")

urlpatterns = [
    path("", include(router.urls)),
]
