import React from "react";
import SectionHeader from "../../components/SectionHeader";

const sampleStudents = [
  { id: 1, nombre: "Ana Pérez", email: "ana.perez@example.com" },
  { id: 2, nombre: "Luis Gómez", email: "luis.gomez@example.com" },
];

export function DocenteGrades() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Calificaciones y Asistencias"
          subtitle="Registra calificaciones y controla asistencias"
        />

        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                    Alumno
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                    Calificación
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                    Asistencia
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sampleStudents.map((s) => (
                  <tr key={s.id}>
                    <td className="px-3 py-2 text-sm text-gray-800">
                      {s.nombre}
                    </td>
                    <td className="px-3 py-2">
                      <input
                        className="w-24 p-1 border rounded"
                        defaultValue=""
                        placeholder="0-100"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <select
                        className="p-1 border rounded"
                        defaultValue="present"
                      >
                        <option value="present">Presente</option>
                        <option value="absent">Ausente</option>
                        <option value="late">Tarde</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Guardar cambios (sim)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
