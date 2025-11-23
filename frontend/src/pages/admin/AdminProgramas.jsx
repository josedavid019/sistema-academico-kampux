import React, { useEffect, useState } from 'react';
import SectionHeader from '../../components/SectionHeader';
import { getProgramas } from '../../api/academico.api';

export function AdminProgramas() {
  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { load(); }, []);
  const load = async () => {
    setLoading(true);
    try {
      const data = await getProgramas();
      setProgramas(data || []);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Programas" subtitle="Listado de programas académicos" />
        <div className="bg-white rounded-lg shadow p-4 mt-6">
          {loading && <div>Cargando...</div>}
          {!loading && (
            <ul className="space-y-2">
              {programas.map(p => (
                <li key={p.id} className="flex justify-between items-center border-b py-2">
                  <div>
                    <div className="font-semibold">{p.nombre_programa}</div>
                    <div className="text-sm text-gray-600">{p.descripcion}</div>
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

export default AdminProgramas;
