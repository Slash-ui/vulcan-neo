import React, { forwardRef } from 'react';
import { Typography } from '../../foundation/Typography';
import styles from './EmptyState.module.css';

export type EmptyStateSize = 'sm' | 'md' | 'lg';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  /**
   * Title text
   */
  title?: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Primary action button
   */
  action?: React.ReactNode;
  /**
   * Secondary action button
   */
  secondaryAction?: React.ReactNode;
  /**
   * Size variant
   * @default 'md'
   */
  size?: EmptyStateSize;
}

const defaultIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M4 10h16" />
    <circle cx="18" cy="18" r="3" />
    <path d="M18 16v4" />
    <path d="M16 18h4" />
  </svg>
);

/**
 * EmptyState - Neomorphic empty state / placeholder component
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon = defaultIcon,
      title = 'No data',
      description,
      action,
      secondaryAction,
      size = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.emptyState,
      styles[size],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {icon && <div className={styles.icon}>{icon}</div>}

        <div className={styles.content}>
          {title && (
            <Typography variant="h5" className={styles.title}>
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" color="secondary" className={styles.description}>
              {description}
            </Typography>
          )}
          {children && <div className={styles.customContent}>{children}</div>}
        </div>

        {(action || secondaryAction) && (
          <div className={styles.actions}>
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
