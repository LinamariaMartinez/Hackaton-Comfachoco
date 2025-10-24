import { useState, useRef } from 'react';
import { MessageCircle, Send, Paperclip, X } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * ChatbotAssistant - Asistente virtual con preguntas rápidas y carga de archivos
 */
const ChatbotAssistant = ({ userData }) => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy tu asistente de Comfachocó. ¿En qué puedo ayudarte?',
      sender: 'bot',
      time: '10:00',
    },
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [pendingRequestType, setPendingRequestType] = useState(null);
  const fileInputRef = useRef(null);

  // Preguntas rápidas dinámicas
  const quickQuestions = [
    { id: 1, text: '¿Cómo solicito vacaciones?', icon: '🏖️' },
    { id: 2, text: '¿Cuántos días tengo disponibles?', icon: '📊' },
    { id: 3, text: 'Quiero solicitar una licencia', icon: '📄' },
    { id: 4, text: 'Necesito una incapacidad médica', icon: '🏥' },
    { id: 5, text: 'Ver disponibilidad del equipo', icon: '👥' },
  ];

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: chatMessages.length + 1,
      text: messageInput,
      sender: 'user',
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages([...chatMessages, newMessage]);
    setMessageInput('');

    // Detectar si es licencia o incapacidad
    const lowerText = messageInput.toLowerCase();
    if (lowerText.includes('licencia') || lowerText.includes('incapacidad')) {
      setPendingRequestType(lowerText.includes('licencia') ? 'licencia' : 'incapacidad');
      setShowFileUpload(true);

      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 2,
          text: `📎 Para procesar tu solicitud de ${lowerText.includes('licencia') ? 'licencia' : 'incapacidad'}, necesito que adjuntes el documento correspondiente.\n\nPor favor, usa el botón de adjuntar archivo que apareció abajo. 👇`,
          sender: 'bot',
          time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 500);
    } else {
      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 2,
          text: '✅ He recibido tu mensaje. ¿Podrías darme más detalles sobre tu solicitud? Por ejemplo, las fechas que necesitas.',
          sender: 'bot',
          time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 500);
    }
  };

  const handleQuickQuestion = (question) => {
    const newMessage = {
      id: chatMessages.length + 1,
      text: question.text,
      sender: 'user',
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages([...chatMessages, newMessage]);

    setTimeout(() => {
      let botText = '';
      switch (question.id) {
        case 1:
          botText = '📝 Para solicitar vacaciones es muy fácil:\n\n1. Escríbeme las fechas que necesitas\n2. Yo verificaré tu saldo y disponibilidad del equipo\n3. Te daré una respuesta inmediata\n\nPor ejemplo: "Quiero vacaciones del 15 al 20 de diciembre"';
          break;
        case 2:
          botText = `📊 Tu balance actual:\n\n✅ Total: ${userData.balance.totalDays} días\n📅 Usados: ${userData.balance.usedDays} días\n💚 Disponibles: ${userData.balance.remainingDays} días\n\n¡Tienes suficientes días para tomar unas merecidas vacaciones!`;
          break;
        case 3:
          setPendingRequestType('licencia');
          setShowFileUpload(true);
          botText = '📄 Entendido, necesitas solicitar una licencia.\n\nPor favor:\n1. Indícame el tipo de licencia (maternidad, paternidad, matrimonio, etc.)\n2. Las fechas que necesitas\n3. Adjunta el documento soporte usando el botón 📎 que apareció abajo';
          break;
        case 4:
          setPendingRequestType('incapacidad');
          setShowFileUpload(true);
          botText = '🏥 Lamento que no te sientas bien.\n\nPara procesar tu incapacidad médica necesito:\n1. Las fechas de la incapacidad\n2. El certificado médico (adjúntalo con el botón 📎 de abajo)\n\nTu solicitud será enviada a RRHH para aprobación.';
          break;
        case 5:
          botText = '👥 ¡Perfecto! Cambia a la pestaña "Disponibilidad del Equipo" para ver el calendario completo.';
          break;
        default:
          botText = '¿En qué más puedo ayudarte?';
      }

      const botResponse = {
        id: chatMessages.length + 2,
        text: botText,
        sender: 'bot',
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Solo se permiten archivos PDF o imágenes (JPG, PNG)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('El archivo no debe superar 5MB');
        return;
      }

      setAttachedFile(file);
      toast.success(`Archivo "${file.name}" adjuntado correctamente`);

      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 1,
          text: `✅ Perfecto! He recibido el archivo "${file.name}".\n\nTu solicitud de ${pendingRequestType} ha sido enviada a RRHH para su revisión y aprobación.\n\n📧 Recibirás una notificación cuando sea procesada.`,
          sender: 'bot',
          time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages(prev => [...prev, botResponse]);
        setShowFileUpload(false);
        setAttachedFile(null);
        setPendingRequestType(null);
      }, 500);
    }
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 200px)',
      overflow: 'hidden',
    }}>
      {/* Header del Chat */}
      <div style={{
        backgroundColor: '#04B45F',
        padding: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <MessageCircle size={24} style={{ color: '#04B45F' }} />
          </div>
          <div>
            <h2 style={{
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              color: '#FFFFFF',
              margin: 0,
            }}>
              Asistente Virtual
            </h2>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '0.875rem',
              color: '#FFFFFF',
              opacity: 0.9,
              margin: 0,
            }}>
              Pregunta lo que necesites
            </p>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        backgroundColor: '#f9fafb',
      }}>
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                maxWidth: '75%',
                borderRadius: '12px',
                padding: '12px 16px',
                backgroundColor: msg.sender === 'user' ? '#04B45F' : '#FFFFFF',
                color: msg.sender === 'user' ? '#FFFFFF' : '#303030',
                border: msg.sender === 'bot' ? '1px solid #e5e7eb' : 'none',
              }}
            >
              <p style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '0.875rem',
                whiteSpace: 'pre-wrap',
                margin: '0 0 4px 0',
              }}>{msg.text}</p>
              <span
                style={{
                  fontSize: '0.75rem',
                  display: 'block',
                  color: msg.sender === 'user' ? '#FFFFFF' : '#8A8A8A',
                  opacity: msg.sender === 'user' ? 0.75 : 1,
                }}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {/* Botones de preguntas rápidas */}
        {chatMessages.length <= 1 && (
          <div style={{ marginTop: '16px' }}>
            <p style={{
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: '#303030',
              marginBottom: '12px',
            }}>
              💬 Preguntas frecuentes:
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '8px',
            }}
            className="sm:grid-cols-2"
            >
              {quickQuestions.map((question) => (
                <button
                  key={question.id}
                  onClick={() => handleQuickQuestion(question)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '0.875rem',
                    color: '#303030',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#04B45F';
                    e.currentTarget.style.backgroundColor = '#f0fdf4';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{question.icon}</span>
                  <span>{question.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div style={{
        padding: '16px',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #e5e7eb',
      }}>
        {/* Botón de adjuntar archivo (solo visible cuando se solicita licencia/incapacidad) */}
        {showFileUpload && (
          <div style={{
            marginBottom: '12px',
            padding: '12px',
            backgroundColor: '#fef3c7',
            borderRadius: '8px',
            border: '1px solid #fde047',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Paperclip size={20} style={{ color: '#ca8a04' }} />
                <span style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '0.875rem',
                  color: '#854d0e',
                }}>
                  {attachedFile ? `Archivo: ${attachedFile.name}` : 'Adjunta tu documento'}
                </span>
              </div>
              {!attachedFile ? (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    backgroundColor: '#04B45F',
                    color: '#FFFFFF',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#026636'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#04B45F'}
                >
                  Seleccionar archivo
                </button>
              ) : (
                <button
                  onClick={() => {
                    setAttachedFile(null);
                    toast.success('Archivo removido');
                  }}
                  style={{
                    backgroundColor: '#ef4444',
                    color: '#FFFFFF',
                    padding: '6px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe tu mensaje aquí..."
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '0.875rem',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#04B45F';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(4, 180, 95, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              backgroundColor: '#04B45F',
              color: '#FFFFFF',
              padding: '12px 24px',
              borderRadius: '8px',
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#026636'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#04B45F'}
          >
            <Send size={18} />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotAssistant;
