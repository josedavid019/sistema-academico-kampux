import React, { useEffect, useState } from "react";
import { getFacultades } from "../api/academico.api";

export function ProgramaModal({ open, onClose, initial = null, onSave }) {
  const [nombre, setNombre] = useState("");
  const [creditos, setCreditos] = useState(4);
  const [facultad, setFacultad] = useState(null);
  const [facultades, setFacultades] = useState([]);
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    async function loadFacs() {
      try {
        const f = await getFacultades();
        setFacultades(f || []);
      } catch (err) {
        console.error(err);
      }
    }
    loadFacs();
  }, []);

  useEffect(() => {
    if (initial) {
      setNombre(initial.titulo || "");
      setCreditos(initial.numero_creditos ?? 4);
      setFacultad(initial.facultad || null);
      setActivo(initial.activo !== undefined ? initial.activo : true);
    } else {
      setNombre("");
      setCreditos(4);
      setFacultad(null);
      setActivo(true);
    }
  }, [initial, open]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      ...initial,
      titulo: nombre.trim() || "Programa",
      numero_creditos: Number(creditos),
      facultad: facultad || null,
      activo,
    };
    onSave && onSave(payload);
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {initial ? "Editar Programa" : "Nuevo Programa"}
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
            <label className="block text-sm text-gray-700 mb-1">Nombre</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Créditos</label>
            <input
              type="number"
              value={creditos}
              onChange={(e) => setCreditos(e.target.value)}
              className="w-24 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Facultad</label>
            <select
              value={facultad || ""}
              onChange={(e) => setFacultad(e.target.value || null)}
              className="w-full p-2 border rounded"
            >
              <option value="">-- Seleccionar facultad --</option>
              {facultades.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nombre_facultad}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="activo_prog"
              type="checkbox"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
            />
            <label htmlFor="activo_prog" className="text-sm text-gray-700">
              Activo
            </label>
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

export default ProgramaModal;
