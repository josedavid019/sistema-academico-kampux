import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useClickOutside } from "../hooks/useClickOutside";

export function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAcademico, setShowAcademico] = useState(false);

  const menuRef = useClickOutside(() => setIsMenuOpen(false));

  const handleLogout = () => {
    (async () => {
      await logout();
      setIsMenuOpen(false);
      navigate("/", { replace: true });
    })();
  };

  return (
    <nav className="h-16 bg-[#1f2e40] flex justify-between items-center px-4 md:px-6 shadow-lg">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            className="h-14"
            src="https://i.ibb.co/27cwjzyJ/Logo-Kampux.png"
            alt="Logo Kampux"
          />
          <h1 className="text-white font-bold text-xl hidden sm:block">Kampux</h1>
        </Link>
        {isAuthenticated && (
          <>
            {/* Menú Académico */}
            <div className="relative">
              <button
                onClick={() => setShowAcademico((v) => !v)}
                className="text-white font-medium px-3 py-2 rounded-lg hover:bg-[#2a3f52] transition flex items-center gap-1"
              >
                Académico
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showAcademico && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                  <Link
                    to="/horarios"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setShowAcademico(false)}
                  >
                    Horarios
                  </Link>
                  <Link
                    to="/resultados"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setShowAcademico(false)}
                  >
                    Resultados
                  </Link>
                  <Link
                    to="/prematricula"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setShowAcademico(false)}
                  >
                    Pre-matrícula
                  </Link>
                </div>
              )}
            </div>

            {/* Botón Mis cursos */}
            <Link
              to="/cursos"
              className="text-white font-medium px-3 py-2 rounded-lg hover:bg-[#2a3f52] transition"
            >
              Mis cursos
            </Link>
          </>
        )}
      </div>

      {/* Menú de usuario a la derecha */}
      {isAuthenticated && (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 text-white hover:bg-[#2a3f52] px-3 py-2 rounded-lg transition"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="hidden md:block">{user?.email || 'Usuario'}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 animate-slide-in">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
              </div>
              <Link
                to="/perfil"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Mi Perfil
              </Link>
              <Link
                to="/configuracion"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Configuración
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-200"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      )}

      {!isAuthenticated && (
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-white hover:bg-[#2a3f52] rounded-lg transition font-medium text-sm"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition font-medium text-sm"
          >
            Registrarse
          </Link>
        </div>
      )}
    </nav>
  );
}
