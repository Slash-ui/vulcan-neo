import React, { forwardRef } from 'react';
import styles from './ContentDivider.module.css';

export type ContentDividerOrientation = 'horizontal' | 'vertical';
export type ContentDividerVariant = 'solid' | 'dashed' | 'groove';

export interface ContentDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Orientation of the divider
   * @default 'horizontal'
   */
  orientation?: ContentDividerOrientation;
  /**
   * Visual variant
   * @default 'solid'
   */
  variant?: ContentDividerVariant;
  /**
   * Optional label text in the middle
   */
  label?: string;
  /**
   * Position of the label
   * @default 'center'
   */
  labelPosition?: 'start' | 'center' | 'end';
  /**
   * Spacing around the divider
   * @default 'md'
   */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * ContentDivider - Neomorphic content divider
 *
 * Separates content sections with optional label.
 */
export const ContentDivider = forwardRef<HTMLDivElement, ContentDividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      label,
      labelPosition = 'center',
      spacing = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.divider,
      styles[orientation],
      styles[variant],
      styles[`spacing-${spacing}`],
      label ? styles.withLabel : '',
      label ? styles[`label-${labelPosition}`] : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    if (orientation === 'vertical') {
      return (
        <div ref={ref} className={classNames} role="separator" aria-orientation="vertical" {...props} />
      );
    }

    return (
      <div ref={ref} className={classNames} role="separator" aria-orientation="horizontal" {...props}>
        {label && (
          <>
            <span className={styles.line} />
            <span className={styles.label}>{label}</span>
            <span className={styles.line} />
          </>
        )}
      </div>
    );
  }
);

ContentDivider.displayName = 'ContentDivider';
