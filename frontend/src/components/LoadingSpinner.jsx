import React from 'react';

export function LoadingSpinner({ size = 'md', message = 'Cargando...' }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} relative`}> 
        <svg className="absolute inset-0 h-full w-full animate-spin text-blue-600" viewBox="0 0 50 50">
          <circle className="opacity-20" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="5" fill="none" />
          <path className="opacity-100" fill="currentColor" d="M43.94 25.04a18 18 0 11-7.51-13.68" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></div>
        </div>
      </div>
      {message && <p className="text-gray-600 text-sm">{message}</p>}
    </div>
  );
}
