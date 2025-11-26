import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function AdminRoute({ children, redirectTo = "/login" }) {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isAdmin = !!(
    user &&
    (user.rol === "administrador" ||
      user.role === "administrador" ||
      user.is_staff ||
      user.is_superuser)
  );

  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
}

export default AdminRoute;
