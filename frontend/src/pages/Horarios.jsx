import React, { useState, useEffect } from "react";
import { getHorarioEstudiantes } from "../api/horarios.api";
import { getMaterias } from "../api/academico.api";
import { getAulas } from "../api/asistencia.api";

// Duración por defecto en minutos para clases (cuando el backend no provee duración)
const DEFAULT_DURATION_MINUTES = 90;

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
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultSearch, setResultSearch] = useState("");
  const [resultPage, setResultPage] = useState(1);
  const [resultPageSize] = useState(20);
  const [resultCount, setResultCount] = useState(0);
  const [resultItems, setResultItems] = useState([]);

  const semana = getSemana(fechaBase);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // obtener horarios (estudiantes) y mapear materia/aula
        const [horariosResp, materiasList, aulasList] = await Promise.all([
          getHorarioEstudiantes({ page: resultPage, page_size: resultPageSize, search: resultSearch }),
          getMaterias(),
          getAulas(),
        ]);

        const horarios = horariosResp.results ?? horariosResp;
        const materias = Array.isArray(materiasList) ? materiasList : materiasList.results ?? materiasList;
        const aulas = Array.isArray(aulasList) ? aulasList : aulasList.results ?? aulasList;

        const materiasMap = new Map(materias.map((m) => [m.id, m]));
        const aulasMap = new Map(aulas.map((a) => [a.id, a]));

        const mapped = (horarios || []).map((h) => {
          // h.materia, h.aula, h.hora (ej: "19:00:00"), h.dia (ej: "Lunes")
          const materiaObj = materiasMap.get(h.materia) || {};
          const aulaObj = aulasMap.get(h.aula) || {};

          // Buscar la fecha de la semana que corresponde al día
          const diaFecha = semana.find((d) => {
            const diaName = diasSemana[d.getDay() === 0 ? 6 : d.getDay() - 1];
            return diaName.toLowerCase() === (h.dia || "").toLowerCase();
          }) || semana[0];

          // construir ISO inicio usando la fecha del día y la hora del registro
          const horaStr = h.hora ? h.hora : "08:00:00"; // fallback
          const yyyy = diaFecha.getFullYear();
          const mm = String(diaFecha.getMonth() + 1).padStart(2, "0");
          const dd = String(diaFecha.getDate()).padStart(2, "0");

          const inicioIso = `${yyyy}-${mm}-${dd}T${horaStr}`;
          const inicio = new Date(inicioIso);
          const fin = new Date(inicio.getTime() + DEFAULT_DURATION_MINUTES * 60 * 1000);

          return {
            id: h.id,
            materia: materiaObj.nombre_materia || materiaObj.nombre || `Materia ${h.materia}`,
            asignatura: materiaObj.nombre_materia || materiaObj.nombre || "",
            docente: h.docente || "",
            inicio: inicio.toISOString(),
            fin: fin.toISOString(),
            aula: aulaObj.nombre_aula || aulaObj.nombre || "",
            color: "bg-blue-900 text-white",
            raw: h,
          };
        });

        if (mounted) {
          setClases(mapped);
          // Si la respuesta es paginada, actualizar resultados
          setResultItems(horarios || []);
          if (horariosResp.count !== undefined) {
            setResultCount(horariosResp.count);
          }
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Error cargando horarios");
          setLoading(false);
        }
      }
    };
    load();
    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fechaBase, resultPage, resultSearch]);

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

  const clasesSemana = filtrarClasesPorSemana(clases, semana);

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

        {loading && <div className="p-4">Cargando horarios...</div>}
        {error && <div className="p-4 text-red-600">{error}</div>}

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
                        title={clase.asignatura}
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

        {/* Panel de resultados */}
        <div className="mt-6 bg-white border rounded-lg p-4 shadow">
          <div className="flex items-center gap-2 mb-4">
            <input
              value={resultSearch}
              onChange={(e) => { setResultSearch(e.target.value); setResultPage(1); }}
              placeholder="Buscar por materia, dia, grupo o estudiante"
              className="flex-1 px-3 py-2 border rounded"
            />
            <button onClick={() => { setResultPage(1); }} className="px-3 py-2 bg-blue-600 text-white rounded">Buscar</button>
          </div>

          <div>
            {loading && <div>Cargando resultados...</div>}
            {!loading && resultItems.length === 0 && <div className="text-sm text-gray-600">No hay resultados.</div>}
            {!loading && resultItems.length > 0 && (
              <div>
                <div className="space-y-2">
                  {resultItems.map((r) => {
                    const materiaName = r.materia_name || r.materia || `Materia ${r.materia}`;
                    const aulaName = r.aula_name || r.aula || "";
                    return (
                      <div key={r.id} className="p-3 border rounded flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{materiaName} <span className="text-xs text-gray-500">({r.grupo})</span></div>
                          <div className="text-sm text-gray-600">Día: {r.dia} • Hora: {r.hora}</div>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          {aulaName}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-600">Total: {resultCount}</div>
                  <div className="flex gap-2">
                    <button disabled={resultPage <= 1} onClick={() => setResultPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded disabled:opacity-50">Anterior</button>
                    <button disabled={resultItems.length < resultPageSize} onClick={() => setResultPage((p) => p + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Siguiente</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
