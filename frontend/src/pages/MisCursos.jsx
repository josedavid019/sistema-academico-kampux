import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { getMaterias } from "../api/academico.api";

// Nota: mapeamos los campos de la API de materias a la UI existente.

export function MisCursos() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [ordenar, setOrdenar] = useState("nombre");
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getMaterias();
        // mapear respuesta a la forma esperada por la UI
        const mapped = (data || []).map((m) => ({
          id: m.id,
          codigo: `M-${m.id}`,
          nombre: m.nombre_materia || m.nombre || "Sin nombre",
          semestre: "N/A",
          progreso: 0,
          imagen: `https://via.placeholder.com/600x300/1e3a8a/ffffff?text=${encodeURIComponent(m.nombre_materia || 'Materia')}`,
          descripcion: m.descripcion || "",
        }));
        setMaterias(mapped);
      } catch (err) {
        console.error("No se pudieron cargar materias:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cursosFiltrados = materias
    .filter((curso) => {
      if (filtro !== "Todos" && curso.semestre !== filtro) return false;
      if (busqueda && !curso.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (ordenar === "nombre") return a.nombre.localeCompare(b.nombre);
      if (ordenar === "progreso") return b.progreso - a.progreso;
      return 0;
    });

  const semestraUniqa = ["Todos", ...new Set(materias.map((c) => c.semestre))];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title={"Mis cursos"} subtitle={"Selecciona un curso para ver sus actividades e información."} />

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Vista general de curso</h2>

          <div className="flex flex-wrap gap-3 mb-6">
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              {semestraUniqa.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Buscar"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-900 flex-1 min-w-64"
            />

            <select
              value={ordenar}
              onChange={(e) => setOrdenar(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="nombre">Ordenar por nombre del curso</option>
              <option value="progreso">Ordenar por progreso</option>
            </select>

            <select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900">
              <option>Tarjeta</option>
              <option>Lista</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursosFiltrados.map((curso) => (
            <div
              key={curso.id}
              onClick={() => navigate(`/cursos/${curso.id}`)}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transform transition-all cursor-pointer"
            >
              <div className="relative h-44 bg-gray-200 overflow-hidden">
                <img src={curso.imagen} alt={curso.nombre} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 bg-blue-900 text-white px-3 py-1 text-xs font-bold rounded">{curso.codigo}</div>
                <div className="absolute top-3 right-3 bg-yellow-500 text-gray-900 px-3 py-1 text-xs font-bold rounded">{curso.semestre.split(" ")[0]}</div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm truncate">{curso.nombre}</h3>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600 font-medium">{curso.progreso}% completado</span>
                    <span className="text-xs text-gray-500">{curso.semestre}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-800 to-blue-500 h-2 rounded-full" style={{ width: `${curso.progreso}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/cursos/${curso.id}`);
                    }}
                    title="Ver detalles"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-semibold text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" />
                      <path d="M10 13a3 3 0 100-6 3 3 0 000 6z" className="text-white/90" />
                    </svg>
                    <span className="hidden sm:inline">Detalles</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cursosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron cursos.</p>
          </div>
        )}
      </div>
    </div>
  );
}
