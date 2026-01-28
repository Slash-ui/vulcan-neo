import React, { forwardRef } from 'react';
import { Typography } from '../../foundation/Typography';
import styles from './ProgressBar.module.css';

export type ProgressBarSize = 'sm' | 'md' | 'lg';
export type ProgressBarVariant = 'default' | 'gradient' | 'glow';
export type ProgressBarColor =
  | 'default'
  | 'primary'
  | 'primary-light'
  | 'primary-dark'
  | 'secondary'
  | 'secondary-light'
  | 'secondary-dark'
  | 'tertiary'
  | 'tertiary-light'
  | 'tertiary-dark'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/**
 * Convert hex color to RGB values
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const cleanHex = hex.replace('#', '');
  const fullHex = cleanHex.length === 3
    ? cleanHex.split('').map(c => c + c).join('')
    : cleanHex;

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Lighten a color by a percentage
 */
const lightenColor = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const { r, g, b } = rgb;
  const newR = Math.min(255, Math.round(r + (255 - r) * percent));
  const newG = Math.min(255, Math.round(g + (255 - g) * percent));
  const newB = Math.min(255, Math.round(b + (255 - b) * percent));

  return `rgb(${newR}, ${newG}, ${newB})`;
};

/**
 * Darken a color by a percentage
 */
const darkenColor = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const { r, g, b } = rgb;
  const newR = Math.max(0, Math.round(r * (1 - percent)));
  const newG = Math.max(0, Math.round(g * (1 - percent)));
  const newB = Math.max(0, Math.round(b * (1 - percent)));

  return `rgb(${newR}, ${newG}, ${newB})`;
};

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The current progress value (0-100)
   * @default 0
   */
  value?: number;
  /**
   * Maximum value
   * @default 100
   */
  max?: number;
  /**
   * The size of the progress bar
   * @default 'sm'
   */
  size?: ProgressBarSize;
  /**
   * Visual variant
   * - default: Simple elevated indicator
   * - gradient: Gradient fill
   * - glow: Glowing indicator
   * @default 'glow'
   */
  variant?: ProgressBarVariant;
  /**
   * The color of the progress fill
   * @default 'primary'
   */
  color?: ProgressBarColor;
  /**
   * Custom color (hex value). Overrides the color prop.
   * @example "#FF5733" or "#F53"
   */
  customColor?: string;
  /**
   * Whether to show the percentage label
   * @default false
   */
  showLabel?: boolean;
  /**
   * Label format function
   */
  formatLabel?: (value: number, max: number) => string;
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;
}

/**
 * ProgressBar - Neomorphic progress indicator
 *
 * A sunken track with a raised/glowing progress indicator.
 * The track is concave (carved in), and the filled portion is convex (raised).
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value = 0,
      max = 100,
      size = 'sm',
      variant = 'glow',
      color = 'primary',
      customColor,
      showLabel = false,
      formatLabel,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const containerClasses = [
      styles.container,
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const trackClasses = [
      styles.track,
      styles[size],
    ].join(' ');

    const colorClass = customColor ? 'color-custom' : `color-${color}`;
    const fillClasses = [
      styles.fill,
      styles[variant],
      styles[colorClass],
    ].join(' ');

    // Generate custom style for customColor
    let fillStyle: React.CSSProperties = { width: `${percentage}%` };

    if (customColor) {
      const rgb = hexToRgb(customColor);
      const lightColor = lightenColor(customColor, 0.3);
      const darkColor10 = darkenColor(customColor, 0.1);
      const darkColor20 = darkenColor(customColor, 0.2);

      fillStyle = {
        ...fillStyle,
        background: `linear-gradient(180deg, ${lightColor} 0%, ${customColor} 30%, ${darkColor10} 70%, ${darkColor20} 100%)`,
      };

      if (variant === 'glow' && rgb) {
        fillStyle.boxShadow = `
          0 4px 8px rgba(0, 0, 0, 0.25),
          0 2px 4px rgba(0, 0, 0, 0.15),
          0 0 16px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5),
          0 0 32px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3),
          inset 0 2px 4px rgba(255, 255, 255, 0.4),
          inset 0 -2px 4px rgba(0, 0, 0, 0.15)
        `;
      }
    }

    const defaultFormatLabel = (v: number, m: number) =>
      `${Math.round((v / m) * 100)}%`;

    const label = formatLabel
      ? formatLabel(value, max)
      : defaultFormatLabel(value, max);

    return (
      <div ref={ref} className={containerClasses} {...props}>
        <div
          className={trackClasses}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={ariaLabel}
        >
          <div
            className={fillClasses}
            style={fillStyle}
          />
        </div>
        {showLabel && (
          <Typography variant="caption" className={styles.label}>
            {label}
          </Typography>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
