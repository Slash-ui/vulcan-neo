import React, { forwardRef } from 'react';
import { Typography } from '../../foundation/Typography';
import { getContrastColor } from '../../../utils';
import styles from './Button.module.css';

export type ButtonVariant = 'convex' | 'flat' | 'fab';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonElevation = 'low' | 'mid' | 'high';
export type ButtonColor =
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
   * The color theme of the button
   * @default 'default'
   */
  color?: ButtonColor;
  /**
   * Custom background color (hex value). Overrides the color prop.
   * @example "#FF5733" or "#F53"
   */
  customColor?: string;
  /**
   * The shadow color theme. Uses color-matched shadows for neomorphic effect.
   * @default undefined (uses standard light/dark shadows)
   */
  shadowColor?: ButtonColor;
  /**
   * Custom shadow color (hex value). Overrides the shadowColor prop.
   * @example "#FF5733" or "#F53"
   */
  customShadowColor?: string;
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
      color = 'default',
      customColor,
      shadowColor,
      customShadowColor,
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      label,
      className,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const hasCustomColor = !!customColor;
    const hasCustomShadowColor = !!customShadowColor;
    const hasShadowColor = shadowColor || hasCustomShadowColor;
    const isColored = color !== 'default' || hasCustomColor;

    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      styles[`elevation-${elevation}`],
      !hasCustomColor && color !== 'default' && styles[`color-${color}`],
      isColored && styles.colored,
      hasCustomColor && styles.customColor,
      hasShadowColor && styles.customShadow,
      !hasCustomShadowColor && shadowColor && styles[`shadow-${shadowColor}`],
      fullWidth ? styles.fullWidth : '',
      loading ? styles.loading : '',
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const customStyle: React.CSSProperties = {
      ...style,
      ...(hasCustomColor && {
        '--button-bg': customColor,
        '--button-color': getContrastColor(customColor),
      }),
      ...(hasCustomShadowColor && {
        '--shadow-color': customShadowColor,
      }),
    };

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        style={Object.keys(customStyle).length > 0 ? customStyle : style}
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
