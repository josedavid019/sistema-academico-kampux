import React, { useEffect, useState } from 'react';
import SectionHeader from '../../components/SectionHeader';
import {
  registerUsuario,
  postAdministrador,
  postDocente,
  postEstudiante,
  getDocentes,
  getEstudiantes,
  getAdministradores,
  putUsuario,
  deleteUsuario,
} from '../../api/usuarios.api';
import { toastSuccess, toastError } from '../../utils/toast';
import { getFacultades, getProgramas } from '../../api/academico.api';



function randomPassword(len = 10) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export function AdminUsuarios() {
  const [facultades, setFacultades] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [studentForm, setStudentForm] = useState({ email: '', nombre: '', apellido: '', facultad: '', programa: '' });
  const [showDocenteModal, setShowDocenteModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [docenteForm, setDocenteForm] = useState({ email: '', nombre: '', apellido: '' });
  const [adminForm, setAdminForm] = useState({ email: '', nombre: '', apellido: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ email: '', nombre: '', apellido: '' });
  const [docentes, setDocentes] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [administradores, setAdministradores] = useState([]);
  const [loadingLists, setLoadingLists] = useState(false);
  const [listsError, setListsError] = useState(null);
  const [usersMap, setUsersMap] = useState({});
  const [query, setQuery] = useState('');

  useEffect(() => { loadAcademico(); }, []);
  const loadAcademico = async () => {
    try {
      const f = await getFacultades();
      const p = await getProgramas();
      setFacultades(f || []);
      setProgramas(p || []);
    } catch (err) { console.error('Error cargando facultades/programas', err); }
  };

  useEffect(() => { loadLists(); }, []);
  const loadLists = async () => {
    setLoadingLists(true);
    setListsError(null);
    try {
      const [d, e, a] = await Promise.all([getDocentes(), getEstudiantes(), getAdministradores()]);
      setDocentes(d || []);
      setEstudiantes(e || []);
      setAdministradores(a || []);
      // fetch all users and build map by id for quick lookup
      try {
        const { getUsuarios } = await import('../../api/usuarios.api');
        const users = await getUsuarios();
        const map = {};
        (users || []).forEach(u => { map[u.id] = u; });
        setUsersMap(map);
      } catch (errUsers) {
        console.warn('No se pudieron cargar usuarios para mapear perfiles', errUsers);
      }
    } catch (err) {
      console.error('Error cargando listas de usuarios', err);
      setListsError(err.response?.data || err.message || 'Error cargando listas');
    } finally {
      setLoadingLists(false);
    }
  };

  const handleEditUsuario = async (userId) => {
    const usuario = usersMap[userId];
    if (!usuario) { toastError('Información del usuario no disponible para editar.'); return; }
    setEditingUserId(userId);
    setEditForm({ email: usuario.email || '', nombre: usuario.nombre || '', apellido: usuario.apellido || '' });
    setShowEditModal(true);
  };

  const handleDeleteUsuario = async (userId) => {
    if (!window.confirm('¿Confirma eliminar este usuario? Esta acción no se puede deshacer.')) return;
    try {
      await deleteUsuario(userId);
      toastSuccess('Usuario eliminado.');
      await loadLists();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data ? (typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data)) : err.message || String(err);
      toastError('Error eliminando usuario: ' + msg);
    }
  };

  // Creating users from the frontend has been disabled; use admin backend.

  // filter lists locally for a more responsive UI
  const q = (query || '').trim().toLowerCase();
  const filteredDocentes = docentes.filter(d => {
    if (!q) return true;
    const u = usersMap[d.user];
    const name = u ? `${u.nombre || ''} ${u.apellido || ''}`.toLowerCase() : '';
    const email = u ? (u.email || '').toLowerCase() : '';
    return name.includes(q) || email.includes(q);
  });
  const filteredEstudiantes = estudiantes.filter(e => {
    if (!q) return true;
    const u = usersMap[e.user];
    const name = u ? `${u.nombre || ''} ${u.apellido || ''}`.toLowerCase() : '';
    const email = u ? (u.email || '').toLowerCase() : '';
    return name.includes(q) || email.includes(q) || (e.programa?.nombre_programa || '').toLowerCase().includes(q);
  });
  const filteredAdministradores = administradores.filter(a => {
    if (!q) return true;
    const u = usersMap[a.user];
    const name = u ? `${u.nombre || ''} ${u.apellido || ''}`.toLowerCase() : '';
    const email = u ? (u.email || '').toLowerCase() : '';
    return name.includes(q) || email.includes(q);
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Usuarios" subtitle="Crear perfiles de usuarios (estudiantes, docentes, administradores)" />
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <p className="text-sm text-gray-600">Gestión centralizada de usuarios: crea y administra perfiles de Estudiante, Docente y Administrador desde aquí.</p>
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre, correo o programa" className="w-72 pl-10 pr-3 py-2 border border-gray-200 rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                  <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/></svg>
                </div>
                <button onClick={loadLists} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm border border-gray-200">Refrescar</button>
              </div>
              <div className="flex items-center gap-2">
                {!showStudentModal && (
                  <button onClick={() => setShowStudentModal(true)} className="px-4 py-2 bg-indigo-700 text-white rounded-md text-sm shadow">Crear Estudiante</button>
                )}
                <button onClick={() => setShowDocenteModal(true)} className="px-4 py-2 bg-green-700 text-white rounded-md text-sm shadow">Crear Docente</button>
                <button onClick={() => setShowAdminModal(true)} className="px-4 py-2 bg-yellow-600 text-white rounded-md text-sm shadow">Crear Administrador</button>
              </div>
            </div>

            {loadingLists && <div className="text-sm text-gray-600">Cargando listas...</div>}
            {listsError && <div className="text-sm text-red-600">{listsError}</div>}

            {!loadingLists && !listsError && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-gray-700">Docentes</div>
                      <div className="text-sm text-gray-500">{docentes.length}</div>
                    </div>
                    <div className="overflow-auto max-h-56">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <tbody className="bg-white divide-y divide-gray-100">
                          {filteredDocentes.map(d => (
                            <tr key={d.id} className="hover:bg-gray-50">
                              <td className="px-3 py-2">{`${(usersMap[d.user]?.nombre) || ''} ${(usersMap[d.user]?.apellido) || ''}`.trim()}</td>
                              <td className="px-3 py-2">{usersMap[d.user]?.email || ''}</td>
                              <td className="px-3 py-2">
                                {usersMap[d.user] && (
                                  <div className="flex items-center gap-2">
                                    <button onClick={() => handleEditUsuario(d.user)} className="px-2 py-1 border border-indigo-200 text-indigo-700 rounded text-xs hover:bg-indigo-50">Editar</button>
                                    <button onClick={() => handleDeleteUsuario(d.user)} className="px-2 py-1 border border-red-200 text-red-700 rounded text-xs hover:bg-red-50">Eliminar</button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-gray-700">Estudiantes</div>
                      <div className="text-sm text-gray-500">{estudiantes.length}</div>
                    </div>
                    <div className="overflow-auto max-h-56">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <tbody className="bg-white divide-y divide-gray-100">
                          {filteredEstudiantes.map(e => (
                            <tr key={e.id} className="hover:bg-gray-50">
                              <td className="px-3 py-2">{`${(usersMap[e.user]?.nombre) || ''} ${(usersMap[e.user]?.apellido) || ''}`.trim()}</td>
                              <td className="px-3 py-2">{usersMap[e.user]?.email || ''}</td>
                              <td className="px-3 py-2">{e.programa?.nombre_programa || ''}</td>
                              <td className="px-3 py-2">
                                {usersMap[e.user] && (
                                  <div className="flex items-center gap-2">
                                    <button onClick={() => handleEditUsuario(e.user)} className="px-2 py-1 border border-indigo-200 text-indigo-700 rounded text-xs hover:bg-indigo-50">Editar</button>
                                    <button onClick={() => handleDeleteUsuario(e.user)} className="px-2 py-1 border border-red-200 text-red-700 rounded text-xs hover:bg-red-50">Eliminar</button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-gray-700">Administradores</div>
                      <div className="text-sm text-gray-500">{administradores.length}</div>
                    </div>
                    <div className="overflow-auto max-h-56">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <tbody className="bg-white divide-y divide-gray-100">
                          {filteredAdministradores.map(a => (
                            <tr key={a.id} className="hover:bg-gray-50">
                              <td className="px-3 py-2">{`${(usersMap[a.user]?.nombre) || ''} ${(usersMap[a.user]?.apellido) || ''}`.trim()}</td>
                              <td className="px-3 py-2">{usersMap[a.user]?.email || ''}</td>
                              <td className="px-3 py-2">
                                {usersMap[a.user] && (
                                  <div className="flex items-center gap-2">
                                    <button onClick={() => handleEditUsuario(a.user)} className="px-2 py-1 border border-indigo-200 text-indigo-700 rounded text-xs hover:bg-indigo-50">Editar</button>
                                    <button onClick={() => handleDeleteUsuario(a.user)} className="px-2 py-1 border border-red-200 text-red-700 rounded text-xs hover:bg-red-50">Eliminar</button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>
            )}
            {/* Modals placed outside the table to avoid duplication per row */}
            {showStudentModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-30" onClick={() => setShowStudentModal(false)} />
                <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-md p-6">
                  <h3 className="text-lg font-semibold mb-3">Crear Estudiante</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <input placeholder="Email" value={studentForm.email} onChange={(e) => setStudentForm(s => ({...s, email: e.target.value}))} className="p-2 border rounded" />
                    <input placeholder="Nombre (opcional)" value={studentForm.nombre} onChange={(e) => setStudentForm(s => ({...s, nombre: e.target.value}))} className="p-2 border rounded" />
                    <input placeholder="Apellido (opcional)" value={studentForm.apellido} onChange={(e) => setStudentForm(s => ({...s, apellido: e.target.value}))} className="p-2 border rounded" />
                    <select value={studentForm.facultad} onChange={(e) => setStudentForm(s => ({...s, facultad: e.target.value, programa: ''}))} className="p-2 border rounded">
                      <option value="">-- Selecciona Facultad (opcional) --</option>
                      {facultades.map(f => (<option key={f.id} value={f.id}>{f.nombre_facultad}</option>))}
                    </select>
                    <select value={studentForm.programa} onChange={(e) => setStudentForm(s => ({...s, programa: e.target.value}))} className="p-2 border rounded">
                      <option value="">-- Selecciona Programa (opcional) --</option>
                      {programas.filter(p => !studentForm.facultad || String(p.facultad) === String(studentForm.facultad)).map(p => (
                        <option key={p.id} value={p.id}>{p.nombre_programa}</option>
                      ))}
                    </select>
                    <div className="flex justify-end gap-2 mt-2">
                      <button onClick={() => setShowStudentModal(false)} className="px-4 py-2 bg-gray-100 rounded">Cancelar</button>
                      <button onClick={async () => {
                        const { email, nombre, apellido, facultad, programa } = studentForm;
                        if (!email) { toastError('Email requerido'); return; }
                        const password = randomPassword(10);
                        try {
                          const user = await registerUsuario({ email, password, password2: password, nombre, apellido });
                          const payload = { user: user.id };
                          if (facultad) payload.facultad = facultad;
                          if (programa) payload.programa = programa;
                          await postEstudiante(payload);
                          toastSuccess('Estudiante creado. Contraseña temporal: ' + password);
                          setStudentForm({ email: '', nombre: '', apellido: '', facultad: '', programa: '' });
                          setShowStudentModal(false);
                          await loadLists();
                        } catch (err) {
                          console.error(err);
                          const msg = err.response?.data ? (typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data)) : err.message || String(err);
                          toastError('Error creando estudiante: ' + msg);
                        }
                      }} className="px-4 py-2 bg-indigo-600 text-white rounded">Crear</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showDocenteModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-30" onClick={() => setShowDocenteModal(false)} />
                <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-md p-6">
                  <h3 className="text-lg font-semibold mb-3">Crear Docente</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <input placeholder="Email" value={docenteForm.email} onChange={(e) => setDocenteForm(s => ({...s, email: e.target.value}))} className="p-2 border rounded" />
                    <input placeholder="Nombre (opcional)" value={docenteForm.nombre} onChange={(e) => setDocenteForm(s => ({...s, nombre: e.target.value}))} className="p-2 border rounded" />
                    <input placeholder="Apellido (opcional)" value={docenteForm.apellido} onChange={(e) => setDocenteForm(s => ({...s, apellido: e.target.value}))} className="p-2 border rounded" />
                    <div className="flex justify-end gap-2 mt-2">
                      <button onClick={() => setShowDocenteModal(false)} className="px-4 py-2 bg-gray-100 rounded">Cancelar</button>
                      <button onClick={async () => {
                        const { email, nombre, apellido } = docenteForm;
                        if (!email) { toastError('Email requerido'); return; }
                        const password = randomPassword(10);
                        try {
                          const user = await registerUsuario({ email, password, password2: password, nombre, apellido });
                          await postDocente({ user: user.id });
                          toastSuccess('Docente creado. Contraseña temporal: ' + password);
                          setDocenteForm({ email: '', nombre: '', apellido: '' });
                          setShowDocenteModal(false);
                          await loadLists();
                        } catch (err) { console.error(err); const msg = err.response?.data ? (typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data)) : err.message || String(err); toastError('Error creando docente: ' + msg); }
                      }} className="px-4 py-2 bg-green-700 text-white rounded">Crear</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showAdminModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-30" onClick={() => setShowAdminModal(false)} />
                <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-md p-6">
                  <h3 className="text-lg font-semibold mb-3">Crear Administrador</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <input placeholder="Email" value={adminForm.email} onChange={(e) => setAdminForm(s => ({...s, email: e.target.value}))} className="p-2 border rounded" />
                    <input placeholder="Nombre (opcional)" value={adminForm.nombre} onChange={(e) => setAdminForm(s => ({...s, nombre: e.target.value}))} className="p-2 border rounded" />
                    <input placeholder="Apellido (opcional)" value={adminForm.apellido} onChange={(e) => setAdminForm(s => ({...s, apellido: e.target.value}))} className="p-2 border rounded" />
                    <div className="flex justify-end gap-2 mt-2">
                      <button onClick={() => setShowAdminModal(false)} className="px-4 py-2 bg-gray-100 rounded">Cancelar</button>
                      <button onClick={async () => {
                        const { email, nombre, apellido } = adminForm;
                        if (!email) { toastError('Email requerido'); return; }
                        const password = randomPassword(12);
                        try {
                          const user = await registerUsuario({ email, password, password2: password, nombre, apellido });
                          await postAdministrador({ user: user.id });
                          toastSuccess('Administrador creado. Contraseña temporal: ' + password + '\nRecomienda cambiarla al iniciar sesión.');
                          setAdminForm({ email: '', nombre: '', apellido: '' });
                          setShowAdminModal(false);
                          await loadLists();
                        } catch (err) { console.error(err); const msg = err.response?.data ? (typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data)) : err.message || String(err); toastError('Error creando administrador: ' + msg); }
                      }} className="px-4 py-2 bg-yellow-600 text-white rounded">Crear</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showEditModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-30" onClick={() => setShowEditModal(false)} />
                <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-md p-6">
                  <h3 className="text-lg font-semibold mb-3">Editar Usuario</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <input placeholder="Email" value={editForm.email} onChange={(e) => setEditForm(s => ({...s, email: e.target.value}))} className="p-2 border rounded" />
                    <input placeholder="Nombre (opcional)" value={editForm.nombre} onChange={(e) => setEditForm(s => ({...s, nombre: e.target.value}))} className="p-2 border rounded" />
                    <input placeholder="Apellido (opcional)" value={editForm.apellido} onChange={(e) => setEditForm(s => ({...s, apellido: e.target.value}))} className="p-2 border rounded" />
                    <div className="flex justify-end gap-2 mt-2">
                      <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-100 rounded">Cancelar</button>
                      <button onClick={async () => {
                        if (!editingUserId) return;
                        const { email, nombre, apellido } = editForm;
                        if (!email) { toastError('Email requerido'); return; }
                        try {
                          await putUsuario(editingUserId, { email, nombre, apellido });
                          toastSuccess('Usuario actualizado correctamente.');
                          setShowEditModal(false);
                          setEditingUserId(null);
                          await loadLists();
                        } catch (err) { console.error(err); const msg = err.response?.data ? (typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data)) : err.message || String(err); toastError('Error actualizando usuario: ' + msg); }
                      }} className="px-4 py-2 bg-indigo-600 text-white rounded">Guardar</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default AdminUsuarios;
