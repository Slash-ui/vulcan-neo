import React, { forwardRef } from 'react';
import styles from './Surface.module.css';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The theme of the surface
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  /**
   * Custom background color (hex)
   * Overrides theme background
   */
  backgroundColor?: string;
  /**
   * Whether to apply full viewport height
   * @default false
   */
  fullHeight?: boolean;
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

/**
 * Surface - The foundational container that defines the light source direction
 *
 * The Surface component establishes the neomorphic context with proper
 * background color and CSS variables for shadow calculations.
 */
export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  (
    {
      theme = 'light',
      backgroundColor,
      fullHeight = false,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const customStyle: React.CSSProperties = {
      ...style,
      ...(backgroundColor && { '--neo-bg': backgroundColor } as React.CSSProperties),
    };

    return (
      <div
        ref={ref}
        data-theme={theme}
        className={`${styles.surface} ${fullHeight ? styles.fullHeight : ''} ${className || ''}`}
        style={customStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Surface.displayName = 'Surface';
