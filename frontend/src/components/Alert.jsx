import React from 'react';

export function Alert({ type = 'info', message, onClose, dismissible = true }) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-700',
    success: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    error: 'bg-red-50 border-red-200 text-red-700',
  };

  const icons = {
    info: '✓',
    success: '✓',
    warning: '!',
    error: '✕',
  };

  return (
    <div className={`p-4 border rounded-lg flex items-center justify-between ${styles[type]}`}>
      <div className="flex items-center gap-3">
        <span className="font-bold">{icons[type]}</span>
        <p className="text-sm font-medium">{message}</p>
      </div>
      {dismissible && onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-lg leading-none opacity-70 hover:opacity-100"
        >
          ×
        </button>
      )}
    </div>
  );
}
