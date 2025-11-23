import React from 'react';

export function SidebarCurso({ groups = [], onNavigate = () => {} }) {
  return (
    <div className="bg-white rounded-lg shadow sticky top-20 overflow-hidden">
      <div className="px-4 py-5 border-b">
        <h2 className="text-sm font-semibold text-gray-700">General</h2>
        <p className="text-xs text-gray-500">Navegación del curso</p>
      </div>
      <nav className="p-4 max-h-[60vh] overflow-auto">
        {groups.map((group) => (
          <div key={group.id} className="mb-4">
            <div className="text-xs font-bold text-gray-500 mb-2 uppercase">{group.title}</div>
            <ul className="space-y-1">
              {group.children.map((it, idx) => (
                <li key={it}>
                  <button
                    onClick={() => onNavigate(`${group.id}-${idx}`)}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-3 transition-colors"
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">•</span>
                    <span className="truncate">{it}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default SidebarCurso;
