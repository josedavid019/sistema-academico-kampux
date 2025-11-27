import React, { useState } from "react";
import SectionHeader from "../../components/SectionHeader";

export function CoordinadorReportes() {
  const [periodo, setPeriodo] = useState("2024-I");
  const [tipoReporte, setTipoReporte] = useState("matriculas");

  const reportesData = {
    matriculas: [
      {
        curso: "Ingeniería de Software II",
        grupo: "A",
        inscritos: 35,
        aprobados: 32,
        reprobados: 2,
        retirados: 1,
        promedio: 3.7,
      },
      {
        curso: "Bases de Datos",
        grupo: "B",
        inscritos: 28,
        aprobados: 26,
        reprobados: 1,
        retirados: 1,
        promedio: 3.8,
      },
      {
        curso: "Redes de Computadores",
        grupo: "A",
        inscritos: 22,
        aprobados: 20,
        reprobados: 2,
        retirados: 0,
        promedio: 3.5,
      },
    ],
    estadisticas: [
      { metrica: "Total Estudiantes", valor: 245, variacion: "+5%" },
      { metrica: "Tasa de Retención", valor: "94.2%", variacion: "+2.1%" },
      { metrica: "Promedio General", valor: 3.65, variacion: "+0.15" },
      { metrica: "Tasa de Aprobación", valor: "95.8%", variacion: "+1.2%" },
      { metrica: "Estudiantes en Riesgo", valor: 8, variacion: "-2" },
      { metrica: "Cursos Activos", valor: 12, variacion: "0" },
    ],
    estudiantes: [
      {
        nombre: "Juan Pérez García",
        cedula: "1234567890",
        programa: "Ingeniería de Sistemas",
        creditosAprobados: 48,
        creditosCursando: 18,
        promedio: 3.8,
        estado: "Normal",
      },
      {
        nombre: "María Gómez López",
        cedula: "0987654321",
        programa: "Ingeniería de Sistemas",
        creditosAprobados: 52,
        creditosCursando: 16,
        promedio: 3.9,
        estado: "Normal",
      },
      {
        nombre: "Carlos Rodríguez",
        cedula: "1122334455",
        programa: "Ingeniería de Sistemas",
        creditosAprobados: 36,
        creditosCursando: 14,
        promedio: 2.1,
        estado: "En Riesgo",
      },
    ],
  };

  const exportarCSV = () => {
    let csv = "";
    let datos = [];

    if (tipoReporte === "matriculas") {
      csv = "Curso,Grupo,Inscritos,Aprobados,Reprobados,Retirados,Promedio\n";
      datos = reportesData.matriculas.map(
        (r) =>
          `${r.curso},${r.grupo},${r.inscritos},${r.aprobados},${r.reprobados},${r.retirados},${r.promedio}`
      );
    } else if (tipoReporte === "estadisticas") {
      csv = "Métrica,Valor,Variación\n";
      datos = reportesData.estadisticas.map(
        (e) => `${e.metrica},${e.valor},${e.variacion}`
      );
    } else {
      csv =
        "Nombre,Cédula,Programa,Créditos Aprobados,Créditos Cursando,Promedio,Estado\n";
      datos = reportesData.estudiantes.map(
        (e) =>
          `${e.nombre},${e.cedula},${e.programa},${e.creditosAprobados},${e.creditosCursando},${e.promedio},${e.estado}`
      );
    }

    csv += datos.join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `reporte-${tipoReporte}-${periodo}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Reportes del Área"
          subtitle="Estadísticas y análisis de tu programa académico"
        />

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Período
              </label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>2024-I</option>
                <option>2023-II</option>
                <option>2023-I</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Reporte
              </label>
              <select
                value={tipoReporte}
                onChange={(e) => setTipoReporte(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="matriculas">Matrículas por Curso</option>
                <option value="estadisticas">Estadísticas Generales</option>
                <option value="estudiantes">Desempeño de Estudiantes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exportar
              </label>
              <button
                onClick={exportarCSV}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                📥 Descargar CSV
              </button>
            </div>
          </div>
        </div>

        {/* Reporte de Matrículas */}
        {tipoReporte === "matriculas" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Matrículas por Curso - Período {periodo}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Curso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Grupo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Inscritos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Aprobados
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Reprobados
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Retirados
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Promedio
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reportesData.matriculas.map((reporte, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {reporte.curso}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {reporte.grupo}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {reporte.inscritos}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {reporte.aprobados}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                          {reporte.reprobados}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {reporte.retirados}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {reporte.promedio}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reporte de Estadísticas */}
        {tipoReporte === "estadisticas" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportesData.estadisticas.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm">{stat.metrica}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stat.valor}
                </p>
                <p
                  className={`text-xs mt-2 font-medium ${
                    stat.variacion.includes("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.variacion} vs período anterior
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Reporte de Estudiantes */}
        {tipoReporte === "estudiantes" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Desempeño de Estudiantes - Período {periodo}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Cédula
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Programa
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Créditos Aprobados
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Créditos Cursando
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Promedio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reportesData.estudiantes.map((est, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {est.nombre}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {est.cedula}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {est.programa}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {est.creditosAprobados}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {est.creditosCursando}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {est.promedio}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            est.estado === "Normal"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {est.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
