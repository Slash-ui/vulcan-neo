import React, { forwardRef } from 'react';
import { Typography } from '../../foundation/Typography';
import styles from './SocialButton.module.css';

export type SocialButtonVariant = 'convex' | 'flat';
export type SocialButtonSize = 'sm' | 'md' | 'lg';
export type SocialButtonElevation = 'low' | 'mid' | 'high';

export interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual variant of the button
   * @default 'convex'
   */
  variant?: SocialButtonVariant;
  /**
   * The size of the button
   * @default 'md'
   */
  size?: SocialButtonSize;
  /**
   * The elevation level of the shadow
   * @default 'mid'
   */
  elevation?: SocialButtonElevation;
  /**
   * Whether the button takes full width
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Icon element to display (consumer provides the icon)
   */
  icon: React.ReactNode;
  /**
   * Label text
   */
  children: React.ReactNode;
}

/**
 * SocialButton - Neomorphic button for social platform login/actions
 *
 * Consumer provides the icon for flexibility (no bundled icons).
 */
export const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
  (
    {
      variant = 'convex',
      size = 'md',
      elevation = 'mid',
      fullWidth = false,
      icon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.socialButton,
      styles[variant],
      styles[size],
      styles[`elevation-${elevation}`],
      fullWidth ? styles.fullWidth : '',
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
        <span className={styles.icon}>{icon}</span>
        <Typography variant="button" component="span" color="inherit" className={styles.label}>
          {children}
        </Typography>
      </button>
    );
  }
);

SocialButton.displayName = 'SocialButton';
