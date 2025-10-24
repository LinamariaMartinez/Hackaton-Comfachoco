import { Bell } from 'lucide-react';
import { useState } from 'react';

const NotificationBell = () => {
  const [count, setCount] = useState(3);

  return (
    <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
      <Bell className="text-gray-dark" size={20} />
      {count > 0 && (
        <span className="absolute top-1 right-1 bg-primary-green text-white text-xs font-raleway font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;
