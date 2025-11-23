import React, { useEffect, useState } from 'react';

export function ActivityModal({ open, onClose, initial = null, onSave }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (initial) {
      setTitulo(initial.titulo || '');
      setDescripcion(initial.descripcion || '');
    } else {
      setTitulo('');
      setDescripcion('');
    }
  }, [initial, open]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && open) onClose && onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...initial, titulo: titulo.trim() || 'Actividad', descripcion };
    onSave && onSave(payload);
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6 transform transition-all scale-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{initial ? 'Editar actividad' : 'Nueva actividad'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Título</label>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Descripción</label>
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={4} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200">Cancelar</button>
            <button type="submit" className="px-3 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivityModal;
