import React, { forwardRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Notification.module.css';

export type NotificationVariant = 'info' | 'success' | 'warning' | 'error';
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Notification variant
   * @default 'info'
   */
  variant?: NotificationVariant;
  /**
   * Notification title
   */
  title?: string;
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  /**
   * Auto-dismiss duration in ms (0 to disable)
   * @default 5000
   */
  duration?: number;
  /**
   * Callback when notification is dismissed
   */
  onClose?: () => void;
  /**
   * Whether the notification is visible
   */
  open?: boolean;
  /**
   * Position of the notification
   * @default 'top-right'
   */
  position?: NotificationPosition;
  /**
   * Action button/link
   */
  action?: React.ReactNode;
  /**
   * Portal container element
   */
  container?: Element;
}

const defaultIcons: Record<NotificationVariant, React.ReactNode> = {
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
 * Notification - Neomorphic toast notification component
 */
export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      variant = 'info',
      title,
      icon,
      duration = 5000,
      onClose,
      open = true,
      position = 'top-right',
      action,
      container,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(open);
    const [isLeaving, setIsLeaving] = useState(false);

    const handleClose = useCallback(() => {
      setIsLeaving(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 200);
    }, [onClose]);

    useEffect(() => {
      setIsVisible(open);
      setIsLeaving(false);
    }, [open]);

    useEffect(() => {
      if (!isVisible || duration === 0) return;

      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }, [isVisible, duration, handleClose]);

    if (!isVisible) return null;

    const CloseIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );

    const classNames = [
      styles.notification,
      styles[variant],
      styles[position],
      isLeaving ? styles.leaving : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const notificationContent = (
      <div ref={ref} className={classNames} role="alert" {...props}>
        <span className={styles.icon}>{icon || defaultIcons[variant]}</span>

        <div className={styles.content}>
          {title && <div className={styles.title}>{title}</div>}
          {children && <div className={styles.message}>{children}</div>}
        </div>

        {action && <div className={styles.action}>{action}</div>}

        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Dismiss notification"
        >
          <CloseIcon />
        </button>
      </div>
    );

    return createPortal(
      <div className={`${styles.container} ${styles[position]}`}>
        {notificationContent}
      </div>,
      container || document.body
    );
  }
);

Notification.displayName = 'Notification';
