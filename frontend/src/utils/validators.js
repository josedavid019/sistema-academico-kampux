/**
 * Validaciones comunes para formularios
 */

export const validators = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'El email es requerido';
    if (!emailRegex.test(email)) return 'Ingresa un email válido';
    return null;
  },

  password: (password, minLength = 6) => {
    if (!password) return 'La contraseña es requerida';
    if (password.length < minLength) {
      return `La contraseña debe tener al menos ${minLength} caracteres`;
    }
    return null;
  },

  requiredField: (value, fieldName) => {
    if (!value || !value.trim()) {
      return `${fieldName} es requerido`;
    }
    return null;
  },

  passwordMatch: (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return 'Las contraseñas no coinciden';
    }
    return null;
  },

  minLength: (value, minLength, fieldName) => {
    if (value && value.length < minLength) {
      return `${fieldName} debe tener al menos ${minLength} caracteres`;
    }
    return null;
  },

  maxLength: (value, maxLength, fieldName) => {
    if (value && value.length > maxLength) {
      return `${fieldName} no puede exceder ${maxLength} caracteres`;
    }
    return null;
  },

  phone: (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    if (!phone) return 'El teléfono es requerido';
    if (!phoneRegex.test(phone)) return 'Ingresa un teléfono válido';
    return null;
  },
};

/**
 * Valida todo un formulario contra un esquema de validación
 * @param {Object} formData - Los datos del formulario
 * @param {Object} schema - Esquema de validación { fieldName: [validatorFn, ...] }
 * @returns {Object} Errores encontrados
 */
export const validateFormData = (formData, schema) => {
  const errors = {};

  Object.keys(schema).forEach((fieldName) => {
    const validationFunctions = schema[fieldName];
    
    for (let validator of validationFunctions) {
      const error = validator(formData[fieldName]);
      if (error) {
        errors[fieldName] = error;
        break;
      }
    }
  });

  return errors;
};
