import React, { forwardRef } from 'react';
import { Info, CircleCheck, TriangleAlert, CircleX, X } from 'lucide-react';
import { Typography } from '../../foundation/Typography';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';
export type AlertAnimation = 'raise' | 'none';

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
   * Custom icon to display (ReactNode)
   * @default Uses Lucide icons based on variant
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
  /**
   * Animation style for show/hide transitions
   * - 'raise': Alert raises from flat surface when visible, flattens when hidden
   * - 'none': No animation
   * @default 'none'
   */
  animation?: AlertAnimation;
  /**
   * Controls visibility of the alert (used with animation)
   * @default true
   */
  visible?: boolean;
}

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  info: <Info size={20} />,
  success: <CircleCheck size={20} />,
  warning: <TriangleAlert size={20} />,
  error: <CircleX size={20} />,
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
      animation = 'none',
      visible = true,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.alert,
      styles[variant],
      animation !== 'none' && styles.animated,
      animation !== 'none' && (visible ? styles.raised : styles.flat),
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} role="alert" {...props}>
        <span className={styles.icon}>{icon || defaultIcons[variant]}</span>

        <div className={styles.content}>
          {title && (
            <Typography variant="subtitle1" className={styles.title} component="div">
              {title}
            </Typography>
          )}
          {children && (
            <Typography variant="body2" color="inherit" className={styles.message} component="div">
              {children}
            </Typography>
          )}
        </div>

        {action && <div className={styles.action}>{action}</div>}

        {dismissible && (
          <button
            className={styles.closeButton}
            onClick={onDismiss}
            aria-label="Dismiss alert"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
