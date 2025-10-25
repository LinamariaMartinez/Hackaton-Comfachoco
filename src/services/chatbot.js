const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ENDPOINTS = {
  CREATE_REQUEST: "/webhook/chatbot-agenda",
  GET_REQUESTS: "/webhook/gestion-solicitudes",
  APPROVE_REQUEST: "/webhook/aprobar-solicitud",
  REJECT_REQUEST: "/webhook/rechazar-solicitud",
  /* // Próximos endpoints
  LOGIN_USER: '/webhook/iniciar-sesion',
  REGISTER_USER: '/webhook/registrar-usuario',
  UPDATE_USER: '/webhook/modificar-usuario' */
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
        text: `✅ Tu consulta "${message}" ha sido procesada correctamente.`,
        action: "backend_response",
        data: { status: "processed", empty_response: true },
      };
    }

    try {
      const result = JSON.parse(responseText);
      return {
        text: result.respuesta || result.message || responseText,
        action: "backend_response",
        data: result,
      };
    } catch (jsonError) {
      // En caso de que la respuesta no sea JSON válido, registramos el error para debugging
      // y devolvemos el texto crudo como fallback.
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
};
