import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

/**
 * Componente para proteger rutas que requieren autenticación
 * @param {React.ReactNode} children - Componente a renderizar si está autenticado
 * @param {string} redirectTo - Ruta a redirigir si no está autenticado (default: '/login')
 */
export function ProtectedRoute({ children, redirectTo = "/login" }) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
}
