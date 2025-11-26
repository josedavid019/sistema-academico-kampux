import React, { useEffect, useState } from "react";

export function MateriaModal({ open, onClose, initial = null, onSave }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [creditos, setCreditos] = useState(2);
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    if (initial) {
      setNombre(initial.titulo || "");
      setDescripcion(initial.descripcion || "");
      setCreditos(initial.numero_creditos ?? 2);
      setActivo(initial.activo !== undefined ? initial.activo : true);
    } else {
      setNombre("");
      setDescripcion("");
      setCreditos(2);
      setActivo(true);
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
    const payload = {
      ...initial,
      titulo: nombre.trim() || "Materia",
      descripcion,
      numero_creditos: Number(creditos),
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
            {initial ? "Editar Materia" : "Nueva Materia"}
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
            <label className="block text-sm text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="activo"
              type="checkbox"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
            />
            <label htmlFor="activo" className="text-sm text-gray-700">
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

export default MateriaModal;
