from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from .serializers import RegisterSerializer, LoginSerializer, UsuarioSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .serializers import EstudianteCreateSerializer, DocenteCreateSerializer, CoordinadorCreateSerializer, AdministradorCreateSerializer, UsuarioUpdateSerializer, UsuarioSerializer, EstudianteSerializer, DocenteSerializer, CoordinadorSerializer, AdministradorSerializer
from .models import Usuario, Estudiante, Docente, Coordinador, Administrador
from .permissions import IsOwnerOrAdmin

def get_user_role(user):
    if hasattr(user, "estudiante_profile"):
        return "estudiante"
    if hasattr(user, "docente_profile"):
        return "docente"
    if hasattr(user, "coordinador_profile"):
        return "coordinador"
    if hasattr(user, "administrador_profile"):
        return "administrador"
    return "sin_rol"

@method_decorator(csrf_exempt, name='dispatch')
class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            out = UsuarioSerializer(user).data
            return Response(out, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class LoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.validated_data['user']
        # limpiar sesión anterior
        request.session.flush()
        # guardar info en sesión
        request.session['user_id'] = user.id
        request.session['user_email'] = user.email
        # determinar rol
        role = get_user_role(user)
        request.session['user_role'] = role
        out = UsuarioSerializer(user).data
        out['rol'] = role   # <-- agregar el rol al response
        return Response(out, status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class LogoutAPIView(APIView):
    def post(self, request):
        request.session.flush()
        return Response({"detail": "Sesión cerrada"}, status=status.HTTP_200_OK)
    
@method_decorator(csrf_exempt, name='dispatch')
class UsuarioListAPIView(generics.ListAPIView):
    """
    GET /api/usuarios/  -> lista todos los usuarios (público lectura, auth para modificar via detalle)
    """
    queryset = Usuario.objects.all().order_by("id")
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


@method_decorator(csrf_exempt, name='dispatch')
class UsuarioDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET /api/usuarios/<pk>/    -> detalle
    PUT /api/usuarios/<pk>/    -> reemplazo (envía todos los campos)
    PATCH /api/usuarios/<pk>/  -> parcial
    DELETE /api/usuarios/<pk>/ -> elimina
    """
    queryset = Usuario.objects.all()
    permission_classes = [permissions.IsAuthenticated]  # requiere estar autenticado para modificar/eliminar

    def get_serializer_class(self):
        # Para GET usamos el serializer público; para update usamos el que maneja password
        if self.request.method in ['PUT', 'PATCH']:
            return UsuarioUpdateSerializer
        return UsuarioSerializer

@method_decorator(csrf_exempt, name='dispatch')
class EstudianteCreateAPIView(APIView):
    def post(self, request):
        serializer = EstudianteCreateSerializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()
            return Response(EstudianteCreateSerializer(obj).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class DocenteCreateAPIView(APIView):
    def post(self, request):
        serializer = DocenteCreateSerializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()
            return Response(DocenteCreateSerializer(obj).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class CoordinadorCreateAPIView(APIView):
    def post(self, request):
        serializer = CoordinadorCreateSerializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()
            return Response(CoordinadorCreateSerializer(obj).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class AdministradorCreateAPIView(APIView):
    def post(self, request):
        serializer = AdministradorCreateSerializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()
            return Response(AdministradorCreateSerializer(obj).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class EstudianteListAPIView(generics.ListAPIView):
    queryset = Estudiante.objects.select_related('user','facultad','programa').all().order_by('id')
    serializer_class = EstudianteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

@method_decorator(csrf_exempt, name='dispatch')
class EstudianteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Estudiante.objects.select_related('user','facultad','programa').all()
    serializer_class = EstudianteSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]


@method_decorator(csrf_exempt, name='dispatch')
class DocenteListAPIView(generics.ListAPIView):
    queryset = Docente.objects.select_related('user').all().order_by('id')
    serializer_class = DocenteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

@method_decorator(csrf_exempt, name='dispatch')
class DocenteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Docente.objects.select_related('user').all()
    serializer_class = DocenteSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]


@method_decorator(csrf_exempt, name='dispatch')
class CoordinadorListAPIView(generics.ListAPIView):
    queryset = Coordinador.objects.select_related('user','programa').all().order_by('id')
    serializer_class = CoordinadorSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

@method_decorator(csrf_exempt, name='dispatch')
class CoordinadorDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Coordinador.objects.select_related('user','programa').all()
    serializer_class = CoordinadorSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]


@method_decorator(csrf_exempt, name='dispatch')
class AdministradorListAPIView(generics.ListAPIView):
    queryset = Administrador.objects.select_related('user').all().order_by('id')
    serializer_class = AdministradorSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

@method_decorator(csrf_exempt, name='dispatch')
class AdministradorDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Administrador.objects.select_related('user').all()
    serializer_class = AdministradorSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]