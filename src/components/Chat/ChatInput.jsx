import { useState } from 'react';
import { Send } from 'lucide-react';

/**
 * Componente de input para el chat
 * @param {function} onSend - Callback al enviar mensaje
 * @param {boolean} disabled - Si está deshabilitado
 */
const ChatInput = ({ onSend, disabled }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    // Enter sin Shift = enviar
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    // Shift + Enter = nueva línea (comportamiento por defecto del textarea)
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
      <div className="flex gap-2 items-end">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje... (Enter para enviar)"
          disabled={disabled}
          rows={1}
          className="
            flex-1 px-4 py-2 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-primary-green
            disabled:bg-gray-100 disabled:cursor-not-allowed
            resize-none font-roboto text-sm
            min-h-[40px] max-h-[120px]
          "
          style={{
            overflowY: text.split('\n').length > 3 ? 'auto' : 'hidden',
          }}
        />
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          className="
            bg-primary-green text-white p-2 rounded-lg
            hover:bg-primary-dark transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
            flex-shrink-0
          "
          title="Enviar mensaje"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
