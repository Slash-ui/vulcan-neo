import React, { forwardRef, useState } from 'react';
import styles from './HeaderNavigation.module.css';

export type HeaderSize = 'sm' | 'md' | 'lg';

export interface HeaderNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Size of the header
   * @default 'md'
   */
  size?: HeaderSize;
  /**
   * Logo/brand content
   */
  logo?: React.ReactNode;
  /**
   * Navigation items (center or left of actions)
   */
  navigation?: React.ReactNode;
  /**
   * Actions (right side - buttons, user menu)
   */
  actions?: React.ReactNode;
  /**
   * Whether to show mobile menu button
   * @default true
   */
  showMobileMenu?: boolean;
  /**
   * Mobile menu content
   */
  mobileMenu?: React.ReactNode;
  /**
   * Sticky position
   * @default false
   */
  sticky?: boolean;
}

export interface HeaderNavItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Whether this item is active
   */
  active?: boolean;
  /**
   * Whether this item is disabled
   */
  disabled?: boolean;
  /**
   * Href for link behavior
   */
  href?: string;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Children content
   */
  children: React.ReactNode;
}

export interface HeaderNavGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gap between items
   * @default 'md'
   */
  gap?: 'sm' | 'md' | 'lg';
}

/**
 * HeaderNavigation - Neomorphic header navigation component
 */
export const HeaderNavigation = forwardRef<HTMLElement, HeaderNavigationProps>(
  (
    {
      size = 'md',
      logo,
      navigation,
      actions,
      showMobileMenu = true,
      mobileMenu,
      sticky = false,
      className,
      ...props
    },
    ref
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const classNames = [
      styles.header,
      styles[size],
      sticky ? styles.sticky : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const MenuIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    );

    const CloseIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );

    return (
      <>
        <header ref={ref} className={classNames} {...props}>
          <div className={styles.container}>
            {logo && <div className={styles.logo}>{logo}</div>}

            {navigation && (
              <nav className={styles.navigation}>{navigation}</nav>
            )}

            <div className={styles.actions}>
              {actions}
              {showMobileMenu && mobileMenu && (
                <button
                  className={styles.mobileMenuButton}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
              )}
            </div>
          </div>
        </header>

        {showMobileMenu && mobileMenu && mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuContent}>{mobileMenu}</div>
          </div>
        )}
      </>
    );
  }
);

HeaderNavigation.displayName = 'HeaderNavigation';

/**
 * HeaderNavItem - Individual navigation item
 */
export const HeaderNavItem = forwardRef<HTMLButtonElement, HeaderNavItemProps>(
  (
    {
      active = false,
      disabled = false,
      href,
      onClick,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.navItem,
      active ? styles.active : '',
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    if (href && !disabled) {
      return (
        <a
          href={href}
          className={classNames}
          aria-current={active ? 'page' : undefined}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
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
        {children}
      </button>
    );
  }
);

HeaderNavItem.displayName = 'HeaderNavItem';

/**
 * HeaderNavGroup - Group of navigation items
 */
export const HeaderNavGroup = forwardRef<HTMLDivElement, HeaderNavGroupProps>(
  ({ gap = 'md', children, className, ...props }, ref) => {
    const classNames = [
      styles.navGroup,
      styles[`gap-${gap}`],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

HeaderNavGroup.displayName = 'HeaderNavGroup';
