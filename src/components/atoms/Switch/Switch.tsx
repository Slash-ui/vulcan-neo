import React, { forwardRef, useId } from 'react';
import styles from './Switch.module.css';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * The label for the switch
   */
  label?: string;
  /**
   * The size of the switch
   * @default 'md'
   */
  size?: SwitchSize;
  /**
   * Position of the label relative to the switch
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
}

/**
 * Switch - Neomorphic toggle switch
 *
 * A pill-shaped concave track with a convex (popped out) thumb button.
 * The track is sunken, and the thumb appears elevated.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
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

    const switchClasses = [styles.switch, styles[size]].join(' ');

    return (
      <label htmlFor={id} className={containerClasses}>
        {label && labelPosition === 'left' && (
          <span className={styles.label}>{label}</span>
        )}
        <div className={switchClasses}>
          <input
            ref={ref}
            id={id}
            type="checkbox"
            role="switch"
            className={styles.input}
            disabled={disabled}
            {...props}
          />
          <span className={styles.track}>
            <span className={styles.thumb} />
          </span>
        </div>
        {label && labelPosition === 'right' && (
          <span className={styles.label}>{label}</span>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
