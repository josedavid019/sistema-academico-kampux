import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { AuthLayout } from '../components/AuthLayout';
import { FormInput } from '../components/FormInput';
import { FormButton } from '../components/FormButton';

export function Register() {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'El nombre es requerido';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'El apellido es requerido';
    }
    
    if (!formData.email) {
      errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Ingresa un email válido';
    }
    
    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if (!formData.passwordConfirm) {
      errors.passwordConfirm = 'Confirma la contraseña';
    } else if (formData.password !== formData.passwordConfirm) {
      errors.passwordConfirm = 'Las contraseñas no coinciden';
    }
    
    if (!termsAccepted) {
      errors.terms = 'Debes aceptar los términos y condiciones';
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

    await register(formData);
    // La redirección ocurrirá después de un registro exitoso
    // navigate('/');
  };

  return (
    <AuthLayout
      title="Crear una cuenta"
      subtitle="Únete a la comunidad académica de Kampux"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <FormInput
            label="Nombre"
            type="text"
            name="firstName"
            placeholder="Juan"
            value={formData.firstName}
            onChange={handleChange}
            error={validationErrors.firstName}
            required
          />

          <FormInput
            label="Apellido"
            type="text"
            name="lastName"
            placeholder="Pérez"
            value={formData.lastName}
            onChange={handleChange}
            error={validationErrors.lastName}
            required
          />
        </div>

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
          autoComplete="new-password"
        />

        <FormInput
          label="Confirmar Contraseña"
          type="password"
          name="passwordConfirm"
          placeholder="••••••••"
          value={formData.passwordConfirm}
          onChange={handleChange}
          error={validationErrors.passwordConfirm}
          required
          autoComplete="new-password"
        />

        <div className="flex items-start gap-3 pt-2">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => {
              setTermsAccepted(e.target.checked);
              if (validationErrors.terms) {
                setValidationErrors(prev => ({
                  ...prev,
                  terms: '',
                }));
              }
            }}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            Acepto los{' '}
            <Link to="#" className="text-blue-600 hover:text-blue-700 font-medium">
              términos y condiciones
            </Link>
            {' '}y la{' '}
            <Link to="#" className="text-blue-600 hover:text-blue-700 font-medium">
              política de privacidad
            </Link>
          </label>
        </div>
        {validationErrors.terms && (
          <p className="text-sm text-red-500">{validationErrors.terms}</p>
        )}

        <FormButton
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
          className="mt-6"
        >
          Crear Cuenta
        </FormButton>

        <div className="text-center pt-4">
          <p className="text-gray-600 text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium transition"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
