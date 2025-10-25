/**
 * Servicio Mock para el Chatbot
 * Proporciona respuestas predefinidas para demostración sin backend
 * Usa localStorage para persistencia
 */

import {
  getSolicitudesFromStorage,
  saveSolicitudToStorage,
  saveBalanceCache,
  getBalanceCache,
} from './localStorage';

// Datos mock de saldo de vacaciones
const MOCK_BALANCE_DATA = {
  "123456789": { total: 15, usado: 5, saldo: 10 }, // empleado@comfachoco.com
  "987654321": { total: 20, usado: 8, saldo: 12 }, // supervisor@comfachoco.com
  "456789123": { total: 25, usado: 10, saldo: 15 }, // rrhh@comfachoco.com
};

// Datos iniciales mock de solicitudes (solo si no hay en localStorage)
const INITIAL_MOCK_REQUESTS = [
  {
    type: "Vacaciones",
    proceso_solicitado: "Vacaciones",
    fecha_inicio: "2025-02-10",
    startDate: "2025-02-10",
    fecha_fin: "2025-02-14",
    endDate: "2025-02-14",
    dias_solicitados: 5,
    days: 5,
    estado: "approved",
    status: "approved",
  },
  {
    type: "Licencia médica",
    proceso_solicitado: "Licencia médica",
    fecha_inicio: "2025-01-15",
    startDate: "2025-01-15",
    fecha_fin: "2025-01-16",
    endDate: "2025-01-16",
    dias_solicitados: 2,
    days: 2,
    estado: "pending",
    status: "pending",
  },
];

/**
 * Detecta qué tipo de pregunta es basándose en palabras clave o números
 */
const detectQuestionType = (message) => {
  const msg = message.toLowerCase().trim();

  // Detectar números (1-5)
  if (msg === "1" || msg === "1️⃣") {
    return "how_to_request_vacation";
  }
  if (msg === "2" || msg === "2️⃣") {
    return "check_balance";
  }
  if (msg === "3" || msg === "3️⃣") {
    return "request_leave";
  }
  if (msg === "4" || msg === "4️⃣") {
    return "medical_leave";
  }
  if (msg === "5" || msg === "5️⃣") {
    return "team_availability";
  }

  // Detectar por palabras clave
  if (msg.includes("vacacion") || msg.includes("solicito vacacion")) {
    return "how_to_request_vacation";
  }
  if (msg.includes("días") && msg.includes("disponible")) {
    return "check_balance";
  }
  if (msg.includes("solicitar") && msg.includes("licencia")) {
    return "request_leave";
  }
  if (msg.includes("incapacidad") || msg.includes("médica")) {
    return "medical_leave";
  }
  if (msg.includes("disponibilidad") && msg.includes("equipo")) {
    return "team_availability";
  }
  if (msg.includes("política") || msg.includes("políticas")) {
    return "general";
  }

  return "general";
};

/**
 * Genera respuestas mock basadas en el tipo de pregunta
 */
export const getMockChatbotResponse = (message, userData = {}) => {
  const questionType = detectQuestionType(message);
  const userName = userData?.name || "Usuario";
  const documento = userData?.numero_documento || userData?.documento;
  const balance = MOCK_BALANCE_DATA[documento] || { total: 15, usado: 0, saldo: 15 };

  const responses = {
    how_to_request_vacation: {
      text: `¡Hola ${userName}! 😊\n\nPara solicitar vacaciones, sigue estos pasos:\n\n1️⃣ Selecciona las fechas en el calendario\n2️⃣ Presiona "Solicitar vacaciones"\n3️⃣ Completa el formulario con los detalles\n4️⃣ Tu supervisor revisará la solicitud\n\n💡 Tip: Solicita con al menos 15 días de anticipación para mejor planificación.\n\n¿Te gustaría hacer una solicitud ahora?`,
      needFile: false,
    },

    check_balance: {
      text: `📊 **Estado de tus vacaciones, ${userName}:**\n\n✅ Días totales: ${balance.total} días\n📅 Días usados: ${balance.usado} días\n🎯 Días disponibles: ${balance.saldo} días\n\n${
        balance.saldo > 0
          ? "¡Tienes días disponibles! ¿Quieres solicitar vacaciones?"
          : "Has utilizado todos tus días disponibles este periodo."
      }`,
      needFile: false,
    },

    request_leave: {
      text: `📄 **Solicitud de Licencia**\n\nPerfecto ${userName}, para procesar tu licencia necesito que adjuntes:\n\n📎 Documento que justifique la licencia\n✅ Formatos aceptados: PDF, JPG, PNG\n📏 Tamaño máximo: 5MB\n\nPor favor, adjunta el archivo cuando estés listo.`,
      needFile: true,
      type: "licencia",
    },

    medical_leave: {
      text: `🏥 **Incapacidad Médica**\n\nEntiendo ${userName}, para registrar tu incapacidad médica necesito:\n\n📋 Certificado médico o incapacidad\n✅ Debe estar firmado y sellado\n📎 Formatos: PDF, JPG, PNG (máx 5MB)\n\n⚕️ Recuerda: Las incapacidades deben reportarse en las primeras 24 horas.\n\nPor favor, adjunta tu certificado médico.`,
      needFile: true,
      type: "incapacidad",
    },

    team_availability: {
      text: `👥 **Disponibilidad del Equipo**\n\nHola ${userName}, aquí está la disponibilidad de tu equipo:\n\n📅 **Esta semana:**\n✅ María García - Disponible\n✅ Carlos López - Disponible  \n🏖️ Ana Martínez - Vacaciones (hasta el 28 de Oct)\n\n📅 **Próxima semana:**\n✅ Todos disponibles\n\nℹ️ Esta información se actualiza en tiempo real con el sistema de solicitudes.`,
      needFile: false,
    },

    general: {
      text: `¡Hola ${userName}! 👋\n\nPuedo ayudarte con:\n\n1️⃣ Solicitar vacaciones o licencias\n2️⃣ Consultar tu saldo de días disponibles\n3️⃣ Registrar incapacidades médicas\n4️⃣ Ver disponibilidad de tu equipo\n5️⃣ Información sobre políticas de RRHH\n\nEscribe el número de la opción o pregúntame directamente. 😊`,
      needFile: false,
    },
  };

  return responses[questionType] || responses.general;
};

/**
 * Simula el envío de una solicitud (mock) y la guarda en localStorage
 */
export const mockSubmitRequest = async (payload) => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const userName = payload?.user?.name || "Usuario";
  const userId = payload?.user?.id || "unknown";
  const requestType = payload?.type || "solicitud";

  // Crear solicitud
  const newRequest = {
    type: requestType,
    proceso_solicitado: requestType,
    fecha_inicio: new Date().toISOString().split('T')[0],
    startDate: new Date().toISOString().split('T')[0],
    fecha_fin: new Date(Date.now() + 86400000).toISOString().split('T')[0], // +1 día
    endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    dias_solicitados: 1,
    days: 1,
    estado: "pending",
    status: "pending",
    mensaje: payload?.mensaje || `Solicitud de ${requestType}`,
  };

  // Guardar en localStorage
  try {
    const savedRequest = saveSolicitudToStorage(userId, newRequest);
    console.log('✅ Solicitud guardada en localStorage:', savedRequest);

    return {
      success: true,
      message: `✅ ¡Listo ${userName}!`,
      text: `Tu ${requestType} ha sido registrada exitosamente.\n\n📋 **Detalles:**\n• Tipo: ${requestType}\n• Estado: En revisión\n• Fecha: ${new Date().toLocaleDateString("es-ES")}\n• ID: ${savedRequest.id}\n\n📬 Recibirás una notificación cuando sea procesada por tu supervisor.\n\n💚 ¡Gracias por usar el sistema de Comfachocó!`,
      request: savedRequest,
    };
  } catch (error) {
    console.error('Error guardando solicitud:', error);
    return {
      success: false,
      message: 'Error al guardar la solicitud',
      text: 'Hubo un error al procesar tu solicitud. Por favor intenta nuevamente.',
    };
  }
};

/**
 * Consulta el saldo de días (mock) con cache
 */
export const mockConsultarSaldo = (userData) => {
  const documento = userData?.numero_documento || userData?.documento;
  const userId = userData?.id;

  // Intentar obtener desde cache primero
  const cached = getBalanceCache(userId);
  if (cached) {
    console.log('💾 Usando saldo desde cache');
    return cached;
  }

  // Si no hay cache, obtener datos mock
  const balance = MOCK_BALANCE_DATA[documento] || { total: 15, usado: 0, saldo: 15 };

  const result = {
    success: true,
    total: balance.total,
    usado: balance.usado,
    saldo: balance.saldo,
  };

  // Guardar en cache
  saveBalanceCache(userId, result);

  return result;
};

/**
 * Obtiene solicitudes del usuario (mock) desde localStorage
 */
export const mockGetSolicitudes = (userData) => {
  const userId = userData?.id || "unknown";

  // Obtener solicitudes desde localStorage
  let solicitudes = getSolicitudesFromStorage(userId);

  // Si no hay solicitudes en localStorage, inicializar con datos mock
  if (solicitudes.length === 0) {
    console.log('📝 Inicializando solicitudes mock en localStorage');
    INITIAL_MOCK_REQUESTS.forEach(req => {
      saveSolicitudToStorage(userId, req);
    });
    solicitudes = getSolicitudesFromStorage(userId);
  }

  console.log(`📋 Solicitudes cargadas desde localStorage (${solicitudes.length}):`, solicitudes);

  return {
    success: true,
    solicitudes: solicitudes,
  };
};
