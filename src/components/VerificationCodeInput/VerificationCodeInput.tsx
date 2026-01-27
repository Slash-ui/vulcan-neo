import React, { forwardRef, useRef, useState, useCallback, useEffect } from 'react';
import styles from './VerificationCodeInput.module.css';

export type VerificationCodeInputSize = 'sm' | 'md' | 'lg';

export interface VerificationCodeInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Number of input boxes
   * @default 6
   */
  length?: number;
  /**
   * The size of the inputs
   * @default 'md'
   */
  size?: VerificationCodeInputSize;
  /**
   * Whether to auto-focus the first input on mount
   * @default true
   */
  autoFocus?: boolean;
  /**
   * Whether to mask the input (like password)
   * @default false
   */
  masked?: boolean;
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Callback when all digits are entered
   */
  onComplete?: (code: string) => void;
  /**
   * Callback when value changes
   */
  onChange?: (code: string) => void;
  /**
   * Controlled value
   */
  value?: string;
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
}

/**
 * VerificationCodeInput - Neomorphic OTP/verification code input
 *
 * Individual concave input boxes for each digit with auto-advance.
 */
export const VerificationCodeInput = forwardRef<HTMLDivElement, VerificationCodeInputProps>(
  (
    {
      length = 6,
      size = 'md',
      autoFocus = true,
      masked = false,
      error = false,
      onComplete,
      onChange,
      value: controlledValue,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [values, setValues] = useState<string[]>(
      controlledValue ? controlledValue.split('').slice(0, length) : Array(length).fill('')
    );
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Sync controlled value
    useEffect(() => {
      if (controlledValue !== undefined) {
        const newValues = controlledValue.split('').slice(0, length);
        while (newValues.length < length) {
          newValues.push('');
        }
        setValues(newValues);
      }
    }, [controlledValue, length]);

    const focusInput = useCallback((index: number) => {
      if (index >= 0 && index < length) {
        inputRefs.current[index]?.focus();
      }
    }, [length]);

    useEffect(() => {
      if (autoFocus && !disabled) {
        focusInput(0);
      }
    }, [autoFocus, disabled, focusInput]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const digit = inputValue.replace(/\D/g, '').slice(-1);

      const newValues = [...values];
      newValues[index] = digit;
      setValues(newValues);

      const code = newValues.join('');
      onChange?.(code);

      if (digit && index < length - 1) {
        focusInput(index + 1);
      }

      if (newValues.every(v => v !== '') && code.length === length) {
        onComplete?.(code);
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (values[index] === '' && index > 0) {
          focusInput(index - 1);
          const newValues = [...values];
          newValues[index - 1] = '';
          setValues(newValues);
          onChange?.(newValues.join(''));
        } else {
          const newValues = [...values];
          newValues[index] = '';
          setValues(newValues);
          onChange?.(newValues.join(''));
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        focusInput(index - 1);
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        focusInput(index + 1);
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
      const newValues = [...pastedData.split(''), ...Array(length - pastedData.length).fill('')].slice(0, length);
      setValues(newValues);
      onChange?.(newValues.join(''));

      const nextEmptyIndex = newValues.findIndex(v => v === '');
      focusInput(nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex);

      if (newValues.every(v => v !== '')) {
        onComplete?.(newValues.join(''));
      }
    };

    const containerClasses = [
      styles.container,
      error ? styles.error : '',
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type={masked ? 'password' : 'text'}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={values[index]}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={[styles.input, styles[size]].join(' ')}
            aria-label={`Digit ${index + 1} of ${length}`}
          />
        ))}
      </div>
    );
  }
);

VerificationCodeInput.displayName = 'VerificationCodeInput';
