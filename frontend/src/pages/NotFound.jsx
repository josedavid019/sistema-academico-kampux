import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
        </div>

        <h2 className="text-4xl font-bold text-gray-900 mb-4">Página No Encontrada</h2>

        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Ir al Dashboard
          </Link>
          <Link
            to="/login"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Ir al Login
          </Link>
        </div>

        <div className="mt-12">
          <div className="text-6xl">😕</div>
        </div>
      </div>
    </div>
  );
}
