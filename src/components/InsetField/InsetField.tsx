import React, { forwardRef, useId } from 'react';
import styles from './InsetField.module.css';

export type InsetFieldSize = 'sm' | 'md' | 'lg';

export interface InsetFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The label for the input field
   */
  label?: string;
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  /**
   * Error message (replaces helper text when present)
   */
  error?: string;
  /**
   * The size of the input
   * @default 'md'
   */
  size?: InsetFieldSize;
  /**
   * Icon to display at the start of the input
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display at the end of the input
   */
  rightIcon?: React.ReactNode;
  /**
   * Whether the input takes full width
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * InsetField - Neomorphic text input with carved/sunken appearance
 *
 * Uses box-shadow: inset to create the illusion of being carved into the surface.
 * Follows the 135° light source convention.
 */
export const InsetField = forwardRef<HTMLInputElement, InsetFieldProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helperId = `${id}-helper`;

    const containerClasses = [
      styles.container,
      fullWidth ? styles.fullWidth : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      styles.inputWrapper,
      styles[size],
      error ? styles.error : '',
      disabled ? styles.disabled : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <div className={wrapperClasses}>
          {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
          <input
            ref={ref}
            id={id}
            className={styles.input}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={helperText || error ? helperId : undefined}
            {...props}
          />
          {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
        </div>
        {(helperText || error) && (
          <span
            id={helperId}
            className={`${styles.helperText} ${error ? styles.errorText : ''}`}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

InsetField.displayName = 'InsetField';
