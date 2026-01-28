import React, { forwardRef } from 'react';
import { Typography } from '../../foundation/Typography';
import { getContrastColor } from '../../../utils';
import styles from './Tag.module.css';

export type TagVariant = 'convex' | 'concave' | 'extrude' | 'flat';
export type TagSize = 'sm' | 'md' | 'lg';
export type TagColor =
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

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The visual variant of the tag
   * @default 'convex'
   */
  variant?: TagVariant;
  /**
   * The size of the tag
   * @default 'md'
   */
  size?: TagSize;
  /**
   * The color theme of the tag
   * @default 'default'
   */
  color?: TagColor;
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
   * Icon to display before the content
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display after the content (or custom close icon)
   */
  rightIcon?: React.ReactNode;
  /**
   * Whether the tag is removable (shows close button)
   * @default false
   */
  removable?: boolean;
  /**
   * Callback when close button is clicked
   */
  onRemove?: () => void;
  /**
   * Tag content
   */
  children: React.ReactNode;
}

/**
 * Tag - Neomorphic removable tag component
 *
 * Used for labels, categories, or filters that can optionally be removed.
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = 'convex',
      size = 'md',
      color = 'default',
      filled = false,
      customColor,
      leftIcon,
      rightIcon,
      removable = false,
      onRemove,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const hasCustomColor = customColor && filled;

    const classNames = [
      styles.tag,
      styles[variant],
      styles[size],
      !hasCustomColor && styles[`color-${color}`],
      filled && styles.filled,
      hasCustomColor && styles.customColor,
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

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.();
    };

    return (
      <span ref={ref} className={classNames} style={customStyle} {...props}>
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        <Typography variant="caption" component="span" color="inherit" className={styles.content}>
          {children}
        </Typography>
        {rightIcon && !removable && <span className={styles.icon}>{rightIcon}</span>}
        {removable && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleRemove}
            aria-label="Remove tag"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';
