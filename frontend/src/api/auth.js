import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Ajustar según tu backend

const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
authAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  const response = await authAPI.post('/login/', { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await authAPI.post('/register/', userData);
  return response.data;
};

export const logout = async () => {
  try {
    await authAPI.post('/logout/');
  } catch (error) {
    console.error('Error al hacer logout:', error);
  }
};

export default authAPI;
