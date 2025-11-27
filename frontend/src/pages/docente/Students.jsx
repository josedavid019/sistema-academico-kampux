import React from "react";
import SectionHeader from "../../components/SectionHeader";

const sampleStudents = [
  {
    id: 1,
    nombre: "Ana Pérez",
    email: "ana.perez@example.com",
    programa: "Ingeniería de Sistemas",
  },
  {
    id: 2,
    nombre: "Luis Gómez",
    email: "luis.gomez@example.com",
    programa: "Ingeniería de Sistemas",
  },
];

export function DocenteStudents() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Estudiantes inscritos"
          subtitle="Lista de estudiantes del curso seleccionado"
        />

        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                    #
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                    Nombre
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                    Correo
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                    Programa
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sampleStudents.map((s, i) => (
                  <tr key={s.id}>
                    <td className="px-3 py-2 text-sm text-gray-700">{i + 1}</td>
                    <td className="px-3 py-2 text-sm text-gray-800">
                      {s.nombre}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-600">
                      {s.email}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-600">
                      {s.programa}
                    </td>
                    <td className="px-3 py-2 text-sm">
                      <button className="text-blue-600 hover:underline">
                        Ver perfil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
