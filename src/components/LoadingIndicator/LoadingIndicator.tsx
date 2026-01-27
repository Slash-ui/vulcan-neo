import React, { forwardRef } from 'react';
import styles from './LoadingIndicator.module.css';

export type LoadingSize = 'sm' | 'md' | 'lg' | 'xl';
export type LoadingVariant = 'spinner' | 'dots' | 'pulse' | 'skeleton';

export interface LoadingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size of the loading indicator
   * @default 'md'
   */
  size?: LoadingSize;
  /**
   * Loading indicator variant
   * @default 'spinner'
   */
  variant?: LoadingVariant;
  /**
   * Loading text
   */
  label?: string;
  /**
   * Whether to show the indicator
   * @default true
   */
  loading?: boolean;
  /**
   * Skeleton width (for skeleton variant)
   */
  skeletonWidth?: string | number;
  /**
   * Skeleton height (for skeleton variant)
   */
  skeletonHeight?: string | number;
}

/**
 * LoadingIndicator - Neomorphic loading/spinner component
 */
export const LoadingIndicator = forwardRef<HTMLDivElement, LoadingIndicatorProps>(
  (
    {
      size = 'md',
      variant = 'spinner',
      label,
      loading = true,
      skeletonWidth,
      skeletonHeight,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    if (!loading && !children) return null;

    const classNames = [
      styles.container,
      styles[size],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    if (!loading && children) {
      return <>{children}</>;
    }

    const renderIndicator = () => {
      switch (variant) {
        case 'spinner':
          return (
            <div className={styles.spinner}>
              <svg viewBox="0 0 50 50" className={styles.spinnerSvg}>
                <circle
                  className={styles.spinnerTrack}
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  strokeWidth="4"
                />
                <circle
                  className={styles.spinnerProgress}
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          );

        case 'dots':
          return (
            <div className={styles.dots}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          );

        case 'pulse':
          return (
            <div className={styles.pulse}>
              <span className={styles.pulseRing} />
              <span className={styles.pulseCore} />
            </div>
          );

        case 'skeleton':
          return (
            <div
              className={styles.skeleton}
              style={{
                width: skeletonWidth,
                height: skeletonHeight,
              }}
            />
          );

        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={classNames}
        role="status"
        aria-label={label || 'Loading'}
        style={style}
        {...props}
      >
        {renderIndicator()}
        {label && <span className={styles.label}>{label}</span>}
      </div>
    );
  }
);

LoadingIndicator.displayName = 'LoadingIndicator';

// Skeleton component for easier usage
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the skeleton
   */
  width?: string | number;
  /**
   * Height of the skeleton
   */
  height?: string | number;
  /**
   * Border radius
   */
  borderRadius?: string | number;
  /**
   * Number of lines (for text skeleton)
   */
  lines?: number;
  /**
   * Whether this is a circle
   */
  circle?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width, height, borderRadius, lines = 1, circle = false, className, style, ...props }, ref) => {
    const classNames = [styles.skeleton, className || ''].filter(Boolean).join(' ');

    if (lines > 1) {
      return (
        <div ref={ref} className={styles.skeletonLines} {...props}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={classNames}
              style={{
                width: i === lines - 1 ? '70%' : '100%',
                height: height || 16,
                borderRadius: borderRadius || 'var(--neo-radius-xs)',
                ...style,
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={classNames}
        style={{
          width: circle ? height : width,
          height,
          borderRadius: circle ? '50%' : borderRadius || 'var(--neo-radius-xs)',
          ...style,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
