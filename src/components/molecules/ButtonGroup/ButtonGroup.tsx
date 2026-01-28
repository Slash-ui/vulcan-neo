import React, { forwardRef } from 'react';
import styles from './ButtonGroup.module.css';

export type ButtonGroupVariant = 'convex' | 'flat';
export type ButtonGroupSize = 'sm' | 'md' | 'lg';
export type ButtonGroupElevation = 'low' | 'mid' | 'high';
export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The visual variant of the group
   * @default 'convex'
   */
  variant?: ButtonGroupVariant;
  /**
   * The size of the buttons
   * @default 'md'
   */
  size?: ButtonGroupSize;
  /**
   * The elevation level of the shadow
   * @default 'mid'
   */
  elevation?: ButtonGroupElevation;
  /**
   * The orientation of the button group
   * @default 'horizontal'
   */
  orientation?: ButtonGroupOrientation;
  /**
   * Whether the group takes full width
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Button elements
   */
  children: React.ReactNode;
}

export interface ButtonGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether this button is selected/active
   * @default false
   */
  selected?: boolean;
  /**
   * Button content
   */
  children: React.ReactNode;
}

/**
 * ButtonGroupItem - Individual button within a ButtonGroup
 */
export const ButtonGroupItem = forwardRef<HTMLButtonElement, ButtonGroupItemProps>(
  ({ selected = false, children, className, disabled, ...props }, ref) => {
    const classNames = [
      styles.item,
      selected ? styles.selected : '',
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classNames} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
);

ButtonGroupItem.displayName = 'ButtonGroupItem';

/**
 * ButtonGroup - Neomorphic grouped buttons with connected styling
 *
 * Wrap ButtonGroupItem components to create segmented controls.
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      variant = 'convex',
      size = 'md',
      elevation = 'mid',
      orientation = 'horizontal',
      fullWidth = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.buttonGroup,
      styles[variant],
      styles[size],
      styles[`elevation-${elevation}`],
      styles[orientation],
      fullWidth ? styles.fullWidth : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} role="group" {...props}>
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';
