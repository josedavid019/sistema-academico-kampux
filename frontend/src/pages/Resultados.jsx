import React from "react";

const resultados = [
  {
    materia: "Sistemas de Control",
    profesor: "Fernandez Ebrath Bryan Josser",
    periodo: "2025-2",
    cortes: [
      { nombre: "Parcial 1", porcentaje: 30, nota: 5.0 },
      { nombre: "Parcial 2", porcentaje: 30, nota: 4.7 },
      { nombre: "Parcial 3", porcentaje: 40, nota: null },
    ],
    notaAcumulada: 2.9,
    estado: "En Curso",
    inasistencias: 0,
  },
  {
    materia: "Legislación del Software",
    profesor: "Sorkar Gallardo Cecilia Teresa",
    periodo: "2025-2",
    cortes: [
      { nombre: "Parcial 1", porcentaje: 30, nota: 4.7 },
      { nombre: "Parcial 2", porcentaje: 30, nota: 5.0 },
      { nombre: "Parcial 3", porcentaje: 40, nota: null },
    ],
    notaAcumulada: 3.5,
    estado: "En Curso",
    inasistencias: 0,
  },
];

export function Resultados() {
  const promedio = 4.06;
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Resultados de Evaluación</h1>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div>
              <label className="font-semibold text-gray-700 mr-2">Programa:</label>
              <select className="border rounded-lg px-3 py-2 text-gray-700">
                <option>Ingeniería de Sistema y Computación</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-gray-700 mr-2">Período:</label>
              <select className="border rounded-lg px-3 py-2 text-gray-700">
                <option>Todos</option>
              </select>
            </div>
            <div className="flex-1 text-right">
              <span className="text-lg font-bold text-blue-700">Promedio acumulado</span>
              <div className="text-3xl font-bold text-blue-900">{promedio}</div>
            </div>
          </div>
          {resultados.map((res, idx) => (
            <div key={idx} className="mb-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="font-bold text-lg text-blue-900">{res.materia}</div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">{res.estado}</span>
                <span className="text-xs text-gray-500">Inasistencias: {res.inasistencias}</span>
              </div>
              <div className="text-sm text-gray-700 mb-2">{res.profesor} | Período: {res.periodo}</div>
              <table className="w-full mb-2">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="py-2 px-4 text-left">Evaluación</th>
                    <th className="py-2 px-4 text-left">Porcentaje</th>
                    <th className="py-2 px-4 text-left">Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {res.cortes.map((corte, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 px-4">{corte.nombre}</td>
                      <td className="py-2 px-4">{corte.porcentaje}%</td>
                      <td className="py-2 px-4">{corte.nota !== null ? corte.nota : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-700">Nota acumulada:</span>
                <span className={`px-3 py-1 rounded-full font-bold text-white ${res.notaAcumulada < 3 ? 'bg-red-400' : 'bg-blue-600'}`}>{res.notaAcumulada}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
