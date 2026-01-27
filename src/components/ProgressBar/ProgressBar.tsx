import React, { forwardRef } from 'react';
import styles from './ProgressBar.module.css';

export type ProgressBarSize = 'sm' | 'md' | 'lg';
export type ProgressBarVariant = 'default' | 'gradient' | 'glow';

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
   * @default 'md'
   */
  size?: ProgressBarSize;
  /**
   * Visual variant
   * - default: Simple elevated indicator
   * - gradient: Gradient fill
   * - glow: Glowing indicator
   * @default 'default'
   */
  variant?: ProgressBarVariant;
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
      size = 'md',
      variant = 'default',
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

    const fillClasses = [
      styles.fill,
      styles[variant],
    ].join(' ');

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
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <span className={styles.label}>{label}</span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
