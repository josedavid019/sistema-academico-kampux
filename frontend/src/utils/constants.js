/**
 * Constantes de la aplicación
 */

// URLs base
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Endpoints de autenticación
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login/',
  REGISTER: '/auth/register/',
  LOGOUT: '/auth/logout/',
  REFRESH: '/auth/refresh/',
  VERIFY: '/auth/verify/',
};

// Claves de localStorage
export const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
};

// Mensajes de error
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Email o contraseña incorrectos',
  EMAIL_ALREADY_REGISTERED: 'El email ya está registrado',
  NETWORK_ERROR: 'Error de conexión. Intenta más tarde',
  VALIDATION_ERROR: 'Por favor revisa los errores en el formulario',
  UNAUTHORIZED: 'No autorizado. Inicia sesión de nuevo',
  SERVER_ERROR: 'Error del servidor. Intenta más tarde',
  PASSWORD_MISMATCH: 'Las contraseñas no coinciden',
  INVALID_EMAIL: 'Email inválido',
  WEAK_PASSWORD: 'La contraseña es muy débil',
};

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Has iniciado sesión correctamente',
  REGISTER_SUCCESS: 'Tu cuenta ha sido creada correctamente',
  LOGOUT_SUCCESS: 'Has cerrado sesión correctamente',
  PASSWORD_CHANGED: 'Contraseña actualizada correctamente',
};

// Validación
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 255,
};

// Estados de carga
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
