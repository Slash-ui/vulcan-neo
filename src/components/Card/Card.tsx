import React, { forwardRef } from 'react';
import styles from './Card.module.css';

export type CardElevation = 'low' | 'mid' | 'high';
export type CardVariant = 'convex' | 'flat' | 'concave';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The elevation level of the card
   * @default 'mid'
   */
  elevation?: CardElevation;
  /**
   * The visual variant
   * - convex: Elevated/popped out (default)
   * - flat: No shadow
   * - concave: Sunken/pressed in
   * @default 'convex'
   */
  variant?: CardVariant;
  /**
   * Whether the card has padding
   * @default true
   */
  padded?: boolean;
  /**
   * Whether the card is interactive (clickable)
   * @default false
   */
  interactive?: boolean;
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

/**
 * Card - Neomorphic card container
 *
 * A large, softly elevated content grouping area.
 * The backbone of neomorphic layouts.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      elevation = 'mid',
      variant = 'convex',
      padded = true,
      interactive = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.card,
      styles[variant],
      styles[`elevation-${elevation}`],
      padded ? styles.padded : '',
      interactive ? styles.interactive : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        tabIndex={interactive ? 0 : undefined}
        role={interactive ? 'button' : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/* Card Header Sub-component */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={`${styles.header} ${className || ''}`} {...props}>
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

/* Card Body Sub-component */
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={`${styles.body} ${className || ''}`} {...props}>
      {children}
    </div>
  )
);

CardBody.displayName = 'CardBody';

/* Card Footer Sub-component */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={`${styles.footer} ${className || ''}`} {...props}>
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';
