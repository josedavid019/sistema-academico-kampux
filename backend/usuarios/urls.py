# usuarios/urls.py
from django.urls import path
from .views import (
    RegisterAPIView, LoginAPIView, LogoutAPIView,
    EstudianteCreateAPIView, DocenteCreateAPIView,
    CoordinadorCreateAPIView, AdministradorCreateAPIView
)

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='usuarios-register'),
    path('login/', LoginAPIView.as_view(), name='usuarios-login'),
    path('logout/', LogoutAPIView.as_view(), name='usuarios-logout'),
    path('estudiantes/', EstudianteCreateAPIView.as_view(), name='estudiantes-create'),
    path('docentes/', DocenteCreateAPIView.as_view(), name='docentes-create'),
    path('coordinadores/', CoordinadorCreateAPIView.as_view(), name='coordinadores-create'),
    path('administradores/', AdministradorCreateAPIView.as_view(), name='administradores-create'),
]
