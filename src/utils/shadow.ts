/**
 * Neomorphic Shadow Utilities
 *
 * Calculates light and dark shadows based on a background color.
 * Light source is fixed at Top-Left (135°).
 */

export type Elevation = 'low' | 'mid' | 'high';
export type DepthState = 'flat' | 'convex' | 'concave';

interface ShadowConfig {
  elevation: Elevation;
  depth: DepthState;
  intensity?: number;
}

const ELEVATION_VALUES = {
  low: 4,
  mid: 8,
  high: 16,
} as const;

/**
 * Adjusts the brightness of a hex color
 * @param hex - Hex color code (e.g., "#E0E5EC")
 * @param percent - Percentage to adjust (-100 to 100)
 * @returns Adjusted hex color
 */
export function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);

  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));

  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

/**
 * Generates light shadow color from background
 * @param bgColor - Background hex color
 * @param intensity - Shadow intensity (0-1)
 */
export function getLightShadow(bgColor: string, _intensity = 0.8): string {
  const lightColor = adjustBrightness(bgColor, 15);
  return `${lightColor}`;
}

/**
 * Generates dark shadow color from background
 * @param bgColor - Background hex color
 * @param intensity - Shadow intensity (0-1)
 */
export function getDarkShadow(bgColor: string, _intensity = 0.6): string {
  const darkColor = adjustBrightness(bgColor, -15);
  return `${darkColor}`;
}

/**
 * Generates neomorphic box-shadow CSS value
 * Light source: Top-Left (135°)
 *
 * @param config - Shadow configuration
 * @returns CSS box-shadow value
 */
export function getNeomorphicShadow(config: ShadowConfig): string {
  const { elevation, depth } = config;
  const distance = ELEVATION_VALUES[elevation];
  const blur = distance * 2;

  const lightShadow = 'var(--neo-shadow-light)';
  const darkShadow = 'var(--neo-shadow-dark)';

  switch (depth) {
    case 'convex':
      // Raised/popped out effect
      return `
        -${distance}px -${distance}px ${blur}px ${lightShadow},
        ${distance}px ${distance}px ${blur}px ${darkShadow}
      `.trim();

    case 'concave':
      // Pressed in/inset effect
      return `
        inset ${distance}px ${distance}px ${blur}px ${darkShadow},
        inset -${distance}px -${distance}px ${blur}px ${lightShadow}
      `.trim();

    case 'flat':
    default:
      return 'none';
  }
}

/**
 * CSS-in-JS helper to generate shadow styles
 */
export function createNeomorphicStyles(bgColor: string, elevation: Elevation = 'mid') {
  const lightShadow = getLightShadow(bgColor);
  const darkShadow = getDarkShadow(bgColor);
  const distance = ELEVATION_VALUES[elevation];
  const blur = distance * 2;

  return {
    convex: {
      boxShadow: `
        -${distance}px -${distance}px ${blur}px ${lightShadow},
        ${distance}px ${distance}px ${blur}px ${darkShadow}
      `.trim(),
    },
    concave: {
      boxShadow: `
        inset ${distance}px ${distance}px ${blur}px ${darkShadow},
        inset -${distance}px -${distance}px ${blur}px ${lightShadow}
      `.trim(),
    },
    flat: {
      boxShadow: 'none',
    },
  };
}

/**
 * Type-safe CSS variable getter
 */
export function getCSSVar(name: string): string {
  return `var(--neo-${name})`;
}
