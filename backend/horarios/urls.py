from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import HorarioEstudianteViewSet, HorarioDocenteViewSet

router = DefaultRouter()
router.register(
    r"horario-estudiantes", HorarioEstudianteViewSet, basename="horarioestudiante"
)
router.register(r"horario-docentes", HorarioDocenteViewSet, basename="horariodocente")

urlpatterns = [
    path("", include(router.urls)),
]
