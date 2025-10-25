/**
 * Estilos comunes reutilizables
 * Centraliza objetos de estilo inline para mantener consistencia
 */

import { colors } from './colors';
import type { CSSProperties } from 'react';

/**
 * Tipo para tamaños de border radius
 */
export type BorderRadiusSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Tipo para tamaños de sombras
 */
export type ShadowSize = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Tipo para tamaños de espaciado
 */
export type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Border radius predefinidos
 */
export const borderRadius: Record<BorderRadiusSize, string> = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
};

/**
 * Box shadows predefinidos
 */
export const shadows: Record<ShadowSize, string> = {
  none: 'none',
  sm: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

/**
 * Espaciados predefinidos
 */
export const spacing: Record<SpacingSize, string> = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
};

/**
 * Estilos de tarjetas (cards)
 */
export const cardStyles = {
  /** Card base con fondo blanco y borde */
  base: {
    backgroundColor: colors.white,
    border: `1px solid ${colors.gray.light}`,
  } as CSSProperties,

  /** Card con sombra pequeña */
  withShadowSm: {
    backgroundColor: colors.white,
    border: `1px solid ${colors.gray.light}`,
    borderRadius: borderRadius.md,
    boxShadow: shadows.sm,
    padding: spacing.lg,
  } as CSSProperties,

  /** Card con sombra mediana (más común) */
  withShadowMd: {
    backgroundColor: colors.white,
    border: `1px solid ${colors.gray.light}`,
    borderRadius: borderRadius.md,
    boxShadow: shadows.md,
    padding: spacing.lg,
  } as CSSProperties,

  /** Card con sombra grande */
  withShadowLg: {
    backgroundColor: colors.white,
    border: `1px solid ${colors.gray.light}`,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.lg,
    padding: spacing.xl,
  } as CSSProperties,
};

/**
 * Layouts de flexbox comunes
 */
export const flexLayouts = {
  /** Centrado vertical y horizontal */
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,

  /** Centrado vertical */
  centerVertical: {
    display: 'flex',
    alignItems: 'center',
  } as CSSProperties,

  /** Space between con centrado vertical */
  spaceBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as CSSProperties,

  /** Columna centrada */
  columnCenter: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,

  /** Columna */
  column: {
    display: 'flex',
    flexDirection: 'column' as const,
  } as CSSProperties,
};

/**
 * Helper para crear flex layout con gap
 */
export const flexWithGap = (gap: SpacingSize = 'md'): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[gap],
});

/**
 * Helper para crear columna con gap
 */
export const columnWithGap = (gap: SpacingSize = 'md'): CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[gap],
});

/**
 * Estilos para botones
 */
export const buttonStyles = {
  /** Botón base */
  base: {
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 600,
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,

  /** Botón primario */
  primary: {
    backgroundColor: colors.primary.green,
    color: colors.white,
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 600,
    padding: `${spacing.sm} ${spacing.lg}`,
    borderRadius: borderRadius.md,
    boxShadow: shadows.sm,
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,

  /** Botón secundario */
  secondary: {
    backgroundColor: colors.secondary.turquoise,
    color: colors.white,
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 600,
    padding: `${spacing.sm} ${spacing.lg}`,
    borderRadius: borderRadius.md,
    boxShadow: shadows.sm,
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,

  /** Botón outline */
  outline: {
    backgroundColor: 'transparent',
    color: colors.primary.green,
    border: `2px solid ${colors.primary.green}`,
    cursor: 'pointer',
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 600,
    padding: `${spacing.sm} ${spacing.lg}`,
    borderRadius: borderRadius.md,
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,

  /** Botón ghost (solo texto) */
  ghost: {
    backgroundColor: 'transparent',
    color: colors.gray.dark,
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 500,
    padding: `${spacing.sm} ${spacing.md}`,
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,
};

/**
 * Estilos de tipografía
 */
export const typography = {
  /** Headings */
  h1: {
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 'bold' as const,
    fontSize: '2rem',
    color: colors.gray.dark,
    lineHeight: 1.2,
    margin: 0,
  } as CSSProperties,

  h2: {
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 'bold' as const,
    fontSize: '1.5rem',
    color: colors.gray.dark,
    lineHeight: 1.2,
    margin: 0,
  } as CSSProperties,

  h3: {
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 'bold' as const,
    fontSize: '1.25rem',
    color: colors.gray.dark,
    lineHeight: 1.2,
    margin: 0,
  } as CSSProperties,

  h4: {
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 600,
    fontSize: '1.125rem',
    color: colors.gray.dark,
    lineHeight: 1.3,
    margin: 0,
  } as CSSProperties,

  /** Body text */
  body: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '0.875rem',
    color: colors.gray.dark,
    lineHeight: 1.6,
  } as CSSProperties,

  bodyLarge: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1rem',
    color: colors.gray.dark,
    lineHeight: 1.6,
  } as CSSProperties,

  bodySmall: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '0.75rem',
    color: colors.gray.medium,
    lineHeight: 1.5,
  } as CSSProperties,

  /** Caption */
  caption: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '0.75rem',
    color: colors.gray.medium,
    lineHeight: 1.4,
  } as CSSProperties,
};

/**
 * Estilos de inputs
 */
export const inputStyles = {
  /** Input base */
  base: {
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    border: `2px solid ${colors.gray.light}`,
    borderRadius: borderRadius.md,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1rem',
    color: colors.gray.dark,
    backgroundColor: colors.white,
    transition: 'all 0.2s ease',
  } as CSSProperties,

  /** Input con error */
  error: {
    borderColor: colors.status.error.text,
  } as CSSProperties,

  /** Input deshabilitado */
  disabled: {
    backgroundColor: colors.background.light,
    cursor: 'not-allowed',
    opacity: 0.6,
  } as CSSProperties,
};

/**
 * Estilos de badges
 */
export const badgeStyles = {
  /** Badge base */
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.xs,
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: borderRadius.full,
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 600,
    fontSize: '0.75rem',
  } as CSSProperties,
};

/**
 * Iconos decorativos (contenedores)
 */
export const iconContainer = (
  bgColor: string = colors.primary.green,
  size: number = 40
): CSSProperties => ({
  width: `${size}px`,
  height: `${size}px`,
  backgroundColor: bgColor,
  borderRadius: borderRadius.md,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: shadows.sm,
});

/**
 * Overlay para modales
 */
export const overlayStyles = {
  /** Overlay oscuro */
  dark: {
    position: 'fixed' as const,
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
  } as CSSProperties,

  /** Overlay claro */
  light: {
    position: 'fixed' as const,
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 40,
  } as CSSProperties,
};

/**
 * Transiciones comunes
 */
export const transitions = {
  fast: 'all 0.15s ease',
  normal: 'all 0.2s ease',
  slow: 'all 0.3s ease',
};

/**
 * Exportación default
 */
export default {
  borderRadius,
  shadows,
  spacing,
  cardStyles,
  flexLayouts,
  flexWithGap,
  columnWithGap,
  buttonStyles,
  typography,
  inputStyles,
  badgeStyles,
  iconContainer,
  overlayStyles,
  transitions,
};
