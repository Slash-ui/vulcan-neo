import React, { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { ChevronRight } from 'lucide-react';
import { Typography } from '../../foundation/Typography';
import styles from './Breadcrumbs.module.css';

export type BreadcrumbsSize = 'sm' | 'md' | 'lg';

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Custom separator between items (icon recommended)
   * @default ChevronRight icon
   */
  separator?: React.ReactNode;
  /**
   * Maximum items to show (collapses middle items)
   */
  maxItems?: number;
  /**
   * Size of the breadcrumbs
   * @default 'md'
   */
  size?: BreadcrumbsSize;
  /**
   * BreadcrumbItem children
   */
  children: React.ReactNode;
}

export type BreadcrumbItemVariant = 'text' | 'icon' | 'both';

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
   * Icon to display (typically for home item)
   */
  icon?: React.ReactNode;
  /**
   * How to display the home item: text only, icon only, or both
   * Only applies when icon is provided
   * @default 'both'
   */
  variant?: BreadcrumbItemVariant;
  /**
   * Item content
   */
  children?: React.ReactNode;
}

/**
 * Default separator icon (ChevronRight from Lucide)
 */
const DefaultSeparator = () => <ChevronRight size={16} />;

/**
 * BreadcrumbItem - Individual breadcrumb item
 */
export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ href, current, icon, variant = 'both', children, className, ...props }, ref) => {
    const classNames = [
      styles.item,
      current ? styles.current : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    // Determine what to render based on icon and variant
    const renderContent = () => {
      if (icon) {
        switch (variant) {
          case 'icon':
            return <span className={styles.iconOnly}>{icon}</span>;
          case 'text':
            return children;
          case 'both':
          default:
            return (
              <>
                <span className={styles.icon}>{icon}</span>
                {children}
              </>
            );
        }
      }
      return children;
    };

    const content = href && !current ? (
      <a href={href} className={styles.link}>
        {renderContent()}
      </a>
    ) : (
      <span className={styles.text} aria-current={current ? 'page' : undefined}>
        {renderContent()}
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
      separator,
      maxItems,
      size = 'md',
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
      styles[size],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    // Use default separator if none provided
    const separatorContent = separator ?? <DefaultSeparator />;

    return (
      <nav ref={ref} className={classNames} aria-label="Breadcrumb" {...props}>
        <ol className={styles.list}>
          {itemsWithCurrent.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < itemsWithCurrent.length - 1 && (
                <li className={styles.separator} aria-hidden="true">
                  <Typography variant="caption" color="disabled" component="span">
                    {separatorContent}
                  </Typography>
                </li>
              )}
              {showEllipsis && index === Math.ceil((maxItems! - 1) / 2) - 1 && (
                <>
                  <li className={styles.separator} aria-hidden="true">
                    <Typography variant="caption" color="disabled" component="span">
                      {separatorContent}
                    </Typography>
                  </li>
                  <li className={styles.ellipsis}>
                    <Typography variant="caption" color="disabled" component="span">
                      ...
                    </Typography>
                  </li>
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
