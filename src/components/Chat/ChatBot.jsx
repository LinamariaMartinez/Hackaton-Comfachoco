import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatThinking from './ChatThinking';
import { useUserStore } from '../../store/userStore';
import toast from 'react-hot-toast';

/**
 * Componente principal del chatbot
 * Maneja estado, integración con servicio, auto-scroll
 */
const ChatBot = () => {
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy tu asistente de Comfachocó. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Auto-scroll cuando se agregan mensajes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  const handleSendMessage = async (text) => {
    // Agregar mensaje del usuario
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    try {
      // Integración co N8N
    const payload = {
      message: text,
      empleado_id: user?.id,
      documento: user?.documento,
      context: {
        role: user?.role,
        userName: user?.name,
        area_id: user?.area_id
      }
    };

    const response = await fetch('https://comfachoco.app.n8n.cloud/webhook/chatbot-agenda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    // Agregar respuesta del bot
    const botMessage = {
      id: Date.now() + 1,
      text: result.text || result.message || "Respuesta del sistema",
      sender: 'bot',
      timestamp: new Date().toISOString(),
      data: result.data || {}
    };

    setMessages((prev) => [...prev, botMessage]);

  } catch (error) {
    toast.error('Error al enviar mensaje');
    console.error('Error en chatbot N8N:', error);
    
    // Mensaje de error
    const errorMessage = {
      id: Date.now() + 1,
      text: 'Lo siento, hubo un error. ¿Puedes intentar de nuevo?',
      sender: 'bot',
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setIsThinking(false);
  }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary-green text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition-colors z-50"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          <div className="bg-primary-green text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle size={24} />
              <h3 className="font-raleway font-semibold">Asistente Comfachocó</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-dark rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
          >
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isThinking && <ChatThinking />}
            {/* Elemento invisible para auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSend={handleSendMessage} disabled={isThinking} />
        </div>
      )}
    </>
  );
};

export default ChatBot;
