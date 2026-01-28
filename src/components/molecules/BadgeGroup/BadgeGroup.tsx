import React, { forwardRef, Children, isValidElement } from 'react';
import styles from './BadgeGroup.module.css';

export type BadgeGroupSize = 'sm' | 'md' | 'lg';

export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum number of items to display before showing overflow count
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
      max,
      size = 'md',
      overflowDirection = 'right',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const childArray = Children.toArray(children).filter(isValidElement);
    const totalCount = childArray.length;
    const displayCount = max !== undefined ? Math.min(max, totalCount) : totalCount;
    const overflowCount = totalCount - displayCount;

    const displayedChildren = childArray.slice(0, displayCount);

    const classNames = [
      styles.badgeGroup,
      styles[size],
      styles[overflowDirection],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {overflowDirection === 'left' && overflowCount > 0 && (
          <span className={styles.overflow}>+{overflowCount}</span>
        )}
        {displayedChildren.map((child, index) => (
          <span
            key={index}
            className={styles.item}
            style={{ zIndex: overflowDirection === 'right' ? displayCount - index : index + 1 }}
          >
            {child}
          </span>
        ))}
        {overflowDirection === 'right' && overflowCount > 0 && (
          <span className={styles.overflow}>+{overflowCount}</span>
        )}
      </div>
    );
  }
);

BadgeGroup.displayName = 'BadgeGroup';
