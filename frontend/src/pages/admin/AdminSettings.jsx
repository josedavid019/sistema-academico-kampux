import React, { useState } from "react";
import SectionHeader from "../../components/SectionHeader";

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState("periodos");
  const [periodos, setPeriodos] = useState([
    {
      id: 1,
      nombre: "2025-1",
      estado: "Cerrado",
      inicio: "2025-01-15",
      fin: "2025-05-30",
    },
    {
      id: 2,
      nombre: "2025-2",
      estado: "Activo",
      inicio: "2025-08-01",
      fin: "2025-12-15",
    },
  ]);
  const [nuevoPeriodo, setNuevoPeriodo] = useState({
    nombre: "",
    inicio: "",
    fin: "",
  });
  const [showPeriodoModal, setShowPeriodoModal] = useState(false);

  const [parametros, setParametros] = useState({
    creditosMinimos: 12,
    creditosMaximos: 24,
    periodoMatricula: "2025-2",
    permitirRetiro: true,
    diasRetiro: 10,
  });

  const [roles, setRoles] = useState([
    {
      id: 1,
      nombre: "Estudiante",
      permisos: ["ver_cursos", "enviar_trabajos", "ver_calificaciones"],
    },
    {
      id: 2,
      nombre: "Docente",
      permisos: [
        "calificar",
        "crear_actividades",
        "ver_estudiantes",
        "generar_reportes",
      ],
    },
    { id: 3, nombre: "Administrador", permisos: ["todas"] },
  ]);

  const permisosDisponibles = [
    "ver_cursos",
    "enviar_trabajos",
    "ver_calificaciones",
    "calificar",
    "crear_actividades",
    "ver_estudiantes",
    "generar_reportes",
    "crear_usuarios",
    "editar_usuarios",
    "eliminar_usuarios",
    "crear_materias",
    "todas",
  ];

  const addPeriodo = () => {
    if (nuevoPeriodo.nombre && nuevoPeriodo.inicio && nuevoPeriodo.fin) {
      setPeriodos([
        ...periodos,
        { id: Date.now(), ...nuevoPeriodo, estado: "Activo" },
      ]);
      setNuevoPeriodo({ nombre: "", inicio: "", fin: "" });
      setShowPeriodoModal(false);
    }
  };

  const deletePeriodo = (id) => {
    setPeriodos(periodos.filter((p) => p.id !== id));
  };

  const updateParametro = (key, value) => {
    setParametros({ ...parametros, [key]: value });
  };

  const saveParametros = () => {
    alert("Parámetros guardados (simulado)");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Configuración del Sistema"
          subtitle="Gestiona períodos académicos, parámetros y permisos"
        />

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("periodos")}
              className={`px-6 py-3 font-medium transition ${
                activeTab === "periodos"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Períodos Académicos
            </button>
            <button
              onClick={() => setActiveTab("parametros")}
              className={`px-6 py-3 font-medium transition ${
                activeTab === "parametros"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Parámetros del Sistema
            </button>
            <button
              onClick={() => setActiveTab("roles")}
              className={`px-6 py-3 font-medium transition ${
                activeTab === "roles"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Roles y Permisos
            </button>
          </div>

          {/* Períodos Académicos */}
          {activeTab === "periodos" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Períodos Académicos
                </h3>
                <button
                  onClick={() => setShowPeriodoModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
                >
                  + Nuevo Período
                </button>
              </div>

              <div className="overflow-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">Período</th>
                      <th className="px-4 py-3 text-left">Inicio</th>
                      <th className="px-4 py-3 text-left">Fin</th>
                      <th className="px-4 py-3 text-left">Estado</th>
                      <th className="px-4 py-3 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {periodos.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {p.nombre}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{p.inicio}</td>
                        <td className="px-4 py-3 text-gray-600">{p.fin}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                              p.estado === "Activo"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {p.estado}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => deletePeriodo(p.id)}
                            className="text-red-600 hover:text-red-900 text-xs"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Modal Nuevo Período */}
              {showPeriodoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Nuevo Período Académico
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Nombre (ej: 2025-2)
                        </label>
                        <input
                          value={nuevoPeriodo.nombre}
                          onChange={(e) =>
                            setNuevoPeriodo({
                              ...nuevoPeriodo,
                              nombre: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Fecha Inicio
                        </label>
                        <input
                          type="date"
                          value={nuevoPeriodo.inicio}
                          onChange={(e) =>
                            setNuevoPeriodo({
                              ...nuevoPeriodo,
                              inicio: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Fecha Fin
                        </label>
                        <input
                          type="date"
                          value={nuevoPeriodo.fin}
                          onChange={(e) =>
                            setNuevoPeriodo({
                              ...nuevoPeriodo,
                              fin: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setShowPeriodoModal(false)}
                          className="px-4 py-2 bg-gray-100 rounded"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={addPeriodo}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Parámetros del Sistema */}
          {activeTab === "parametros" && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Configuración Global
              </h3>
              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm text-gray-700 font-medium mb-1">
                    Créditos Mínimos
                  </label>
                  <input
                    type="number"
                    value={parametros.creditosMinimos}
                    onChange={(e) =>
                      updateParametro("creditosMinimos", Number(e.target.value))
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 font-medium mb-1">
                    Créditos Máximos
                  </label>
                  <input
                    type="number"
                    value={parametros.creditosMaximos}
                    onChange={(e) =>
                      updateParametro("creditosMaximos", Number(e.target.value))
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 font-medium mb-1">
                    Período de Matrícula Actual
                  </label>
                  <select
                    value={parametros.periodoMatricula}
                    onChange={(e) =>
                      updateParametro("periodoMatricula", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="2025-1">2025-1</option>
                    <option value="2025-2">2025-2</option>
                    <option value="2026-1">2026-1</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="permitirRetiro"
                    checked={parametros.permitirRetiro}
                    onChange={(e) =>
                      updateParametro("permitirRetiro", e.target.checked)
                    }
                  />
                  <label
                    htmlFor="permitirRetiro"
                    className="text-sm text-gray-700 font-medium"
                  >
                    Permitir retiro de asignaturas
                  </label>
                </div>
                {parametros.permitirRetiro && (
                  <div>
                    <label className="block text-sm text-gray-700 font-medium mb-1">
                      Días permitidos para retiro
                    </label>
                    <input
                      type="number"
                      value={parametros.diasRetiro}
                      onChange={(e) =>
                        updateParametro("diasRetiro", Number(e.target.value))
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>
                )}
                <button
                  onClick={saveParametros}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          )}

          {/* Roles y Permisos */}
          {activeTab === "roles" && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Gestión de Roles y Permisos
              </h3>
              <div className="space-y-6">
                {roles.map((rol) => (
                  <div
                    key={rol.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {rol.nombre}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {permisosDisponibles.map((permiso) => (
                        <label
                          key={permiso}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={
                              rol.permisos.includes(permiso) ||
                              rol.permisos.includes("todas")
                            }
                            disabled={rol.permisos.includes("todas")}
                            className="rounded"
                          />
                          <span className="text-gray-700">
                            {permiso.replace(/_/g, " ")}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() =>
                  alert("Cambios en permisos guardados (simulado)")
                }
                className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
              >
                Guardar Permisos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
