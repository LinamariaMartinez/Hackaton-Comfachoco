import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Bot, User } from 'lucide-react';

/**
 * Componente para mensajes del chat
 * @param {Object} message - { id, text, sender: 'bot'|'user', timestamp }
 */
const ChatMessage = ({ message }) => {
  const { id, text, sender, timestamp } = message;
  const isBot = sender === 'bot';

  return (
    <div
      className={`
        flex gap-2 mb-3 animate-fadeIn
        ${isBot ? 'justify-start' : 'justify-end'}
      `}
      key={id}
    >
      {/* Avatar - solo para bot */}
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <Bot size={16} className="text-gray-600" />
        </div>
      )}

      {/* Mensaje */}
      <div
        className={`
          max-w-[75%] rounded-2xl px-4 py-2 shadow-sm
          transition-all duration-200
          ${
            isBot
              ? 'bg-gray-100 text-gray-dark rounded-tl-none'
              : 'bg-[#04B45F] text-white rounded-tr-none'
          }
        `}
      >
        <p className="font-roboto text-sm leading-relaxed whitespace-pre-wrap">
          {text}
        </p>
        <span
          className={`
            text-xs mt-1 block
            ${isBot ? 'text-gray-500' : 'text-white text-opacity-80'}
          `}
        >
          {format(new Date(timestamp), 'HH:mm', { locale: es })}
        </span>
      </div>

      {/* Avatar - solo para usuario */}
      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-[#04B45F] flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
