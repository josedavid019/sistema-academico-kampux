import React, { useState } from "react";

const clasesEjemplo = [
  {
    materia: "ZAFIA-Creatividad e Innovacion REMOTO",
    asignatura: "Creatividad e Innovacion",
    docente: "Agustin Charris Dominguez",
    inicio: "2025-11-17T19:00",
    fin: "2025-11-17T19:45",
    aula: "C28",
    color: "bg-blue-900 text-white",
  },
  {
    materia: "ZISVIIA-Ingeniería de Software II REMOTO",
    asignatura: "Ingeniería de Software II",
    docente: "Laura Martínez",
    inicio: "2025-11-18T18:15",
    fin: "2025-11-18T20:30",
    aula: "B105",
    color: "bg-gray-800 text-white",
  },
  {
    materia: "ZISVIIA-Electiva Disciplinar (Redes)",
    asignatura: "Electiva Disciplinar (Redes)",
    docente: "Carlos Pérez",
    inicio: "2025-11-19T18:15",
    fin: "2025-11-19T20:30",
    aula: "Computo6",
    color: "bg-gray-800 text-white",
  },
  {
    materia: "ZISVIIA-Legislación del Software REMOTO",
    asignatura: "Legislación del Software",
    docente: "Ana Gómez",
    inicio: "2025-11-20T19:45",
    fin: "2025-11-20T20:30",
    aula: "",
    color: "bg-gray-800 text-white",
  },
  {
    materia: "ZISVIIA-Auditoría Informática",
    asignatura: "Auditoría Informática",
    docente: "Juan Rodríguez",
    inicio: "2025-11-21T18:15",
    fin: "2025-11-21T19:45",
    aula: "",
    color: "bg-gray-800 text-white",
  },
  {
    materia: "ZISVIIA-Sistemas de Control",
    asignatura: "Sistemas de Control",
    docente: "María López",
    inicio: "2025-11-21T19:45",
    fin: "2025-11-21T21:15",
    aula: "",
    color: "bg-gray-800 text-white",
  },
];

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const horas = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`); // 8am a 21pm

function getSemana(baseDate) {
  const start = new Date(baseDate);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7)); // Lunes
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function filtrarClasesPorSemana(clases, semana) {
  return clases.filter((clase) => {
    const inicio = new Date(clase.inicio);
    return semana.some((dia) =>
      inicio.getFullYear() === dia.getFullYear() &&
      inicio.getMonth() === dia.getMonth() &&
      inicio.getDate() === dia.getDate()
    );
  });
}

export function Horarios() {
  const [fechaBase, setFechaBase] = useState(new Date());
  const semana = getSemana(fechaBase);
  const clasesSemana = filtrarClasesPorSemana(clasesEjemplo, semana);

  const avanzarSemana = () => {
    const next = new Date(fechaBase);
    next.setDate(next.getDate() + 7);
    setFechaBase(next);
  };
  const retrocederSemana = () => {
    const prev = new Date(fechaBase);
    prev.setDate(prev.getDate() - 7);
    setFechaBase(prev);
  };
  const imprimirHorario = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Horarios de Clases</h1>
        <div className="flex items-center justify-between mb-4 gap-2">
          <button onClick={retrocederSemana} className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700 font-bold hover:bg-blue-200">←</button>
          <div className="font-semibold text-lg text-gray-800">
            {semana[0].toLocaleDateString("es-ES", { day: "numeric", month: "short" })} - {semana[6].toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
          </div>
          <button onClick={avanzarSemana} className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700 font-bold hover:bg-blue-200">→</button>
          <button onClick={imprimirHorario} className="ml-4 px-4 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 shadow">Imprimir horario</button>
        </div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-8 border rounded-lg bg-white shadow">
            <div className="col-span-1 border-r bg-blue-50">
              {horas.map((h) => (
                <div key={h} className="h-12 flex items-center justify-center text-xs text-gray-500 border-b">
                  {h}
                </div>
              ))}
            </div>
            {semana.map((dia, idx) => (
              <div key={idx} className="col-span-1 border-r">
                <div className="h-12 flex items-center justify-center font-bold text-blue-900 border-b bg-blue-100">
                  {diasSemana[dia.getDay() === 0 ? 6 : dia.getDay() - 1]}
                  <br />
                  <span className="text-xs text-gray-500">{dia.getDate()}/{dia.getMonth() + 1}</span>
                </div>
                {/* Renderizar clases en el día */}
                <div className="relative">
                  {clasesSemana.filter((clase) => {
                    const inicio = new Date(clase.inicio);
                    return (
                      inicio.getFullYear() === dia.getFullYear() &&
                      inicio.getMonth() === dia.getMonth() &&
                      inicio.getDate() === dia.getDate()
                    );
                  }).map((clase, i) => {
                    const inicio = new Date(clase.inicio);
                    const fin = new Date(clase.fin);
                    const top = ((inicio.getHours() - 8) * 48) + (inicio.getMinutes() / 60) * 48;
                    const height = ((fin - inicio) / (1000 * 60 * 60)) * 48;
                    return (
                      <div
                        key={i}
                        className={`absolute left-2 right-2 ${clase.color} rounded-lg shadow-lg px-2 py-1 text-xs font-semibold flex flex-col justify-center cursor-pointer hover:ring-2 hover:ring-blue-400`}
                        style={{ top: `${top}px`, height: `${height}px`, zIndex: 10 }}
                      >
                        <span>{clase.materia}</span>
                        <span className="font-normal text-gray-200">{inicio.getHours()}:{inicio.getMinutes().toString().padStart(2, "0")} - {fin.getHours()}:{fin.getMinutes().toString().padStart(2, "0")}</span>
                        {clase.aula && <span className="text-gray-300">{clase.aula}</span>}
                      </div>
                    );
                  })}
                  <div style={{ height: `${14 * 48}px` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
