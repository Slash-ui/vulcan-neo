import React, { forwardRef } from 'react';
import { Typography } from '../../foundation/Typography';
import { IconButton } from '../../atoms/IconButton';
import styles from './InlineCTA.module.css';

export type InlineCTAVariant = 'default' | 'highlight' | 'gradient';
export type InlineCTASize = 'sm' | 'md' | 'lg';

export interface InlineCTAProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * CTA title
   */
  title: string;
  /**
   * CTA description
   */
  description?: string;
  /**
   * Primary action button
   */
  primaryAction?: React.ReactNode;
  /**
   * Secondary action button
   */
  secondaryAction?: React.ReactNode;
  /**
   * Icon or image
   */
  icon?: React.ReactNode;
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: InlineCTAVariant;
  /**
   * Size variant
   * @default 'md'
   */
  size?: InlineCTASize;
  /**
   * Whether the CTA is dismissible
   * @default false
   */
  dismissible?: boolean;
  /**
   * Callback when dismissed
   */
  onDismiss?: () => void;
}

/**
 * InlineCTA - Neomorphic inline call-to-action component
 */
export const InlineCTA = forwardRef<HTMLDivElement, InlineCTAProps>(
  (
    {
      title,
      description,
      primaryAction,
      secondaryAction,
      icon,
      variant = 'default',
      size = 'md',
      dismissible = false,
      onDismiss,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.cta,
      styles[variant],
      styles[size],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const CloseIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );

    return (
      <div ref={ref} className={classNames} {...props}>
        {icon && <div className={styles.icon}>{icon}</div>}

        <div className={styles.content}>
          <Typography variant="h6" className={styles.title} component="h3">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="secondary" className={styles.description}>
              {description}
            </Typography>
          )}
        </div>

        {(primaryAction || secondaryAction) && (
          <div className={styles.actions}>
            {secondaryAction}
            {primaryAction}
          </div>
        )}

        {dismissible && (
          <IconButton
            variant="flat"
            size="sm"
            className={styles.dismissButton}
            onClick={onDismiss}
            aria-label="Dismiss"
            icon={<CloseIcon />}
          />
        )}
      </div>
    );
  }
);

InlineCTA.displayName = 'InlineCTA';
