import React, { forwardRef } from 'react';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alert variant
   * @default 'info'
   */
  variant?: AlertVariant;
  /**
   * Alert title
   */
  title?: string;
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  /**
   * Whether the alert is dismissible
   * @default false
   */
  dismissible?: boolean;
  /**
   * Callback when alert is dismissed
   */
  onDismiss?: () => void;
  /**
   * Action button/link
   */
  action?: React.ReactNode;
}

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};

/**
 * Alert - Neomorphic alert/notification banner component
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      icon,
      dismissible = false,
      onDismiss,
      action,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.alert,
      styles[variant],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const CloseIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );

    return (
      <div ref={ref} className={classNames} role="alert" {...props}>
        <span className={styles.icon}>{icon || defaultIcons[variant]}</span>

        <div className={styles.content}>
          {title && <div className={styles.title}>{title}</div>}
          {children && <div className={styles.message}>{children}</div>}
        </div>

        {action && <div className={styles.action}>{action}</div>}

        {dismissible && (
          <button
            className={styles.closeButton}
            onClick={onDismiss}
            aria-label="Dismiss alert"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
