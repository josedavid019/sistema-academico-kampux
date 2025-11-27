import React, { useState } from "react";
import SectionHeader from "../../components/SectionHeader";

export function CoordinadorEstudiantes() {
  const [filtro, setFiltro] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("estudiante");

  const estudiantes = [
    {
      id: 1,
      nombre: "Juan Pérez García",
      cedula: "1234567890",
      email: "juan.perez@estudiante.edu",
      curso: "Ingeniería de Software II",
      grupo: "A",
      estado: "Activo",
      creditos: 18,
      promedio: 3.8,
    },
    {
      id: 2,
      nombre: "María Gómez López",
      cedula: "0987654321",
      email: "maria.gomez@estudiante.edu",
      curso: "Bases de Datos",
      grupo: "B",
      estado: "Activo",
      creditos: 16,
      promedio: 3.9,
    },
    {
      id: 3,
      nombre: "Carlos Rodríguez Martínez",
      cedula: "1122334455",
      email: "carlos.r@estudiante.edu",
      curso: "Redes de Computadores",
      grupo: "A",
      estado: "En riesgo",
      creditos: 14,
      promedio: 2.1,
    },
    {
      id: 4,
      nombre: "Ana Martínez Silva",
      cedula: "5544332211",
      email: "ana.martinez@estudiante.edu",
      curso: "Ingeniería de Software II",
      grupo: "A",
      estado: "Activo",
      creditos: 20,
      promedio: 4.0,
    },
  ];

  const cursos = [
    {
      id: 1,
      nombre: "Ingeniería de Software II",
      codigo: "INF-3020",
      grupo: "A",
      docente: "Dr. Ronald Castro",
      estudiantes: 35,
      capacidad: 40,
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "Bases de Datos",
      codigo: "INF-2050",
      grupo: "B",
      docente: "Dra. Laura Martínez",
      estudiantes: 28,
      capacidad: 35,
      estado: "Activo",
    },
    {
      id: 3,
      nombre: "Redes de Computadores",
      codigo: "INF-3040",
      grupo: "A",
      docente: "Ing. Carlos Pérez",
      estudiantes: 22,
      capacidad: 30,
      estado: "Activo",
    },
  ];

  const filtrados =
    tipoFiltro === "estudiante"
      ? estudiantes.filter((e) =>
          `${e.nombre} ${e.cedula} ${e.email}`
            .toLowerCase()
            .includes(filtro.toLowerCase())
        )
      : cursos.filter((c) =>
          `${c.nombre} ${c.codigo} ${c.docente}`
            .toLowerCase()
            .includes(filtro.toLowerCase())
        );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Estudiantes y Cursos"
          subtitle="Gestiona estudiantes y cursos bajo tu coordinación"
        />

        {/* Tabs de Vista */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setTipoFiltro("estudiante")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              tipoFiltro === "estudiante"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Estudiantes
          </button>
          <button
            onClick={() => setTipoFiltro("curso")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              tipoFiltro === "curso"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Cursos
          </button>
        </div>

        {/* Búsqueda */}
        <div className="mb-6">
          <input
            type="text"
            placeholder={
              tipoFiltro === "estudiante"
                ? "Buscar por nombre, cédula o email..."
                : "Buscar por nombre, código o docente..."
            }
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Vista de Estudiantes */}
        {tipoFiltro === "estudiante" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Cédula
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Curso/Grupo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Créditos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Promedio
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filtrados.map((estudiante) => (
                    <tr key={estudiante.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {estudiante.nombre}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {estudiante.cedula}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {estudiante.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {estudiante.curso} - {estudiante.grupo}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            estudiante.estado === "Activo"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {estudiante.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {estudiante.creditos}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {estudiante.promedio.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Vista de Cursos */}
        {tipoFiltro === "curso" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtrados.map((curso) => (
              <div key={curso.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {curso.nombre}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Código: {curso.codigo} | Grupo: {curso.grupo}
                    </p>
                  </div>
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    {curso.estado}
                  </span>
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Docente:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {curso.docente}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Estudiantes:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {curso.estudiantes} / {curso.capacidad}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (curso.estudiantes / curso.capacidad) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
