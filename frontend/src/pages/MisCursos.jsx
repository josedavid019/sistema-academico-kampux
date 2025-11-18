import React, { useState } from "react";

const cursosEjemplo = [
  {
    id: 1,
    codigo: "ZAFIA",
    nombre: "ZAFIA: Creatividad e Innovación REMOTA 25-2",
    semestre: "SEGUNDO SEMESTRE",
    progreso: 5,
    imagen: "https://via.placeholder.com/300x150/1e3a8a/ffffff?text=Creatividad",
  },
  {
    id: 2,
    codigo: "ZISVIIA",
    nombre: "ZISVIIA: Auditoría Informática 25-2",
    semestre: "SÉPTIMO SEMESTRE",
    progreso: 33,
    imagen: "https://via.placeholder.com/300x150/1e3a8a/ffffff?text=Auditoria",
  },
  {
    id: 3,
    codigo: "ZISVIIA",
    nombre: "ZISVIIA: Electiva Disciplinar (Redes) 25-2",
    semestre: "SÉPTIMO SEMESTRE",
    progreso: 35,
    imagen: "https://via.placeholder.com/300x150/1e3a8a/ffffff?text=Redes",
  },
  {
    id: 4,
    codigo: "ZISVIIA",
    nombre: "ZISVIIA: Ingeniería de Software II 25-2",
    semestre: "SÉPTIMO SEMESTRE",
    progreso: 28,
    imagen: "https://via.placeholder.com/300x150/1e3a8a/ffffff?text=Software",
  },
  {
    id: 5,
    codigo: "ZISVIIA",
    nombre: "ZISVIIA: Legislación del Software REMOTA 25-2",
    semestre: "SÉPTIMO SEMESTRE",
    progreso: 40,
    imagen: "https://via.placeholder.com/300x150/1e3a8a/ffffff?text=Legislacion",
  },
  {
    id: 6,
    codigo: "ZISVIIA",
    nombre: "ZISVIIA: Sistemas de Control 25-2",
    semestre: "SÉPTIMO SEMESTRE",
    progreso: 22,
    imagen: "https://via.placeholder.com/300x150/1e3a8a/ffffff?text=Control",
  },
];

export function MisCursos() {
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [ordenar, setOrdenar] = useState("nombre");

  const cursosFiltrados = cursosEjemplo
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

  const semestraUniqa = ["Todos", ...new Set(cursosEjemplo.map((c) => c.semestre))];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-blue-900 text-white rounded-lg p-6 mb-8">
          <h1 className="text-4xl font-bold">Mis cursos</h1>
        </div>

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
            <div key={curso.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative h-40 bg-gray-200 overflow-hidden">
                <img src={curso.imagen} alt={curso.nombre} className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 bg-blue-900 text-white px-3 py-1 text-xs font-bold">
                  {curso.codigo}
                </div>
                <div className="absolute top-0 right-0 bg-yellow-500 text-gray-900 px-3 py-1 text-xs font-bold">
                  {curso.semestre.split(" ")[0]}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-3 text-sm">{curso.nombre}</h3>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 font-semibold">{curso.progreso}% completado</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-900 h-2 rounded-full" style={{ width: `${curso.progreso}%` }}></div>
                  </div>
                </div>

                <button className="ml-auto block px-3 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-semibold text-sm">
                  ℹ️
                </button>
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
