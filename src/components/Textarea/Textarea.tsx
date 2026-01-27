import React, { forwardRef, useId } from 'react';
import styles from './Textarea.module.css';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /**
   * Label for the textarea
   */
  label?: string;
  /**
   * Helper text displayed below the textarea
   */
  helperText?: string;
  /**
   * Error message (shows error state when provided)
   */
  error?: string;
  /**
   * The size of the textarea
   * @default 'md'
   */
  size?: TextareaSize;
  /**
   * Whether the textarea is resizable
   * @default 'vertical'
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

/**
 * Textarea - Neomorphic multi-line text input with concave inset styling
 *
 * Features a sunken (concave) appearance to indicate an input area.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      resize = 'vertical',
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
    const errorId = `${id}-error`;

    const containerClasses = [
      styles.container,
      disabled ? styles.disabled : '',
      error ? styles.error : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const textareaClasses = [
      styles.textarea,
      styles[size],
      styles[`resize-${resize}`],
    ].join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={textareaClasses}
          disabled={disabled}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          aria-invalid={error ? true : undefined}
          {...props}
        />
        {error && (
          <span id={errorId} className={styles.errorText}>
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={helperId} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
