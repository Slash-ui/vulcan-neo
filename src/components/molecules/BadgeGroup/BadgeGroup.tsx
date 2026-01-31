import React, { forwardRef, Children, isValidElement } from 'react';
import { Badge } from '../../atoms/Badge';
import styles from './BadgeGroup.module.css';

export type BadgeGroupSize = 'sm' | 'md' | 'lg';
export type BadgeGroupSpacing = 'compact' | 'normal' | 'loose';

export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum number of items to display before showing overflow count
   * @default 3
   */
  max?: number;
  /**
   * The size of the badges
   * @default 'md'
   */
  size?: BadgeGroupSize;
  /**
   * Direction of overflow stacking
   * @default 'right'
   */
  overflowDirection?: 'left' | 'right';
  /**
   * Custom overflow indicator (ReactNode)
   * Receives overflow count via render prop or can be a static element
   * @default Badge with "+N" text
   */
  overflowIndicator?: React.ReactNode | ((count: number) => React.ReactNode);
  /**
   * Spacing between stacked items
   * - 'compact': More overlap, tighter stack
   * - 'normal': Default overlap
   * - 'loose': Less overlap, more spread out
   * @default 'normal'
   */
  spacing?: BadgeGroupSpacing;
  /**
   * Enable hover animation that expands items on hover
   * @default false
   */
  animate?: boolean;
  /**
   * Badge/Avatar children
   */
  children: React.ReactNode;
}

/**
 * BadgeGroup - Neomorphic grouped badges with overflow handling
 *
 * Displays a limited number of items with a "+N" overflow indicator.
 */
export const BadgeGroup = forwardRef<HTMLDivElement, BadgeGroupProps>(
  (
    {
      max = 3,
      size = 'md',
      overflowDirection = 'right',
      overflowIndicator,
      spacing = 'normal',
      animate = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const childArray = Children.toArray(children).filter(isValidElement);
    const totalCount = childArray.length;
    const displayCount = Math.min(max, totalCount);
    const overflowCount = totalCount - displayCount;

    const displayedChildren = childArray.slice(0, displayCount);

    const classNames = [
      styles.badgeGroup,
      styles[size],
      styles[overflowDirection],
      styles[`spacing-${spacing}`],
      animate && styles.animate,
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const renderOverflowIndicator = () => {
      if (overflowIndicator) {
        return typeof overflowIndicator === 'function'
          ? overflowIndicator(overflowCount)
          : overflowIndicator;
      }
      return (
        <Badge size={size} variant="convex" className={styles.overflowBadge}>
          +{overflowCount}
        </Badge>
      );
    };

    return (
      <div ref={ref} className={classNames} {...props}>
        {overflowDirection === 'left' && overflowCount > 0 && (
          <span className={styles.overflow}>{renderOverflowIndicator()}</span>
        )}
        {displayedChildren.map((child, index) => (
          <span
            key={index}
            className={styles.item}
            style={{
              zIndex:
                overflowDirection === 'right'
                  ? displayCount - index
                  : index + 1,
            }}
          >
            {child}
          </span>
        ))}
        {overflowDirection === 'right' && overflowCount > 0 && (
          <span className={styles.overflow}>{renderOverflowIndicator()}</span>
        )}
      </div>
    );
  }
);

BadgeGroup.displayName = 'BadgeGroup';
