import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Calendar,
  History,
  LogOut,
  Menu,
  X as CloseIcon,
  FileText,
  Download,
} from "lucide-react";
import { useUserStore } from "../store/userStore";
import CalendarMini from "../components/Common/CalendarMini";
import CalendarFull from "../components/Common/CalendarFull";
import ChatbotAssistant from "../components/Employee/ChatbotAssistant";
import {
  consultarSaldo,
  getSolicitudes,
  sendMessage,
  submitRequest,
} from "../services/chatbot";
import toast from "react-hot-toast";
import logo from "/logo-comfachoco-no-lema.svg";

/**
 * Dashboard del Empleado - Integrado con N8N y Supabase
 * Nota: La UI del chatbot fue reemplazada por el componente reutilizable `ChatbotAssistant`
 */
const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const [activeTab, setActiveTab] = useState("chatbot");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  // 🔥 ESTADOS
  const [loading, setLoading] = useState(false);
  const [saldo, setSaldo] = useState(null);
  const [solicitudes, setSolicitudes] = useState([]);

  // Auto-load user-related data cuando esté disponible el documento
  useEffect(() => {
    if (!user?.documento) {
      toast.error("No tienes número de documento configurado");
      return;
    }
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.documento]);

  const loadInitialData = async () => {
    if (!user?.documento) return;

    setLoading(true);
    try {
      // Consultar saldo
      const saldoResult = await consultarSaldo(user);
      if (saldoResult.success) {
        setSaldo(saldoResult);
      } else {
        toast.error("Error consultando saldo: " + saldoResult.message);
      }

      // Consultar solicitudes
      const solicitudesResult = await getSolicitudes(user);
      if (solicitudesResult.success) {
        setSolicitudes(solicitudesResult.solicitudes || []);
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
      toast.error("Error cargando datos del usuario");
    } finally {
      setLoading(false);
    }
  };

  // Datos derivados del usuario y saldo
  const userData = {
    name: user?.name || "Usuario",
    document: user?.documento || "Sin documento",
    department: user?.department || "Sin área",
    balance: saldo
      ? {
          totalDays: saldo.total || 0,
          usedDays: saldo.usado || 0,
          remainingDays: saldo.saldo || 0,
        }
      : {
          totalDays: 0,
          usedDays: 0,
          remainingDays: 0,
        },
  };

  // Historial mapeado
  const requestsHistory = solicitudes.map((sol, index) => ({
    id: sol.id_solicitud || index + 1,
    type: sol.proceso_solicitado || sol.tipo || "Solicitud",
    startDate: sol.fecha_inicio || sol.inicio || "2025-01-01",
    endDate: sol.fecha_fin || sol.fin || "2025-01-01",
    days: sol.dias_solicitados || sol.dias || 1,
    status: sol.estado || "pending",
    attachments: sol.adjuntos || [],
  }));

  // Calendario (actualmente vacío - debe venir de N8N)
  const calendarEvents = [];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDateClick = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    if (selectedDates.includes(dateStr)) {
      setSelectedDates(selectedDates.filter((d) => d !== dateStr));
    } else {
      setSelectedDates([...selectedDates, dateStr]);
    }
  };

  // Callbacks para el componente de chat: envían/gestionan las peticiones al backend.
  // onSendMessage: wrapper que usa la función `sendMessage` del servicio.
  const handleSendMessage = async (message = {}) => {
    try {
      // sendMessage espera (message, { user })
      const response = await sendMessage(message, { user });
      // Retornamos lo que el servicio devuelva para que el componente lo interprete
      return response;
    } catch (error) {
      console.error("Error enviando mensaje desde EmployeeDashboard:", error);
      return {
        success: false,
        message: error.message || "Error enviando mensaje",
      };
    }
  };

  const handleSubmitRequest = async (payload = {}) => {
    try {
      const requestData = {
        proceso_solicitado:
          payload.type || payload.proceso_solicitado || "vacaciones",
        fecha_inicio: payload.fecha_inicio || new Date().toISOString(),
        fecha_fin: payload.fecha_fin || new Date().toISOString(),
        mensaje:
          payload.mensaje || `Solicitud de ${payload.type || "vacaciones"}`,
      };

      const result = await submitRequest(requestData, user);
      // Si se envía correctamente, refrescar datos del dashboard
      if (result && result.success) {
        await loadInitialData();
      }
      return result;
    } catch (error) {
      console.error("Error enviando solicitud desde EmployeeDashboard:", error);
      return {
        success: false,
        message: error.message || "Error al enviar solicitud",
      };
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      approved: {
        icon: "✅",
        label: "Aprobada",
        bg: "#dcfce7",
        color: "#166534",
        border: "#86efac",
      },
      pending: {
        icon: "⏳",
        label: "Pendiente",
        bg: "#fef9c3",
        color: "#854d0e",
        border: "#fde047",
      },
      rejected: {
        icon: "❌",
        label: "Rechazada",
        bg: "#fee2e2",
        color: "#991b1b",
        border: "#fca5a5",
      },
      en_proceso: {
        icon: "🔄",
        label: "En Proceso",
        bg: "#dbeafe",
        color: "#1e40af",
        border: "#93c5fd",
      },
    };
    return badges[status] || badges.pending;
  };

  // Validación: Usuario sin documento
  if (!user?.documento) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#F9F9FC",
          padding: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fee2e2",
            border: "1px solid #fca5a5",
            borderRadius: "12px",
            padding: "24px",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#991b1b",
              fontFamily: "Raleway, sans-serif",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            ⚠️ Perfil Incompleto
          </h2>
          <p
            style={{
              color: "#7f1d1d",
              fontFamily: "Roboto, sans-serif",
              marginBottom: "16px",
            }}
          >
            Tu perfil no tiene número de documento configurado. Esto es
            necesario para conectar con el sistema N8N.
          </p>
          <p
            style={{
              color: "#7f1d1d",
              fontFamily: "Roboto, sans-serif",
              fontSize: "0.875rem",
            }}
          >
            Usuario actual: {user?.name || "Sin nombre"}
            <br />
            Email: {user?.email || "Sin email"}
            <br />
            Documento: {user?.documento || "❌ NO CONFIGURADO"}
          </p>
        </div>
      </div>
    );
  }

  // Loading state general
  if (loading && !saldo) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#F9F9FC",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid #e5e7eb",
              borderTop: "4px solid #04B45F",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p
            style={{
              fontFamily: "Roboto, sans-serif",
              color: "#8A8A8A",
            }}
          >
            Cargando datos del empleado...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#F9F9FC",
        overflow: "hidden",
      }}
    >
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 40,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease-in-out",
          zIndex: 50,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          width: "288px",
        }}
        className="dashboard-sidebar"
      >
        {/* Logo Header */}
        <div
          style={{
            backgroundColor: "#04B45F",
            padding: "24px",
            borderBottom: "1px solid #026636",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "6px",
                }}
              >
                <img
                  src={logo}
                  alt="Comfachocó"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div>
                <span
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: "bold",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    display: "block",
                    lineHeight: "1.2",
                  }}
                >
                  Comfachocó
                </span>
                <span
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    color: "#FFFFFF",
                    opacity: 0.9,
                    fontSize: "0.75rem",
                  }}
                >
                  Gestión
                </span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                color: "#FFFFFF",
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              className="lg:hidden"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <CloseIcon size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "8px" }}>
              <button
                onClick={() => {
                  setActiveTab("chatbot");
                  setSidebarOpen(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  transition: "all 0.2s",
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor:
                    activeTab === "chatbot" ? "#04B45F" : "transparent",
                  color: activeTab === "chatbot" ? "#FFFFFF" : "#303030",
                  boxShadow:
                    activeTab === "chatbot"
                      ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "chatbot") {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "chatbot") {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <MessageCircle size={20} />
                <span>Asistente Virtual</span>
              </button>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <button
                onClick={() => {
                  setActiveTab("disponibilidad");
                  setSidebarOpen(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  transition: "all 0.2s",
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor:
                    activeTab === "disponibilidad" ? "#04B45F" : "transparent",
                  color: activeTab === "disponibilidad" ? "#FFFFFF" : "#303030",
                  boxShadow:
                    activeTab === "disponibilidad"
                      ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "disponibilidad") {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "disponibilidad") {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <Calendar size={20} />
                <span>Disponibilidad del Equipo</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("historial");
                  setSidebarOpen(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  transition: "all 0.2s",
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor:
                    activeTab === "historial" ? "#04B45F" : "transparent",
                  color: activeTab === "historial" ? "#FFFFFF" : "#303030",
                  boxShadow:
                    activeTab === "historial"
                      ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "historial") {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "historial") {
                    e.currentTarget.style.backgroundColor = "transparent";
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
        <div style={{ padding: "16px", borderTop: "1px solid #e5e7eb" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              color: "#dc2626",
              transition: "all 0.2s",
              fontFamily: "Raleway, sans-serif",
              fontWeight: 500,
              fontSize: "0.875rem",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#fef2f2")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px",
            backgroundColor: "#f9fafb",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "#8A8A8A",
              textAlign: "center",
              fontFamily: "Roboto, sans-serif",
              margin: 0,
            }}
          >
            Comfachocó Gestión v1.0.0
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        className="lg:ml-0"
      >
        {/* Header */}
        <header
          style={{
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ padding: "16px 24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <button
                  onClick={() => setSidebarOpen(true)}
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    transition: "background-color 0.2s",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  className="lg:hidden"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f3f4f6")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <Menu size={24} style={{ color: "#303030" }} />
                </button>
                <div>
                  <h1
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      color: "#303030",
                      margin: 0,
                    }}
                  >
                    {userData.name}
                  </h1>
                  <p
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "0.875rem",
                      color: "#8A8A8A",
                      margin: 0,
                    }}
                  >
                    {userData.department}
                  </p>
                </div>
              </div>

              {/* Balance */}
              <div
                style={{
                  backgroundColor: "#62BFE6",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                className="hidden sm:block"
              >
                <p
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "1rem",
                    color: "#FFFFFF",
                    margin: "0 0 4px 0",
                  }}
                >
                  Días disponibles vacaciones
                </p>
                <p
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: "bold",
                    fontSize: "1.875rem",
                    color: "#FFFFFF",
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  {userData.balance.remainingDays}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {/* TAB 1: Chatbot (ahora usando componente reutilizable) */}
          {activeTab === "chatbot" && (
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "24px",
                }}
                className="lg:grid-cols-3"
              >
                {/* CHATBOT - Reemplazado por componente */}
                <div className="lg:col-span-2">
                  <ChatbotAssistant
                    userData={userData}
                    onSendMessage={handleSendMessage}
                    onSubmitRequest={handleSubmitRequest}
                    onOpenAvailability={() => setActiveTab("disponibilidad")}
                  />
                </div>

                {/* Sidebar Derecho - 1/3 */}
                <div
                  className="lg:col-span-1"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  {/* Balance Card */}
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      padding: "24px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: "bold",
                        fontSize: "1.125rem",
                        color: "#303030",
                        margin: "0 0 16px 0",
                      }}
                    >
                      Tu Balance
                    </h3>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "12px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "0.875rem",
                            color: "#8A8A8A",
                          }}
                        >
                          Total:
                        </span>
                        <span
                          style={{
                            fontFamily: "Raleway, sans-serif",
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          {userData.balance.totalDays} días
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "12px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "0.875rem",
                            color: "#8A8A8A",
                          }}
                        >
                          Usados:
                        </span>
                        <span
                          style={{
                            fontFamily: "Raleway, sans-serif",
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          {userData.balance.usedDays} días
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingTop: "12px",
                          borderTop: "1px solid #e5e7eb",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          Disponibles:
                        </span>
                        <span
                          style={{
                            fontFamily: "Raleway, sans-serif",
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                            color: "#04B45F",
                          }}
                        >
                          {userData.balance.remainingDays}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CalendarMini */}
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      padding: "16px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <CalendarMini
                      selectedDates={selectedDates}
                      currentMonth={new Date()}
                      onDateClick={handleDateClick}
                    />
                  </div>

                  {/* Días seleccionados */}
                  {selectedDates.length > 0 && (
                    <div
                      style={{
                        backgroundColor: "#04B45F",
                        borderRadius: "12px",
                        padding: "20px",
                        color: "#FFFFFF",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "0.875rem",
                          margin: "0 0 8px 0",
                        }}
                      >
                        Días seleccionados:
                      </p>
                      <p
                        style={{
                          fontFamily: "Raleway, sans-serif",
                          fontWeight: "bold",
                          fontSize: "2.25rem",
                          margin: 0,
                        }}
                      >
                        {selectedDates.length}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Disponibilidad */}
          {activeTab === "disponibilidad" && (
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
              <div style={{ marginBottom: "24px" }}>
                <h2
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    color: "#303030",
                    margin: "0 0 8px 0",
                  }}
                >
                  Disponibilidad del Equipo
                </h2>
                <p
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    color: "#8A8A8A",
                    margin: 0,
                  }}
                >
                  Consulta las ausencias programadas de tu equipo
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  padding: "24px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <CalendarFull events={calendarEvents} />
              </div>
            </div>
          )}

          {/* TAB 3: Historial */}
          {activeTab === "historial" && (
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
              <div style={{ marginBottom: "24px" }}>
                <h2
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    color: "#303030",
                    margin: "0 0 8px 0",
                  }}
                >
                  Historial de Solicitudes
                </h2>
                <p
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    color: "#8A8A8A",
                    margin: 0,
                  }}
                >
                  Revisa todas tus solicitudes anteriores
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead
                      style={{
                        backgroundColor: "#f9fafb",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <tr>
                        <th
                          style={{
                            padding: "16px 24px",
                            textAlign: "left",
                            fontFamily: "Raleway, sans-serif",
                            fontWeight: "bold",
                            fontSize: "0.875rem",
                            color: "#303030",
                          }}
                        >
                          Tipo
                        </th>
                        <th
                          style={{
                            padding: "16px 24px",
                            textAlign: "left",
                            fontFamily: "Raleway, sans-serif",
                            fontWeight: "bold",
                            fontSize: "0.875rem",
                            color: "#303030",
                          }}
                        >
                          Fechas
                        </th>
                        <th
                          style={{
                            padding: "16px 24px",
                            textAlign: "left",
                            fontFamily: "Raleway, sans-serif",
                            fontWeight: "bold",
                            fontSize: "0.875rem",
                            color: "#303030",
                          }}
                        >
                          Días
                        </th>
                        <th
                          style={{
                            padding: "16px 24px",
                            textAlign: "left",
                            fontFamily: "Raleway, sans-serif",
                            fontWeight: "bold",
                            fontSize: "0.875rem",
                            color: "#303030",
                          }}
                        >
                          Archivos
                        </th>
                        <th
                          style={{
                            padding: "16px 24px",
                            textAlign: "left",
                            fontFamily: "Raleway, sans-serif",
                            fontWeight: "bold",
                            fontSize: "0.875rem",
                            color: "#303030",
                          }}
                        >
                          Estado
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {requestsHistory.map((request) => {
                        const badge = getStatusBadge(request.status);
                        return (
                          <tr
                            key={request.id}
                            style={{
                              borderBottom: "1px solid #f3f4f6",
                              transition: "background-color 0.2s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#f9fafb")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "transparent")
                            }
                          >
                            <td
                              style={{
                                padding: "16px 24px",
                                fontFamily: "Roboto, sans-serif",
                                fontSize: "0.875rem",
                                color: "#303030",
                              }}
                            >
                              {request.type}
                            </td>
                            <td
                              style={{
                                padding: "16px 24px",
                                fontFamily: "Roboto, sans-serif",
                                fontSize: "0.875rem",
                                color: "#8A8A8A",
                              }}
                            >
                              {new Date(request.startDate).toLocaleDateString(
                                "es-ES",
                              )}{" "}
                              -{" "}
                              {new Date(request.endDate).toLocaleDateString(
                                "es-ES",
                              )}
                            </td>
                            <td
                              style={{
                                padding: "16px 24px",
                                fontFamily: "Raleway, sans-serif",
                                fontWeight: 600,
                                fontSize: "0.875rem",
                                color: "#303030",
                              }}
                            >
                              {request.days}
                            </td>
                            <td style={{ padding: "16px 24px" }}>
                              {request.attachments &&
                              request.attachments.length > 0 ? (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                  }}
                                >
                                  {request.attachments.map((file, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        padding: "8px 12px",
                                        backgroundColor: "#f9fafb",
                                        borderRadius: "6px",
                                        border: "1px solid #e5e7eb",
                                      }}
                                    >
                                      <FileText
                                        size={16}
                                        style={{
                                          color: "#04B45F",
                                          flexShrink: 0,
                                        }}
                                      />
                                      <div style={{ flex: 1, minWidth: 0 }}>
                                        <p
                                          style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "0.75rem",
                                            color: "#303030",
                                            margin: 0,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                          }}
                                        >
                                          {file.name}
                                        </p>
                                        <p
                                          style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "0.625rem",
                                            color: "#8A8A8A",
                                            margin: 0,
                                          }}
                                        >
                                          {file.size}
                                        </p>
                                      </div>
                                      <button
                                        onClick={() =>
                                          toast.success(
                                            `Descargando ${file.name}`,
                                          )
                                        }
                                        style={{
                                          padding: "6px",
                                          borderRadius: "4px",
                                          border: "none",
                                          backgroundColor: "transparent",
                                          cursor: "pointer",
                                          transition: "background-color 0.2s",
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                        title="Descargar archivo"
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.backgroundColor =
                                            "#e5e7eb")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.backgroundColor =
                                            "transparent")
                                        }
                                      >
                                        <Download
                                          size={14}
                                          style={{ color: "#04B45F" }}
                                        />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <span
                                  style={{
                                    fontFamily: "Roboto, sans-serif",
                                    fontSize: "0.75rem",
                                    color: "#8A8A8A",
                                    fontStyle: "italic",
                                  }}
                                >
                                  Sin archivos
                                </span>
                              )}
                            </td>
                            <td style={{ padding: "16px 24px" }}>
                              <span
                                style={{
                                  padding: "4px 12px",
                                  borderRadius: "9999px",
                                  fontFamily: "Raleway, sans-serif",
                                  fontWeight: 600,
                                  fontSize: "0.75rem",
                                  border: `1px solid ${badge.border}`,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  backgroundColor: badge.bg,
                                  color: badge.color,
                                }}
                              >
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
