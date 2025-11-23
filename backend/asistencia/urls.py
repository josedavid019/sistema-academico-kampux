from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import AulaViewSet, SensorAsistenciaViewSet, AsistenciaViewSet, DetalleAsistenciaViewSet

router = DefaultRouter()
router.register(r"aulas", AulaViewSet, basename="aula")
router.register(r"sensores", SensorAsistenciaViewSet, basename="sensorasistencia")
router.register(r"asistencias", AsistenciaViewSet, basename="asistencia")
router.register(r"detalles", DetalleAsistenciaViewSet, basename="detalleasistencia")

urlpatterns = [
    path("", include(router.urls)),
]
