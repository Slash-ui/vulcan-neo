import React, { forwardRef } from 'react';
import { Typography } from '../../foundation/Typography';
import { getContrastColor } from '../../../utils';
import styles from './Badge.module.css';

export type BadgeVariant = 'convex' | 'concave' | 'flat';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeColor =
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
   * Whether to use filled background color instead of text color
   * @default false
   */
  filled?: boolean;
  /**
   * Custom background color (hex value). Overrides the color prop when filled is true.
   * @example "#FF5733" or "#F53"
   */
  customColor?: string;
  /**
   * Whether to show a dot indicator instead of content
   * @default false
   */
  dot?: boolean;
  /**
   * Icon to display before the content. Accepts any React node (Lucide, FontAwesome, etc.)
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display after the content. Accepts any React node (Lucide, FontAwesome, etc.)
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
      filled = false,
      customColor,
      dot = false,
      leftIcon,
      rightIcon,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const hasCustomColor = customColor && filled;

    const classNames = [
      styles.badge,
      styles[variant],
      styles[size],
      !hasCustomColor && styles[`color-${color}`],
      filled && styles.filled,
      hasCustomColor && styles.customColor,
      dot ? styles.dot : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const customStyle = hasCustomColor
      ? {
          ...style,
          backgroundColor: customColor,
          color: getContrastColor(customColor),
        }
      : style;

    if (dot) {
      return <span ref={ref} className={classNames} style={customStyle} {...props} />;
    }

    return (
      <span ref={ref} className={classNames} style={customStyle} {...props}>
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        {children && (
          <Typography variant="caption" component="span" color="inherit" className={styles.content}>
            {children}
          </Typography>
        )}
        {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
