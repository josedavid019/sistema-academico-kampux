from django.urls import path
from .views import (
    RegisterAPIView,
    LoginAPIView,
    LogoutAPIView,
    EstudianteCreateAPIView,
    DocenteCreateAPIView,
    CoordinadorCreateAPIView,
    AdministradorCreateAPIView,
    UsuarioListAPIView,
    UsuarioDetailAPIView,
    EstudianteListAPIView,
    EstudianteDetailAPIView,
    DocenteListAPIView,
    DocenteDetailAPIView,
    CoordinadorListAPIView,
    CoordinadorDetailAPIView,
    AdministradorListAPIView,
    AdministradorDetailAPIView,
)

urlpatterns = [
    # Usuarios base
    path("", UsuarioListAPIView.as_view(), name="usuarios-list"),
    path("<int:pk>/", UsuarioDetailAPIView.as_view(), name="usuarios-detail"),
    # Perfiles
    path("estudiantes/all/", EstudianteListAPIView.as_view(), name="estudiantes-list"),
    path(
        "estudiantes/<int:pk>/",
        EstudianteDetailAPIView.as_view(),
        name="estudiantes-detail",
    ),
    path("docentes/all/", DocenteListAPIView.as_view(), name="docentes-list"),
    path("docentes/<int:pk>/", DocenteDetailAPIView.as_view(), name="docentes-detail"),
    path(
        "coordinadores/all/",
        CoordinadorListAPIView.as_view(),
        name="coordinadores-list",
    ),
    path(
        "coordinadores/<int:pk>/",
        CoordinadorDetailAPIView.as_view(),
        name="coordinadores-detail",
    ),
    path(
        "administradores/all/",
        AdministradorListAPIView.as_view(),
        name="administradores-list",
    ),
    path(
        "administradores/<int:pk>/",
        AdministradorDetailAPIView.as_view(),
        name="administradores-detail",
    ),
    # existing create endpoints...
    path("register/", RegisterAPIView.as_view(), name="usuarios-register"),
    path("login/", LoginAPIView.as_view(), name="usuarios-login"),
    path("logout/", LogoutAPIView.as_view(), name="usuarios-logout"),
    path("estudiantes/", EstudianteCreateAPIView.as_view(), name="estudiantes-create"),
    path("docentes/", DocenteCreateAPIView.as_view(), name="docentes-create"),
    path(
        "coordinadores/",
        CoordinadorCreateAPIView.as_view(),
        name="coordinadores-create",
    ),
    path(
        "administradores/",
        AdministradorCreateAPIView.as_view(),
        name="administradores-create",
    ),
]
