import React from 'react';

// Registration page removed. Registration is disabled in the SPA.
export function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 bg-white rounded shadow">
        <h2 className="text-lg font-semibold">Registro deshabilitado</h2>
        <p className="text-sm text-gray-600 mt-2">La creación de cuentas desde la interfaz web ha sido deshabilitada. Contacta al administrador.</p>
      </div>
    </div>
  );
}
