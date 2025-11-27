import React, { useState } from "react";
import SectionHeader from "../../components/SectionHeader";

export function AdminReportes() {
  const [reportType, setReportType] = useState("usuarios");
  const [periodo, setPeriodo] = useState("2025-2");
  const [programa, setPrograma] = useState("");
  const [filterEstado, setFilterEstado] = useState("todos");

  // Datos de ejemplo para diferentes reportes
  const reportData = {
    usuarios: [
      {
        id: 1,
        email: "juan@univ.edu",
        nombre: "Juan Pérez",
        rol: "Estudiante",
        estado: "Activo",
      },
      {
        id: 2,
        email: "maria@univ.edu",
        nombre: "María Gómez",
        rol: "Docente",
        estado: "Activo",
      },
      {
        id: 3,
        email: "carlos@univ.edu",
        nombre: "Carlos López",
        rol: "Administrador",
        estado: "Activo",
      },
    ],
    matriculas: [
      {
        id: 1,
        estudiante: "Juan Pérez",
        asignatura: "Ingeniería de Software II",
        estado: "inscrito",
        fecha: "2025-11-01",
      },
      {
        id: 2,
        estudiante: "María Gómez",
        asignatura: "Bases de Datos",
        estado: "inscrito",
        fecha: "2025-11-02",
      },
      {
        id: 3,
        estudiante: "Carlos López",
        asignatura: "Auditoría Informática",
        estado: "pendiente",
        fecha: "2025-11-03",
      },
    ],
    estadisticas: [
      { metrica: "Estudiantes totales", valor: 98 },
      { metrica: "Docentes activos", valor: 32 },
      { metrica: "Programas", valor: 8 },
      { metrica: "Materias", valor: 87 },
      { metrica: "Cargas académicas", valor: 156 },
      { metrica: "Matrículas activas", valor: 342 },
    ],
  };

  const exportToCSV = () => {
    let data = reportData[reportType];
    if (!data || data.length === 0) return;

    let csv = "data:text/csv;charset=utf-8,";
    const headers = Object.keys(data[0]).join(",");
    csv += headers + "\n";

    data.forEach((row) => {
      const values = Object.values(row).join(",");
      csv += values + "\n";
    });

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute(
      "download",
      `reporte_${reportType}_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.click();
  };

  const exportToPDF = () => {
    alert(
      "Función de exportación a PDF será implementada con librería pdfkit o similar"
    );
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Reportes y Estadísticas"
          subtitle="Genera reportes, estadísticas y exporta datos del sistema"
        />

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Filtros y Opciones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Tipo de Reporte
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="usuarios">Usuarios</option>
                <option value="matriculas">Matrículas</option>
                <option value="estadisticas">Estadísticas Generales</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Período Académico
              </label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="2025-1">2025-1</option>
                <option value="2025-2">2025-2</option>
                <option value="2026-1">2026-1</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Programa
              </label>
              <select
                value={programa}
                onChange={(e) => setPrograma(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">-- Todos --</option>
                <option value="ing_sistemas">Ingeniería de Sistemas</option>
                <option value="ing_industrial">Ingeniería Industrial</option>
                <option value="admin">Administración</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Estado</label>
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="todos">Todos</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium"
            >
              Descargar CSV
            </button>
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium"
            >
              Descargar PDF
            </button>
            <button
              onClick={printReport}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
            >
              Imprimir
            </button>
          </div>
        </div>

        {/* Tabla de Datos */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Datos del Reporte:{" "}
            {reportType === "usuarios"
              ? "Usuarios"
              : reportType === "matriculas"
              ? "Matrículas"
              : "Estadísticas"}
          </h3>

          {reportType === "estadisticas" ? (
            // Tabla especial para estadísticas
            <div className="overflow-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Métrica</th>
                    <th className="px-4 py-2 text-left">Valor</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {reportData.estadisticas.map((stat, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium text-gray-900">
                        {stat.metrica}
                      </td>
                      <td className="px-4 py-2">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">
                          {stat.valor}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Tabla estándar para usuarios/matriculas
            <div className="overflow-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead>
                  <tr>
                    {reportType === "usuarios" && (
                      <>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Nombre</th>
                        <th className="px-4 py-2 text-left">Rol</th>
                        <th className="px-4 py-2 text-left">Estado</th>
                      </>
                    )}
                    {reportType === "matriculas" && (
                      <>
                        <th className="px-4 py-2 text-left">Estudiante</th>
                        <th className="px-4 py-2 text-left">Asignatura</th>
                        <th className="px-4 py-2 text-left">Estado</th>
                        <th className="px-4 py-2 text-left">Fecha</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {reportData[reportType].map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      {reportType === "usuarios" && (
                        <>
                          <td className="px-4 py-2 text-gray-900">
                            {row.email}
                          </td>
                          <td className="px-4 py-2 text-gray-900">
                            {row.nombre}
                          </td>
                          <td className="px-4 py-2">
                            <span className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">
                              {row.rol}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                              {row.estado}
                            </span>
                          </td>
                        </>
                      )}
                      {reportType === "matriculas" && (
                        <>
                          <td className="px-4 py-2 text-gray-900">
                            {row.estudiante}
                          </td>
                          <td className="px-4 py-2 text-gray-900">
                            {row.asignatura}
                          </td>
                          <td className="px-4 py-2">
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs ${
                                row.estado === "inscrito"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {row.estado}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            {row.fecha}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Gráficos / Visualizaciones (Placeholder) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Gráfico: Usuarios por Rol
            </h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
              [Gráfico de barras - Implementar con Chart.js]
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Gráfico: Matrículas por Estado
            </h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
              [Gráfico de pastel - Implementar con Chart.js]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
