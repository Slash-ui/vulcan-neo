import React, { forwardRef } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'convex' | 'concave' | 'flat';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeColor = 'default' | 'primary' | 'success' | 'warning' | 'error';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The visual variant of the badge
   * @default 'convex'
   */
  variant?: BadgeVariant;
  /**
   * The size of the badge
   * @default 'md'
   */
  size?: BadgeSize;
  /**
   * The color theme of the badge
   * @default 'default'
   */
  color?: BadgeColor;
  /**
   * Whether to show a dot indicator instead of content
   * @default false
   */
  dot?: boolean;
  /**
   * Icon to display before the content
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display after the content
   */
  rightIcon?: React.ReactNode;
  /**
   * Badge content
   */
  children?: React.ReactNode;
}

/**
 * Badge - Neomorphic status/notification indicator
 *
 * Used to highlight status, counts, or labels.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'convex',
      size = 'md',
      color = 'default',
      dot = false,
      leftIcon,
      rightIcon,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.badge,
      styles[variant],
      styles[size],
      styles[`color-${color}`],
      dot ? styles.dot : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    if (dot) {
      return <span ref={ref} className={classNames} {...props} />;
    }

    return (
      <span ref={ref} className={classNames} {...props}>
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        {children && <span className={styles.content}>{children}</span>}
        {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
