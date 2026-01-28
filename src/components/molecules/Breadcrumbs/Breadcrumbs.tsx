import React, { forwardRef, Children, isValidElement, cloneElement } from 'react';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Custom separator between items
   * @default '/'
   */
  separator?: React.ReactNode;
  /**
   * Maximum items to show (collapses middle items)
   */
  maxItems?: number;
  /**
   * BreadcrumbItem children
   */
  children: React.ReactNode;
}

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Link href (if clickable)
   */
  href?: string;
  /**
   * Whether this is the current/active item
   */
  current?: boolean;
  /**
   * Item content
   */
  children: React.ReactNode;
}

/**
 * BreadcrumbItem - Individual breadcrumb item
 */
export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ href, current, children, className, ...props }, ref) => {
    const classNames = [
      styles.item,
      current ? styles.current : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const content = href && !current ? (
      <a href={href} className={styles.link}>
        {children}
      </a>
    ) : (
      <span className={styles.text} aria-current={current ? 'page' : undefined}>
        {children}
      </span>
    );

    return (
      <li ref={ref} className={classNames} {...props}>
        {content}
      </li>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

/**
 * Breadcrumbs - Neomorphic breadcrumb navigation
 *
 * Displays the current page location within a hierarchy.
 */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      separator = '/',
      maxItems,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const childArray = Children.toArray(children).filter(isValidElement);
    const totalItems = childArray.length;

    let displayedItems = childArray;
    let showEllipsis = false;

    if (maxItems && totalItems > maxItems) {
      const itemsToShow = maxItems - 1;
      const startItems = Math.ceil(itemsToShow / 2);
      const endItems = Math.floor(itemsToShow / 2);

      displayedItems = [
        ...childArray.slice(0, startItems),
        ...childArray.slice(totalItems - endItems),
      ];
      showEllipsis = true;
    }

    // Mark the last item as current if not already specified
    const itemsWithCurrent = displayedItems.map((child, index) => {
      if (isValidElement<BreadcrumbItemProps>(child)) {
        const isLast = index === displayedItems.length - 1;
        if (isLast && child.props.current === undefined) {
          return cloneElement(child, { current: true });
        }
      }
      return child;
    });

    const classNames = [
      styles.breadcrumbs,
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <nav ref={ref} className={classNames} aria-label="Breadcrumb" {...props}>
        <ol className={styles.list}>
          {itemsWithCurrent.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < itemsWithCurrent.length - 1 && (
                <li className={styles.separator} aria-hidden="true">
                  {separator}
                </li>
              )}
              {showEllipsis && index === Math.ceil((maxItems! - 1) / 2) - 1 && (
                <>
                  <li className={styles.separator} aria-hidden="true">
                    {separator}
                  </li>
                  <li className={styles.ellipsis}>...</li>
                </>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';
