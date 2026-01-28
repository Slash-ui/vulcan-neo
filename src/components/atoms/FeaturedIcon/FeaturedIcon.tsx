import React, { forwardRef } from 'react';
import styles from './FeaturedIcon.module.css';

export type FeaturedIconVariant = 'convex' | 'concave' | 'flat';
export type FeaturedIconSize = 'sm' | 'md' | 'lg' | 'xl';
export type FeaturedIconElevation = 'low' | 'mid' | 'high';
export type FeaturedIconColor = 'default' | 'primary' | 'success' | 'warning' | 'error';
export type FeaturedIconShape = 'circle' | 'square' | 'rounded';

export interface FeaturedIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The visual variant of the icon container
   * @default 'convex'
   */
  variant?: FeaturedIconVariant;
  /**
   * The size of the icon container
   * @default 'md'
   */
  size?: FeaturedIconSize;
  /**
   * The elevation level of the shadow
   * @default 'mid'
   */
  elevation?: FeaturedIconElevation;
  /**
   * The color theme of the icon
   * @default 'default'
   */
  color?: FeaturedIconColor;
  /**
   * The shape of the container
   * @default 'circle'
   */
  shape?: FeaturedIconShape;
  /**
   * Icon element to display
   */
  children: React.ReactNode;
}

/**
 * FeaturedIcon - Neomorphic icon container for highlighting icons
 *
 * Use convex for prominent, elevated icons and concave for pressed/inactive states.
 */
export const FeaturedIcon = forwardRef<HTMLDivElement, FeaturedIconProps>(
  (
    {
      variant = 'convex',
      size = 'md',
      elevation = 'mid',
      color = 'default',
      shape = 'circle',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.featuredIcon,
      styles[variant],
      styles[size],
      styles[`elevation-${elevation}`],
      styles[`color-${color}`],
      styles[shape],
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

FeaturedIcon.displayName = 'FeaturedIcon';
