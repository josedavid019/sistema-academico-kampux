import React, { useEffect, useState } from "react";

export function MatriculaModal({ open, onClose, initial = null, onSave }) {
  const [estudianteEmail, setEstudianteEmail] = useState("");
  const [estudianteNombre, setEstudianteNombre] = useState("");
  const [cargaId, setCargaId] = useState("");
  const [cargaNombre, setCargaNombre] = useState("");
  const [grupo, setGrupo] = useState("");
  const [estado, setEstado] = useState("inscrito");

  // small sample lists to choose from when backend is not ready
  const sampleEstudiantes = [
    { id: 101, email: "juan@example.com", nombre: "Juan", apellido: "Pérez" },
    { id: 102, email: "maria@example.com", nombre: "María", apellido: "Gómez" },
  ];
  const sampleCargas = [
    { id: 11, nombre: "Ingeniería de Software II", grupo: "A" },
    { id: 12, nombre: "Bases de Datos", grupo: "B" },
  ];

  useEffect(() => {
    if (initial) {
      setEstudianteEmail(initial.estudiante?.email || "");
      setEstudianteNombre(
        `${initial.estudiante?.nombre || ""} ${
          initial.estudiante?.apellido || ""
        }`.trim()
      );
      setCargaId(initial.carga?.id || "");
      setCargaNombre(initial.carga?.nombre || "");
      setGrupo(initial.carga?.grupo || "");
      setEstado(initial.estado || "inscrito");
    } else {
      setEstudianteEmail("");
      setEstudianteNombre("");
      setCargaId("");
      setCargaNombre("");
      setGrupo("");
      setEstado("inscrito");
    }
  }, [initial, open]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && open) onClose && onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    const estudiante = {
      id: estudianteEmail,
      email: estudianteEmail,
      nombre: estudianteNombre,
    };
    const carga = { id: cargaId || null, nombre: cargaNombre, grupo };
    const payload = {
      ...initial,
      estudiante,
      carga,
      estado,
      created_at: initial?.created_at || new Date().toISOString(),
    };
    onSave && onSave(payload);
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {initial ? "Editar Matrícula" : "Nueva Matrícula"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Estudiante (email)
            </label>
            <input
              value={estudianteEmail}
              onChange={(e) => setEstudianteEmail(e.target.value)}
              placeholder="email@dominio.com"
              className="w-full p-2 border rounded"
              list="estudiantes-list"
            />
            <datalist id="estudiantes-list">
              {sampleEstudiantes.map((s) => (
                <option
                  key={s.id}
                  value={s.email}
                >{`${s.nombre} ${s.apellido}`}</option>
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Nombre del estudiante (opcional)
            </label>
            <input
              value={estudianteNombre}
              onChange={(e) => setEstudianteNombre(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Carga / Asignatura
            </label>
            <select
              value={cargaId}
              onChange={(e) => {
                const v = e.target.value;
                setCargaId(v);
                const found = sampleCargas.find(
                  (c) => String(c.id) === String(v)
                );
                if (found) {
                  setCargaNombre(found.nombre);
                  setGrupo(found.grupo || "");
                }
              }}
              className="w-full p-2 border rounded"
            >
              <option value="">-- Selecciona carga --</option>
              {sampleCargas.map((c) => (
                <option
                  key={c.id}
                  value={c.id}
                >{`${c.nombre} (g:${c.grupo})`}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Grupo (opcional)
            </label>
            <input
              value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Estado</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="inscrito">inscrito</option>
              <option value="pendiente">pendiente</option>
              <option value="retirado">retirado</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-gray-100 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-blue-900 text-white rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
