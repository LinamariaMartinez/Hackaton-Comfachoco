import { Bell } from 'lucide-react';
import { useState } from 'react';

const NotificationBell = () => {
  const [count, setCount] = useState(3);

  return (
    <button
      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label={count > 0 ? `${count} notificaciones sin leer` : 'Notificaciones'}
    >
      <Bell className="text-gray-dark" size={20} aria-hidden="true" />
      {count > 0 && (
        <span
          className="absolute top-1 right-1 bg-primary-green text-white text-xs font-raleway font-bold rounded-full w-5 h-5 flex items-center justify-center"
          aria-hidden="true"
        >
          {count}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;
