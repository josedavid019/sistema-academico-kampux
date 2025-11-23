import React, { useEffect, useState } from 'react';
import SectionHeader from '../../components/SectionHeader';
import { getMaterias } from '../../api/academico.api';

export function AdminMaterias() {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Materias" subtitle="Listado de materias registradas" />
        <div className="bg-white rounded-lg shadow p-4 mt-6">
          {loading && <div>Cargando...</div>}
          {!loading && (
            <ul className="space-y-2">
              {materias.map(m => (
                <li key={m.id} className="flex justify-between items-center border-b py-2">
                  <div>
                    <div className="font-semibold">{m.nombre_materia}</div>
                    <div className="text-sm text-gray-600">{m.descripcion}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminMaterias;
