from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer, UsuarioSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .serializers import EstudianteCreateSerializer, DocenteCreateSerializer, CoordinadorCreateSerializer, AdministradorCreateSerializer

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
