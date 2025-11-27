import React from "react";
import SectionHeader from "../../components/SectionHeader";

export function DocenteContent() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Gestión de contenidos"
          subtitle="Sube y organiza material, guías y recursos"
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Subir material</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Título
                </label>
                <input
                  className="mt-1 block w-full p-2 border rounded"
                  placeholder="Nombre del recurso"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Archivo
                </label>
                <input type="file" className="mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  className="mt-1 block w-full p-2 border rounded"
                  rows={4}
                  placeholder="Descripción breve"
                />
              </div>

              <div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  Subir (simulado)
                </button>
              </div>
            </form>
          </div>

          <aside className="bg-white rounded-lg shadow p-6">
            <h4 className="font-semibold mb-2">Recursos recientes</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Guía de clase - PDF</li>
              <li>Presentación Semana 1 - PPTX</li>
              <li>Ejercicios práctico - ZIP</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
