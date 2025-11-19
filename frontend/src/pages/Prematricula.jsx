import React, { useState } from 'react';
import SeleccionAsignaturasModal from '../components/SeleccionAsignaturasModal';

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
  const creditosUsados = programaMock.creditosUsados + clases.filter(c => c.estado === 'Preinscrito').reduce((s, c) => s + c.creditos, 0) - clasesMock.filter(c => c.estado === 'Preinscrito').reduce((s, c) => s + c.creditos, 0);
  const creditosDisponibles = programaMock.creditosMax - creditosUsados;
  const [query, setQuery] = useState('');
  const [view, setView] = useState('tarjeta');
  const [modalOpen, setModalOpen] = useState(false);

  function togglePreinscripcion(id) {
    setClases(prev => prev.map(c => c.id === id ? { ...c, estado: c.estado === 'Preinscrito' ? 'Disponible' : 'Preinscrito' } : c));
  }

  function handleAgregarSeleccionadas(ids) {
    setClases(prev => prev.map(c => ids.includes(c.id) ? { ...c, estado: 'Preinscrito' } : c));
    setModalOpen(false);
  }

  const filtered = clases.filter(c => c.nombre.toLowerCase().includes(query.toLowerCase()) || c.codigo.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-blue-900 text-white rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold">Pre-matrícula</h1>
          <p className="text-blue-100 mt-1">Selecciona las asignaturas para el periodo y confirma tu pre-matrícula.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 bg-white rounded-lg shadow p-6">
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

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Acciones</h3>
            <div className="flex flex-col gap-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Confirmar pre-matrícula</button>
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={() => { setClases(clasesMock); setQuery(''); }}>Limpiar selección</button>
              <div className="flex gap-2 items-center mt-2">
                <select value={view} onChange={e => setView(e.target.value)} className="px-3 py-2 border rounded">
                  <option value="tarjeta">Tarjeta</option>
                  <option value="lista">Lista</option>
                </select>
                <input value={query} onChange={e => setQuery(e.target.value)} className="px-3 py-2 border rounded flex-1" placeholder="Buscar por código o nombre" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Asignaturas disponibles</h3>

          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">Selecciona las asignaturas que quieres pre-matricular.</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setModalOpen(true)} className="px-3 py-2 bg-blue-600 text-white rounded">Buscar asignaturas</button>
            </div>
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

          {view === 'tarjeta' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(c => (
                <div key={c.id} className="border rounded-lg overflow-hidden shadow-sm bg-gray-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-xs text-gray-500">{c.codigo}</div>
                        <div className="font-semibold text-gray-800">{c.nombre}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{c.creditos} cr</div>
                        <div className={`text-xs mt-1 ${c.estado === 'Preinscrito' ? 'text-green-700' : 'text-gray-500'}`}>{c.estado}</div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-3">Docente: {c.docente}</div>

                    <div className="flex gap-2">
                      <button onClick={() => togglePreinscripcion(c.id)} className={`px-3 py-2 rounded text-sm font-semibold ${c.estado === 'Preinscrito' ? 'bg-red-100 text-red-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                        {c.estado === 'Preinscrito' ? 'Cancelar' : 'Preinscribir'}
                      </button>
                      <button className="px-3 py-2 rounded text-sm bg-white border">Ver</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th className="p-2">Código</th>
                  <th className="p-2">Nombre</th>
                  <th className="p-2">Créditos</th>
                  <th className="p-2">Docente</th>
                  <th className="p-2">Estado</th>
                  <th className="p-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} className="border-t">
                    <td className="p-2">{c.codigo}</td>
                    <td className="p-2">{c.nombre}</td>
                    <td className="p-2">{c.creditos}</td>
                    <td className="p-2">{c.docente}</td>
                    <td className="p-2">{c.estado}</td>
                    <td className="p-2"><button onClick={() => togglePreinscripcion(c.id)} className={`px-3 py-1 rounded ${c.estado === 'Preinscrito' ? 'bg-red-100 text-red-700' : 'bg-blue-600 text-white'}`}>{c.estado === 'Preinscrito' ? 'Cancelar' : 'Preinscribir'}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-8 text-gray-500">No se encontraron asignaturas.</div>
          )}
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
