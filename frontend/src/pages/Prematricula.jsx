import React, { useEffect, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import SeleccionAsignaturasModal from '../components/SeleccionAsignaturasModal';
import { getProgramas, getMaterias } from '../api/academico.api';

const programaMock = {
  nombre: 'Ingeniería de Sistemas - Jornada Diurna',
  periodo: '2025-2',
  nivel: 'Séptimo Semestre',
  creditosUsados: 48,
  creditosMax: 64,
  estado: 'Activa',
};

const clasesMock = [
  { id: 1, codigo: 'ZAF101', nombre: 'Creatividad e Innovación', creditos: 2, docente: 'Agustin Charris Dominguez', estado: 'Disponible' },
  { id: 2, codigo: 'ZIS201', nombre: 'Ingeniería de Software II', creditos: 3, docente: 'Ronald Castro Urueta', estado: 'Preinscrito' },
  { id: 3, codigo: 'ZIS305', nombre: 'Electiva Disciplinar (Redes)', creditos: 2, docente: 'Carlos Pérez', estado: 'Disponible' },
  { id: 4, codigo: 'ZIS411', nombre: 'Auditoría Informática', creditos: 3, docente: 'Laura Martínez', estado: 'Disponible' },
  { id: 5, codigo: 'ZIS499', nombre: 'Sistemas de Control', creditos: 3, docente: 'María López', estado: 'Disponible' },
];

export function Prematricula() {
  const [clases, setClases] = useState(clasesMock);
  const [programa, setPrograma] = useState(programaMock);
  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(false);

  // recalcular créditos usando programa actual y clases
  const creditosUsados = (programa?.creditosUsados || programaMock.creditosUsados) + clases.filter(c => c.estado === 'Preinscrito').reduce((s, c) => s + c.creditos, 0) - clasesMock.filter(c => c.estado === 'Preinscrito').reduce((s, c) => s + c.creditos, 0);
  const creditosDisponibles = (programa?.creditosMax || programaMock.creditosMax) - creditosUsados;
  const [query, setQuery] = useState('');
  const [view, setView] = useState('tarjeta');
  const [modalOpen, setModalOpen] = useState(false);

  // Preinscripción desde esta página fue removida; usar "Buscar asignaturas".

  useEffect(() => {
    // fetch programas y materias del backend para reemplazar mocks cuando sea posible
    async function loadData() {
      setLoading(true);
      try {
        const progs = await getProgramas();
        setProgramas(progs || []);
        if (progs && progs.length > 0) {
          const p = progs[0];
          setPrograma({
            nombre: p.nombre_programa,
            periodo: '2025-2',
            nivel: 'N/A',
            creditosUsados: 0,
            creditosMax: p.numero_creditos || 0,
            estado: p.activo ? 'Activa' : 'Inactiva',
          });
        }

        const materias = await getMaterias();
        if (materias && materias.length > 0) {
          // mapear materias a la estructura de clases
          const mapped = materias.slice(0, 8).map((m, idx) => ({
            id: m.id,
            codigo: `M-${m.id}`,
            nombre: m.nombre_materia,
            creditos: m.numero_creditos || 2,
            docente: '-',
            estado: 'Disponible',
          }));
          setClases(mapped);
        }
      } catch (err) {
        console.warn('No se pudo cargar programas/materias desde backend:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  function handleAgregarSeleccionadas(ids) {
    setClases(prev => prev.map(c => ids.includes(c.id) ? { ...c, estado: 'Preinscrito' } : c));
    setModalOpen(false);
  }

  const filtered = clases.filter(c => c.nombre.toLowerCase().includes(query.toLowerCase()) || c.codigo.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title={"Pre-matrícula"} subtitle={"Selecciona las asignaturas para el periodo y confirma tu pre-matrícula."} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6 lg:p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Programa</h2>
                <p className="text-sm text-gray-600">{programaMock.nombre}</p>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-500">Periodo</div>
                <div className="font-semibold">{programaMock.periodo}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-xs text-gray-500">Nivel</div>
                <div className="font-semibold">{programaMock.nivel}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-xs text-gray-500">Estado</div>
                <div className="font-semibold">{programaMock.estado}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-xs text-gray-500">Créditos usados</div>
                <div className="font-semibold">{creditosUsados}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-xs text-gray-500">Créditos disponibles</div>
                <div className="font-semibold">{creditosDisponibles}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Buscar</h3>
              <p className="text-sm text-gray-600 mb-4">Busca y selecciona las asignaturas que quieras agregar a tu pre-matrícula.</p>
            </div>

            <div className="flex flex-col gap-3">
              <button onClick={() => setModalOpen(true)} className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Buscar asignaturas</button>

              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                <div><span className="font-semibold text-gray-800">{clases.filter(c => c.estado === 'Preinscrito').length}</span> asignaturas pre-matriculadas</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Asignaturas disponibles</h3>

          <div className="mb-4">
            <div className="text-sm text-gray-600">Selecciona las asignaturas que quieres pre-matricular.</div>
          </div>

          {/* Mostrar pre-matriculadas */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">Asignaturas pre-matriculadas</h4>
            <div className="flex flex-wrap gap-3">
              {clases.filter(c => c.estado === 'Preinscrito').length === 0 && <div className="text-sm text-gray-500">No hay asignaturas pre-matriculadas.</div>}
              {clases.filter(c => c.estado === 'Preinscrito').map(c => (
                <div key={`pre-${c.id}`} className="bg-green-50 border border-green-200 text-green-800 px-3 py-2 rounded">{c.codigo} - {c.nombre}</div>
              ))}
            </div>
          </div>
        </div>
        <SeleccionAsignaturasModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          asignaturas={clases}
          initiallySelected={clases.filter(c => c.estado === 'Preinscrito').map(c => c.id)}
          onConfirm={handleAgregarSeleccionadas}
        />
      </div>
    </div>
  );
}
