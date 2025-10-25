import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Paperclip, X } from "lucide-react";
import toast from "react-hot-toast";

const ChatbotAssistant = ({
  userData = {},
  onSendMessage,
  onSubmitRequest,
}) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [pendingRequestType, setPendingRequestType] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Mensaje inicial
  useEffect(() => {
    if (chatMessages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        text: `¡Hola, ${userData.name || "Usuario"}! 👋\n\nSoy tu asistente de Comfachocó. ¿En qué puedo ayudarte hoy?`,
        sender: "bot",
        time: new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatMessages([welcomeMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.name]);

  // Auto-scroll al final
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chatMessages]);

  const quickQuestions = [
    { id: 1, text: "¿Cómo solicito vacaciones?", icon: "🏖️" },
    { id: 2, text: "¿Cuántos días tengo disponibles?", icon: "📊" },
    { id: 3, text: "Quiero solicitar una licencia", icon: "📄" },
    { id: 4, text: "Necesito una incapacidad médica", icon: "🏥" },
    { id: 5, text: "Ver disponibilidad del equipo", icon: "👥" },
  ];

  // Utilidad para agregar mensajes
  const pushMessage = (msg) => {
    setChatMessages((prev) => [
      ...prev,
      { ...msg, id: Date.now() + Math.random() },
    ]);
  };

  // Enviar mensaje (usa el callback onSendMessage)
  const handleSendMessage = async (textArg) => {
    const text = typeof textArg === "string" ? textArg : messageInput;
    if (!text || !text.trim()) return;

    // Añadir mensaje del usuario
    pushMessage({
      text,
      sender: "user",
      time: new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    // limpiar input solo si se usó el input
    if (!textArg) setMessageInput("");

    // Llamar al callback provisto por el padre
    if (typeof onSendMessage !== "function") {
      pushMessage({
        text: "Error: backend de mensajería no disponible.",
        sender: "bot",
        time: new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      return;
    }

    try {
      const result = await onSendMessage(text, { user: userData });

      // result puede ser string o { text }
      const botText =
        typeof result === "string"
          ? result
          : (result?.text ?? "Respuesta recibida");

      pushMessage({
        text: botText,
        sender: "bot",
        time: new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      // Si la respuesta del backend indica que se requiere adjuntar archivo,
      // esperamos que el backend devuelva { needFile: true, type: 'licencia' } o similar.
      if (result && typeof result === "object" && result.needFile) {
        setPendingRequestType(result.type || "documento");
        setShowFileUpload(true);
      }
    } catch (err) {
      console.error("Error en onSendMessage:", err);
      pushMessage({
        text: "Lo siento, hubo un error procesando tu mensaje. Intenta nuevamente.",
        sender: "bot",
        time: new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }
  };

  // Manejador para preguntas rápidas
  const handleQuickQuestion = async (question) => {
    // Si la pregunta requiere adjuntar archivo, activamos el flujo de archivo
    if (question.id === 3) {
      setPendingRequestType("licencia");
      setShowFileUpload(true);
    } else if (question.id === 4) {
      setPendingRequestType("incapacidad");
      setShowFileUpload(true);
    }

    // Enviamos la pregunta al backend usando el mismo callback
    await handleSendMessage(question.text);
  };

  // Selección de archivo
  const handleFileSelect = async (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    // Validaciones básicas (tipo y tamaño)
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Solo se permiten archivos PDF o imágenes (JPG, PNG)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("El archivo no debe superar 5MB");
      return;
    }

    setAttachedFile(file);
    toast.success(`Archivo "${file.name}" listo para enviar`);

    // Si no hay callback para enviar solicitudes, informar
    if (typeof onSubmitRequest !== "function") {
      pushMessage({
        text: "Error: backend de solicitudes no disponible. No se puede enviar el archivo.",
        sender: "bot",
        time: new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      setShowFileUpload(false);
      setAttachedFile(null);
      setPendingRequestType(null);
      return;
    }

    // Llamar al callback para enviar la solicitud con el archivo
    try {
      const payload = {
        file,
        type: pendingRequestType,
        user: userData,
      };
      const result = await onSubmitRequest(payload);

      // Interpretar resultado esperado: { success, message?, text? }
      if (result && result.success) {
        pushMessage({
          text:
            result.text ||
            result.message ||
            `✅ Archivo "${file.name}" enviado. Tu solicitud ha sido creada correctamente.`,
          sender: "bot",
          time: new Date().toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      } else {
        pushMessage({
          text:
            (result && (result.message || result.text)) ||
            "❌ No se pudo procesar la solicitud. Intenta nuevamente más tarde.",
          sender: "bot",
          time: new Date().toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      }
    } catch (err) {
      console.error("Error en onSubmitRequest:", err);
      pushMessage({
        text: "❌ Error enviando la solicitud. Intenta nuevamente más tarde.",
        sender: "bot",
        time: new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    } finally {
      setShowFileUpload(false);
      setAttachedFile(null);
      setPendingRequestType(null);
    }
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    toast.success("Archivo removido");
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 200px)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ backgroundColor: "#04B45F", padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MessageCircle size={24} style={{ color: "#04B45F" }} />
          </div>
          <div>
            <h2
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: "bold",
                fontSize: "1.25rem",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Asistente Virtual
            </h2>
            <p
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "0.875rem",
                color: "#FFFFFF",
                opacity: 0.9,
                margin: 0,
              }}
            >
              Pregunta lo que necesites
            </p>
          </div>
        </div>
      </div>

      {/* Quick actions (se ocultan si ya hay más de 1 mensaje) */}
      {chatMessages.length <= 1 && (
        <div
          style={{
            padding: "16px",
            backgroundColor: "#f0fdf4",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <p
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 600,
              fontSize: "0.875rem",
              color: "#303030",
              margin: "0 0 12px 0",
            }}
          >
            💬 Acciones rápidas:
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {quickQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => handleQuickQuestion(q)}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #04B45F",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "0.875rem",
                  color: "#303030",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#04B45F";
                  e.currentTarget.style.color = "#FFFFFF";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.color = "#303030";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <span style={{ fontSize: "1rem" }}>{q.icon}</span>
                <span>{q.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
          backgroundColor: "#f9fafb",
        }}
      >
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                maxWidth: "75%",
                borderRadius: "12px",
                padding: "12px 16px",
                backgroundColor: msg.sender === "user" ? "#04B45F" : "#FFFFFF",
                color: msg.sender === "user" ? "#FFFFFF" : "#303030",
                border: msg.sender === "bot" ? "1px solid #e5e7eb" : "none",
              }}
            >
              <p
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "0.875rem",
                  whiteSpace: "pre-wrap",
                  margin: "0 0 4px 0",
                }}
              >
                {msg.text}
              </p>
              <span
                style={{
                  fontSize: "0.75rem",
                  display: "block",
                  color: msg.sender === "user" ? "#FFFFFF" : "#8A8A8A",
                  opacity: msg.sender === "user" ? 0.75 : 1,
                }}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input / file upload */}
      <div
        style={{
          padding: "16px",
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        {showFileUpload && (
          <div
            style={{
              marginBottom: "12px",
              padding: "12px",
              backgroundColor: "#fef3c7",
              borderRadius: "8px",
              border: "1px solid #fde047",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Paperclip size={20} style={{ color: "#ca8a04" }} />
                <span
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "0.875rem",
                    color: "#854d0e",
                  }}
                >
                  {attachedFile
                    ? `Archivo: ${attachedFile.name}`
                    : "Adjunta tu documento"}
                </span>
              </div>
              {!attachedFile ? (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    backgroundColor: "#04B45F",
                    color: "#FFFFFF",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#026636")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#04B45F")
                  }
                >
                  Seleccionar archivo
                </button>
              ) : (
                <button
                  onClick={handleRemoveFile}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "#FFFFFF",
                    padding: "6px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#dc2626")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ef4444")
                  }
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
          style={{ display: "none" }}
        />

        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Escribe tu mensaje aquí..."
            style={{
              flex: 1,
              padding: "12px 16px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontFamily: "Roboto, sans-serif",
              fontSize: "0.875rem",
              outline: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#04B45F";
              e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(4, 180, 95, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <button
            onClick={() => handleSendMessage()}
            style={{
              backgroundColor: "#04B45F",
              color: "#FFFFFF",
              padding: "12px 24px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "Raleway, sans-serif",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#026636")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#04B45F")
            }
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
