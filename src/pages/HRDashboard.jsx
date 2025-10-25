import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Calendar,
  FileText,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  LogOut,
  Menu,
  X as CloseIcon,
  BarChart3,
  Building2
} from 'lucide-react';
import { useUserStore } from '../store/userStore';
import logo from '/logo-comfachoco-no-lema.svg';

/**
 * StatsCard - Tarjeta de estadísticas corporativas
 */
const StatsCard = ({ title, value, change, icon: Icon }) => {
  const isPositive = change >= 0;

  return (
    <div style={{
      backgroundColor: '#04B45F',
      borderRadius: '24px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      border: '1px solid #026636',
      transition: 'transform 0.2s',
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{
            fontFamily: 'Roboto, sans-serif',
            color: '#FFFFFF',
            opacity: 0.9,
            fontSize: '0.875rem',
            marginBottom: '8px',
          }}>{title}</p>
          <h3 style={{
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 'bold',
            fontSize: '2.25rem',
            color: '#FFFFFF',
            marginBottom: '12px',
            margin: 0,
          }}>
            {value}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isPositive ? (
              <TrendingUp style={{ color: '#FFFFFF' }} size={18} />
            ) : (
              <TrendingDown style={{ color: '#FFFFFF' }} size={18} />
            )}
            <span style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '0.875rem',
              color: '#FFFFFF',
              fontWeight: 600,
            }}>
              {Math.abs(change)}%
            </span>
            <span style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '0.75rem',
              color: '#FFFFFF',
              opacity: 0.75,
            }}>
              vs mes anterior
            </span>
          </div>
        </div>

        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        }}>
          <Icon style={{ color: '#FFFFFF' }} size={36} />
        </div>
      </div>
    </div>
  );
};

/**
 * HRDashboard - Diseño Corporativo Comfachocó
 */
const HRDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const mockAlerts = [
    {
      title: 'Departamento de IT con alta demanda',
      description: '5 empleados solicitaron vacaciones la misma semana',
      severity: 'high'
    },
    {
      title: 'Balance de días bajo',
      description: '3 empleados con menos de 5 días disponibles',
      severity: 'medium'
    },
  ];

  const mockRequestStats = {
    total: 45,
    pending: 12,
    approved: 28,
    rejected: 5,
  };

  const mockDepartments = [
    {
      name: 'Desarrollo',
      totalEmployees: 15,
      employeesOnLeave: 3,
      activeRequests: 5,
      percentage: 20,
    },
    {
      name: 'Marketing',
      totalEmployees: 10,
      employeesOnLeave: 2,
      activeRequests: 3,
      percentage: 20,
    },
    {
      name: 'Recursos Humanos',
      totalEmployees: 5,
      employeesOnLeave: 1,
      activeRequests: 2,
      percentage: 20,
    },
    {
      name: 'Ventas',
      totalEmployees: 12,
      employeesOnLeave: 2,
      activeRequests: 4,
      percentage: 17,
    },
    {
      name: 'Operaciones',
      totalEmployees: 8,
      employeesOnLeave: 1,
      activeRequests: 1,
      percentage: 13,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const requestItems = [
    {
      label: 'Total',
      value: mockRequestStats.total,
      icon: FileText,
      bg: '#3b82f6',
    },
    {
      label: 'Pendientes',
      value: mockRequestStats.pending,
      icon: Clock,
      bg: '#eab308',
    },
    {
      label: 'Aprobadas',
      value: mockRequestStats.approved,
      icon: CheckCircle,
      bg: '#22c55e',
    },
    {
      label: 'Rechazadas',
      value: mockRequestStats.rejected,
      icon: XCircle,
      bg: '#ef4444',
    },
  ];

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
                padding: '6px',
              }}>
                <img src={logo} alt="Comfachocó" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
                  RRHH
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
                  setActiveTab('dashboard');
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
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'dashboard' ? '#04B45F' : 'transparent',
                  color: activeTab === 'dashboard' ? '#FFFFFF' : '#303030',
                  boxShadow: activeTab === 'dashboard' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                  transform: activeTab === 'dashboard' ? 'scale(1.05)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'dashboard') {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'dashboard') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <BarChart3 size={22} />
                <span>Dashboard</span>
              </button>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <button
                onClick={() => {
                  setActiveTab('empleados');
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
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'empleados' ? '#04B45F' : 'transparent',
                  color: activeTab === 'empleados' ? '#FFFFFF' : '#303030',
                  boxShadow: activeTab === 'empleados' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                  transform: activeTab === 'empleados' ? 'scale(1.05)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'empleados') {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'empleados') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Users size={22} />
                <span>Empleados</span>
              </button>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <button
                onClick={() => {
                  setActiveTab('solicitudes');
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
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'solicitudes' ? '#04B45F' : 'transparent',
                  color: activeTab === 'solicitudes' ? '#FFFFFF' : '#303030',
                  boxShadow: activeTab === 'solicitudes' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                  transform: activeTab === 'solicitudes' ? 'scale(1.05)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'solicitudes') {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'solicitudes') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <FileText size={22} />
                <span>Solicitudes</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('departamentos');
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
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'departamentos' ? '#04B45F' : 'transparent',
                  color: activeTab === 'departamentos' ? '#FFFFFF' : '#303030',
                  boxShadow: activeTab === 'departamentos' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                  transform: activeTab === 'departamentos' ? 'scale(1.05)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'departamentos') {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'departamentos') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Building2 size={22} />
                <span>Departamentos</span>
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
                  Dashboard RRHH
                </h1>
                <p style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '0.875rem',
                  color: '#FFFFFF',
                  opacity: 0.9,
                  margin: 0,
                }}>
                  {user?.name || 'Recursos Humanos'}
                </p>
              </div>
            </div>
            <div style={{
              backgroundColor: 'rgba(98, 191, 230, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '8px 16px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }} className="hidden sm:block">
              <p style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '0.75rem',
                color: '#FFFFFF',
                opacity: 0.9,
                margin: '0 0 4px 0',
              }}>Alertas</p>
              <p style={{
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                color: '#FFFFFF',
                textAlign: 'center',
                margin: 0,
              }}>
                {mockAlerts.length}
              </p>
            </div>
          </div>
        </header>

        {/* Content Principal */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Stats Cards - Grid 3 columnas */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="md:grid-cols-3">
              <StatsCard
                title="Total Empleados"
                value={150}
                change={5}
                icon={Users}
              />
              <StatsCard
                title="Solicitudes Mes"
                value={45}
                change={-10}
                icon={FileText}
              />
              <StatsCard
                title="En Vacaciones"
                value={12}
                change={15}
                icon={Calendar}
              />
            </div>

            {/* Segunda Fila - Estado de Solicitudes y Alertas */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="lg:grid-cols-2">

              {/* Estado de Solicitudes */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                padding: '24px',
                border: '1px solid #f3f4f6',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
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
                    <FileText size={22} style={{ color: '#FFFFFF' }} />
                  </div>
                  <h3 style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    color: '#303030',
                    margin: 0,
                  }}>
                    Estado de Solicitudes
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {requestItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        style={{
                          backgroundColor: item.bg,
                          borderRadius: '16px',
                          padding: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                          transition: 'transform 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <Icon style={{ color: '#FFFFFF' }} size={28} />
                        <div>
                          <p style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '0.75rem',
                            color: '#FFFFFF',
                            opacity: 0.9,
                            margin: '0 0 4px 0',
                          }}>
                            {item.label}
                          </p>
                          <p style={{
                            fontFamily: 'Raleway, sans-serif',
                            fontWeight: 'bold',
                            fontSize: '1.875rem',
                            color: '#FFFFFF',
                            margin: 0,
                          }}>
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Alertas */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                padding: '24px',
                border: '1px solid #f3f4f6',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#eab308',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}>
                    <AlertTriangle size={22} style={{ color: '#FFFFFF' }} />
                  </div>
                  <h3 style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    color: '#303030',
                    margin: 0,
                  }}>
                    Alertas ({mockAlerts.length})
                  </h3>
                </div>

                {mockAlerts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px 0' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: '#dcfce7',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                    }}>
                      <CheckCircle size={32} style={{ color: '#16a34a' }} />
                    </div>
                    <p style={{
                      fontFamily: 'Roboto, sans-serif',
                      color: '#8A8A8A',
                      fontSize: '0.875rem',
                      margin: 0,
                    }}>
                      No hay alertas en este momento
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {mockAlerts.map((alert, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'start',
                          gap: '12px',
                          padding: '16px',
                          backgroundColor: '#fef3c7',
                          borderLeft: '4px solid #eab308',
                          borderRadius: '12px',
                          transition: 'box-shadow 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                      >
                        <AlertTriangle style={{ color: '#ca8a04', flexShrink: 0, marginTop: '4px' }} size={20} />
                        <div>
                          <p style={{
                            fontFamily: 'Raleway, sans-serif',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            color: '#303030',
                            margin: '0 0 4px 0',
                          }}>
                            {alert.title}
                          </p>
                          <p style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '0.75rem',
                            color: '#8A8A8A',
                            margin: 0,
                          }}>
                            {alert.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Estado por Departamento */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              padding: '24px',
              border: '1px solid #f3f4f6',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
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
                  <Building2 size={22} style={{ color: '#FFFFFF' }} />
                </div>
                <h3 style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                  color: '#303030',
                  margin: 0,
                }}>
                  Estado por Departamento
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {mockDepartments.map((dept, index) => (
                  <div key={index} style={{
                    backgroundColor: '#f9fafb',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '1px solid #e5e7eb',
                    transition: 'box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                          <Users style={{ color: '#FFFFFF' }} size={20} />
                        </div>
                        <span style={{
                          fontFamily: 'Raleway, sans-serif',
                          fontWeight: 600,
                          color: '#303030',
                          fontSize: '1.125rem',
                        }}>
                          {dept.name}
                        </span>
                      </div>
                      <span style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '0.875rem',
                        color: '#8A8A8A',
                        backgroundColor: '#FFFFFF',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                      }}>
                        {dept.activeRequests} solicitudes
                      </span>
                    </div>

                    <div style={{
                      width: '100%',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '9999px',
                      height: '12px',
                      marginBottom: '8px',
                      boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                    }}>
                      <div
                        style={{
                          backgroundColor: '#04B45F',
                          height: '12px',
                          borderRadius: '9999px',
                          transition: 'width 0.5s',
                          width: `${dept.percentage}%`,
                          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '0.875rem',
                        color: '#8A8A8A',
                      }}>
                        {dept.employeesOnLeave} de {dept.totalEmployees} empleados ausentes
                      </span>
                      <span style={{
                        fontFamily: 'Raleway, sans-serif',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        color: '#04B45F',
                      }}>
                        {dept.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default HRDashboard;
