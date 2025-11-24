import React, { useEffect, useState } from 'react';
import SectionHeader from '../../components/SectionHeader';
import { registerUsuario, postAdministrador, postDocente, postEstudiante } from '../../api/usuarios.api';
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
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [studentForm, setStudentForm] = useState({ email: '', nombre: '', apellido: '', facultad: '', programa: '' });

  useEffect(() => { loadAcademico(); }, []);
  const loadAcademico = async () => {
    try {
      const f = await getFacultades();
      const p = await getProgramas();
      setFacultades(f || []);
      setProgramas(p || []);
    } catch (err) { console.error('Error cargando facultades/programas', err); }
  };

  const handleCreateAdmin = async () => {
    const email = prompt('Email del nuevo administrador');
    if (!email) return;
    const nombre = prompt('Nombre (opcional)') || '';
    const apellido = prompt('Apellido (opcional)') || '';
    const password = randomPassword(12);
    try {
      // Primero crear el usuario (register)
      const user = await registerUsuario({ email, password, password2: password, nombre, apellido });
      // Luego asignar perfil administrador
      await postAdministrador({ user: user.id });
      alert('Administrador creado correctamente. Contraseña temporal: ' + password + '\nRecomienda cambiarla al iniciar sesión.');
    } catch (err) {
      console.error(err);
      alert('Error creando administrador: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Usuarios" subtitle="Crear perfiles de usuarios (estudiantes, docentes, administradores)" />
        <div className="bg-white rounded-lg shadow p-4 mt-6">
          <p className="text-sm text-gray-700">Nota: el backend expone endpoints para crear perfiles específicos. Usa los botones abajo para crear perfiles.</p>
          <div className="flex gap-2 mt-4">
            <div>
              {!showStudentForm && (
                <button onClick={() => setShowStudentForm(true)} className="px-4 py-2 bg-blue-600 text-white rounded">Crear Estudiante</button>
              )}
              {showStudentForm && (
                <div className="p-4 bg-gray-50 rounded mt-3 border">
                  <div className="grid grid-cols-1 gap-2">
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
                    <div className="flex gap-2">
                      <button onClick={async () => {
                        const { email, nombre, apellido, facultad, programa } = studentForm;
                        if (!email) { alert('Email requerido'); return; }
                        const password = randomPassword(10);
                        try {
                          const user = await registerUsuario({ email, password, password2: password, nombre, apellido });
                          const payload = { user: user.id };
                          if (facultad) payload.facultad = facultad;
                          if (programa) payload.programa = programa;
                          await postEstudiante(payload);
                          alert('Estudiante creado. Contraseña temporal: ' + password);
                          setStudentForm({ email: '', nombre: '', apellido: '', facultad: '', programa: '' });
                          setShowStudentForm(false);
                        } catch (err) {
                          console.error(err);
                          alert('Error creando estudiante: ' + (err.response?.data || err.message));
                        }
                      }} className="px-4 py-2 bg-blue-600 text-white rounded">Crear</button>
                      <button onClick={() => { setShowStudentForm(false); setStudentForm({ email: '', nombre: '', apellido: '', facultad: '', programa: '' }); }} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button onClick={async () => {
              const email = prompt('Email del docente'); if (!email) return;
              const nombre = prompt('Nombre (opcional)') || '';
              const apellido = prompt('Apellido (opcional)') || '';
              const password = randomPassword(10);
              try {
                const user = await registerUsuario({ email, password, password2: password, nombre, apellido });
                await postDocente({ user: user.id });
                alert('Docente creado. Contraseña temporal: ' + password);
              } catch (err) { console.error(err); alert('Error creando docente: ' + (err.response?.data || err.message)); }
            }} className="px-4 py-2 bg-green-600 text-white rounded">Crear Docente</button>
            <button onClick={handleCreateAdmin} className="px-4 py-2 bg-yellow-500 text-white rounded">Crear Administrador</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsuarios;
