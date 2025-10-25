import { useEffect, useRef } from 'react';

/**
 * Componente de región live ARIA para anuncios a lectores de pantalla
 *
 * @param {string} message - Mensaje a anunciar
 * @param {string} politeness - Nivel de cortesía: 'polite' | 'assertive' | 'off'
 * @param {boolean} atomic - Si el contenido debe anunciarse como un todo
 */
const LiveRegion = ({ message = '', politeness = 'polite', atomic = true }) => {
  const regionRef = useRef(null);

  useEffect(() => {
    // Asegurar que los screen readers detecten el cambio
    if (regionRef.current && message) {
      regionRef.current.textContent = '';
      setTimeout(() => {
        if (regionRef.current) {
          regionRef.current.textContent = message;
        }
      }, 100);
    }
  }, [message]);

  return (
    <div
      ref={regionRef}
      role="status"
      aria-live={politeness}
      aria-atomic={atomic}
      className="live-region"
    >
      {message}
    </div>
  );
};

export default LiveRegion;
