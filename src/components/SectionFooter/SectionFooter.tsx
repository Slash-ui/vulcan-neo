import React, { forwardRef } from 'react';
import styles from './SectionFooter.module.css';

export interface SectionFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content on the left side (e.g., helper text)
   */
  left?: React.ReactNode;
  /**
   * Content on the right side (e.g., action buttons)
   */
  right?: React.ReactNode;
  /**
   * Whether to show top border
   * @default true
   */
  bordered?: boolean;
  /**
   * Alignment of content
   * @default 'between'
   */
  align?: 'start' | 'center' | 'end' | 'between';
  /**
   * Children (centered content if no left/right provided)
   */
  children?: React.ReactNode;
}

/**
 * SectionFooter - Neomorphic section footer
 *
 * Used at the bottom of sections/cards for actions or additional info.
 */
export const SectionFooter = forwardRef<HTMLDivElement, SectionFooterProps>(
  (
    {
      left,
      right,
      bordered = true,
      align = 'between',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.sectionFooter,
      styles[`align-${align}`],
      bordered ? styles.bordered : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    // If children provided without left/right, render children directly
    if (children && !left && !right) {
      return (
        <div ref={ref} className={classNames} {...props}>
          {children}
        </div>
      );
    }

    return (
      <div ref={ref} className={classNames} {...props}>
        {left && <div className={styles.left}>{left}</div>}
        {children && <div className={styles.center}>{children}</div>}
        {right && <div className={styles.right}>{right}</div>}
      </div>
    );
  }
);

SectionFooter.displayName = 'SectionFooter';
