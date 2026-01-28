import React, { forwardRef, useId } from 'react';
import styles from './Radio.module.css';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Label for the radio button
   */
  label?: string;
  /**
   * The size of the radio button
   * @default 'md'
   */
  size?: RadioSize;
  /**
   * Position of the label relative to the radio
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
}

/**
 * Radio - Neomorphic radio button with convex/concave states
 *
 * Unselected state is convex (raised), selected state is concave (pressed) with accent dot.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      size = 'md',
      labelPosition = 'right',
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

    const radioClasses = [styles.radio, styles[size]].join(' ');

    return (
      <label htmlFor={id} className={containerClasses}>
        {label && labelPosition === 'left' && (
          <span className={styles.label}>{label}</span>
        )}
        <div className={radioClasses}>
          <input
            ref={ref}
            id={id}
            type="radio"
            className={styles.input}
            disabled={disabled}
            {...props}
          />
          <span className={styles.circle}>
            <span className={styles.dot} />
          </span>
        </div>
        {label && labelPosition === 'right' && (
          <span className={styles.label}>{label}</span>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
