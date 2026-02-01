import React, { forwardRef, useId, useState, useRef, useEffect } from 'react';
import { Typography } from '../../foundation/Typography';
import styles from './Select.module.css';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Label for the select
   */
  label?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Options to display
   */
  options: SelectOption[];
  /**
   * Currently selected value
   */
  value?: string;
  /**
   * Default selected value (uncontrolled)
   */
  defaultValue?: string;
  /**
   * Callback when selection changes
   */
  onChange?: (value: string) => void;
  /**
   * The size of the select
   * @default 'md'
   */
  size?: SelectSize;
  /**
   * Error message (shows error state when provided)
   */
  error?: string;
  /**
   * Helper text displayed below the select
   */
  helperText?: string;
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  /**
   * Full width
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Select - Neomorphic dropdown select input
 *
 * Convex trigger that opens a list of options with smooth neomorphic styling.
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      placeholder = 'Select an option',
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      size = 'md',
      error,
      helperText,
      disabled = false,
      fullWidth = false,
      className,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;

    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

    const triggerRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === currentValue);

    const handleSelect = (optionValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(optionValue);
      }
      onChange?.(optionValue);
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          setIsOpen(!isOpen);
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          }
          break;
      }
    };

    // Close on outside click
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const containerClasses = [
      styles.container,
      fullWidth ? styles.fullWidth : '',
      disabled ? styles.disabled : '',
      error ? styles.error : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const triggerClasses = [
      styles.trigger,
      styles[size],
      isOpen ? styles.open : '',
    ].join(' ');

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {label && <Typography component="label" variant="body2" className={styles.label}>{label}</Typography>}
        <div ref={containerRef} className={styles.selectWrapper}>
          <button
            ref={triggerRef}
            type="button"
            id={id}
            className={triggerClasses}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className={selectedOption ? styles.selectedText : styles.placeholder}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <svg
              className={styles.chevron}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {isOpen && (
            <ul
              ref={listRef}
              className={styles.list}
              role="listbox"
            >
              {options.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === currentValue}
                  aria-disabled={option.disabled}
                  className={[
                    styles.option,
                    option.value === currentValue ? styles.selected : '',
                    option.disabled ? styles.optionDisabled : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                >
                  {option.label}
                  {option.value === currentValue && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        {error && <Typography variant="caption" color="error" className={styles.errorText}>{error}</Typography>}
        {!error && helperText && <Typography variant="caption" color="secondary" className={styles.helperText}>{helperText}</Typography>}
      </div>
    );
  }
);

Select.displayName = 'Select';
