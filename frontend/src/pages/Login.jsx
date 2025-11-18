import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { AuthLayout } from '../components/AuthLayout';
import { FormInput } from '../components/FormInput';
import { FormButton } from '../components/FormButton';

export function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Ingresa un email válido';
    }
    
    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar errores al escribir
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await login(formData.email, formData.password);
    navigate('/tareas');
  };

  return (
    <AuthLayout
      title="Ingresa a tu cuenta"
      subtitle="Bienvenido de vuelta a Kampux"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={handleChange}
          error={validationErrors.email}
          required
        />

        <FormInput
          label="Contraseña"
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={validationErrors.password}
          required
          autoComplete="current-password"
        />

        <FormButton
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
        >
          Iniciar Sesión
        </FormButton>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">o</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            ¿No tienes cuenta?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-medium transition"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Link
            to="#"
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
