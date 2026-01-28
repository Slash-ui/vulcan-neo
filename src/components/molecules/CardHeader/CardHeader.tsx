import React, { forwardRef } from 'react';
import styles from './CardHeader.module.css';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title text
   */
  title: string;
  /**
   * Subtitle/description text
   */
  subtitle?: string;
  /**
   * Icon or avatar to display before title
   */
  icon?: React.ReactNode;
  /**
   * Action buttons or dropdown
   */
  actions?: React.ReactNode;
  /**
   * Whether to show a border below
   * @default false
   */
  bordered?: boolean;
}

/**
 * CardHeader - Neomorphic card header component
 *
 * Used at the top of cards to display title, subtitle, and actions.
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (
    {
      title,
      subtitle,
      icon,
      actions,
      bordered = false,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.cardHeader,
      bordered ? styles.bordered : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        <div className={styles.content}>
          {icon && <div className={styles.icon}>{icon}</div>}
          <div className={styles.text}>
            <h3 className={styles.title}>{title}</h3>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';
