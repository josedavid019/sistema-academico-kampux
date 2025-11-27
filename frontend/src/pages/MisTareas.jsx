import React, { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

export function MisTareas() {
  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");

  // Datos simulados
  const tareas = [
    {
      id: 1,
      titulo: "Ejercicios de Python - Tema 1",
      curso: "Programación I",
      descripcion: "Resolver ejercicios básicos de variables y tipos de datos",
      fechaVencimiento: "2025-11-27",
      estado: "pendiente",
      progreso: 0,
      envios: 0,
      calificacion: null,
      prioridad: "alta",
    },
    {
      id: 2,
      titulo: "Proyecto integrador - Segunda entrega",
      curso: "Ingeniería de Software II",
      descripcion: "Entregar diseño y especificaciones del proyecto",
      fechaVencimiento: "2025-11-28",
      estado: "entregada",
      progreso: 100,
      envios: 1,
      calificacion: 4.5,
      prioridad: "alta",
    },
    {
      id: 3,
      titulo: "Quiz - Algoritmos de ordenamiento",
      curso: "Algoritmos",
      descripcion: "Prueba corta sobre algoritmos vistos en clase",
      fechaVencimiento: "2025-11-26",
      estado: "vencida",
      progreso: 0,
      envios: 0,
      calificacion: null,
      prioridad: "crítica",
    },
    {
      id: 4,
      titulo: "Lectura crítica - Ética en IA",
      curso: "Formación integral",
      descripcion: "Leer y entregar análisis crítico del artículo asignado",
      fechaVencimiento: "2025-12-05",
      estado: "pendiente",
      progreso: 30,
      envios: 0,
      calificacion: null,
      prioridad: "normal",
    },
    {
      id: 5,
      titulo: "Foro de discusión - Tendencias tecnológicas",
      curso: "Programación I",
      descripcion: "Participar en el foro y responder a tus compañeros",
      fechaVencimiento: "2025-12-10",
      estado: "pendiente",
      progreso: 0,
      envios: 0,
      calificacion: null,
      prioridad: "normal",
    },
    {
      id: 6,
      titulo: "Evaluación - Semana 1",
      curso: "Bases de datos",
      descripcion: "Evaluación de los temas vistos en la primera semana",
      fechaVencimiento: "2025-11-22",
      estado: "vencida",
      progreso: 0,
      envios: 0,
      calificacion: 3.8,
      prioridad: "alta",
    },
  ];

  // Filtrar tareas
  let tareasFiltradas = tareas;

  if (filtro !== "todas") {
    tareasFiltradas = tareas.filter((t) => t.estado === filtro);
  }

  if (busqueda) {
    tareasFiltradas = tareasFiltradas.filter(
      (t) =>
        t.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        t.curso.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "entregada":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "pendiente":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case "vencida":
        return <ExclamationCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <DocumentCheckIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "entregada":
        return "bg-green-50 border-green-200";
      case "pendiente":
        return "bg-yellow-50 border-yellow-200";
      case "vencida":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getEstadoText = (estado) => {
    switch (estado) {
      case "entregada":
        return "Entregada";
      case "pendiente":
        return "Pendiente";
      case "vencida":
        return "Vencida";
      default:
        return "Sin información";
    }
  };

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case "crítica":
        return "text-red-700 bg-red-100";
      case "alta":
        return "text-orange-700 bg-orange-100";
      case "normal":
        return "text-blue-700 bg-blue-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const calcularDiasRestantes = (fecha) => {
    const hoy = new Date();
    const vencimiento = new Date(fecha);
    const diff = vencimiento - hoy;
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return dias;
  };

  const stats = {
    total: tareas.length,
    pendientes: tareas.filter((t) => t.estado === "pendiente").length,
    entregadas: tareas.filter((t) => t.estado === "entregada").length,
    vencidas: tareas.filter((t) => t.estado === "vencida").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Mis Tareas y Actividades"
          subtitle="Gestiona todas tus tareas, envíos y actividades académicas"
        />

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-3xl font-bold text-blue-600">
              {stats.total}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Pendientes</div>
            <div className="text-3xl font-bold text-yellow-600">
              {stats.pendientes}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Entregadas</div>
            <div className="text-3xl font-bold text-green-600">
              {stats.entregadas}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Vencidas</div>
            <div className="text-3xl font-bold text-red-600">
              {stats.vencidas}
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar tareas..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["todas", "pendiente", "entregada", "vencida"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFiltro(f)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filtro === f
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de Tareas */}
        <div className="space-y-4">
          {tareasFiltradas.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-500 text-lg">
                No hay tareas con los filtros seleccionados
              </p>
            </div>
          ) : (
            tareasFiltradas.map((tarea) => (
              <div
                key={tarea.id}
                className={`bg-white rounded-lg shadow border-l-4 p-6 hover:shadow-lg transition cursor-pointer ${getEstadoColor(
                  tarea.estado
                )} border-${
                  tarea.estado === "entregada"
                    ? "green"
                    : tarea.estado === "pendiente"
                    ? "yellow"
                    : "red"
                }-300`}
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  {/* Información principal */}
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-3 mb-2">
                      {getEstadoIcon(tarea.estado)}
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {tarea.titulo}
                        </h3>
                        <p className="text-sm text-gray-600">{tarea.curso}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      {tarea.descripcion}
                    </p>
                  </div>

                  {/* Progreso y estado */}
                  <div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-600">
                          Progreso
                        </span>
                        <span className="text-xs font-bold text-gray-900">
                          {tarea.progreso}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            tarea.progreso === 100
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                          style={{ width: `${tarea.progreso}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estado:</span>
                        <span className="font-semibold">
                          {getEstadoText(tarea.estado)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Envíos:</span>
                        <span className="font-semibold">{tarea.envios}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fechas, prioridad y calificación */}
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">
                        Vencimiento
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {new Date(tarea.fechaVencimiento).toLocaleDateString(
                          "es-ES"
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {calcularDiasRestantes(tarea.fechaVencimiento) > 0
                          ? `${calcularDiasRestantes(
                              tarea.fechaVencimiento
                            )} días`
                          : "Vencida"}
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-semibold ${getPrioridadColor(
                          tarea.prioridad
                        )}`}
                      >
                        {tarea.prioridad.charAt(0).toUpperCase() +
                          tarea.prioridad.slice(1)}
                      </span>
                      {tarea.calificacion !== null && (
                        <span className="text-xs px-2 py-1 rounded-full font-semibold bg-green-100 text-green-700">
                          Nota: {tarea.calificacion}
                        </span>
                      )}
                    </div>

                    <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition font-medium">
                      {tarea.estado === "vencida"
                        ? "Ver detalles"
                        : tarea.estado === "entregada"
                        ? "Ver envío"
                        : "Enviar"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
