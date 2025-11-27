import React from "react";
import SectionHeader from "../../components/SectionHeader";
import { Link } from "react-router-dom";

export function DocenteDashboard() {
  const metrics = {
    cursos: 6,
    estudiantes: 180,
    tareasPendientes: 12,
    mensajes: 4,
  };

  const quickCourses = [
    { id: 1, nombre: "Programación I", grupo: "A", estudiantes: 28 },
    { id: 2, nombre: "Algoritmos", grupo: "B", estudiantes: 24 },
    { id: 3, nombre: "Estructuras de Datos", grupo: "A", estudiantes: 30 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Panel del Docente"
          subtitle="Accede rápidamente a la gestión de tus cursos, contenidos y comunicaciones"
        />

        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-gray-500 text-sm font-semibold uppercase">
              Mis cursos
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              {metrics.cursos}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-gray-500 text-sm font-semibold uppercase">
              Estudiantes
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              {metrics.estudiantes}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="text-gray-500 text-sm font-semibold uppercase">
              Tareas pendientes
            </div>
            <div className="text-3xl font-bold text-yellow-600 mt-2">
              {metrics.tareasPendientes}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
            <div className="text-gray-500 text-sm font-semibold uppercase">
              Mensajes
            </div>
            <div className="text-3xl font-bold text-indigo-600 mt-2">
              {metrics.mensajes}
            </div>
          </div>
        </div>

        {/* Quick view: cursos y acciones */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Mis cursos
            </h3>
            <div className="space-y-3">
              {quickCourses.map((c) => (
                <div
                  key={c.id}
                  className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {c.nombre}{" "}
                      <span className="text-sm text-gray-500">
                        - Grupo {c.grupo}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Estudiantes: {c.estudiantes}
                    </p>
                  </div>
                  <Link
                    to={`/docente/cursos`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Ver curso
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Acciones rápidas
            </h3>
            <div className="space-y-3">
              <Link
                to="/docente/contenidos"
                className="block bg-gray-50 p-3 rounded hover:bg-gray-100"
              >
                Subir material y recursos
              </Link>
              <Link
                to="/docente/actividades"
                className="block bg-gray-50 p-3 rounded hover:bg-gray-100"
              >
                Crear tareas / foros / evaluaciones
              </Link>
              <Link
                to="/docente/estudiantes"
                className="block bg-gray-50 p-3 rounded hover:bg-gray-100"
              >
                Ver lista de estudiantes
              </Link>
              <Link
                to="/docente/calificaciones"
                className="block bg-gray-50 p-3 rounded hover:bg-gray-100"
              >
                Gestionar calificaciones y asistencias
              </Link>
              <Link
                to="/docente/comunicacion"
                className="block bg-gray-50 p-3 rounded hover:bg-gray-100"
              >
                Mensajería y avisos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
