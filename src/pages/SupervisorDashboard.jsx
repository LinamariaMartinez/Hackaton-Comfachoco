import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Calendar, BarChart3, LogOut, Check, X, Menu, X as CloseIcon } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import CalendarFull from '../components/Common/CalendarFull';
import toast from 'react-hot-toast';

/**
 * ConflictCard - Componente reutilizable para conflictos
 */
const ConflictCard = ({ conflict, onApprove, onReject }) => {
  const typeIcons = {
    'Vacaciones': '🏖️',
    'Incapacidad': '🩹',
    'Permiso': '📜',
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      borderLeft: '4px solid #ef4444',
      padding: '20px',
      marginBottom: '16px',
      transition: 'box-shadow 0.2s',
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}
    >
      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 'bold',
            fontSize: '1rem',
            color: '#303030',
            margin: '0 0 4px 0',
          }}>
            {conflict.title}
          </h3>
          <p style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '0.875rem',
            color: '#8A8A8A',
            margin: 0,
          }}>
            {conflict.names.join(' + ')}
          </p>
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          backgroundColor: '#fee2e2',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: '1.5rem' }}>{typeIcons[conflict.type] || '📜'}</span>
        </div>
      </div>

      <div style={{
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
        padding: '12px',
        marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'Roboto, sans-serif', color: '#8A8A8A' }}>Tipo:</span>
          <span style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600, color: '#303030' }}>{conflict.type}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'Roboto, sans-serif', color: '#8A8A8A' }}>Fechas:</span>
          <span style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600, color: '#303030' }}>{conflict.dates}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
          <span style={{ fontFamily: 'Roboto, sans-serif', color: '#8A8A8A' }}>Impacto:</span>
          <span style={{
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 600,
            color: conflict.capacity < 70 ? '#dc2626' : '#ea580c',
          }}>
            Capacidad: {conflict.capacity}%
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => onApprove(conflict.id)}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: '#22c55e',
            color: '#FFFFFF',
            padding: '12px 16px',
            borderRadius: '12px',
            transition: 'all 0.2s',
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 600,
            fontSize: '0.875rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#16a34a';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#22c55e';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Check size={16} />
          Aprobar
        </button>
        <button
          onClick={() => onReject(conflict.id)}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: '#ef4444',
            color: '#FFFFFF',
            padding: '12px 16px',
            borderRadius: '12px',
            transition: 'all 0.2s',
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 600,
            fontSize: '0.875rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#dc2626';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ef4444';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={16} />
          Rechazar
        </button>
      </div>
    </div>
  );
};

/**
 * SupervisorDashboard - Diseño Corporativo Comfachocó
 */
const SupervisorDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const [activeTab, setActiveTab] = useState('calendario');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data - Conflictos
  const conflicts = [
    {
      id: 1,
      title: 'Conflicto de Capacidad',
      names: ['Juan Pérez', 'Laura Gómez'],
      type: 'Vacaciones',
      dates: '15-18 Nov',
      capacity: 65,
    },
    {
      id: 2,
      title: 'Incapacidad Médica',
      names: ['Carlos Rodríguez'],
      type: 'Incapacidad',
      dates: '20-25 Nov',
      capacity: 73,
    },
  ];

  // Mock data - Auto-aprobadas
  const autoApproved = [
    'María López (10-12 Nov)',
    'Pedro Sánchez (5-7 Nov)',
    'Ana Martínez (8-9 Nov)',
    'Diego Torres (13-14 Nov)',
    'Sofía Ramírez (16-17 Nov)',
    'Luis Hernández (19-20 Nov)',
    'Carmen Díaz (22-23 Nov)',
    'Jorge Castro (24-25 Nov)',
    'Valentina Ruiz (26-27 Nov)',
    'Miguel Flores (28-29 Nov)',
    'Isabella García (1-2 Nov)',
    'Sebastián Ortiz (3-4 Nov)',
    'Camila Vargas (6-7 Nov)',
  ];

  // Eventos del calendario (incluye conflictos + auto-aprobadas)
  const calendarEvents = [
    // Auto-aprobadas (verde)
    { date: '2025-11-10', name: 'M.López', type: 'Vacaciones', color: 'green' },
    { date: '2025-11-11', name: 'M.López', type: 'Vacaciones', color: 'green' },
    { date: '2025-11-12', name: 'M.López', type: 'Vacaciones', color: 'green' },
    { date: '2025-11-05', name: 'P.Sánchez', type: 'Permiso', color: 'green' },
    { date: '2025-11-06', name: 'P.Sánchez', type: 'Permiso', color: 'green' },
    { date: '2025-11-07', name: 'P.Sánchez', type: 'Permiso', color: 'green' },
    { date: '2025-11-08', name: 'A.Martínez', type: 'Vacaciones', color: 'green' },
    { date: '2025-11-09', name: 'A.Martínez', type: 'Vacaciones', color: 'green' },

    // Conflictos (naranja/rojo)
    { date: '2025-11-15', name: 'J.Pérez', type: 'Vacaciones', color: 'orange' },
    { date: '2025-11-15', name: 'L.Gómez', type: 'Vacaciones', color: 'orange' },
    { date: '2025-11-16', name: 'J.Pérez', type: 'Vacaciones', color: 'orange' },
    { date: '2025-11-16', name: 'L.Gómez', type: 'Vacaciones', color: 'orange' },
    { date: '2025-11-17', name: 'J.Pérez', type: 'Vacaciones', color: 'orange' },
    { date: '2025-11-17', name: 'L.Gómez', type: 'Vacaciones', color: 'orange' },
    { date: '2025-11-18', name: 'J.Pérez', type: 'Vacaciones', color: 'orange' },
    { date: '2025-11-18', name: 'L.Gómez', type: 'Vacaciones', color: 'orange' },

    { date: '2025-11-20', name: 'C.Rodríguez', type: 'Incapacidad', color: 'red' },
    { date: '2025-11-21', name: 'C.Rodríguez', type: 'Incapacidad', color: 'red' },
    { date: '2025-11-22', name: 'C.Rodríguez', type: 'Incapacidad', color: 'red' },
    { date: '2025-11-23', name: 'C.Rodríguez', type: 'Incapacidad', color: 'red' },
    { date: '2025-11-24', name: 'C.Rodríguez', type: 'Incapacidad', color: 'red' },
    { date: '2025-11-25', name: 'C.Rodríguez', type: 'Incapacidad', color: 'red' },

    // Más auto-aprobadas
    { date: '2025-11-13', name: 'D.Torres', type: 'Permiso', color: 'green' },
    { date: '2025-11-14', name: 'D.Torres', type: 'Permiso', color: 'green' },
    { date: '2025-11-26', name: 'V.Ramírez', type: 'Vacaciones', color: 'green' },
    { date: '2025-11-27', name: 'V.Ramírez', type: 'Vacaciones', color: 'green' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleApprove = (id) => {
    toast.success('✅ Solicitud aprobada exitosamente');
    console.log('Aprobando conflicto:', id);
  };

  const handleReject = (id) => {
    toast.error('❌ Solicitud rechazada');
    console.log('Rechazando conflicto:', id);
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
                  Supervisor
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
                onClick={() => {
                  setActiveTab('conflictos');
                  setSidebarOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'conflictos' ? '#04B45F' : 'transparent',
                  color: activeTab === 'conflictos' ? '#FFFFFF' : '#303030',
                  boxShadow: activeTab === 'conflictos' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                  transform: activeTab === 'conflictos' ? 'scale(1.05)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'conflictos') {
                    e.currentTarget.style.backgroundColor = '#fee2e2';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'conflictos') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <AlertTriangle size={22} />
                  <span>Conflictos</span>
                </div>
                <span style={{
                  backgroundColor: activeTab === 'conflictos' ? '#FFFFFF' : '#ef4444',
                  color: activeTab === 'conflictos' ? '#ef4444' : '#FFFFFF',
                  borderRadius: '9999px',
                  minWidth: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                }}>
                  {conflicts.length}
                </span>
              </button>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <button
                onClick={() => {
                  setActiveTab('auto-aprobadas');
                  setSidebarOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'auto-aprobadas' ? '#04B45F' : 'transparent',
                  color: activeTab === 'auto-aprobadas' ? '#FFFFFF' : '#303030',
                  boxShadow: activeTab === 'auto-aprobadas' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                  transform: activeTab === 'auto-aprobadas' ? 'scale(1.05)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'auto-aprobadas') {
                    e.currentTarget.style.backgroundColor = '#dcfce7';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'auto-aprobadas') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <CheckCircle size={22} />
                  <span>Auto-Aprobadas</span>
                </div>
                <span style={{
                  backgroundColor: activeTab === 'auto-aprobadas' ? '#FFFFFF' : '#04B45F',
                  color: activeTab === 'auto-aprobadas' ? '#04B45F' : '#FFFFFF',
                  borderRadius: '9999px',
                  minWidth: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                }}>
                  {autoApproved.length}
                </span>
              </button>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <button
                onClick={() => {
                  setActiveTab('calendario');
                  setSidebarOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  position: 'relative',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'calendario' ? '#04B45F' : 'transparent',
                  color: activeTab === 'calendario' ? '#FFFFFF' : '#303030',
                  boxShadow: activeTab === 'calendario' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                  transform: activeTab === 'calendario' ? 'scale(1.05)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'calendario') {
                    e.currentTarget.style.backgroundColor = '#dbeafe';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'calendario') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Calendar size={22} />
                <span>Ver Calendario</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('resumen');
                  setSidebarOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  position: 'relative',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'resumen' ? '#04B45F' : 'transparent',
                  color: activeTab === 'resumen' ? '#FFFFFF' : '#303030',
                  boxShadow: activeTab === 'resumen' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                  transform: activeTab === 'resumen' ? 'scale(1.05)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'resumen') {
                    e.currentTarget.style.backgroundColor = '#f3e8ff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'resumen') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <BarChart3 size={22} />
                <span>Resumen</span>
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
              gap: '16px',
              padding: '12px 16px',
              borderRadius: '12px',
              color: '#dc2626',
              transition: 'all 0.2s',
              position: 'relative',
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 500,
              fontSize: '0.875rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fef2f2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <LogOut size={22} />
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
          backgroundColor: '#04B45F',
          borderBottom: '1px solid #026636',
          padding: '20px 24px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => setSidebarOpen(true)}
                style={{
                  color: '#FFFFFF',
                  padding: '8px',
                  borderRadius: '12px',
                  transition: 'background-color 0.2s',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
                className="lg:hidden"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Menu size={24} />
              </button>
              <div>
                <h1 style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: '#FFFFFF',
                  margin: 0,
                }}>
                  Panel de Supervisor
                </h1>
                <p style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '0.875rem',
                  color: '#FFFFFF',
                  opacity: 0.9,
                  margin: 0,
                }}>
                  {user?.name || 'Supervisor'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '12px 16px',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}>
                <p style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '0.75rem',
                  color: '#FFFFFF',
                  opacity: 0.9,
                  margin: '0 0 4px 0',
                }}>Conflictos</p>
                <p style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: '#FFFFFF',
                  margin: 0,
                }}>
                  {conflicts.length}
                </p>
              </div>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '12px 16px',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }} className="hidden sm:block">
                <p style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '0.75rem',
                  color: '#FFFFFF',
                  opacity: 0.9,
                  margin: '0 0 4px 0',
                }}>Auto-Aprobadas</p>
                <p style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: '#FFFFFF',
                  margin: 0,
                }}>
                  {autoApproved.length}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Principal - Grid Responsive */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="lg:grid-cols-5">
            {/* COLUMNA IZQUIERDA - Calendario (60% en desktop) */}
            <div className="lg:col-span-3 lg:order-1" style={{ order: 2 }}>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                padding: '24px',
                border: '1px solid #f3f4f6',
              }}>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#04B45F',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}>
                      <Calendar size={22} style={{ color: '#FFFFFF' }} />
                    </div>
                    <h2 style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '1.25rem',
                      color: '#303030',
                      margin: 0,
                    }}>
                      Calendario del Equipo
                    </h2>
                  </div>
                  <p style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '0.875rem',
                    color: '#8A8A8A',
                    marginLeft: '52px',
                    margin: 0,
                  }}>
                    Vista general de ausencias programadas - Noviembre 2025
                  </p>
                </div>
                <CalendarFull events={calendarEvents} />
              </div>
            </div>

            {/* COLUMNA DERECHA - Conflictos y Detalles (40% en desktop) */}
            <div className="lg:col-span-2 lg:order-2" style={{ display: 'flex', flexDirection: 'column', gap: '24px', order: 1 }}>
              {/* Conflictos */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#ef4444',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}>
                    <AlertTriangle size={22} style={{ color: '#FFFFFF' }} />
                  </div>
                  <h2 style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    color: '#303030',
                    margin: 0,
                  }}>
                    Conflictos ({conflicts.length})
                  </h2>
                </div>

                {conflicts.length > 0 ? (
                  conflicts.map((conflict) => (
                    <ConflictCard
                      key={conflict.id}
                      conflict={conflict}
                      onApprove={handleApprove}
                      onReject={handleReject}
                    />
                  ))
                ) : (
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    padding: '32px',
                    textAlign: 'center',
                    border: '1px solid #f3f4f6',
                  }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: '#dcfce7',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}>
                      <CheckCircle size={32} style={{ color: '#16a34a' }} />
                    </div>
                    <p style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontWeight: 600,
                      color: '#303030',
                      marginBottom: '8px',
                    }}>
                      ¡Todo en orden!
                    </p>
                    <p style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '0.875rem',
                      color: '#8A8A8A',
                      margin: 0,
                    }}>
                      No hay conflictos pendientes por resolver
                    </p>
                  </div>
                )}
              </div>

              {/* Auto-Aprobadas */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f3f4f6',
                padding: '20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#04B45F',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}>
                    <CheckCircle size={22} style={{ color: '#FFFFFF' }} />
                  </div>
                  <h3 style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    color: '#303030',
                    margin: 0,
                  }}>
                    Auto-Aprobadas ({autoApproved.length})
                  </h3>
                </div>

                <div style={{
                  maxHeight: '320px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}>
                  {autoApproved.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        backgroundColor: '#dcfce7',
                        borderRadius: '12px',
                        border: '1px solid #86efac',
                        transition: 'box-shadow 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                    >
                      <CheckCircle size={16} style={{ color: '#16a34a', flexShrink: 0 }} />
                      <span style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '0.875rem',
                        color: '#303030',
                      }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumen Rápido */}
              <div style={{
                backgroundColor: '#04B45F',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid #026636',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <BarChart3 size={22} style={{ color: '#FFFFFF' }} />
                  </div>
                  <h3 style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    color: '#FFFFFF',
                    margin: 0,
                  }}>
                    Resumen Rápido
                  </h3>
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  fontFamily: 'Roboto, sans-serif',
                  color: '#FFFFFF',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                  }}>
                    <span style={{ opacity: 0.9 }}>Total solicitudes:</span>
                    <strong style={{ fontFamily: 'Raleway, sans-serif', fontSize: '1rem' }}>{conflicts.length + autoApproved.length}</strong>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                  }}>
                    <span style={{ opacity: 0.9 }}>Capacidad promedio:</span>
                    <strong style={{ fontFamily: 'Raleway, sans-serif', fontSize: '1rem' }}>75%</strong>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                  }}>
                    <span style={{ opacity: 0.9 }}>Días críticos:</span>
                    <strong style={{ fontFamily: 'Raleway, sans-serif', fontSize: '1rem' }}>15, 20-25 Nov</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
