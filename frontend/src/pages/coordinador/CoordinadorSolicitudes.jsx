import React, { useState } from "react";
import SectionHeader from "../../components/SectionHeader";

export function CoordinadorSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      estudiante: "Juan Pérez García",
      cedula: "1234567890",
      tipo: "Inscripción",
      descripcion: "Solicita inscripción a Redes de Computadores grupo B",
      estado: "Pendiente",
      fecha: "2024-01-20",
      prioridad: "Normal",
      motivo: "Cambio de disponibilidad de horario",
    },
    {
      id: 2,
      estudiante: "María Gómez López",
      cedula: "0987654321",
      tipo: "Cambio de grupo",
      descripcion: "Solicita cambio de Ing. Software II (A) a (B)",
      estado: "Pendiente",
      fecha: "2024-01-19",
      prioridad: "Alta",
      motivo: "Conflicto con actividad laboral",
    },
    {
      id: 3,
      estudiante: "Carlos Rodríguez",
      cedula: "1122334455",
      tipo: "Habilitación",
      descripcion: "Habilitar asignatura: Bases de Datos",
      estado: "Pendiente",
      fecha: "2024-01-18",
      prioridad: "Alta",
      motivo: "Requisito para continuar con requisitos posteriores",
    },
    {
      id: 4,
      estudiante: "Ana Martínez Silva",
      cedula: "5544332211",
      tipo: "Retiro",
      descripcion: "Solicita retiro del curso Auditoría Informática",
      estado: "Aprobado",
      fecha: "2024-01-17",
      prioridad: "Normal",
      motivo: "Razones personales",
    },
  ]);

  const [filtroEstado, setFiltroEstado] = useState("Pendiente");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [notaRechazo, setNotaRechazo] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);
  const [solicitudActual, setSolicitudActual] = useState(null);

  const handleAprobar = (id) => {
    setSolicitudes(
      solicitudes.map((s) => (s.id === id ? { ...s, estado: "Aprobado" } : s))
    );
  };

  const handleRechazar = (id) => {
    setSolicitudes(
      solicitudes.map((s) => (s.id === id ? { ...s, estado: "Rechazado" } : s))
    );
    setNotaRechazo({ ...notaRechazo, [id]: "" });
  };

  const filtradas = solicitudes.filter((s) => {
    const cumpleEstado = s.estado === filtroEstado;
    const cumpleTipo = filtroTipo === "" || s.tipo === filtroTipo;
    return cumpleEstado && cumpleTipo;
  });

  const openDetail = (solicitud) => {
    setSolicitudActual(solicitud);
    setMostrarModal(true);
  };

  const tipos = [...new Set(solicitudes.map((s) => s.tipo))];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Solicitudes Académicas"
          subtitle="Revisa y aprueba solicitudes de inscripción, cambios y habilitaciones"
        />

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Pendiente</option>
                <option>Aprobado</option>
                <option>Rechazado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Solicitud
              </label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas</option>
                {tipos.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resultados: {filtradas.length}
              </label>
              <div className="text-2xl font-bold text-blue-600">
                {filtradas.length}
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Solicitudes */}
        <div className="space-y-4">
          {filtradas.map((solicitud) => (
            <div key={solicitud.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {solicitud.estudiante}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Cédula: {solicitud.cedula}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <span
                        className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                          solicitud.tipo === "Inscripción"
                            ? "bg-blue-100 text-blue-800"
                            : solicitud.tipo === "Cambio de grupo"
                            ? "bg-purple-100 text-purple-800"
                            : solicitud.tipo === "Habilitación"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {solicitud.tipo}
                      </span>
                      <span
                        className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                          solicitud.estado === "Pendiente"
                            ? "bg-yellow-100 text-yellow-800"
                            : solicitud.estado === "Aprobado"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {solicitud.estado}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => openDetail(solicitud)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Ver detalles →
                </button>
              </div>

              <div className="bg-gray-50 rounded p-4 mb-4">
                <p className="text-sm text-gray-900">{solicitud.descripcion}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Motivo:</strong> {solicitud.motivo}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Fecha: {solicitud.fecha}
                </p>
              </div>

              {solicitud.estado === "Pendiente" && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleAprobar(solicitud.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    ✓ Aprobar
                  </button>
                  <button
                    onClick={() => handleRechazar(solicitud.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    ✗ Rechazar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtradas.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600">
              No hay solicitudes {filtroEstado.toLowerCase()} en este momento.
            </p>
          </div>
        )}
      </div>

      {/* Modal de Detalles */}
      {mostrarModal && solicitudActual && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Detalles de Solicitud
            </h2>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Estudiante</p>
                  <p className="font-medium text-gray-900">
                    {solicitudActual.estudiante}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cédula</p>
                  <p className="font-medium text-gray-900">
                    {solicitudActual.cedula}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tipo</p>
                  <p className="font-medium text-gray-900">
                    {solicitudActual.tipo}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estado</p>
                  <p className="font-medium text-gray-900">
                    {solicitudActual.estado}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Descripción</p>
                <p className="text-gray-900 mt-1">
                  {solicitudActual.descripcion}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Motivo/Justificación</p>
                <p className="text-gray-900 mt-1">{solicitudActual.motivo}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Fecha de Solicitud</p>
                <p className="font-medium text-gray-900">
                  {solicitudActual.fecha}
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setMostrarModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg font-medium transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
