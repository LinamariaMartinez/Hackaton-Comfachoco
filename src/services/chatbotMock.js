/**
 * Servicio Mock para el Chatbot
 * Proporciona respuestas predefinidas para demostración sin backend
 */

// Datos mock de saldo de vacaciones
const MOCK_BALANCE_DATA = {
  "123456789": { total: 15, usado: 5, saldo: 10 }, // empleado@comfachoco.com
  "987654321": { total: 20, usado: 8, saldo: 12 }, // supervisor@comfachoco.com
  "456789123": { total: 25, usado: 10, saldo: 15 }, // rrhh@comfachoco.com
};

// Datos mock de solicitudes
const MOCK_REQUESTS = [
  {
    id: 1,
    type: "Vacaciones",
    startDate: "2025-02-10",
    endDate: "2025-02-14",
    days: 5,
    status: "approved",
  },
  {
    id: 2,
    type: "Licencia médica",
    startDate: "2025-01-15",
    endDate: "2025-01-16",
    days: 2,
    status: "pending",
  },
];

/**
 * Detecta qué tipo de pregunta es basándose en palabras clave
 */
const detectQuestionType = (message) => {
  const msg = message.toLowerCase();

  if (msg.includes("vacacion") && msg.includes("solicito")) {
    return "how_to_request_vacation";
  }
  if (msg.includes("días") && msg.includes("disponible")) {
    return "check_balance";
  }
  if (msg.includes("solicitar") && msg.includes("licencia")) {
    return "request_leave";
  }
  if (msg.includes("incapacidad") && msg.includes("médica")) {
    return "medical_leave";
  }
  if (msg.includes("disponibilidad") && msg.includes("equipo")) {
    return "team_availability";
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
      text: `¡Hola ${userName}! 👋\n\nPuedo ayudarte con:\n\n🏖️ Solicitar vacaciones o licencias\n📊 Consultar tu saldo de días disponibles\n🏥 Registrar incapacidades médicas\n👥 Ver disponibilidad de tu equipo\n📝 Información sobre políticas de RRHH\n\n¿En qué puedo ayudarte específicamente?`,
      needFile: false,
    },
  };

  return responses[questionType] || responses.general;
};

/**
 * Simula el envío de una solicitud (mock)
 */
export const mockSubmitRequest = async (payload) => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const userName = payload?.user?.name || "Usuario";
  const requestType = payload?.type || "solicitud";

  // Simular éxito
  return {
    success: true,
    message: `✅ ¡Listo ${userName}!`,
    text: `Tu ${requestType} ha sido registrada exitosamente.\n\n📋 **Detalles:**\n• Tipo: ${requestType}\n• Estado: En revisión\n• Fecha: ${new Date().toLocaleDateString("es-ES")}\n\n📬 Recibirás una notificación cuando sea procesada por tu supervisor.\n\n💚 ¡Gracias por usar el sistema de Comfachocó!`,
  };
};

/**
 * Consulta el saldo de días (mock)
 */
export const mockConsultarSaldo = (userData) => {
  const documento = userData?.numero_documento || userData?.documento;
  const balance = MOCK_BALANCE_DATA[documento] || { total: 15, usado: 0, saldo: 15 };

  return {
    success: true,
    total: balance.total,
    usado: balance.usado,
    saldo: balance.saldo,
  };
};

/**
 * Obtiene solicitudes del usuario (mock)
 */
export const mockGetSolicitudes = () => {
  return {
    success: true,
    solicitudes: MOCK_REQUESTS,
  };
};
