import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { Typography } from '../../foundation/Typography';
import { Calendar } from '../Calendar';
import styles from './DatePicker.module.css';

export type DatePickerSize = 'sm' | 'md' | 'lg';

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Selected date
   */
  value?: Date | null;
  /**
   * Callback when date is selected
   */
  onChange?: (date: Date | null) => void;
  /**
   * Placeholder text
   * @default 'Select a date'
   */
  placeholder?: string;
  /**
   * Size variant
   * @default 'md'
   */
  size?: DatePickerSize;
  /**
   * Label text
   */
  label?: string;
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Error message
   */
  errorMessage?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Date format function
   */
  formatDate?: (date: Date) => string;
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  /**
   * Whether the picker can be cleared
   * @default true
   */
  clearable?: boolean;
}

const defaultFormatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * DatePicker - Neomorphic date picker component
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Select a date',
      size = 'md',
      label,
      error = false,
      errorMessage,
      disabled = false,
      formatDate = defaultFormatDate,
      minDate,
      maxDate,
      clearable = true,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    // Close on escape
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }
    }, [isOpen]);

    const handleSelect = (date: Date) => {
      onChange?.(date);
      setIsOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(null);
    };

    const classNames = [
      styles.datePicker,
      styles[size],
      error ? styles.error : '',
      disabled ? styles.disabled : '',
      isOpen ? styles.open : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const CalendarIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    );

    const ClearIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );

    return (
      <div ref={containerRef} className={classNames}>
        {label && <Typography component="label" variant="body2" className={styles.label}>{label}</Typography>}

        <div
          ref={ref}
          className={styles.inputWrapper}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (!disabled) {
                setIsOpen(!isOpen);
              }
            }
          }}
          {...props}
        >
          <span className={styles.icon}>
            <CalendarIcon />
          </span>
          <span className={`${styles.value} ${!value ? styles.placeholder : ''}`}>
            {value ? formatDate(value) : placeholder}
          </span>
          {clearable && value && !disabled && (
            <button
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="Clear date"
            >
              <ClearIcon />
            </button>
          )}
        </div>

        {errorMessage && <Typography variant="caption" color="error" className={styles.errorMessage}>{errorMessage}</Typography>}

        {isOpen && (
          <div className={styles.dropdown}>
            <Calendar
              value={value}
              onChange={handleSelect}
              minDate={minDate}
              maxDate={maxDate}
              size={size}
            />
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
