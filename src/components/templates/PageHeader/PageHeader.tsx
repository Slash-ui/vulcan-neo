import React, { forwardRef } from 'react';
import styles from './PageHeader.module.css';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Main title
   */
  title: string;
  /**
   * Optional description/subtitle
   */
  description?: string;
  /**
   * Breadcrumb element
   */
  breadcrumb?: React.ReactNode;
  /**
   * Action buttons (right side)
   */
  actions?: React.ReactNode;
  /**
   * Optional icon/avatar before title
   */
  icon?: React.ReactNode;
  /**
   * Whether to show bottom border
   * @default true
   */
  bordered?: boolean;
}

/**
 * PageHeader - Neomorphic page header with title, description, and actions
 *
 * Used at the top of pages to display context and primary actions.
 */
export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      title,
      description,
      breadcrumb,
      actions,
      icon,
      bordered = true,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.pageHeader,
      bordered ? styles.bordered : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <header ref={ref} className={classNames} {...props}>
        {breadcrumb && <div className={styles.breadcrumb}>{breadcrumb}</div>}
        <div className={styles.content}>
          <div className={styles.titleSection}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <div className={styles.text}>
              <h1 className={styles.title}>{title}</h1>
              {description && <p className={styles.description}>{description}</p>}
            </div>
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      </header>
    );
  }
);

PageHeader.displayName = 'PageHeader';
