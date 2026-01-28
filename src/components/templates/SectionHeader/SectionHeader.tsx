import React, { forwardRef } from 'react';
import styles from './SectionHeader.module.css';

export type SectionHeaderSize = 'sm' | 'md' | 'lg';

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Section title
   */
  title: string;
  /**
   * Optional description
   */
  description?: string;
  /**
   * Size variant
   * @default 'md'
   */
  size?: SectionHeaderSize;
  /**
   * Action buttons
   */
  actions?: React.ReactNode;
  /**
   * Supporting content below title (e.g., badge, status)
   */
  supportingContent?: React.ReactNode;
}

/**
 * SectionHeader - Neomorphic section header
 *
 * Used to introduce sections within a page.
 */
export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      title,
      description,
      size = 'md',
      actions,
      supportingContent,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.sectionHeader,
      styles[size],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        <div className={styles.content}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>{title}</h2>
            {supportingContent && (
              <div className={styles.supporting}>{supportingContent}</div>
            )}
          </div>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';
