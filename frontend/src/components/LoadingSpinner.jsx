import React from 'react';

export function LoadingSpinner({ size = 'md', message = 'Cargando...' }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizes[size]} animate-spin rounded-full border-4 border-gray-300 border-t-blue-600`}></div>
      {message && <p className="text-gray-600 text-sm">{message}</p>}
    </div>
  );
}
