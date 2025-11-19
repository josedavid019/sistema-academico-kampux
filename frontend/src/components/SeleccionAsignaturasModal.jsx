import React, { useState, useEffect } from 'react';

export default function SeleccionAsignaturasModal({ open, onClose, asignaturas, initiallySelected = [], onConfirm }) {
  const [selected, setSelected] = useState(new Set(initiallySelected));
  const [filter, setFilter] = useState('');
  const [semester, setSemester] = useState('');

  useEffect(() => {
    setSelected(new Set(initiallySelected));
  }, [initiallySelected, open]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
    return undefined;
  }, [open]);

  if (!open) return null;

  const toggle = (id) => {
    setSelected(prev => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  };

  const handleConfirm = () => {
    onConfirm(Array.from(selected));
  };

  // Filter asignaturas by search and optional semester field
  const listado = asignaturas.filter(a => {
    const matchesFilter = filter === '' || a.nombre.toLowerCase().includes(filter.toLowerCase()) || a.codigo.toLowerCase().includes(filter.toLowerCase());
    const matchesSemester = semester === '' || (a.semestre && a.semestre.toLowerCase().includes(semester.toLowerCase()));
    return matchesFilter && matchesSemester;
  });

  const semesters = Array.from(new Set(asignaturas.map(a => a.semestre).filter(Boolean))).sort();

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-transparent" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-4/5 lg:w-3/5 border" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">Seleccionar asignaturas para matricular</h3>
          <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>✕</button>
        </div>

          <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:gap-4">
          <div className="flex items-center gap-2 flex-1">
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Buscar por código o asignatura"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-3 md:mt-0 md:w-56">
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Todos los semestres</option>
              {semesters.length === 0 ? (
                <option value="" disabled>No hay semestres disponibles</option>
              ) : (
                semesters.map(s => <option key={s} value={s}>{s}</option>)
              )}
            </select>
          </div>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-sm text-gray-600 sticky top-0 bg-white">
                <th className="p-2 w-8"> </th>
                <th className="p-2">Código</th>
                <th className="p-2">Asignatura</th>
                <th className="p-2">Créditos</th>
                <th className="p-2">Docente</th>
                <th className="p-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {listado.map(a => (
                <tr key={a.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 align-top">
                    <input type="checkbox" checked={selected.has(a.id)} onChange={() => toggle(a.id)} />
                  </td>
                  <td className="p-2 align-top">{a.codigo}</td>
                  <td className="p-2 align-top">{a.nombre}</td>
                  <td className="p-2 align-top">{a.creditos}</td>
                  <td className="p-2 align-top">{a.docente}</td>
                  <td className="p-2 align-top"><span className={`text-xs px-2 py-1 rounded ${a.estado === 'Preinscrito' ? 'bg-green-100 text-green-800' : 'text-gray-600'}`}>{a.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Cancelar</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleConfirm}>Agregar seleccionadas</button>
        </div>
      </div>
    </div>
  );
}
