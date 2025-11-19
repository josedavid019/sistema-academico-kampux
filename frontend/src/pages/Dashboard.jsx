import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";

// Datos de ejemplo para tareas y calendario
const tareasEjemplo = [
  {
    id: 1,
    fecha: "2025-11-19",
    hora: "00:00",
    titulo: "ACTIVIDAD 3 CORTE 3",
    descripcion:
      "Vencimiento de Tarea - ZISVIIA-Electiva Disciplinar (Redes) 25-2",
  },
  {
    id: 2,
    fecha: "2025-11-19",
    hora: "23:59",
    titulo: "Protección de datos",
    descripcion:
      "Vencimiento de Tarea - ZISVIIA-Legislación del Software REMOTO 25-2",
  },
  {
    id: 3,
    fecha: "2025-11-21",
    hora: "00:00",
    titulo:
      "ACTIVIDAD PRÁCTICA: Instalación de Splunk y Análisis Básico de Logs",
    descripcion: "Vencimiento de Tarea - ZISVIIA-Auditoría Informática 25-2",
  },
];

function getDiasDelMes(year, month) {
  const dias = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    dias.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dias;
}

export function Dashboard() {
  const { user } = useAuthStore();
  const nombre = user?.nombre || "Estudiante";

  // Calendario
  const hoy = new Date();
  const year = hoy.getFullYear();
  const month = hoy.getMonth();
  const diasMes = getDiasDelMes(year, month);

  // Agrupar tareas por fecha
  const tareasPorFecha = tareasEjemplo.reduce((acc, tarea) => {
    if (!acc[tarea.fecha]) acc[tarea.fecha] = [];
    acc[tarea.fecha].push(tarea);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Saludo */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            ¡Hola, {nombre}! <span className="text-2xl">👋</span>
          </h1>
        </div>

        {/* Línea de tiempo de tareas */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Línea de tiempo
          </h2>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <select className="border rounded-lg px-3 py-2 text-gray-700">
              <option>Próximos 7 días</option>
              <option>Próximos 30 días</option>
            </select>
            <select className="border rounded-lg px-3 py-2 text-gray-700">
              <option>Ordenar por fecha</option>
              <option>Ordenar por materia</option>
            </select>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 flex-1"
              placeholder="Buscar por tipo o nombre de actividad"
            />
          </div>
          {/* Tareas agrupadas por fecha */}
          {Object.entries(tareasPorFecha).map(([fecha, tareas]) => (
            <div key={fecha} className="mb-6">
              <div className="font-semibold text-gray-700 mb-2">
                {new Date(fecha).toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              {tareas.map((tarea) => (
                <div
                  key={tarea.id}
                  className="flex items-center justify-between bg-blue-50 rounded-lg p-4 mb-2 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                      <span>📄</span>
                    </div>
                    <div>
                      <div className="font-bold text-pink-700 text-base">
                        {tarea.titulo}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {tarea.descripcion}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 font-semibold">
                    {tarea.hora}
                  </div>
                  <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition">
                    Agregar entrega
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Calendario de vencimientos */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Calendario</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th className="py-2">Lun</th>
                  <th>Mar</th>
                  <th>Mié</th>
                  <th>Jue</th>
                  <th>Vie</th>
                  <th>Sáb</th>
                  <th>Dom</th>
                </tr>
              </thead>
              <tbody>
                {/* Renderizar semanas */}
                {(() => {
                  const semanas = [];
                  let semana = [];
                  let diaInicio = new Date(year, month, 1).getDay();
                  if (diaInicio === 0) diaInicio = 7; // Domingo como 7
                  // Primera semana
                  for (let i = 1; i < diaInicio; i++) {
                    semana.push(<td key={"empty-" + i}></td>);
                  }
                  diasMes.forEach((dia, idx) => {
                    const fechaStr = dia.toISOString().slice(0, 10);
                    const tareasDia = tareasPorFecha[fechaStr] || [];
                    semana.push(
                      <td key={fechaStr} className="align-top h-20 w-20">
                        <div className="font-semibold text-gray-700">
                          {dia.getDate()}
                        </div>
                        {/* Mostrar vencimientos */}
                        {tareasDia.map((tarea) => (
                          <div
                            key={tarea.id}
                            className="mt-1 text-xs bg-pink-100 text-pink-700 rounded px-2 py-1 font-medium"
                          >
                            {tarea.titulo}
                          </div>
                        ))}
                      </td>
                    );
                    if (
                      (dia.getDay() === 0 && semana.length) ||
                      idx === diasMes.length - 1
                    ) {
                      // Fin de semana o fin de mes
                      while (semana.length < 7)
                        semana.push(
                          <td key={"empty-end-" + semana.length}></td>
                        );
                      semanas.push(
                        <tr key={"semana-" + semanas.length}>{semana}</tr>
                      );
                      semana = [];
                    }
                  });
                  return semanas;
                })()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
