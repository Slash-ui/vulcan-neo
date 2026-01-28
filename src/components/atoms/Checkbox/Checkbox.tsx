import React, { forwardRef, useId } from 'react';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Label for the checkbox
   */
  label?: string;
  /**
   * The size of the checkbox
   * @default 'md'
   */
  size?: CheckboxSize;
  /**
   * Position of the label relative to the checkbox
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
  /**
   * Indeterminate state (neither checked nor unchecked)
   * @default false
   */
  indeterminate?: boolean;
}

/**
 * Checkbox - Neomorphic checkbox with convex/concave states
 *
 * Unchecked state is convex (raised), checked state is concave (pressed).
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = 'md',
      labelPosition = 'right',
      indeterminate = false,
      className,
      disabled,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;

    const containerClasses = [
      styles.container,
      styles[labelPosition],
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const checkboxClasses = [styles.checkbox, styles[size]].join(' ');

    // Handle indeterminate state via ref
    const handleRef = (el: HTMLInputElement | null) => {
      if (el) {
        el.indeterminate = indeterminate;
      }
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    };

    return (
      <label htmlFor={id} className={containerClasses}>
        {label && labelPosition === 'left' && (
          <span className={styles.label}>{label}</span>
        )}
        <div className={checkboxClasses}>
          <input
            ref={handleRef}
            id={id}
            type="checkbox"
            className={styles.input}
            disabled={disabled}
            {...props}
          />
          <span className={styles.box}>
            <svg
              className={styles.checkIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className={styles.indeterminateIcon} />
          </span>
        </div>
        {label && labelPosition === 'right' && (
          <span className={styles.label}>{label}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
