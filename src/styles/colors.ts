/**
 * Sistema de Colores de Comfachocó
 * Todos los colores de la aplicación centralizados con tipos de TypeScript
 * Cumple con WCAG 2.1 AA para accesibilidad
 */

// Tipo para validar colores hexadecimales
export type HexColor = `#${string}`;

// Interfaz para variantes de estado (success, warning, error)
export interface ColorVariant {
  bg: HexColor;
  text: HexColor;
  border: HexColor;
}

// Interfaz principal del esquema de colores
export interface ColorScheme {
  primary: {
    green: HexColor;
    dark: HexColor;
  };
  secondary: {
    turquoise: HexColor;
    blueLight: HexColor;
  };
  gray: {
    dark: HexColor;
    medium: HexColor;
    light: HexColor;
    lighter: HexColor;
  };
  background: {
    main: HexColor;
    light: HexColor;
  };
  white: HexColor;
  status: {
    success: ColorVariant;
    warning: ColorVariant;
    error: ColorVariant;
    info: ColorVariant;
  };
  alert: {
    yellow: HexColor;
  };
}

/**
 * Objeto de colores de la aplicación
 * Usar estos colores en lugar de hardcodear valores
 *
 * @example
 * import { colors } from '@/styles/colors';
 *
 * style={{ backgroundColor: colors.primary.green }}
 */
export const colors: Readonly<ColorScheme> = {
  // Colores primarios de la marca
  primary: {
    green: '#04B45F',
    dark: '#026636',
  },

  // Colores secundarios
  secondary: {
    turquoise: '#1ABC9C',
    blueLight: '#62BFE6',
  },

  // Escala de grises
  gray: {
    dark: '#303030',
    medium: '#6B6B6B', // Actualizado para cumplir WCAG AA (contraste 4.54:1)
    light: '#e5e7eb',
    lighter: '#f3f4f6',
  },

  // Fondos
  background: {
    main: '#F9F9FC',
    light: '#f9fafb',
  },

  // Blanco
  white: '#FFFFFF',

  // Estados (Success, Warning, Error, Info)
  status: {
    success: {
      bg: '#dcfce7',
      text: '#166534',
      border: '#86efac',
    },
    warning: {
      bg: '#fef9c3',
      text: '#854d0e',
      border: '#fde047',
    },
    error: {
      bg: '#fee2e2',
      text: '#991b1b',
      border: '#fca5a5',
    },
    info: {
      bg: '#dbeafe',
      text: '#1e40af',
      border: '#93c5fd',
    },
  },

  // Alertas
  alert: {
    yellow: '#FFF500',
  },
} as const;

/**
 * Tipo helper para obtener rutas de color válidas
 * Permite autocompletado en el IDE
 */
export type ColorPath =
  | 'primary.green'
  | 'primary.dark'
  | 'secondary.turquoise'
  | 'secondary.blueLight'
  | 'gray.dark'
  | 'gray.medium'
  | 'gray.light'
  | 'gray.lighter'
  | 'background.main'
  | 'background.light'
  | 'white'
  | 'status.success.bg'
  | 'status.success.text'
  | 'status.success.border'
  | 'status.warning.bg'
  | 'status.warning.text'
  | 'status.warning.border'
  | 'status.error.bg'
  | 'status.error.text'
  | 'status.error.border'
  | 'status.info.bg'
  | 'status.info.text'
  | 'status.info.border'
  | 'alert.yellow';

/**
 * Helper function para obtener color por ruta
 * Útil cuando necesitas acceder dinámicamente a colores
 *
 * @example
 * const color = getColor('primary.green'); // '#04B45F'
 */
export const getColor = (path: ColorPath): HexColor => {
  const keys = path.split('.');
  let value: any = colors;

  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      console.error(`Color path "${path}" not found`);
      return colors.gray.medium; // Fallback color
    }
  }

  return value as HexColor;
};

/**
 * Tipo para nombres de colores primarios
 */
export type PrimaryColorName = keyof typeof colors.primary;

/**
 * Tipo para nombres de colores de estado
 */
export type StatusColorName = keyof typeof colors.status;

/**
 * Exportación default para compatibilidad
 */
export default colors;
