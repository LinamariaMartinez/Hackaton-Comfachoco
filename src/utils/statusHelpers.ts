/**
 * Utilidades para manejo de estados de solicitudes
 * Centraliza toda la lógica relacionada con estados (pending, approved, rejected)
 */

import { colors, type HexColor } from '@/styles/colors';

/**
 * Enum para estados de solicitudes
 * Usar estos valores en lugar de strings hardcodeados
 */
export enum RequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

/**
 * Interfaz para configuración de estado
 */
export interface StatusConfig {
  /** Emoji o ícono del estado */
  icon: string;
  /** Label legible para humanos */
  label: string;
  /** Color de fondo */
  bg: HexColor;
  /** Color de texto */
  color: HexColor;
  /** Color de borde */
  border: HexColor;
}

/**
 * Tipo mapeando cada estado a su configuración
 */
type StatusConfigMap = {
  [key in RequestStatus]: StatusConfig;
};

/**
 * Configuraciones de cada estado
 * Centralizado para mantener consistencia visual
 */
const statusConfigs: Readonly<StatusConfigMap> = {
  [RequestStatus.APPROVED]: {
    icon: '✅',
    label: 'Aprobada',
    bg: colors.status.success.bg,
    color: colors.status.success.text,
    border: colors.status.success.border,
  },
  [RequestStatus.PENDING]: {
    icon: '⏳',
    label: 'Pendiente',
    bg: colors.status.warning.bg,
    color: colors.status.warning.text,
    border: colors.status.warning.border,
  },
  [RequestStatus.REJECTED]: {
    icon: '❌',
    label: 'Rechazada',
    bg: colors.status.error.bg,
    color: colors.status.error.text,
    border: colors.status.error.border,
  },
} as const;

/**
 * Obtiene la configuración de un estado
 *
 * @param status - Estado de la solicitud
 * @returns Configuración del estado (colores, ícono, label)
 *
 * @example
 * const config = getStatusConfig(RequestStatus.APPROVED);
 * console.log(config.label); // 'Aprobada'
 * console.log(config.icon); // '✅'
 */
export const getStatusConfig = (status: RequestStatus): StatusConfig => {
  return statusConfigs[status] || statusConfigs[RequestStatus.PENDING];
};

/**
 * Convierte un string a RequestStatus
 * Útil para datos del backend que vienen como strings
 *
 * @param status - String del estado
 * @returns RequestStatus enum o PENDING si no es válido
 *
 * @example
 * const status = parseStatus('approved'); // RequestStatus.APPROVED
 * const status = parseStatus('invalid'); // RequestStatus.PENDING (fallback)
 */
export const parseStatus = (status: string): RequestStatus => {
  const normalized = status.toLowerCase();

  switch (normalized) {
    case 'approved':
    case 'aprobada':
      return RequestStatus.APPROVED;
    case 'rejected':
    case 'rechazada':
      return RequestStatus.REJECTED;
    case 'pending':
    case 'pendiente':
      return RequestStatus.PENDING;
    default:
      console.warn(`Unknown status: ${status}, defaulting to PENDING`);
      return RequestStatus.PENDING;
  }
};

/**
 * Verifica si un estado es final (no cambiará)
 *
 * @param status - Estado a verificar
 * @returns true si el estado es final (approved o rejected)
 *
 * @example
 * isFinalStatus(RequestStatus.APPROVED); // true
 * isFinalStatus(RequestStatus.PENDING); // false
 */
export const isFinalStatus = (status: RequestStatus): boolean => {
  return status === RequestStatus.APPROVED || status === RequestStatus.REJECTED;
};

/**
 * Verifica si un estado permite edición
 *
 * @param status - Estado a verificar
 * @returns true si la solicitud puede editarse
 */
export const isEditable = (status: RequestStatus): boolean => {
  return status === RequestStatus.PENDING;
};

/**
 * Obtiene el siguiente estado posible desde pending
 *
 * @returns Array de estados posibles desde pending
 */
export const getNextPossibleStatuses = (): RequestStatus[] => {
  return [RequestStatus.APPROVED, RequestStatus.REJECTED];
};

/**
 * Tipo guard para verificar si un string es un RequestStatus válido
 */
export const isValidStatus = (status: string): status is RequestStatus => {
  return Object.values(RequestStatus).includes(status as RequestStatus);
};

/**
 * Exportación default
 */
export default {
  RequestStatus,
  getStatusConfig,
  parseStatus,
  isFinalStatus,
  isEditable,
  getNextPossibleStatuses,
  isValidStatus,
};
