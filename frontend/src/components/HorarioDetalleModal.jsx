import React, { useState, useEffect } from "react";

export default function HorarioDetalleModal({ clase, onClose }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (clase) {
      // Encontrar la tarjeta de la clase en el DOM y posicionar el modal encima
      const claseElement = document.querySelector(
        `[data-clase-id="${clase.materia}"]`
      );
      if (claseElement) {
        const rect = claseElement.getBoundingClientRect();
        const scrollTop = window.scrollY;
        const scrollLeft = window.scrollX;
        setPosition({
          top: rect.top + scrollTop - 10,
          left: rect.left + scrollLeft,
        });
      }
    }
  }, [clase]);

  if (!clase) return null;

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-xl border-l-4 border-blue-900 p-4 w-72"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <span className="block font-bold text-white bg-blue-900 rounded px-2 py-1 mb-2 text-sm">
          {clase.materia}
        </span>
        <div className="text-xs text-gray-600 mb-2">
          {new Date(clase.inicio).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
          ,{" "}
          {new Date(clase.inicio).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {new Date(clase.fin).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="text-xs mb-1">
          <span className="font-semibold text-gray-800">Asignatura:</span>{" "}
          <span className="text-blue-600">
            {clase.asignatura || clase.materia}
          </span>
        </div>
        {clase.docente && (
          <div className="text-xs mb-1">
            <span className="font-semibold text-gray-800">Docente:</span>{" "}
            <span className="text-gray-700">{clase.docente}</span>
          </div>
        )}
        {clase.aula && (
          <div className="text-xs mb-1">
            <span className="font-semibold text-gray-800">Aula:</span>{" "}
            <span className="text-gray-700">{clase.aula}</span>
          </div>
        )}
      </div>
    </div>
  );
}
