from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    MicrocurriculoViewSet,
    ContenidoCompetenciasViewSet,
    PlanMicrocurriculoViewSet,
    DetallePlanViewSet,
)

router = DefaultRouter()
router.register(r"microcurriculos", MicrocurriculoViewSet, basename="microcurriculo")
router.register(r"contenidos", ContenidoCompetenciasViewSet, basename="contenidocompetencias")
router.register(r"planes", PlanMicrocurriculoViewSet, basename="planmicro")
router.register(r"detalles", DetallePlanViewSet, basename="detalleplan")

urlpatterns = [
    path("", include(router.urls)),
]
