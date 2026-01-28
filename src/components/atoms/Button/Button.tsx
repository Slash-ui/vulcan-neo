import React, { forwardRef } from 'react';
import { Typography } from '../../foundation/Typography';
import styles from './Button.module.css';

export type ButtonVariant = 'convex' | 'flat' | 'fab';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonElevation = 'low' | 'mid' | 'high';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * The visual variant of the button
   * - convex: Default "popped out" state
   * - flat: No shadow, minimal style
   * - fab: Floating Action Button with high elevation
   * @default 'convex'
   */
  variant?: ButtonVariant;
  /**
   * The size of the button
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * The elevation level of the shadow
   * @default 'mid'
   */
  elevation?: ButtonElevation;
  /**
   * Whether the button takes full width
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Icon to display before the label
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display after the label
   */
  rightIcon?: React.ReactNode;
  /**
   * Button label text
   */
  label?: string;
}

/**
 * Button - Neomorphic soft button with convex/concave states
 *
 * Default state is convex (popped out), active state is concave (pressed in).
 * Follows the 135° light source convention.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'convex',
      size = 'md',
      elevation = 'mid',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      label,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      styles[`elevation-${elevation}`],
      fullWidth ? styles.fullWidth : '',
      loading ? styles.loading : '',
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {!loading && leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        {label && (
          <Typography variant="button" component="span" color="inherit" className={styles.label}>
            {label}
          </Typography>
        )}
        {!loading && rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
