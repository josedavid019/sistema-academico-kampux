import React, { useEffect, useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import ProgramaModal from "../../components/ProgramaModal";
import {
  getProgramas,
  postPrograma,
  putPrograma,
  deletePrograma,
} from "../../api/academico.api";

export function AdminProgramas() {
  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);
    try {
      const data = await getProgramas();
      setProgramas(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const handleEdit = (p) => {
    setEditing({
      id: p.id,
      titulo: p.nombre_programa,
      descripcion: p.descripcion,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Eliminar programa?")) return;
    try {
      await deletePrograma(id);
      setProgramas((s) => s.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error eliminando");
    }
  };

  const handleSave = async (payload) => {
    try {
      if (payload.id) {
        await putPrograma(payload.id, {
          nombre_programa: payload.titulo,
          descripcion: payload.descripcion,
        });
      } else {
        await postPrograma({
          nombre_programa: payload.titulo,
          descripcion: payload.descripcion,
        });
      }
      await load();
    } catch (err) {
      console.error(err);
      alert("Error guardando programa");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Programas"
          subtitle="Listado de programas académicos"
        />
        <div className="mt-6">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-900 text-white rounded"
            >
              + Nuevo programa
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            {loading && <div>Cargando...</div>}
            {!loading && (
              <ul className="space-y-2">
                {programas.map((p) => (
                  <li
                    key={p.id}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div>
                      <div className="font-semibold">{p.nombre_programa}</div>
                      <div className="text-sm text-gray-600">
                        {p.descripcion}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="px-3 py-1 bg-yellow-400 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <ProgramaModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          initial={editing}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
