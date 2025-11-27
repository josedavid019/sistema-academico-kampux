import React from "react";
import SectionHeader from "../../components/SectionHeader";

const sampleCourses = [
  {
    id: 1,
    nombre: "Programación I",
    codigo: "PROG101",
    grupo: "A",
    estudiantes: 28,
  },
  {
    id: 2,
    nombre: "Algoritmos",
    codigo: "ALGO201",
    grupo: "B",
    estudiantes: 24,
  },
];

export function DocenteCourses() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Mis cursos"
          subtitle="Lista de cursos a tu cargo"
        />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleCourses.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {c.nombre}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Código: {c.codigo} • Grupo {c.grupo}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Estudiantes: {c.estudiantes}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    Ver curso
                  </button>
                  <button className="bg-gray-100 px-3 py-1 rounded text-sm">
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
