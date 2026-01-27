import React, { forwardRef, createContext, useContext, useState } from 'react';
import styles from './SidebarNavigation.module.css';

export type SidebarSize = 'sm' | 'md' | 'lg';

interface SidebarContextValue {
  collapsed: boolean;
  size: SidebarSize;
}

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  size: 'md',
});

export interface SidebarNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Size of the sidebar
   * @default 'md'
   */
  size?: SidebarSize;
  /**
   * Whether the sidebar is collapsed
   * @default false
   */
  collapsed?: boolean;
  /**
   * Header content (logo, brand)
   */
  header?: React.ReactNode;
  /**
   * Footer content (user profile, settings)
   */
  footer?: React.ReactNode;
}

export interface SidebarNavGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Group label
   */
  label?: string;
}

export interface SidebarNavItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  /**
   * Whether this item is active
   */
  active?: boolean;
  /**
   * Whether this item is disabled
   */
  disabled?: boolean;
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Href for link behavior
   */
  href?: string;
}

/**
 * SidebarNavigation - Neomorphic sidebar navigation component
 */
export const SidebarNavigation = forwardRef<HTMLElement, SidebarNavigationProps>(
  (
    {
      size = 'md',
      collapsed = false,
      header,
      footer,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.sidebar,
      styles[size],
      collapsed ? styles.collapsed : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <SidebarContext.Provider value={{ collapsed, size }}>
        <aside ref={ref} className={classNames} {...props}>
          {header && <div className={styles.header}>{header}</div>}
          <nav className={styles.nav}>{children}</nav>
          {footer && <div className={styles.footer}>{footer}</div>}
        </aside>
      </SidebarContext.Provider>
    );
  }
);

SidebarNavigation.displayName = 'SidebarNavigation';

/**
 * SidebarNavGroup - Group of navigation items
 */
export const SidebarNavGroup = forwardRef<HTMLDivElement, SidebarNavGroupProps>(
  ({ label, children, className, ...props }, ref) => {
    const { collapsed } = useContext(SidebarContext);

    return (
      <div ref={ref} className={`${styles.group} ${className || ''}`} {...props}>
        {label && !collapsed && <span className={styles.groupLabel}>{label}</span>}
        <div className={styles.groupItems}>{children}</div>
      </div>
    );
  }
);

SidebarNavGroup.displayName = 'SidebarNavGroup';

/**
 * SidebarNavItem - Individual navigation item
 */
export const SidebarNavItem = forwardRef<HTMLButtonElement, SidebarNavItemProps>(
  (
    {
      icon,
      active = false,
      disabled = false,
      badge,
      onClick,
      href,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const { collapsed } = useContext(SidebarContext);

    const classNames = [
      styles.item,
      active ? styles.active : '',
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {icon && <span className={styles.icon}>{icon}</span>}
        {!collapsed && <span className={styles.label}>{children}</span>}
        {!collapsed && badge && <span className={styles.badge}>{badge}</span>}
      </>
    );

    if (href && !disabled) {
      return (
        <a href={href} className={classNames} aria-current={active ? 'page' : undefined}>
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={classNames}
        onClick={onClick}
        disabled={disabled}
        aria-current={active ? 'page' : undefined}
        {...props}
      >
        {content}
      </button>
    );
  }
);

SidebarNavItem.displayName = 'SidebarNavItem';
