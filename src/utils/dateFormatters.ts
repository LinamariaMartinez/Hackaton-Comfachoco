/**
 * Utilidades para formateo de fechas
 * Centraliza todos los formatos de fecha usados en la aplicación
 * Usa date-fns con locale español
 */

import { format, isValid, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Tipo para fechas que pueden venir en diferentes formatos
 */
export type DateInput = Date | string | number;

/**
 * Convierte cualquier input a objeto Date
 * Maneja strings ISO, timestamps y objetos Date
 */
const toDate = (date: DateInput): Date => {
  if (date instanceof Date) {
    return date;
  }
  if (typeof date === 'string') {
    return parseISO(date);
  }
  if (typeof date === 'number') {
    return new Date(date);
  }
  return new Date();
};

/**
 * Valida que una fecha sea válida
 */
const validateDate = (date: DateInput): Date => {
  const dateObj = toDate(date);
  if (!isValid(dateObj)) {
    console.error('Invalid date:', date);
    return new Date(); // Fallback a fecha actual
  }
  return dateObj;
};

/**
 * Formatos de fecha predefinidos
 * Usar estos en lugar de crear formatos custom
 */
export const dateFormats = {
  /** Formato corto: 24/10/2025 */
  short: 'dd/MM/yyyy',
  /** Formato largo: 24 Oct 2025 */
  long: 'dd MMM yyyy',
  /** Formato extra largo: 24 de octubre de 2025 */
  full: "dd 'de' MMMM 'de' yyyy",
  /** Solo mes y año: octubre 2025 */
  monthYear: 'MMMM yyyy',
  /** Solo mes abreviado y año: Oct 2025 */
  monthYearShort: 'MMM yyyy',
  /** Solo día y mes: 24 Oct */
  dayMonth: 'dd MMM',
  /** Solo día numérico: 24 */
  day: 'dd',
  /** Solo mes: octubre */
  month: 'MMMM',
  /** Solo año: 2025 */
  year: 'yyyy',
  /** Hora: 14:30 */
  time: 'HH:mm',
  /** Hora con segundos: 14:30:45 */
  timeWithSeconds: 'HH:mm:ss',
  /** Fecha y hora: 24/10/2025 14:30 */
  dateTime: 'dd/MM/yyyy HH:mm',
  /** ISO: 2025-10-24 */
  iso: 'yyyy-MM-dd',
} as const;

/**
 * Tipo para nombres de formatos válidos
 */
export type DateFormatName = keyof typeof dateFormats;

/**
 * Formatea una fecha en formato corto
 * @example formatShortDate('2025-10-24') // '24/10/2025'
 */
export const formatShortDate = (date: DateInput): string => {
  return format(validateDate(date), dateFormats.short);
};

/**
 * Formatea una fecha en formato largo
 * @example formatLongDate('2025-10-24') // '24 Oct 2025'
 */
export const formatLongDate = (date: DateInput): string => {
  return format(validateDate(date), dateFormats.long, { locale: es });
};

/**
 * Formatea una fecha en formato completo
 * @example formatFullDate('2025-10-24') // '24 de octubre de 2025'
 */
export const formatFullDate = (date: DateInput): string => {
  return format(validateDate(date), dateFormats.full, { locale: es });
};

/**
 * Formatea solo mes y año
 * @example formatMonthYear('2025-10-24') // 'octubre 2025'
 */
export const formatMonthYear = (date: DateInput): string => {
  return format(validateDate(date), dateFormats.monthYear, { locale: es });
};

/**
 * Formatea mes y año corto
 * @example formatMonthYearShort('2025-10-24') // 'Oct 2025'
 */
export const formatMonthYearShort = (date: DateInput): string => {
  return format(validateDate(date), dateFormats.monthYearShort, { locale: es });
};

/**
 * Formatea solo hora
 * @example formatTime('2025-10-24T14:30:00') // '14:30'
 */
export const formatTime = (date: DateInput): string => {
  return format(validateDate(date), dateFormats.time);
};

/**
 * Formatea fecha y hora
 * @example formatDateTime('2025-10-24T14:30:00') // '24/10/2025 14:30'
 */
export const formatDateTime = (date: DateInput): string => {
  return format(validateDate(date), dateFormats.dateTime);
};

/**
 * Formatea un rango de fechas
 * @example formatDateRange('2025-10-24', '2025-10-28') // '24 Oct - 28 Oct 2025'
 */
export const formatDateRange = (startDate: DateInput, endDate: DateInput): string => {
  const start = validateDate(startDate);
  const end = validateDate(endDate);

  const startFormatted = format(start, 'dd MMM', { locale: es });
  const endFormatted = format(end, dateFormats.long, { locale: es });

  return `${startFormatted} - ${endFormatted}`;
};

/**
 * Formatea un rango de fechas con año si es diferente
 * @example formatDateRangeFull('2025-10-24', '2026-01-15') // '24 Oct 2025 - 15 Ene 2026'
 */
export const formatDateRangeFull = (startDate: DateInput, endDate: DateInput): string => {
  const start = validateDate(startDate);
  const end = validateDate(endDate);

  const startFormatted = format(start, dateFormats.long, { locale: es });
  const endFormatted = format(end, dateFormats.long, { locale: es });

  return `${startFormatted} - ${endFormatted}`;
};

/**
 * Formatea fecha relativa (hoy, ayer, mañana)
 * @example formatRelativeDate('2025-10-24') // 'Hoy' si es hoy
 */
export const formatRelativeDate = (date: DateInput): string => {
  const dateObj = validateDate(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (format(dateObj, dateFormats.iso) === format(today, dateFormats.iso)) {
    return 'Hoy';
  }
  if (format(dateObj, dateFormats.iso) === format(yesterday, dateFormats.iso)) {
    return 'Ayer';
  }
  if (format(dateObj, dateFormats.iso) === format(tomorrow, dateFormats.iso)) {
    return 'Mañana';
  }

  return formatLongDate(dateObj);
};

/**
 * Función genérica de formateo con formato personalizado
 * @example formatDate('2025-10-24', 'long') // '24 Oct 2025'
 */
export const formatDate = (
  date: DateInput,
  formatName: DateFormatName = 'short'
): string => {
  const dateObj = validateDate(date);
  const formatString = dateFormats[formatName];
  return format(dateObj, formatString, { locale: es });
};

/**
 * Obtiene el día del mes
 * @example getDayOfMonth('2025-10-24') // 24
 */
export const getDayOfMonth = (date: DateInput): number => {
  return validateDate(date).getDate();
};

/**
 * Obtiene el nombre del día de la semana
 * @example getDayName('2025-10-24') // 'viernes'
 */
export const getDayName = (date: DateInput, short: boolean = false): string => {
  return format(validateDate(date), short ? 'EEE' : 'EEEE', { locale: es });
};

/**
 * Obtiene el nombre del mes
 * @example getMonthName('2025-10-24') // 'octubre'
 */
export const getMonthName = (date: DateInput, short: boolean = false): string => {
  return format(validateDate(date), short ? 'MMM' : 'MMMM', { locale: es });
};

/**
 * Exportación default con todas las funciones
 */
export default {
  formatShortDate,
  formatLongDate,
  formatFullDate,
  formatMonthYear,
  formatMonthYearShort,
  formatTime,
  formatDateTime,
  formatDateRange,
  formatDateRangeFull,
  formatRelativeDate,
  formatDate,
  getDayOfMonth,
  getDayName,
  getMonthName,
  dateFormats,
};
