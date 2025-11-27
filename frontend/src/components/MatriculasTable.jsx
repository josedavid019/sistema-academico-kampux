import React from "react";

export function MatriculasTable({ loading, data = [], onEdit, onDelete }) {
  if (loading) return <div>Cargando...</div>;

  return (
    <div className="overflow-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead>
          <tr className="text-left">
            <th className="px-3 py-2">Estudiante</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Asignatura / Grupo</th>
            <th className="px-3 py-2">Estado</th>
            <th className="px-3 py-2">Fecha</th>
            <th className="px-3 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((m) => (
            <tr key={m.id} className="hover:bg-gray-50">
              <td className="px-3 py-2">
                {m.estudiante?.nombre || "-"} {m.estudiante?.apellido || ""}
              </td>
              <td className="px-3 py-2">{m.estudiante?.email || "-"}</td>
              <td className="px-3 py-2">
                {m.carga?.nombre || "-"}{" "}
                <span className="text-xs text-gray-500">
                  g:{m.carga?.grupo || "N/A"}
                </span>
              </td>
              <td className="px-3 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    m.estado === "inscrito"
                      ? "bg-green-100 text-green-800"
                      : m.estado === "pendiente"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {m.estado}
                </span>
              </td>
              <td className="px-3 py-2">
                {m.created_at
                  ? new Date(m.created_at).toLocaleDateString()
                  : "-"}
              </td>
              <td className="px-3 py-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit && onEdit(m)}
                    className="px-2 py-1 border border-indigo-200 text-indigo-700 rounded text-xs hover:bg-indigo-50"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(m.id)}
                    className="px-2 py-1 border border-red-200 text-red-700 rounded text-xs hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-3 py-6 text-center text-sm text-gray-500"
              >
                No hay matrículas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
