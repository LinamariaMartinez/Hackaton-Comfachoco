/**
 * Configuración de tipos de solicitudes
 * Centraliza íconos, colores y labels para cada tipo de solicitud
 */

import { colors, type HexColor } from '@/styles/colors';

/**
 * Enum para tipos de solicitudes
 */
export enum RequestType {
  VACATION = 'Vacaciones',
  SICK_LEAVE = 'Incapacidad',
  PERMISSION = 'Permiso',
  MATERNITY = 'Licencia de Maternidad',
  PATERNITY = 'Licencia de Paternidad',
  STUDY_LEAVE = 'Permiso de Estudio',
  BEREAVEMENT = 'Licencia por Duelo',
  COMPENSATORY = 'Tiempo Compensatorio',
}

/**
 * Interfaz para configuración de tipo de solicitud
 */
export interface RequestTypeConfig {
  /** Emoji o ícono del tipo */
  icon: string;
  /** Color representativo */
  color: HexColor;
  /** Label para mostrar */
  label: string;
  /** Descripción corta */
  description: string;
}

/**
 * Tipo mapeando cada RequestType a su configuración
 */
type RequestTypeConfigMap = {
  [key in RequestType]: RequestTypeConfig;
};

/**
 * Configuraciones de cada tipo de solicitud
 */
const requestTypeConfigs: Readonly<RequestTypeConfigMap> = {
  [RequestType.VACATION]: {
    icon: '🏖️',
    color: colors.primary.green,
    label: 'Vacaciones',
    description: 'Solicitud de vacaciones programadas',
  },
  [RequestType.SICK_LEAVE]: {
    icon: '🩹',
    color: '#ef4444', // Red
    label: 'Incapacidad',
    description: 'Incapacidad médica',
  },
  [RequestType.PERMISSION]: {
    icon: '📜',
    color: '#eab308', // Yellow
    label: 'Permiso',
    description: 'Permiso personal',
  },
  [RequestType.MATERNITY]: {
    icon: '👶',
    color: '#ec4899', // Pink
    label: 'Licencia de Maternidad',
    description: 'Licencia por maternidad',
  },
  [RequestType.PATERNITY]: {
    icon: '👨‍👶',
    color: '#3b82f6', // Blue
    label: 'Licencia de Paternidad',
    description: 'Licencia por paternidad',
  },
  [RequestType.STUDY_LEAVE]: {
    icon: '📚',
    color: '#8b5cf6', // Purple
    label: 'Permiso de Estudio',
    description: 'Permiso para estudios',
  },
  [RequestType.BEREAVEMENT]: {
    icon: '🕊️',
    color: colors.gray.dark,
    label: 'Licencia por Duelo',
    description: 'Licencia por fallecimiento familiar',
  },
  [RequestType.COMPENSATORY]: {
    icon: '⏰',
    color: colors.secondary.turquoise,
    label: 'Tiempo Compensatorio',
    description: 'Compensación por horas extras',
  },
} as const;

/**
 * Obtiene la configuración de un tipo de solicitud
 *
 * @param type - Tipo de solicitud
 * @returns Configuración del tipo (ícono, color, label, descripción)
 *
 * @example
 * const config = getRequestTypeConfig(RequestType.VACATION);
 * console.log(config.icon); // '🏖️'
 * console.log(config.color); // '#04B45F'
 */
export const getRequestTypeConfig = (type: RequestType): RequestTypeConfig => {
  return requestTypeConfigs[type] || requestTypeConfigs[RequestType.PERMISSION];
};

/**
 * Convierte un string a RequestType
 * Útil para datos del backend que vienen como strings
 *
 * @param type - String del tipo
 * @returns RequestType enum o PERMISSION si no es válido
 *
 * @example
 * const type = parseRequestType('Vacaciones'); // RequestType.VACATION
 */
export const parseRequestType = (type: string): RequestType => {
  // Buscar coincidencia exacta
  const found = Object.values(RequestType).find(
    (rt) => rt.toLowerCase() === type.toLowerCase()
  );

  if (found) {
    return found as RequestType;
  }

  // Fallback basado en keywords
  const normalized = type.toLowerCase();

  if (normalized.includes('vacacion')) return RequestType.VACATION;
  if (normalized.includes('incapacidad')) return RequestType.SICK_LEAVE;
  if (normalized.includes('maternidad')) return RequestType.MATERNITY;
  if (normalized.includes('paternidad')) return RequestType.PATERNITY;
  if (normalized.includes('estudio')) return RequestType.STUDY_LEAVE;
  if (normalized.includes('duelo')) return RequestType.BEREAVEMENT;
  if (normalized.includes('compensatorio')) return RequestType.COMPENSATORY;

  console.warn(`Unknown request type: ${type}, defaulting to PERMISSION`);
  return RequestType.PERMISSION;
};

/**
 * Obtiene todos los tipos de solicitudes disponibles
 *
 * @returns Array de todos los RequestType
 */
export const getAllRequestTypes = (): RequestType[] => {
  return Object.values(RequestType);
};

/**
 * Obtiene el ícono de un tipo de solicitud
 *
 * @param type - Tipo de solicitud
 * @returns Emoji del tipo
 */
export const getRequestTypeIcon = (type: RequestType): string => {
  return getRequestTypeConfig(type).icon;
};

/**
 * Obtiene el color de un tipo de solicitud
 *
 * @param type - Tipo de solicitud
 * @returns Color hex del tipo
 */
export const getRequestTypeColor = (type: RequestType): HexColor => {
  return getRequestTypeConfig(type).color;
};

/**
 * Verifica si un tipo requiere documentación médica
 *
 * @param type - Tipo de solicitud
 * @returns true si requiere documentación médica
 */
export const requiresMedicalDocumentation = (type: RequestType): boolean => {
  return [
    RequestType.SICK_LEAVE,
    RequestType.MATERNITY,
    RequestType.PATERNITY,
  ].includes(type);
};

/**
 * Obtiene el número de días máximos permitidos por tipo
 *
 * @param type - Tipo de solicitud
 * @returns Número de días máximos (0 = sin límite específico)
 */
export const getMaxDaysByType = (type: RequestType): number => {
  const limits: Partial<Record<RequestType, number>> = {
    [RequestType.VACATION]: 15, // 15 días hábiles por año
    [RequestType.MATERNITY]: 126, // 18 semanas
    [RequestType.PATERNITY]: 8, // 8 días hábiles
    [RequestType.BEREAVEMENT]: 5, // 5 días hábiles
  };

  return limits[type] || 0; // 0 = sin límite específico
};

/**
 * Tipo guard para verificar si un string es un RequestType válido
 */
export const isValidRequestType = (type: string): type is RequestType => {
  return Object.values(RequestType).includes(type as RequestType);
};

/**
 * Exportación default
 */
export default {
  RequestType,
  getRequestTypeConfig,
  parseRequestType,
  getAllRequestTypes,
  getRequestTypeIcon,
  getRequestTypeColor,
  requiresMedicalDocumentation,
  getMaxDaysByType,
  isValidRequestType,
};
