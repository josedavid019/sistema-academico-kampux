import { useEffect, useRef } from 'react';

/**
 * Hook que ejecuta una función cuando se hace click fuera del elemento
 * @param {Function} handler - Función a ejecutar
 * @returns {React.RefObject} Referencia para el elemento
 */
export function useClickOutside(handler) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handler]);

  return ref;
}
