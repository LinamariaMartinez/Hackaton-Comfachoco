// Use full URL since we're accessing n8n directly
const API_BASE_URL = 'https://comfachoco.app.n8n.cloud';
const ENDPOINTS = {
  CREATE_REQUEST: "/webhook/chatbot-agenda",
  GET_REQUESTS: "/webhook/chatbot-agenda",
  APPROVE_REQUEST: "/webhook/chatbot-agenda",
  REJECT_REQUEST: "/webhook/chatbot-agenda",
  LOGIN_USER: "/webhook/login",
  /* // Próximos endpoints
  REGISTER_USER: '/webhook/registrar-usuario',
  UPDATE_USER: '/webhook/modificar-usuario' */
};
/**
 * Iniciar sesión de usuario
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} respuesta del backend
 */
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.LOGIN_USER}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const responseText = await response.text();
    console.log("[loginUser] Respuesta cruda del backend:", responseText);

    // Intentar parsear la respuesta sin importar el status HTTP
    try {
      const result = JSON.parse(responseText);
      
      // Si el backend indica match: false, es un error de credenciales
      if (result.match === false) {
        const errorMessage = result.message || "Credenciales incorrectas";
        console.log("[loginUser] Error de autenticación:", errorMessage);
        return {
          success: false,
          message: errorMessage,
          user_data: result.user_data || null,
          error_type: "auth_failed"
        };
      }

      // Validar que tengamos los datos necesarios
      if (!result.user_data && !result.data?.user_data) {
        console.log("[loginUser] Error: Respuesta sin datos de usuario");
        return {
          success: false,
          message: "Error del servidor: Datos de usuario no disponibles",
          error_type: "invalid_response"
        };
      }

      // Si hay match o no viene match, asumimos éxito
      return {
        success: true,
        data: result,
      };

    } catch (jsonError) {
      // Error al parsear JSON
      return {
        success: false,
        message: response.ok ? "Respuesta inválida del servidor" : `Error: ${response.status}`,
        error: jsonError.message,
        raw: responseText,
      };
    }
  } catch (error) {
    // Error de red u otro error
    return {
      success: false,
      message: "Error al conectar con el servidor",
      error: error.message,
    };
  }
};

/**
 * Enviar solicitud de vacaciones/permiso (Employee Dashboard)
 */
export const submitRequest = async (requestData, user) => {
  try {
    // Validar que el usuario tiene documento
    if (!user.documento) {
      throw new Error("El usuario no tiene número de documento configurado");
    }

    const payload = {
      id_empleado: user.documento,
      nombres: user.name,
      d_area: user.department,
      mensaje:
        requestData.mensaje || `Solicitud de ${requestData.proceso_solicitado}`,
      proceso_solicitado: requestData.proceso_solicitado || "vacaciones",
      fecha_inicio: requestData.fecha_inicio,
      fecha_fin: requestData.fecha_fin,
    };

    console.log("📤 Enviando a N8N:", payload);

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CREATE_REQUEST}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();

    return {
      success: true,
      message: "✅ Solicitud enviada correctamente al sistema",
      data: result,
    };
  } catch (error) {
    console.error("Error al enviar solicitud:", error);
    return {
      success: false,
      message: "❌ Error al conectar con el sistema",
      error: error.message,
    };
  }
};

/**
 * Obtener lista de solicitudes (Employee/Supervisor/HR Dashboard)
 */
export const getSolicitudes = async (user, filters = {}) => {
  try {
    const payload = {
      id_empleado: user.documento,
      nombres: user.name,
      d_area: user.department,
      filtros: filters, // Para filtrar por estado, fecha, etc.
    };

    console.log("📊 Consultando solicitudes:", payload);

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.GET_REQUESTS}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.text();
    const data = result ? JSON.parse(result) : { solicitudes: [] };

    return {
      success: true,
      solicitudes: data.solicitudes || data.requests || [],
      data: data,
    };
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    return {
      success: false,
      message: "Error al consultar solicitudes",
      solicitudes: [],
      error: error.message,
    };
  }
};

/**
 * Obtener solicitud por ID
 */
export const getSolicitudById = async (solicitudId, user) => {
  try {
    const payload = {
      id_solicitud: solicitudId,
      id_empleado: user.documento,
      nombres: user.name,
      d_area: user.department,
    };

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.GET_REQUESTS}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.text();
    const data = result ? JSON.parse(result) : null;

    return {
      success: true,
      solicitud: data?.solicitud || data,
      data: data,
    };
  } catch (error) {
    console.error("Error al obtener solicitud por ID:", error);
    return {
      success: false,
      message: "Error al consultar solicitud",
      error: error.message,
    };
  }
};

/**
 * Aprobar solicitud (Supervisor/HR Dashboard)
 */
export const aprobarSolicitud = async (solicitudId, user, comentarios = "") => {
  try {
    const payload = {
      id_solicitud: solicitudId,
      id_aprobador: user.documento,
      nombre_aprobador: user.name,
      area_aprobador: user.department,
      comentarios: comentarios,
      fecha_aprobacion: new Date().toISOString(),
    };

    console.log("✅ Aprobando solicitud:", payload);

    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.APPROVE_REQUEST}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.text();
    const data = result
      ? JSON.parse(result)
      : { message: "Solicitud aprobada" };

    return {
      success: true,
      message: "✅ Solicitud aprobada correctamente",
      data: data,
    };
  } catch (error) {
    console.error("Error al aprobar solicitud:", error);
    return {
      success: false,
      message: "❌ Error al aprobar solicitud",
      error: error.message,
    };
  }
};

/**
 * Rechazar solicitud (Supervisor/HR Dashboard)
 */
export const rechazarSolicitud = async (
  solicitudId,
  user,
  motivoRechazo = "",
) => {
  try {
    const payload = {
      id_solicitud: solicitudId,
      id_rechazador: user.documento,
      nombre_rechazador: user.name,
      area_rechazador: user.department,
      motivo_rechazo: motivoRechazo,
      fecha_rechazo: new Date().toISOString(),
    };

    console.log("❌ Rechazando solicitud:", payload);

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.REJECT_REQUEST}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.text();
    const data = result
      ? JSON.parse(result)
      : { message: "Solicitud rechazada" };

    return {
      success: true,
      message: "❌ Solicitud rechazada correctamente",
      data: data,
    };
  } catch (error) {
    console.error("Error al rechazar solicitud:", error);
    return {
      success: false,
      message: "❌ Error al rechazar solicitud",
      error: error.message,
    };
  }
};

/**
 * Consultar saldo de empleado (mantener compatible)
 */
export const consultarSaldo = async (user) => {
  try {
    // Usando el endpoint de solicitudes para obtener el balance
    const payload = {
      id_empleado: user.documento,
      nombres: user.name,
      d_area: user.department,
      tipo_consulta: "saldo_vacaciones",
    };

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.GET_REQUESTS}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.text();
    const data = result ? JSON.parse(result) : {};

    return {
      success: true,
      saldo: data.dias_disponibles || data.remainingDays || 0,
      usado: data.dias_usados || data.usedDays || 0,
      total: data.dias_asignados || data.totalDays || 0,
      pendientes: data.solicitudes_pendientes || data.pendingRequests || 0,
      data: data,
    };
  } catch (error) {
    console.error("Error al consultar saldo:", error);
    return {
      success: false,
      message: "Error al consultar saldo",
      error: error.message,
    };
  }
};

/**
 * Consultar estado de licencias (alias para getSolicitudes)
 */
export const consultarEstadoLicencias = async (user) => {
  return await getSolicitudes(user);
};

/**
 * Chatbot general (mantener para compatibilidad)
 */
export const sendMessage = async (message, context = {}) => {
  const { user } = context;

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  try {
    const payload = {
      id_empleado: user.documento,
      nombres: user.name,
      d_area: user.department,
      mensaje: message,
      proceso_solicitado: "consulta_chatbot",
    };

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CREATE_REQUEST}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${responseText}`);
    }

    if (!responseText.trim()) {
      return {
        text: "Lo siento, no he podido procesar tu consulta. ¿Podrías reformularla?",
        action: "backend_response",
        data: { status: "empty_response" },
      };
    }

    try {
      const result = JSON.parse(responseText);
      const userName = user ? `${user.primer_nombre || ''} ${user.primer_apellido || ''}`.trim() : '';
      
      // Si tenemos una respuesta del modelo de n8n, la usamos directamente
      const assistantMessage = result.respuesta || result.message || responseText;
      
      // Si hay un nombre de usuario y el mensaje comienza con un saludo genérico, personalizarlo
      const greetings = ['hola', 'buenos días', 'buenas tardes', 'buenas noches'];
      const lowerMessage = assistantMessage.toLowerCase();
      const isGreeting = greetings.some(greeting => lowerMessage.startsWith(greeting));
      
      const formattedMessage = isGreeting && userName
        ? assistantMessage.replace(/^(hola|buenos días|buenas tardes|buenas noches)/i, `$1 ${userName}`)
        : assistantMessage;

      return {
        text: formattedMessage,
        action: "backend_response",
        data: result,
      };
    } catch (jsonError) {
      console.debug("JSON parse error:", jsonError);
      return {
        text: responseText,
        action: "backend_response",
        data: { raw: responseText },
      };
    }
  } catch (error) {
    console.error("❌ Error en chatbot:", error);

    return {
      text: `❌ Error de conexión: ${error.message}`,
      action: "error",
      error: error.message,
    };
  }
};

export default {
  sendMessage,
  submitRequest,
  getSolicitudes,
  getSolicitudById,
  aprobarSolicitud,
  rechazarSolicitud,
  consultarSaldo,
  consultarEstadoLicencias,
  loginUser,
};
