import React from 'react';
import SectionHeader from '../../components/SectionHeader';
import { postAdministrador, postDocente, postEstudiante } from '../../api/usuarios.api';

export function AdminUsuarios() {
  const handleCreateAdmin = async () => {
    const email = prompt('Email del nuevo administrador');
    if (!email) return;
    try {
      // backend expects { user: <user_id> } normally, but we don't have generic user creation here
      // For now we will just call the administrador endpoint if the backend expects a payload
      await postAdministrador({ user: email });
      alert('Solicitud enviada (revise backend).');
    } catch (err) {
      console.error(err);
      alert('Error creando administrador.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Usuarios" subtitle="Crear perfiles de usuarios (estudiantes, docentes, administradores)" />
        <div className="bg-white rounded-lg shadow p-4 mt-6">
          <p className="text-sm text-gray-700">Nota: el backend expone endpoints para crear perfiles específicos. Usa los botones abajo para crear perfiles.</p>
          <div className="flex gap-2 mt-4">
            <button onClick={() => { const email = prompt('Email usuario'); if (email) postEstudiante({ user: email }).then(()=>alert('Estudiante creado (ver backend)')).catch(()=>alert('Error')); }} className="px-4 py-2 bg-blue-600 text-white rounded">Crear Estudiante</button>
            <button onClick={() => { const email = prompt('Email usuario'); if (email) postDocente({ user: email }).then(()=>alert('Docente creado (ver backend)')).catch(()=>alert('Error')); }} className="px-4 py-2 bg-green-600 text-white rounded">Crear Docente</button>
            <button onClick={handleCreateAdmin} className="px-4 py-2 bg-yellow-500 text-white rounded">Crear Administrador</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsuarios;
