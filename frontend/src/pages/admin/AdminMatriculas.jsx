import React, { useEffect, useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import { MatriculasTable } from "../../components/MatriculasTable";
import { MatriculaModal } from "../../components/MatriculaModal";

export function AdminMatriculas() {
  const [matriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    // Cargar datos de ejemplo / stubs mientras no exista API
    setLoading(true);
    try {
      const sample = [
        {
          id: 1,
          estudiante: {
            id: 101,
            nombre: "Juan",
            apellido: "Pérez",
            email: "juan@example.com",
          },
          carga: {
            id: 11,
            nombre: "Ingeniería de Software II",
            grupo: "A",
            dia: "Lunes",
            hora: "08:00",
          },
          estado: "inscrito",
          created_at: "2025-11-01",
        },
        {
          id: 2,
          estudiante: {
            id: 102,
            nombre: "María",
            apellido: "Gómez",
            email: "maria@example.com",
          },
          carga: {
            id: 12,
            nombre: "Bases de Datos",
            grupo: "B",
            dia: "Martes",
            hora: "10:00",
          },
          estado: "pendiente",
          created_at: "2025-11-02",
        },
      ];
      setMatriculas(sample);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (m) => {
    setEditing(m);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (!confirm("¿Eliminar matrícula?")) return;
    setMatriculas((s) => s.filter((x) => x.id !== id));
  };

  const handleSave = (payload) => {
    if (payload.id) {
      setMatriculas((s) => s.map((x) => (x.id === payload.id ? payload : x)));
    } else {
      const next = { ...payload, id: Date.now() };
      setMatriculas((s) => [next, ...s]);
    }
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Matrículas"
          subtitle="Gestiona inscripciones de estudiantes a cargas académicas"
        />

        <div className="mt-6 mb-4 flex justify-end">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-900 text-white rounded"
          >
            + Nueva matrícula
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <MatriculasTable
            loading={loading}
            data={matriculas}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <MatriculaModal
          open={modalOpen}
          initial={editing}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}

export default AdminMatriculas;
