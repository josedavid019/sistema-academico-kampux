import React, { useEffect, useState } from 'react';
import SectionHeader from '../../components/SectionHeader';
import MateriaModal from '../../components/MateriaModal';
import { getMaterias, postMateria, putMateria, deleteMateria } from '../../api/academico.api';

export function AdminMaterias() {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => { load(); }, []);
  const load = async () => {
    setLoading(true);
    try {
      const data = await getMaterias();
      setMaterias(data || []);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const handleCreate = () => { setEditing(null); setModalOpen(true); };
  const handleEdit = (m) => { setEditing({ id: m.id, titulo: m.nombre_materia, descripcion: m.descripcion }); setModalOpen(true); };

  const handleDelete = async (id) => {
    if (!confirm('Eliminar materia?')) return;
    try {
      await deleteMateria(id);
      setMaterias((s) => s.filter(x => x.id !== id));
    } catch (err) { console.error(err); alert('Error eliminando'); }
  };

  const handleSave = async (payload) => {
    try {
      if (payload.id) {
        await putMateria(payload.id, { nombre_materia: payload.titulo, descripcion: payload.descripcion });
      } else {
        await postMateria({ nombre_materia: payload.titulo, descripcion: payload.descripcion, numero_creditos: 2 });
      }
      await load();
    } catch (err) { console.error(err); alert('Error guardando materia'); }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Materias" subtitle="Listado de materias registradas" />
        <div className="mt-6">
          <div className="flex justify-end mb-4">
            <button onClick={handleCreate} className="px-4 py-2 bg-blue-900 text-white rounded">+ Nueva materia</button>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            {loading && <div>Cargando...</div>}
            {!loading && (
              <ul className="space-y-2">
                {materias.map(m => (
                  <li key={m.id} className="flex justify-between items-center border-b py-2">
                    <div>
                      <div className="font-semibold">{m.nombre_materia}</div>
                      <div className="text-sm text-gray-600">{m.descripcion}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(m)} className="px-3 py-1 bg-yellow-400 rounded">Editar</button>
                      <button onClick={() => handleDelete(m.id)} className="px-3 py-1 bg-red-500 text-white rounded">Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <MateriaModal open={modalOpen} onClose={() => setModalOpen(false)} initial={editing} onSave={handleSave} />
      </div>
    </div>
  );
}

export default AdminMaterias;
