import React from "react";
import SectionHeader from "../../components/SectionHeader";
import { Link } from "react-router-dom";

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Administración"
          subtitle="Panel administrativo - gestiona materias, programas y usuarios"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Link
            to="/admin/materias"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">Materias</h3>
            <p className="text-sm text-gray-600 mt-2">
              Crear, editar y eliminar materias.
            </p>
          </Link>

          <Link
            to="/admin/programas"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">Programas</h3>
            <p className="text-sm text-gray-600 mt-2">
              Gestionar programas académicos.
            </p>
          </Link>

          <Link
            to="/admin/usuarios"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">Usuarios</h3>
            <p className="text-sm text-gray-600 mt-2">
              Crear cuentas de estudiantes/docentes/administradores.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
