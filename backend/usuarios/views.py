from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import get_user_model, authenticate, login, logout
from .serializer import RegisterSerializer, LoginSerializer, UserSerializer


User = get_user_model()


class RegisterAPIView(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		serializer = RegisterSerializer(data=request.data)
		if serializer.is_valid():
			user = serializer.save()
			data = UserSerializer(user).data
			return Response({'user': data}, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		serializer = LoginSerializer(data=request.data)
		if not serializer.is_valid():
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

		email = serializer.validated_data['email']
		password = serializer.validated_data['password']
		user = authenticate(request, username=email, password=password)
		if user is not None:
			login(request, user)
			return Response({'user': UserSerializer(user).data}, status=status.HTTP_200_OK)
		return Response({'detail': 'Credenciales inválidas'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPIView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def post(self, request):
		logout(request)
		return Response({'detail': 'Logged out'}, status=status.HTTP_200_OK)
