import { chatbotAPI, balanceAPI, requestsAPI, departmentsAPI } from './api';

// ====================================
// MOCK DATA PARA CONTEXTO
// ====================================

const mockUserBalance = {
  totalDays: 15,
  usedDays: 5,
  remainingDays: 10,
  pendingRequests: 2,
};

const mockTeamSchedule = [
  {
    employee: 'Carlos López',
    dates: ['2025-11-01', '2025-11-02', '2025-11-03'],
    type: 'Vacaciones',
  },
  {
    employee: 'Ana Martínez',
    dates: ['2025-11-04', '2025-11-05'],
    type: 'Permiso Personal',
  },
];

const mockTeamCapacity = {
  totalEmployees: 15,
  onLeave: 3,
  availableCapacity: 80, // porcentaje
  criticalPeriods: ['2025-12-20 al 2025-12-31', '2025-06-15 al 2025-06-30'],
};

// ====================================
// UTILIDADES DE DETECCIÓN
// ====================================

/**
 * Detecta si el mensaje contiene una solicitud de vacaciones
 */
const detectVacationRequest = (message) => {
  const vacationKeywords = [
    'vacaciones',
    'permiso',
    'días libres',
    'ausencia',
    'solicitar',
    'pedir días',
    'tiempo libre',
  ];

  const hasKeyword = vacationKeywords.some((keyword) =>
    message.toLowerCase().includes(keyword)
  );

  // Detectar fechas en el mensaje
  const datePatterns = [
    /(\d{1,2})[\s\-\/]de[\s\-\/](\w+)/gi, // "15 de noviembre"
    /(\d{1,2})[\s\-\/](\w+)/gi, // "15 noviembre"
    /del[\s]+(\d{1,2})[\s]+al[\s]+(\d{1,2})/gi, // "del 10 al 15"
    /desde[\s]+(\d{1,2})[\s]+hasta[\s]+(\d{1,2})/gi, // "desde 10 hasta 15"
  ];

  const hasDates = datePatterns.some((pattern) => pattern.test(message));

  return hasKeyword || hasDates;
};

/**
 * Detecta si pregunta por balance
 */
const detectBalanceQuery = (message) => {
  const balanceKeywords = [
    'cuántos días',
    'días disponibles',
    'balance',
    'saldo',
    'días tengo',
    'días me quedan',
    'vacaciones disponibles',
  ];

  return balanceKeywords.some((keyword) =>
    message.toLowerCase().includes(keyword)
  );
};

/**
 * Detecta si pregunta por estado de solicitud
 */
const detectStatusQuery = (message) => {
  const statusKeywords = [
    'estado',
    'solicitud',
    'aprobada',
    'pendiente',
    'rechazada',
    'estado de mi',
  ];

  return statusKeywords.some((keyword) =>
    message.toLowerCase().includes(keyword)
  );
};

/**
 * Detecta si pregunta por equipo
 */
const detectTeamQuery = (message) => {
  const teamKeywords = [
    'equipo',
    'compañeros',
    'quién está',
    'ausencias',
    'disponibilidad',
    'capacidad',
  ];

  return teamKeywords.some((keyword) =>
    message.toLowerCase().includes(keyword)
  );
};

/**
 * Extrae fechas del mensaje (simplificado)
 */
const extractDates = (message) => {
  // Simulación: devolver fechas ejemplo
  return {
    startDate: '2025-11-10',
    endDate: '2025-11-15',
    days: 5,
  };
};

// ====================================
// VALIDACIONES INTELIGENTES
// ====================================

/**
 * Valida saldo disponible
 */
const validateBalance = (requestedDays, balance) => {
  if (requestedDays > balance.remainingDays) {
    return {
      valid: false,
      message: `❌ No tienes suficientes días disponibles. Solicitas ${requestedDays} días pero solo tienes ${balance.remainingDays} días disponibles.`,
      suggestion: `Puedes solicitar hasta ${balance.remainingDays} días o esperar a que se aprueben tus solicitudes pendientes.`,
    };
  }

  if (balance.remainingDays - requestedDays < 2) {
    return {
      valid: true,
      warning: true,
      message: `⚠️ Después de esta solicitud te quedarán solo ${
        balance.remainingDays - requestedDays
      } días disponibles.`,
    };
  }

  return {
    valid: true,
    message: `✅ Tienes suficientes días. Después de esta solicitud te quedarán ${
      balance.remainingDays - requestedDays
    } días.`,
  };
};

/**
 * Detecta solapamientos con otras solicitudes
 */
const detectOverlaps = (startDate, endDate, teamSchedule) => {
  const overlaps = [];

  teamSchedule.forEach((schedule) => {
    const hasOverlap = schedule.dates.some((date) => {
      return date >= startDate && date <= endDate;
    });

    if (hasOverlap) {
      overlaps.push({
        employee: schedule.employee,
        type: schedule.type,
        dates: schedule.dates,
      });
    }
  });

  if (overlaps.length > 0) {
    const names = overlaps.map((o) => o.employee).join(', ');
    return {
      hasOverlap: true,
      message: `⚠️ Hay ${overlaps.length} persona(s) del equipo con ausencias en esas fechas: ${names}.`,
      overlaps,
    };
  }

  return {
    hasOverlap: false,
    message: '✅ No hay solapamientos con tu equipo.',
  };
};

/**
 * Verifica capacidad del equipo
 */
const checkTeamCapacity = (startDate, endDate, teamCapacity) => {
  const requestedPeriod = `${startDate} al ${endDate}`;

  // Verificar si cae en período crítico
  const isCriticalPeriod = teamCapacity.criticalPeriods.some((period) => {
    return requestedPeriod.includes(period.split(' al ')[0].split('-')[1]);
  });

  if (isCriticalPeriod) {
    return {
      critical: true,
      message: `⚠️ Este período coincide con una fecha crítica del equipo (${teamCapacity.criticalPeriods[0]}).`,
      suggestion:
        'Se recomienda considerar fechas alternativas o validar con tu supervisor.',
    };
  }

  const newCapacity =
    teamCapacity.availableCapacity -
    (100 / teamCapacity.totalEmployees) * 1;

  if (newCapacity < 70) {
    return {
      critical: false,
      warning: true,
      message: `⚠️ Con tu ausencia, la capacidad del equipo bajará a ${newCapacity.toFixed(
        0
      )}%.`,
      currentCapacity: teamCapacity.availableCapacity,
      newCapacity: newCapacity.toFixed(0),
    };
  }

  return {
    critical: false,
    message: `✅ Capacidad del equipo: ${teamCapacity.availableCapacity}%. Tu ausencia es manejable.`,
    currentCapacity: teamCapacity.availableCapacity,
  };
};

// ====================================
// FUNCIÓN PRINCIPAL: sendMessage
// ====================================

/**
 * Procesa mensaje del usuario y genera respuesta inteligente
 * @param {string} message - Mensaje del usuario
 * @param {object} context - Contexto adicional (userId, role, etc)
 * @returns {Promise<object>} Respuesta del bot
 */
export const sendMessage = async (message, context = {}) => {
  // Simular delay de procesamiento
  await new Promise((resolve) => setTimeout(resolve, 800));

  const response = {
    text: '',
    action: null,
    data: {},
    validations: {},
  };

  try {
    // ================================
    // CASO 1: CONSULTA DE BALANCE
    // ================================
    if (detectBalanceQuery(message)) {
      response.action = 'check_balance';
      response.data = mockUserBalance;
      response.text = `📊 **Tu balance actual:**\n\n` +
        `• Total de días: ${mockUserBalance.totalDays}\n` +
        `• Días usados: ${mockUserBalance.usedDays}\n` +
        `• Días disponibles: **${mockUserBalance.remainingDays}**\n` +
        `• Solicitudes pendientes: ${mockUserBalance.pendingRequests}\n\n` +
        `¿Quieres solicitar vacaciones? Solo dime las fechas y yo te ayudo.`;

      return response;
    }

    // ================================
    // CASO 2: SOLICITUD DE VACACIONES
    // ================================
    if (detectVacationRequest(message)) {
      const dates = extractDates(message);

      // Validar saldo
      const balanceValidation = validateBalance(
        dates.days,
        mockUserBalance
      );
      response.validations.balance = balanceValidation;

      // Detectar solapamientos
      const overlapValidation = detectOverlaps(
        dates.startDate,
        dates.endDate,
        mockTeamSchedule
      );
      response.validations.overlaps = overlapValidation;

      // Verificar capacidad del equipo
      const capacityValidation = checkTeamCapacity(
        dates.startDate,
        dates.endDate,
        mockTeamCapacity
      );
      response.validations.capacity = capacityValidation;

      // Construir respuesta
      response.action = 'create_request';
      response.data = {
        startDate: dates.startDate,
        endDate: dates.endDate,
        days: dates.days,
        type: 'Vacaciones',
      };

      // Texto de respuesta basado en validaciones
      if (!balanceValidation.valid) {
        response.text =
          `🔍 **Validación de tu solicitud:**\n\n` +
          `${balanceValidation.message}\n\n` +
          `💡 ${balanceValidation.suggestion}`;
        response.action = 'validation_failed';
        return response;
      }

      response.text =
        `🔍 **Análisis de tu solicitud de vacaciones:**\n\n` +
        `📅 Fechas: ${dates.startDate} al ${dates.endDate} (${dates.days} días)\n\n` +
        `**Validaciones:**\n\n` +
        `${balanceValidation.message}\n\n` +
        `${overlapValidation.message}\n\n` +
        `${capacityValidation.message}\n\n`;

      if (balanceValidation.warning || overlapValidation.hasOverlap) {
        response.text += `⚠️ **Recomendación:** ${
          capacityValidation.suggestion ||
          'Tu solicitud puede proceder, pero considera las observaciones anteriores.'
        }\n\n`;
      }

      response.text += `¿Quieres que procese esta solicitud? Responde "sí" para continuar.`;

      return response;
    }

    // ================================
    // CASO 3: CONSULTA DE ESTADO
    // ================================
    if (detectStatusQuery(message)) {
      response.action = 'check_status';
      response.data = {
        pending: 2,
        approved: 3,
        rejected: 0,
      };
      response.text =
        `📋 **Estado de tus solicitudes:**\n\n` +
        `• Pendientes: ${response.data.pending}\n` +
        `• Aprobadas: ${response.data.approved}\n` +
        `• Rechazadas: ${response.data.rejected}\n\n` +
        `¿Quieres ver más detalles de alguna solicitud?`;

      return response;
    }

    // ================================
    // CASO 4: CONSULTA DE EQUIPO
    // ================================
    if (detectTeamQuery(message)) {
      response.action = 'check_team';
      response.data = {
        capacity: mockTeamCapacity,
        schedule: mockTeamSchedule,
      };

      const onLeaveNames = mockTeamSchedule
        .map((s) => s.employee)
        .join(', ');

      response.text =
        `👥 **Estado de tu equipo:**\n\n` +
        `• Total: ${mockTeamCapacity.totalEmployees} personas\n` +
        `• En ausencia: ${mockTeamCapacity.onLeave} personas (${onLeaveNames})\n` +
        `• Capacidad disponible: ${mockTeamCapacity.availableCapacity}%\n\n` +
        `📅 **Períodos críticos:** ${mockTeamCapacity.criticalPeriods.join(', ')}\n\n` +
        `¿Necesitas planificar tus vacaciones considerando la disponibilidad del equipo?`;

      return response;
    }

    // ================================
    // CASO 5: RESPUESTA GENÉRICA
    // ================================
    const genericResponses = [
      `Hola! 👋 Soy tu asistente de gestión de tiempo en Comfachocó.\n\nPuedo ayudarte con:\n• 📊 Consultar tu balance de días\n• 📅 Solicitar vacaciones o permisos\n• 📋 Ver el estado de tus solicitudes\n• 👥 Revisar disponibilidad del equipo\n\n¿En qué puedo ayudarte?`,

      `Estoy aquí para facilitar la gestión de tu tiempo. Puedo:\n• Validar automáticamente tus solicitudes\n• Detectar conflictos con tu equipo\n• Verificar capacidad disponible\n• Procesar solicitudes rápidamente\n\n¿Qué necesitas?`,

      `💡 **Tip:** Puedo validar tu solicitud de vacaciones automáticamente.\n\nSolo dime algo como:\n"Quiero vacaciones del 10 al 15 de noviembre"\n\nY yo verificaré tu saldo, solapamientos y capacidad del equipo.`,
    ];

    response.text =
      genericResponses[
        Math.floor(Math.random() * genericResponses.length)
      ];
    response.action = 'greeting';

    return response;
  } catch (error) {
    console.error('Error en chatbot:', error);
    return {
      text: '😔 Lo siento, hubo un error procesando tu mensaje. ¿Puedes intentar de nuevo?',
      action: 'error',
      error: error.message,
    };
  }
};

/**
 * Obtiene historial de conversación
 */
export const getChatHistory = async (userId) => {
  try {
    const response = await chatbotAPI.getHistory();
    return response.data;
  } catch (error) {
    console.error('Error obteniendo historial:', error);
    return [];
  }
};

/**
 * Confirma una solicitud previamente validada
 */
export const confirmRequest = async (requestData) => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    message:
      '✅ ¡Solicitud creada exitosamente!\n\nTu solicitud ha sido enviada al supervisor para aprobación. Te notificaremos cuando haya una respuesta.',
    requestId: Math.floor(Math.random() * 1000) + 1,
    data: requestData,
  };
};

export default {
  sendMessage,
  getChatHistory,
  confirmRequest,
};
