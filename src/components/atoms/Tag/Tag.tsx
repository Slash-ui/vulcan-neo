import React, { forwardRef } from 'react';
import styles from './Tag.module.css';

export type TagVariant = 'convex' | 'concave' | 'flat';
export type TagSize = 'sm' | 'md' | 'lg';
export type TagColor = 'default' | 'primary' | 'success' | 'warning' | 'error';

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
      leftIcon,
      rightIcon,
      removable = false,
      onRemove,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.tag,
      styles[variant],
      styles[size],
      styles[`color-${color}`],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.();
    };

    return (
      <span ref={ref} className={classNames} {...props}>
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        <span className={styles.content}>{children}</span>
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
