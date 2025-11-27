import React from "react";
import SectionHeader from "../../components/SectionHeader";
import { Link } from "react-router-dom";

export function CoordinadorDashboard() {
  const metrics = {
    cursosActivos: 12,
    estudiantes: 245,
    matriculasPendientes: 8,
    solicitudesAprobacion: 5,
    alertas: 3,
  };

  const coursesStatus = [
    {
      id: 1,
      nombre: "Ingeniería de Software II",
      grupo: "A",
      estudiantes: 35,
      estado: "Activo",
      docente: "Dr. Ronald Castro",
    },
    {
      id: 2,
      nombre: "Bases de Datos",
      grupo: "B",
      estudiantes: 28,
      estado: "Activo",
      docente: "Dra. Laura Martínez",
    },
    {
      id: 3,
      nombre: "Redes de Computadores",
      grupo: "A",
      estudiantes: 22,
      estado: "Activo",
      docente: "Ing. Carlos Pérez",
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      tipo: "warning",
      titulo: "Estudiante en riesgo académico",
      mensaje: "Juan Pérez ha reportado 3 inasistencias en Ing. Software II",
      fecha: "hace 2 horas",
    },
    {
      id: 2,
      tipo: "info",
      titulo: "Solicitud de cambio pendiente",
      mensaje: "María Gómez solicita cambio de grupo en Bases de Datos",
      fecha: "hace 4 horas",
    },
    {
      id: 3,
      tipo: "warning",
      titulo: "Profesor sin asignar",
      mensaje:
        "La sección de Auditoría Informática (Grupo C) aún no tiene docente",
      fecha: "hace 1 día",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Panel de Coordinación"
          subtitle="Gestiona cursos, estudiantes y solicitudes académicas"
        />

        {/* Tarjetas de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-gray-500 text-sm font-semibold uppercase">
              Cursos Activos
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              {metrics.cursosActivos}
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
              Matrículas Pendientes
            </div>
            <div className="text-3xl font-bold text-yellow-600 mt-2">
              {metrics.matriculasPendientes}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="text-gray-500 text-sm font-semibold uppercase">
              Solicitudes
            </div>
            <div className="text-3xl font-bold text-orange-600 mt-2">
              {metrics.solicitudesAprobacion}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="text-gray-500 text-sm font-semibold uppercase">
              Alertas
            </div>
            <div className="text-3xl font-bold text-red-600 mt-2">
              {metrics.alertas}
            </div>
          </div>
        </div>

        {/* Estado de Cursos y Alertas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Cursos Activos */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Cursos Bajo Coordinación
            </h3>
            <div className="space-y-3">
              {coursesStatus.map((course) => (
                <div
                  key={course.id}
                  className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {course.nombre} - Grupo {course.grupo}
                      </p>
                      <p className="text-sm text-gray-600">
                        Docente: {course.docente}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Estudiantes: {course.estudiantes}
                      </p>
                    </div>
                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      {course.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alertas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Alertas y Notificaciones
            </h3>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="border-l-4 border-yellow-400 bg-yellow-50 p-3 rounded"
                >
                  <p className="font-medium text-gray-900 text-sm">
                    {alert.titulo}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{alert.mensaje}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.fecha}</p>
                </div>
              ))}
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
              to="/coordinador/estudiantes"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-t-4 border-blue-500"
            >
              <h3 className="font-semibold text-lg text-gray-900">
                Estudiantes y Cursos
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Ver lista de estudiantes, cursos y sus detalles
              </p>
            </Link>

            <Link
              to="/coordinador/solicitudes"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-t-4 border-orange-500"
            >
              <h3 className="font-semibold text-lg text-gray-900">
                Solicitudes Académicas
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Revisar y aprobar inscripciones, cambios y habilitaciones
              </p>
            </Link>

            <Link
              to="/coordinador/docentes"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-t-4 border-green-500"
            >
              <h3 className="font-semibold text-lg text-gray-900">
                Asignación de Docentes
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Asignar docentes a cursos, ver disponibilidad y grupos
              </p>
            </Link>

            <Link
              to="/coordinador/reportes"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-t-4 border-purple-500"
            >
              <h3 className="font-semibold text-lg text-gray-900">Reportes</h3>
              <p className="text-sm text-gray-600 mt-2">
                Generar reportes de su área académica
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
