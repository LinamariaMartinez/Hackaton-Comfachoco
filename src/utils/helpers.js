/**
 * Utilidades Helper para Comfachocó Gestión
 * Funciones reutilizables para formateo y cálculos
 */

import { format, differenceInDays, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

// ====================================
// FORMATEO DE FECHAS
// ====================================

/**
 * Formatea una fecha a formato corto "15 nov"
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} Fecha formateada "15 nov"
 */
export const formatDate = (date) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'd MMM', { locale: es });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Fecha inválida';
  }
};

/**
 * Formatea una fecha a formato completo "15 de noviembre de 2024"
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} Fecha formateada completa
 */
export const formatDateFull = (date) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, "d 'de' MMMM 'de' yyyy", { locale: es });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Fecha inválida';
  }
};

/**
 * Formatea un rango de fechas "15-20 nov"
 * @param {string|Date} startDate - Fecha inicio
 * @param {string|Date} endDate - Fecha fin
 * @returns {string} Rango formateado "15-20 nov"
 */
export const formatDateRange = (startDate, endDate) => {
  try {
    const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;

    const startDay = format(start, 'd', { locale: es });
    const endFormatted = format(end, 'd MMM', { locale: es });

    return `${startDay}-${endFormatted}`;
  } catch (error) {
    console.error('Error formatting date range:', error);
    return 'Rango inválido';
  }
};

// ====================================
// CÁLCULOS DE DÍAS
// ====================================

/**
 * Calcula los días entre dos fechas (inclusivo)
 * @param {string|Date} startDate - Fecha inicio
 * @param {string|Date} endDate - Fecha fin
 * @returns {number} Número de días
 */
export const getDaysBetween = (startDate, endDate) => {
  try {
    const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;

    // +1 porque queremos inclusivo (del 1 al 5 = 5 días, no 4)
    return differenceInDays(end, start) + 1;
  } catch (error) {
    console.error('Error calculating days:', error);
    return 0;
  }
};

/**
 * Calcula días hábiles entre dos fechas (excluyendo sábados y domingos)
 * @param {string|Date} startDate - Fecha inicio
 * @param {string|Date} endDate - Fecha fin
 * @returns {number} Número de días hábiles
 */
export const getBusinessDays = (startDate, endDate) => {
  try {
    const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;

    let count = 0;
    const current = new Date(start);

    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // No domingo ni sábado
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    return count;
  } catch (error) {
    console.error('Error calculating business days:', error);
    return 0;
  }
};

// ====================================
// STATUS DE CAPACIDAD
// ====================================

/**
 * Obtiene el estado de capacidad según el porcentaje
 * @param {number} percent - Porcentaje de capacidad (0-100)
 * @returns {'ok'|'warning'|'danger'} Estado
 */
export const getCapacityStatus = (percent) => {
  if (percent >= 80) return 'ok';
  if (percent >= 70) return 'warning';
  return 'danger';
};

/**
 * Obtiene el color de capacidad según el porcentaje
 * @param {number} percent - Porcentaje de capacidad (0-100)
 * @returns {string} Clase de Tailwind para color
 */
export const getCapacityColor = (percent) => {
  const status = getCapacityStatus(percent);

  const colors = {
    ok: 'text-green-600 bg-green-100',
    warning: 'text-orange-600 bg-orange-100',
    danger: 'text-red-600 bg-red-100',
  };

  return colors[status] || colors.ok;
};

/**
 * Obtiene el emoji de capacidad según el porcentaje
 * @param {number} percent - Porcentaje de capacidad (0-100)
 * @returns {string} Emoji
 */
export const getCapacityEmoji = (percent) => {
  const status = getCapacityStatus(percent);

  const emojis = {
    ok: '✅',
    warning: '⚠️',
    danger: '🚨',
  };

  return emojis[status] || emojis.ok;
};

// ====================================
// FORMATEO DE ESTADO
// ====================================

/**
 * Formatea el estado de una solicitud a texto en español
 * @param {string} status - Estado: 'approved', 'pending', 'rejected'
 * @returns {string} Estado en español
 */
export const formatStatus = (status) => {
  const statusMap = {
    approved: 'Aprobada',
    pending: 'Pendiente',
    rejected: 'Rechazada',
    'auto-approved': 'Auto-Aprobada',
  };

  return statusMap[status] || status;
};

/**
 * Obtiene el emoji según el estado
 * @param {string} status - Estado: 'approved', 'pending', 'rejected'
 * @returns {string} Emoji
 */
export const getStatusEmoji = (status) => {
  const emojiMap = {
    approved: '✅',
    pending: '⏳',
    rejected: '❌',
    'auto-approved': '🤖',
  };

  return emojiMap[status] || '📋';
};

/**
 * Obtiene el color hex según el estado
 * @param {string} status - Estado: 'approved', 'pending', 'rejected'
 * @returns {string} Color hex
 */
export const getColorByStatus = (status) => {
  const colorMap = {
    approved: '#04B45F',     // Verde Comfachocó
    pending: '#FFF500',      // Amarillo Alerta
    rejected: '#EF4444',     // Rojo
    'auto-approved': '#04B45F',
  };

  return colorMap[status] || '#8A8A8A'; // Gris por defecto
};

/**
 * Obtiene las clases de Tailwind según el estado
 * @param {string} status - Estado: 'approved', 'pending', 'rejected'
 * @returns {string} Clases de Tailwind
 */
export const getStatusClasses = (status) => {
  const classMap = {
    approved: 'bg-green-100 text-green-800 border-green-300',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    rejected: 'bg-red-100 text-red-800 border-red-300',
    'auto-approved': 'bg-green-100 text-green-800 border-green-300',
  };

  return classMap[status] || 'bg-gray-100 text-gray-800 border-gray-300';
};

// ====================================
// TIPO DE SOLICITUD
// ====================================

/**
 * Parsea el tipo de solicitud y devuelve emoji + texto
 * @param {string} type - Tipo de solicitud
 * @returns {object} { emoji, text, color }
 */
export const parseRequestType = (type) => {
  const typeMap = {
    'Vacaciones': {
      emoji: '🏖️',
      text: 'Vacaciones',
      color: 'blue',
    },
    'Permiso Personal': {
      emoji: '📜',
      text: 'Permiso Personal',
      color: 'purple',
    },
    'Permiso Médico': {
      emoji: '🏥',
      text: 'Permiso Médico',
      color: 'teal',
    },
    'Incapacidad': {
      emoji: '🩹',
      text: 'Incapacidad',
      color: 'red',
    },
    'Día Compensatorio': {
      emoji: '⚖️',
      text: 'Día Compensatorio',
      color: 'indigo',
    },
    'Licencia': {
      emoji: '📄',
      text: 'Licencia',
      color: 'gray',
    },
  };

  return typeMap[type] || {
    emoji: '📋',
    text: type,
    color: 'gray',
  };
};

/**
 * Obtiene solo el emoji del tipo de solicitud
 * @param {string} type - Tipo de solicitud
 * @returns {string} Emoji
 */
export const getRequestTypeEmoji = (type) => {
  return parseRequestType(type).emoji;
};

// ====================================
// UTILIDADES DE PORCENTAJE
// ====================================

/**
 * Calcula el porcentaje
 * @param {number} value - Valor actual
 * @param {number} total - Valor total
 * @returns {number} Porcentaje redondeado
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * Formatea un número como porcentaje
 * @param {number} value - Valor (0-100)
 * @returns {string} Porcentaje formateado "75%"
 */
export const formatPercentage = (value) => {
  return `${Math.round(value)}%`;
};

// ====================================
// UTILIDADES DE NOMBRES
// ====================================

/**
 * Abrevia un nombre completo
 * @param {string} fullName - Nombre completo "Juan Pérez Gómez"
 * @returns {string} Nombre abreviado "J.Pérez"
 */
export const abbreviateName = (fullName) => {
  if (!fullName) return '';

  const parts = fullName.trim().split(' ');
  if (parts.length === 0) return '';

  const firstName = parts[0];
  const lastName = parts[1] || '';

  return lastName ? `${firstName[0]}.${lastName}` : firstName;
};

/**
 * Obtiene las iniciales de un nombre
 * @param {string} fullName - Nombre completo "Juan Pérez Gómez"
 * @returns {string} Iniciales "JPG"
 */
export const getInitials = (fullName) => {
  if (!fullName) return '';

  return fullName
    .trim()
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 3); // Máximo 3 iniciales
};

// ====================================
// VALIDACIONES
// ====================================

/**
 * Valida si una fecha es válida
 * @param {string|Date} date - Fecha a validar
 * @returns {boolean} True si es válida
 */
export const isValidDate = (date) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return dateObj instanceof Date && !isNaN(dateObj);
  } catch {
    return false;
  }
};

/**
 * Valida si un rango de fechas es válido
 * @param {string|Date} startDate - Fecha inicio
 * @param {string|Date} endDate - Fecha fin
 * @returns {boolean} True si el rango es válido
 */
export const isValidDateRange = (startDate, endDate) => {
  if (!isValidDate(startDate) || !isValidDate(endDate)) return false;

  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;

  return start <= end;
};

// ====================================
// EXPORT DEFAULT
// ====================================
export default {
  // Fechas
  formatDate,
  formatDateFull,
  formatDateRange,

  // Días
  getDaysBetween,
  getBusinessDays,

  // Capacidad
  getCapacityStatus,
  getCapacityColor,
  getCapacityEmoji,

  // Estado
  formatStatus,
  getStatusEmoji,
  getColorByStatus,
  getStatusClasses,

  // Tipos
  parseRequestType,
  getRequestTypeEmoji,

  // Porcentaje
  calculatePercentage,
  formatPercentage,

  // Nombres
  abbreviateName,
  getInitials,

  // Validaciones
  isValidDate,
  isValidDateRange,
};
