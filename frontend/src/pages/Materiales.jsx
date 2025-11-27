import React, { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import {
  DocumentArrowDownIcon,
  PlayCircleIcon,
  LinkIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";

export function Materiales() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(1);
  const [busqueda, setBusqueda] = useState("");

  // Datos simulados
  const cursos = [
    { id: 1, nombre: "Programación I" },
    { id: 2, nombre: "Algoritmos" },
    { id: 3, nombre: "Bases de datos" },
  ];

  const materiales = {
    1: [
      {
        id: 1,
        nombre: "Introducción a Python",
        tipo: "pdf",
        tamaño: "2.5 MB",
        fecha: "2025-11-20",
        carpeta: "Tema 1",
      },
      {
        id: 2,
        nombre: "Variables y Tipos de Datos",
        tipo: "pdf",
        tamaño: "1.8 MB",
        fecha: "2025-11-20",
        carpeta: "Tema 1",
      },
      {
        id: 3,
        nombre: "Clase - Conceptos Básicos",
        tipo: "video",
        tamaño: "156 MB",
        fecha: "2025-11-19",
        carpeta: "Videos",
      },
      {
        id: 4,
        nombre: "Documentación oficial Python",
        tipo: "enlace",
        tamaño: "-",
        fecha: "2025-11-18",
        carpeta: "Enlaces",
      },
      {
        id: 5,
        nombre: "Ejercicios Tema 1",
        tipo: "pdf",
        tamaño: "3.2 MB",
        fecha: "2025-11-20",
        carpeta: "Tema 1",
      },
    ],
    2: [
      {
        id: 6,
        nombre: "Algoritmos de Ordenamiento",
        tipo: "pdf",
        tamaño: "2.1 MB",
        fecha: "2025-11-21",
        carpeta: "Ordenamiento",
      },
      {
        id: 7,
        nombre: "Análisis de Complejidad",
        tipo: "video",
        tamaño: "205 MB",
        fecha: "2025-11-21",
        carpeta: "Videos",
      },
    ],
    3: [
      {
        id: 8,
        nombre: "Introducción a SQL",
        tipo: "pdf",
        tamaño: "4.5 MB",
        fecha: "2025-11-22",
        carpeta: "SQL Básico",
      },
      {
        id: 9,
        nombre: "Diagrama ER",
        tipo: "pdf",
        tamaño: "1.2 MB",
        fecha: "2025-11-22",
        carpeta: "Diseño",
      },
    ],
  };

  const materialesDelCurso = materiales[cursoSeleccionado] || [];
  const materialeFiltrados = materialesDelCurso.filter((m) =>
    m.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const carpetas = [
    ...new Set(materialesDelCurso.map((m) => m.carpeta)),
  ].sort();

  const getIcono = (tipo) => {
    switch (tipo) {
      case "pdf":
        return <DocumentArrowDownIcon className="w-5 h-5 text-red-500" />;
      case "video":
        return <PlayCircleIcon className="w-5 h-5 text-blue-500" />;
      case "enlace":
        return <LinkIcon className="w-5 h-5 text-green-500" />;
      default:
        return <FolderIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatearTamaño = (tamaño) => {
    return tamaño === "-" ? "Externo" : tamaño;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Materiales y Recursos"
          subtitle="Accede a los materiales de estudio de tus cursos"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          {/* Sidebar - Cursos */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Mis Cursos</h3>
            <div className="space-y-2">
              {cursos.map((curso) => (
                <button
                  key={curso.id}
                  onClick={() => setCursoSeleccionado(curso.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    cursoSeleccionado === curso.id
                      ? "bg-blue-100 text-blue-900 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {curso.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Buscador */}
            <div className="bg-white rounded-lg shadow p-4">
              <input
                type="text"
                placeholder="Buscar materiales..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Carpetas */}
            {carpetas.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Organizador
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {carpetas.map((carpeta) => (
                    <div
                      key={carpeta}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                    >
                      <FolderIcon className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-gray-700">{carpeta}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lista de Materiales */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Materiales disponibles
              </h3>

              {materialeFiltrados.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No hay materiales disponibles</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {materialeFiltrados.map((material) => (
                    <div
                      key={material.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {getIcono(material.tipo)}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {material.nombre}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {material.carpeta} • {material.fecha}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-600">
                          {formatearTamaño(material.tamaño)}
                        </span>
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 opacity-0 group-hover:opacity-100 transition">
                          {material.tipo === "enlace" ? "Abrir" : "Descargar"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Resumen */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Total de archivos</div>
                <div className="text-2xl font-bold text-blue-600">
                  {materialeFiltrados.length}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Tamaño total</div>
                <div className="text-2xl font-bold text-green-600">
                  {(
                    materialeFiltrados.reduce((sum, m) => {
                      const num = parseInt(m.tamaño);
                      return sum + (isNaN(num) ? 0 : num);
                    }, 0) / 10
                  ).toFixed(1)}{" "}
                  MB
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Actualizado</div>
                <div className="text-2xl font-bold text-purple-600">
                  {materialeFiltrados.length > 0
                    ? materialeFiltrados[0].fecha
                    : "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
