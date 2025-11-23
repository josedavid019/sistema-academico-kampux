import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import CourseBanner from "../components/CourseBanner";
import SidebarCurso from "../components/SidebarCurso";
import ActivityCard from "../components/ActivityCard";
import ActivityModal from "../components/ActivityModal";
import { getMateria, getCargaAcademicas } from "../api/academico.api";

export function CursoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [curso, setCurso] = useState(null);
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");

  const canEdit = !!(
    user && (user.is_staff || user.role === "docente" || user.role === "administrador" || user.role === "Docente" || user.role === "Administrador")
  );

  // Por ahora usamos datos simulados (mock) para diseño UI.
  useEffect(() => {
    // Intentar cargar materia y cargas desde backend; si falla, caemos al mock
    async function load() {
      setLoading(true);
      try {
        const m = await getMateria(id);
        const cargas = await getCargaAcademicas();
        const cargasMateria = (cargas || []).filter((c) => String(c.materia) === String(id));

        setCurso({
          id: m.id,
          codigo: `M-${m.id}`,
          nombre: m.nombre_materia,
          descripcion: m.descripcion,
        });

        // Mapear cargas a 'actividades' visuales en la UI (horarios como items)
        const acts = (cargasMateria || []).map((c) => ({
          id: c.id,
          titulo: `${c.grupo} — ${c.dia} ${c.hora}`,
          descripcion: `Aula: ${c.aula || '-'} — Docente: ${c.docente || '-'}`,
        }));

        if (acts.length === 0) {
          // Si no hay cargas, crear un par de actividades de ejemplo
          setActividades([
            { id: Date.now() + 1, titulo: "Actividad ejemplo 1", descripcion: "Descripción ejemplo" },
            { id: Date.now() + 2, titulo: "Actividad ejemplo 2", descripcion: "Descripción ejemplo" },
          ]);
        } else {
          setActividades(acts);
        }

        setNuevoTitulo(m.nombre_materia || "");
        setNuevaDescripcion(m.descripcion || "");
      } catch (err) {
        console.warn("Fallo carga desde backend, usando mock:", err);
        // Fallback al mock existente
        const c = {
          id,
          codigo: `C-${id}`,
          nombre: `Curso de ejemplo ${id}`,
          descripcion: `Descripción de ejemplo para el curso ${id}. Esta es solo una maqueta de la interfaz.`,
        };
        const acts = [
          { id: 101, titulo: "Actividad 1", descripcion: "Descripción actividad 1" },
          { id: 102, titulo: "Actividad 2", descripcion: "Descripción actividad 2" },
        ];
        setCurso(c);
        setActividades(acts);
        setNuevoTitulo(c.nombre || "");
        setNuevaDescripcion(c.descripcion || "");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  // Operaciones locales (mock) para diseño. Se integrarán con el backend más tarde.
  const handleAddActividad = () => {
    setEditingActivity(null);
    setModalOpen(true);
  };

  const handleDelete = (actividadId) => {
    if (!confirm("¿Eliminar actividad?")) return;
    setActividades((s) => s.filter((a) => a.id !== actividadId));
  };

  const handleUpdateActividad = (actividadId, cambios) => {
    setActividades((s) => s.map((a) => (a.id === actividadId ? { ...a, ...cambios } : a)));
  };

  const handleModalSave = (payload) => {
    // Si payload tiene id existente, actualizar, si no, crear con id nuevo
    if (payload.id) {
      handleUpdateActividad(payload.id, payload);
    } else {
      const newAct = { ...payload, id: Date.now() };
      setActividades((s) => [newAct, ...s]);
    }
  };

  const handleEditClick = (actividad) => {
    setEditingActivity(actividad);
    setModalOpen(true);
  };

  const handleSaveCurso = () => {
    // Mock: actualizar solo en cliente
    setCurso((c) => ({ ...c, nombre: nuevoTitulo, descripcion: nuevaDescripcion }));
  };

  if (loading) return <div className="p-6">Cargando curso...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!curso) return <div className="p-6">Curso no encontrado</div>;
  // Diseño estilo: banner grande + sidebar + contenido principal
  const sidebarItems = [
    { id: "general", title: "General", children: ["Avisos", "Microcurriculo", "Calendario Academico", "Presentacion Institucional", "Reglamento Estudiantil"] },
    { id: "corte1", title: "Corte 1", children: ["Creatividad e Innovacion", "Link Grabacion Clase 11", "Semana del 18 al 23"] },
  ];

  const scrollTo = (anchor) => {
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Title bar */}
      <div className="bg-blue-900 text-white py-4 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold truncate">{curso.nombre}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <SidebarCurso groups={sidebarItems} onNavigate={scrollTo} />
          </aside>

          {/* Main content */}
          <main className="lg:col-span-9 space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <CourseBanner title={curso.nombre} />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{curso.nombre}</h3>
                    <p className="text-sm text-gray-500">Código: {curso.codigo}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => navigate(-1)} className="px-3 py-2 bg-gray-100 rounded">Volver</button>
                    {canEdit && <button onClick={handleSaveCurso} className="px-3 py-2 bg-blue-900 text-white rounded">Guardar curso</button>}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* General Card */}
                <section id="general-0" className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-lg font-bold mb-3">General</h4>
                  <p className="text-gray-700 mb-4">{curso.descripcion}</p>
                  <div className="prose max-w-none text-sm text-gray-700">
                    <p>
                      En los actuales momentos la creatividad se constituye en una de las ventajas competitivas perdurables que tenemos las
                      personas. El emprender no se puede ver como una etapa sola en el inicio de la vida de una persona, desde sus pilares nos
                      ayuda, no solo a generar negocios o empresas, también se emprenden proyectos personales.
                    </p>
                  </div>
                </section>

                {/* Corte 1 and other sections from sidebar mock */}
                {sidebarItems[1].children.map((it, idx) => (
                  <section key={it} id={`corte1-${idx}`} className="bg-white rounded-lg shadow p-6">
                    <h4 className="font-semibold mb-2">{it}</h4>
                    <p className="text-sm text-gray-600">Contenido de ejemplo para la sección “{it}”. Aquí irían descripciones, enlaces y recursos.</p>
                  </section>
                ))}

                {/* Actividades */}
                <section id="actividades" className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold">Actividades</h4>
                    {canEdit && <button onClick={handleAddActividad} className="px-3 py-2 bg-green-600 text-white rounded">+ Nueva actividad</button>}
                  </div>
                  <div className="space-y-3">
                    {actividades.map((act) => (
                      <ActivityCard key={act.id} actividad={act} onEdit={handleEditClick} onDelete={handleDelete} canEdit={canEdit} />
                    ))}
                  </div>
                  <ActivityModal open={modalOpen} onClose={() => setModalOpen(false)} initial={editingActivity} onSave={handleModalSave} />
                </section>
              </div>

              {/* Right column: metadata, docente, progreso */}
              <aside className="space-y-6">
                <div className="bg-white rounded-lg shadow p-4">
                  <h5 className="font-semibold mb-2">Información</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li><strong>Semestre:</strong> REMOTO 25-2</li>
                    <li><strong>Código:</strong> {curso.codigo}</li>
                    <li><strong>Docente:</strong> Prof. Ejemplo</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <h5 className="font-semibold mb-2">Progreso</h5>
                  <div className="text-sm text-gray-600 mb-2">{Math.min(100, Math.round((actividades.length / Math.max(1, actividades.length + 2)) * 100))}% completado</div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-900 h-2 rounded-full" style={{ width: `${Math.min(100, Math.round((actividades.length / Math.max(1, actividades.length + 2)) * 100))}%` }} /></div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default CursoDetalle;
