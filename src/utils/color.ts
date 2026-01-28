/**
 * Color utility functions for neomorphic design system
 */

/**
 * Determines if a color is light or dark and returns an appropriate contrast color.
 * Useful for ensuring text readability on custom background colors.
 *
 * @param hexColor - A hex color string (e.g., "#FF5733" or "#F53")
 * @returns A dark color (#2D3436) for light backgrounds, or white (#FFFFFF) for dark backgrounds
 *
 * @example
 * ```tsx
 * const textColor = getContrastColor('#FF5733'); // Returns '#2D3436' (dark text)
 * const textColor = getContrastColor('#2C3E50'); // Returns '#FFFFFF' (white text)
 * ```
 */
export const getContrastColor = (hexColor: string): string => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16);
  const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16);
  const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#2D3436' : '#FFFFFF';
};

/**
 * Parses a hex color string into RGB components.
 *
 * @param hexColor - A hex color string (e.g., "#FF5733" or "#F53")
 * @returns An object with r, g, b values (0-255)
 */
export const hexToRgb = (hexColor: string): { r: number; g: number; b: number } => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16);
  const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16);
  const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16);
  return { r, g, b };
};

/**
 * Calculates the relative luminance of a color.
 * Based on WCAG 2.0 formula.
 *
 * @param hexColor - A hex color string (e.g., "#FF5733" or "#F53")
 * @returns Luminance value between 0 (darkest) and 1 (lightest)
 */
export const getLuminance = (hexColor: string): number => {
  const { r, g, b } = hexToRgb(hexColor);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

/**
 * Checks if a color is considered light (luminance > 0.5).
 *
 * @param hexColor - A hex color string (e.g., "#FF5733" or "#F53")
 * @returns true if the color is light, false if dark
 */
export const isLightColor = (hexColor: string): boolean => {
  return getLuminance(hexColor) > 0.5;
};
