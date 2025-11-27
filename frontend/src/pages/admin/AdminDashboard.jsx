import React from "react";
import SectionHeader from "../../components/SectionHeader";
import { Link } from "react-router-dom";

export function AdminDashboard() {
  // Datos de ejemplo para métricas
  const metrics = {
    totalUsuarios: 145,
    estudiantes: 98,
    docentes: 32,
    coordinadores: 10,
    administradores: 5,
    programas: 8,
    materias: 87,
    cargas: 156,
    matriculas: 342,
  };

  const recentActivities = [
    {
      id: 1,
      tipo: "usuario",
      mensaje: "Nuevo usuario: carlos.lopez@univ.edu",
      fecha: "hace 2 horas",
    },
    {
      id: 2,
      tipo: "matricula",
      mensaje: "Inscripción: Juan Pérez a Ingeniería de Software II",
      fecha: "hace 4 horas",
    },
    {
      id: 3,
      tipo: "materia",
      mensaje: "Materia creada: Electiva de Sistemas",
      fecha: "hace 1 día",
    },
    {
      id: 4,
      tipo: "programa",
      mensaje: "Programa actualizado: Ingeniería de Sistemas",
      fecha: "hace 2 días",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Panel de Administración"
          subtitle="Bienvenido al panel administrativo - gestiona todos los aspectos del sistema"
        />

        {/* Tarjetas de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-gray-500 text-sm font-semibold uppercase">
              Total Usuarios
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              {metrics.totalUsuarios}
            </div>
            <div className="text-xs text-gray-600 mt-2">
              Est: {metrics.estudiantes} | Doc: {metrics.docentes} | Coord:{" "}
              {metrics.coordinadores} | Admin: {metrics.administradores}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-gray-500 text-sm font-semibold uppercase">
              Programas Activos
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              {metrics.programas}
            </div>
            <div className="text-xs text-gray-600 mt-2">
              Matrículas totales: {metrics.matriculas}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="text-gray-500 text-sm font-semibold uppercase">
              Materias
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              {metrics.materias}
            </div>
            <div className="text-xs text-gray-600 mt-2">
              Cargas: {metrics.cargas}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="text-gray-500 text-sm font-semibold uppercase">
              Matrículas
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              {metrics.matriculas}
            </div>
            <div className="text-xs text-gray-600 mt-2">
              Activas este período
            </div>
          </div>
        </div>

        {/* Actividades Recientes y Acciones Rápidas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Actividades Recientes */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Actividades Recientes
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-3 pb-3 border-b border-gray-200 last:border-b-0"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      activity.tipo === "usuario"
                        ? "bg-blue-500"
                        : activity.tipo === "matricula"
                        ? "bg-green-500"
                        : activity.tipo === "materia"
                        ? "bg-purple-500"
                        : "bg-orange-500"
                    }`}
                  >
                    {activity.tipo[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.mensaje}
                    </p>
                    <p className="text-xs text-gray-500">{activity.fecha}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones Rápidas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Acciones Rápidas
            </h3>
            <div className="space-y-2">
              <Link
                to="/admin/usuarios"
                className="block w-full text-center py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm font-medium"
              >
                Crear Usuario
              </Link>
              <Link
                to="/admin/materias"
                className="block w-full text-center py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm font-medium"
              >
                Nueva Materia
              </Link>
              <Link
                to="/admin/programas"
                className="block w-full text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
              >
                Nuevo Programa
              </Link>
              <Link
                to="/admin/matriculas"
                className="block w-full text-center py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition text-sm font-medium"
              >
                Nueva Matrícula
              </Link>
            </div>
          </div>
        </div>

        {/* Opciones de Gestión */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Opciones de Gestión
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/admin/materias"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-t-4 border-blue-500"
            >
              <h3 className="font-semibold text-lg text-gray-900">Materias</h3>
              <p className="text-sm text-gray-600 mt-2">
                Crear, editar y eliminar materias. Total: {metrics.materias}
              </p>
            </Link>

            <Link
              to="/admin/programas"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-t-4 border-green-500"
            >
              <h3 className="font-semibold text-lg text-gray-900">Programas</h3>
              <p className="text-sm text-gray-600 mt-2">
                Gestionar programas académicos. Total: {metrics.programas}
              </p>
            </Link>

            <Link
              to="/admin/matriculas"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-t-4 border-purple-500"
            >
              <h3 className="font-semibold text-lg text-gray-900">
                Matrículas
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Administrar inscripciones. Total: {metrics.matriculas}
              </p>
            </Link>

            <Link
              to="/admin/usuarios"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-t-4 border-orange-500"
            >
              <h3 className="font-semibold text-lg text-gray-900">Usuarios</h3>
              <p className="text-sm text-gray-600 mt-2">
                Crear cuentas y gestionar usuarios. Total:{" "}
                {metrics.totalUsuarios}
              </p>
            </Link>

            <Link
              to="/admin/reportes"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-t-4 border-red-500"
            >
              <h3 className="font-semibold text-lg text-gray-900">Reportes</h3>
              <p className="text-sm text-gray-600 mt-2">
                Generar reportes, estadísticas y exportar datos
              </p>
            </Link>

            <Link
              to="/admin/configuracion"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-t-4 border-indigo-500"
            >
              <h3 className="font-semibold text-lg text-gray-900">
                Configuración
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Períodos académicos, parámetros y permisos
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
