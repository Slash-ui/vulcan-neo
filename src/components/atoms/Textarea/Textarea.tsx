import React, { forwardRef, useId } from 'react';
import { Typography } from '../../foundation/Typography';
import styles from './Textarea.module.css';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> {
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
 * Includes animated border effect on hover and focus.
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
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      styles.textareaWrapper,
      styles[size],
      error ? styles.error : '',
      disabled ? styles.wrapperDisabled : '',
    ]
      .filter(Boolean)
      .join(' ');

    const textareaClasses = [styles.textarea, styles[`resize-${resize}`]].join(
      ' '
    );

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={id}>
            <Typography
              variant="body2"
              component="label"
              className={styles.label}
            >
              {label}
            </Typography>
          </label>
        )}
        <div className={wrapperClasses}>
          <textarea
            ref={ref}
            id={id}
            className={textareaClasses}
            disabled={disabled}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            aria-invalid={error ? true : undefined}
            {...props}
          />
        </div>
        {error && (
          <Typography
            variant="caption"
            component="span"
            id={errorId}
            className={styles.errorText}
          >
            {error}
          </Typography>
        )}
        {!error && helperText && (
          <Typography
            variant="caption"
            component="span"
            id={helperId}
            className={styles.helperText}
          >
            {helperText}
          </Typography>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
