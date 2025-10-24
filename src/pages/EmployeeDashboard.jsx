import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Calendar, History, LogOut, Send, Menu, X as CloseIcon, Paperclip, FileText, Download } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import CalendarMini from '../components/Common/CalendarMini';
import CalendarFull from '../components/Common/CalendarFull';
import toast from 'react-hot-toast';

/**
 * Dashboard del Empleado - Diseño Corporativo Comfachocó
 * Solo colores corporativos y estilos en línea
 */
const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const [activeTab, setActiveTab] = useState('chatbot');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState([
    '2024-11-10',
    '2024-11-11',
    '2024-11-12',
    '2024-11-13',
    '2024-11-14',
  ]);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy tu asistente de Comfachocó. ¿En qué puedo ayudarte?',
      sender: 'bot',
      time: '10:00',
    },
    {
      id: 2,
      text: 'Quiero solicitar vacaciones del 10 al 14 de noviembre',
      sender: 'user',
      time: '10:01',
    },
    {
      id: 3,
      text: '✅ He analizado tu solicitud:\n\n📅 Fechas: 10-14 de noviembre (5 días)\n💼 Saldo actual: 10 días\n\n✅ Saldo suficiente\n✅ Sin conflictos de equipo\n✅ Capacidad del equipo: OK\n\n¡Tu solicitud ha sido APROBADA AUTOMÁTICAMENTE! 🎉',
      sender: 'bot',
      time: '10:01',
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

  const userData = {
    name: user?.name || 'Juan Pérez',
    department: 'Desarrollo',
    balance: {
      totalDays: 15,
      usedDays: 5,
      remainingDays: 10,
    },
  };

  const requestsHistory = [
    {
      id: 1,
      type: 'Vacaciones',
      startDate: '2024-10-15',
      endDate: '2024-10-20',
      days: 5,
      status: 'approved',
      attachments: [],
    },
    {
      id: 2,
      type: 'Permiso Personal',
      startDate: '2024-11-10',
      endDate: '2024-11-14',
      days: 5,
      status: 'pending',
      attachments: [],
    },
    {
      id: 3,
      type: 'Incapacidad Médica',
      startDate: '2024-09-15',
      endDate: '2024-09-20',
      days: 5,
      status: 'approved',
      attachments: [
        { name: 'incapacidad_medica.pdf', size: '245 KB' },
      ],
    },
    {
      id: 4,
      type: 'Licencia de Paternidad',
      startDate: '2024-08-01',
      endDate: '2024-08-15',
      days: 14,
      status: 'pending',
      attachments: [
        { name: 'certificado_nacimiento.pdf', size: '1.2 MB' },
        { name: 'registro_civil.pdf', size: '890 KB' },
      ],
    },
    {
      id: 5,
      type: 'Vacaciones',
      startDate: '2024-07-10',
      endDate: '2024-07-17',
      days: 7,
      status: 'rejected',
      attachments: [],
    },
  ];

  const calendarEvents = [
    { date: '2024-11-10', name: 'Tú', type: 'Permiso Personal', color: 'green' },
    { date: '2024-11-11', name: 'Tú', type: 'Permiso Personal', color: 'green' },
    { date: '2024-11-12', name: 'Tú', type: 'Permiso Personal', color: 'green' },
    { date: '2024-11-13', name: 'Tú', type: 'Permiso Personal', color: 'green' },
    { date: '2024-11-14', name: 'Tú', type: 'Permiso Personal', color: 'green' },
    { date: '2024-11-15', name: 'Ana Martínez', type: 'Vacaciones', color: 'green' },
    { date: '2024-11-15', name: 'Pedro García', type: 'Permiso', color: 'orange' },
    { date: '2024-11-20', name: 'María Silva', type: 'Vacaciones', color: 'green' },
    { date: '2024-11-25', name: 'Juan Rodríguez', type: 'Licencia', color: 'green' },
    { date: '2024-11-25', name: 'Laura Gómez', type: 'Permiso', color: 'orange' },
    { date: '2024-11-25', name: 'Diego Torres', type: 'Vacaciones', color: 'red' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDateClick = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    if (selectedDates.includes(dateStr)) {
      setSelectedDates(selectedDates.filter(d => d !== dateStr));
    } else {
      setSelectedDates([...selectedDates, dateStr]);
    }
  };

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

      // Respuesta del bot pidiendo adjuntar archivo
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
      // Respuesta del bot para otros casos
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

    // Respuestas automáticas basadas en la pregunta
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
          setActiveTab('disponibilidad');
          botText = '👥 ¡Perfecto! Te llevo al calendario de disponibilidad del equipo para que puedas ver quién está ausente y cuándo.';
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
      // Validar tipo de archivo
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Solo se permiten archivos PDF o imágenes (JPG, PNG)');
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('El archivo no debe superar 5MB');
        return;
      }

      setAttachedFile(file);
      toast.success(`Archivo "${file.name}" adjuntado correctamente`);

      // Respuesta del bot
      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 1,
          text: `✅ Perfecto! He recibido el archivo "${file.name}".\n\nTu solicitud de ${pendingRequestType} ha sido enviada a RRHH para su revisión y aprobación.\n\n📧 Recibirás una notificación cuando sea procesada.`,
          sender: 'bot',
          time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages(prev => [...prev, botResponse]);
        setShowFileUpload(false);
        setPendingRequestType(null);
      }, 500);
    }
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    toast.success('Archivo removido');
  };

  const getStatusBadge = (status) => {
    const badges = {
      approved: { icon: '✅', label: 'Aprobada', bg: '#dcfce7', color: '#166534', border: '#86efac' },
      pending: { icon: '⏳', label: 'Pendiente', bg: '#fef9c3', color: '#854d0e', border: '#fde047' },
      rejected: { icon: '❌', label: 'Rechazada', bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' },
    };
    return badges[status] || badges.pending;
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F9F9FC', overflow: 'hidden' }}>
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 50,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        width: '288px',
      }}
      className="dashboard-sidebar"
      >
        {/* Logo Header */}
        <div style={{
          backgroundColor: '#04B45F',
          padding: '24px',
          borderBottom: '1px solid #026636',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{
                  color: '#04B45F',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                }}>C</span>
              </div>
              <div>
                <span style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  display: 'block',
                  lineHeight: '1.2',
                }}>
                  Comfachocó
                </span>
                <span style={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#FFFFFF',
                  opacity: 0.9,
                  fontSize: '0.75rem',
                }}>
                  Gestión
                </span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                color: '#FFFFFF',
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
              className="lg:hidden"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <CloseIcon size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '8px' }}>
              <button
                onClick={() => { setActiveTab('chatbot'); setSidebarOpen(false); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'chatbot' ? '#04B45F' : 'transparent',
                  color: activeTab === 'chatbot' ? '#FFFFFF' : '#303030',
                  boxShadow: activeTab === 'chatbot' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'chatbot') {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'chatbot') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <MessageCircle size={20} />
                <span>Asistente Virtual</span>
              </button>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <button
                onClick={() => { setActiveTab('disponibilidad'); setSidebarOpen(false); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'disponibilidad' ? '#04B45F' : 'transparent',
                  color: activeTab === 'disponibilidad' ? '#FFFFFF' : '#303030',
                  boxShadow: activeTab === 'disponibilidad' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'disponibilidad') {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'disponibilidad') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Calendar size={20} />
                <span>Disponibilidad del Equipo</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveTab('historial'); setSidebarOpen(false); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'historial' ? '#04B45F' : 'transparent',
                  color: activeTab === 'historial' ? '#FFFFFF' : '#303030',
                  boxShadow: activeTab === 'historial' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'historial') {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'historial') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <History size={20} />
                <span>Historial de Solicitudes</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '8px',
              color: '#dc2626',
              transition: 'all 0.2s',
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 500,
              fontSize: '0.875rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px',
          backgroundColor: '#f9fafb',
          borderTop: '1px solid #e5e7eb',
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: '#8A8A8A',
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif',
            margin: 0,
          }}>
            Comfachocó Gestión v1.0.0
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }} className="lg:ml-0">
        {/* Header */}
        <header style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ padding: '16px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  onClick={() => setSidebarOpen(true)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                  className="lg:hidden"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Menu size={24} style={{ color: '#303030' }} />
                </button>
                <div>
                  <h1 style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    color: '#303030',
                    margin: 0,
                  }}>
                    {userData.name}
                  </h1>
                  <p style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '0.875rem',
                    color: '#8A8A8A',
                    margin: 0,
                  }}>
                    {userData.department}
                  </p>
                </div>
              </div>

              {/* Balance */}
              <div style={{
                backgroundColor: '#04B45F',
                borderRadius: '8px',
                padding: '12px 20px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }} className="hidden sm:block">
                <p style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '0.75rem',
                  color: '#FFFFFF',
                  opacity: 0.9,
                  margin: '0 0 4px 0',
                }}>Días disponibles</p>
                <p style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '1.875rem',
                  color: '#FFFFFF',
                  margin: 0,
                }}>
                  {userData.balance.remainingDays}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>

          {/* TAB 1: Chatbot PROTAGONISTA */}
          {activeTab === 'chatbot' && (
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="lg:grid-cols-3">

                {/* CHATBOT - 2/3 del espacio */}
                <div className="lg:col-span-2">
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
                    </div>

                    {/* Input */}
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#FFFFFF',
                      borderTop: '1px solid #e5e7eb',
                    }}>
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
                </div>

                {/* Sidebar Derecho - 1/3 */}
                <div className="lg:col-span-1" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                  {/* Balance Card */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    padding: '24px',
                    border: '1px solid #e5e7eb',
                  }}>
                    <h3 style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '1.125rem',
                      color: '#303030',
                      margin: '0 0 16px 0',
                    }}>
                      Tu Balance
                    </h3>
                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                      }}>
                        <span style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: '0.875rem',
                          color: '#8A8A8A',
                        }}>Total:</span>
                        <span style={{
                          fontFamily: 'Raleway, sans-serif',
                          fontWeight: 600,
                          color: '#303030',
                        }}>{userData.balance.totalDays} días</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                      }}>
                        <span style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: '0.875rem',
                          color: '#8A8A8A',
                        }}>Usados:</span>
                        <span style={{
                          fontFamily: 'Raleway, sans-serif',
                          fontWeight: 600,
                          color: '#303030',
                        }}>{userData.balance.usedDays} días</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '12px',
                        borderTop: '1px solid #e5e7eb',
                      }}>
                        <span style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: '#303030',
                        }}>Disponibles:</span>
                        <span style={{
                          fontFamily: 'Raleway, sans-serif',
                          fontWeight: 'bold',
                          fontSize: '1.5rem',
                          color: '#04B45F',
                        }}>
                          {userData.balance.remainingDays}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CalendarMini */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                  }}>
                    <CalendarMini
                      selectedDates={selectedDates}
                      currentMonth={new Date()}
                      onDateClick={handleDateClick}
                    />
                  </div>

                  {/* Días seleccionados */}
                  {selectedDates.length > 0 && (
                    <div style={{
                      backgroundColor: '#04B45F',
                      borderRadius: '12px',
                      padding: '20px',
                      color: '#FFFFFF',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}>
                      <p style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '0.875rem',
                        margin: '0 0 8px 0',
                      }}>
                        Días seleccionados:
                      </p>
                      <p style={{
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: 'bold',
                        fontSize: '2.25rem',
                        margin: 0,
                      }}>
                        {selectedDates.length}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Disponibilidad */}
          {activeTab === 'disponibilidad' && (
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: '#303030',
                  margin: '0 0 8px 0',
                }}>
                  Disponibilidad del Equipo
                </h2>
                <p style={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#8A8A8A',
                  margin: 0,
                }}>
                  Consulta las ausencias programadas de tu equipo
                </p>
              </div>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '24px',
                border: '1px solid #e5e7eb',
              }}>
                <CalendarFull events={calendarEvents} />
              </div>
            </div>
          )}

          {/* TAB 3: Historial */}
          {activeTab === 'historial' && (
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: '#303030',
                  margin: '0 0 8px 0',
                }}>
                  Historial de Solicitudes
                </h2>
                <p style={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#8A8A8A',
                  margin: 0,
                }}>
                  Revisa todas tus solicitudes anteriores
                </p>
              </div>

              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
              }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{
                      backgroundColor: '#f9fafb',
                      borderBottom: '1px solid #e5e7eb',
                    }}>
                      <tr>
                        <th style={{
                          padding: '16px 24px',
                          textAlign: 'left',
                          fontFamily: 'Raleway, sans-serif',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          color: '#303030',
                        }}>
                          Tipo
                        </th>
                        <th style={{
                          padding: '16px 24px',
                          textAlign: 'left',
                          fontFamily: 'Raleway, sans-serif',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          color: '#303030',
                        }}>
                          Fechas
                        </th>
                        <th style={{
                          padding: '16px 24px',
                          textAlign: 'left',
                          fontFamily: 'Raleway, sans-serif',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          color: '#303030',
                        }}>
                          Días
                        </th>
                        <th style={{
                          padding: '16px 24px',
                          textAlign: 'left',
                          fontFamily: 'Raleway, sans-serif',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          color: '#303030',
                        }}>
                          Archivos
                        </th>
                        <th style={{
                          padding: '16px 24px',
                          textAlign: 'left',
                          fontFamily: 'Raleway, sans-serif',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          color: '#303030',
                        }}>
                          Estado
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {requestsHistory.map((request) => {
                        const badge = getStatusBadge(request.status);
                        return (
                          <tr key={request.id} style={{
                            borderBottom: '1px solid #f3f4f6',
                            transition: 'background-color 0.2s',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <td style={{
                              padding: '16px 24px',
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: '0.875rem',
                              color: '#303030',
                            }}>
                              {request.type}
                            </td>
                            <td style={{
                              padding: '16px 24px',
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: '0.875rem',
                              color: '#8A8A8A',
                            }}>
                              {new Date(request.startDate).toLocaleDateString('es-ES')} - {new Date(request.endDate).toLocaleDateString('es-ES')}
                            </td>
                            <td style={{
                              padding: '16px 24px',
                              fontFamily: 'Raleway, sans-serif',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              color: '#303030',
                            }}>
                              {request.days}
                            </td>
                            <td style={{ padding: '16px 24px' }}>
                              {request.attachments && request.attachments.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  {request.attachments.map((file, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '8px 12px',
                                        backgroundColor: '#f9fafb',
                                        borderRadius: '6px',
                                        border: '1px solid #e5e7eb',
                                      }}
                                    >
                                      <FileText size={16} style={{ color: '#04B45F', flexShrink: 0 }} />
                                      <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{
                                          fontFamily: 'Roboto, sans-serif',
                                          fontSize: '0.75rem',
                                          color: '#303030',
                                          margin: 0,
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                        }}>
                                          {file.name}
                                        </p>
                                        <p style={{
                                          fontFamily: 'Roboto, sans-serif',
                                          fontSize: '0.625rem',
                                          color: '#8A8A8A',
                                          margin: 0,
                                        }}>
                                          {file.size}
                                        </p>
                                      </div>
                                      <button
                                        onClick={() => toast.success(`Descargando ${file.name}`)}
                                        style={{
                                          padding: '6px',
                                          borderRadius: '4px',
                                          border: 'none',
                                          backgroundColor: 'transparent',
                                          cursor: 'pointer',
                                          transition: 'background-color 0.2s',
                                          display: 'flex',
                                          alignItems: 'center',
                                        }}
                                        title="Descargar archivo"
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                      >
                                        <Download size={14} style={{ color: '#04B45F' }} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <span style={{
                                  fontFamily: 'Roboto, sans-serif',
                                  fontSize: '0.75rem',
                                  color: '#8A8A8A',
                                  fontStyle: 'italic',
                                }}>
                                  Sin archivos
                                </span>
                              )}
                            </td>
                            <td style={{ padding: '16px 24px' }}>
                              <span style={{
                                padding: '4px 12px',
                                borderRadius: '9999px',
                                fontFamily: 'Raleway, sans-serif',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                border: `1px solid ${badge.border}`,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                backgroundColor: badge.bg,
                                color: badge.color,
                              }}>
                                {badge.icon} {badge.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
