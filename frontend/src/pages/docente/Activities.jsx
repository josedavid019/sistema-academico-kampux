import React, { useState } from "react";
import SectionHeader from "../../components/SectionHeader";

export function DocenteActivities() {
  const [tab, setTab] = useState("tareas");

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Gestión de actividades"
          subtitle="Crea tareas, foros y evaluaciones"
        />

        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTab("tareas")}
              className={`px-3 py-1 rounded ${
                tab === "tareas" ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              Tareas
            </button>
            <button
              onClick={() => setTab("foros")}
              className={`px-3 py-1 rounded ${
                tab === "foros" ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              Foros
            </button>
            <button
              onClick={() => setTab("evaluaciones")}
              className={`px-3 py-1 rounded ${
                tab === "evaluaciones"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Evaluaciones
            </button>
          </div>

          <div>
            {tab === "tareas" && (
              <div>
                <h4 className="font-semibold mb-2">Crear Tarea</h4>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-3"
                >
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Título de la tarea"
                  />
                  <textarea
                    className="w-full p-2 border rounded"
                    rows={4}
                    placeholder="Instrucciones"
                  />
                  <div className="flex gap-2">
                    <input type="date" className="p-2 border rounded" />
                    <button className="bg-blue-600 text-white px-3 py-1 rounded">
                      Crear (sim)
                    </button>
                  </div>
                </form>
              </div>
            )}

            {tab === "foros" && (
              <div>
                <h4 className="font-semibold mb-2">Crear Foro</h4>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-3"
                >
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Título del foro"
                  />
                  <textarea
                    className="w-full p-2 border rounded"
                    rows={4}
                    placeholder="Descripción"
                  />
                  <button className="bg-blue-600 text-white px-3 py-1 rounded">
                    Crear foro (sim)
                  </button>
                </form>
              </div>
            )}

            {tab === "evaluaciones" && (
              <div>
                <h4 className="font-semibold mb-2">Crear Evaluación</h4>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-3"
                >
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Título de la evaluación"
                  />
                  <input type="date" className="p-2 border rounded w-full" />
                  <button className="bg-blue-600 text-white px-3 py-1 rounded">
                    Crear evaluación (sim)
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
