import React from 'react';

export function ActivityCard({ actividad, onEdit, onDelete, canEdit }) {
  return (
    <div className="border rounded p-4 flex items-start justify-between bg-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
      <div className="flex gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-50 text-blue-600 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 00-1-1H6z" />
          </svg>
        </div>
        <div>
          <h5 className="font-semibold text-gray-800">{actividad.titulo}</h5>
          <p className="text-sm text-gray-600">{actividad.descripcion || 'Sin descripción'}</p>
        </div>
      </div>
      {canEdit && (
        <div className="flex gap-2">
          <button onClick={() => onEdit(actividad)} className="px-3 py-1 bg-yellow-400 rounded text-sm hover:opacity-90">Editar</button>
          <button onClick={() => onDelete(actividad.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:opacity-90">Eliminar</button>
        </div>
      )}
    </div>
  );
}

export default ActivityCard;
