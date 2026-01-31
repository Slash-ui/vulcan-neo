import React, { forwardRef } from 'react';
import styles from './IconButton.module.css';

export type IconButtonVariant = 'convex' | 'flat';
export type IconButtonSize = 'sm' | 'md' | 'lg';
export type IconButtonElevation = 'low' | 'mid' | 'high';
export type IconButtonShape = 'circle' | 'square' | 'rounded';

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * The visual variant of the button
   * @default 'convex'
   */
  variant?: IconButtonVariant;
  /**
   * The size of the button
   * @default 'md'
   */
  size?: IconButtonSize;
  /**
   * The elevation level of the shadow
   * @default 'mid'
   */
  elevation?: IconButtonElevation;
  /**
   * The shape of the button
   * @default 'circle'
   */
  shape?: IconButtonShape;
  /**
   * Icon element to display (ReactNode)
   */
  icon: React.ReactNode;
  /**
   * Accessible label for the button
   */
  'aria-label': string;
}

/**
 * IconButton - Neomorphic button containing only an icon
 *
 * Used for common actions like close, menu, settings, etc.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'convex',
      size = 'md',
      elevation = 'mid',
      shape = 'circle',
      icon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.iconButton,
      styles[variant],
      styles[size],
      styles[`elevation-${elevation}`],
      styles[shape],
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
