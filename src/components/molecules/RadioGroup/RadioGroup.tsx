import React, { forwardRef, createContext, useContext, useId } from 'react';
import styles from './RadioGroup.module.css';

export type RadioGroupSize = 'sm' | 'md' | 'lg';
export type RadioGroupOrientation = 'horizontal' | 'vertical';

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  size: RadioGroupSize;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Name attribute for the radio group
   */
  name?: string;
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
   * Label for the radio group
   */
  label?: string;
  /**
   * The size of the radio buttons
   * @default 'md'
   */
  size?: RadioGroupSize;
  /**
   * Orientation of the options
   * @default 'vertical'
   */
  orientation?: RadioGroupOrientation;
  /**
   * Whether all options are disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * RadioGroupItem children
   */
  children: React.ReactNode;
}

export interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Value of this option
   */
  value: string;
  /**
   * Label for the option
   */
  label: string;
  /**
   * Description text below the label
   */
  description?: string;
}

/**
 * RadioGroupItem - Individual radio option within a RadioGroup
 */
export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ value, label, description, className, disabled: itemDisabled, ...props }, ref) => {
    const context = useContext(RadioGroupContext);
    const generatedId = useId();

    if (!context) {
      throw new Error('RadioGroupItem must be used within a RadioGroup');
    }

    const { name, value: groupValue, onChange, size, disabled: groupDisabled } = context;
    const disabled = itemDisabled || groupDisabled;
    const isChecked = groupValue === value;

    const containerClasses = [
      styles.itemContainer,
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const radioClasses = [styles.radio, styles[size]].join(' ');

    return (
      <label htmlFor={generatedId} className={containerClasses}>
        <div className={radioClasses}>
          <input
            ref={ref}
            id={generatedId}
            type="radio"
            name={name}
            value={value}
            checked={isChecked}
            onChange={() => onChange?.(value)}
            className={styles.input}
            disabled={disabled}
            {...props}
          />
          <span className={styles.circle}>
            <span className={styles.dot} />
          </span>
        </div>
        <div className={styles.textContainer}>
          <span className={styles.label}>{label}</span>
          {description && <span className={styles.description}>{description}</span>}
        </div>
      </label>
    );
  }
);

RadioGroupItem.displayName = 'RadioGroupItem';

/**
 * RadioGroup - Neomorphic grouped radio buttons with context
 *
 * Provides shared name, value, and size context to RadioGroupItem children.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name: providedName,
      value,
      defaultValue,
      onChange,
      label,
      size = 'md',
      orientation = 'vertical',
      disabled = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const generatedName = useId();
    const name = providedName || generatedName;

    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const containerClasses = [
      styles.container,
      styles[orientation],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <RadioGroupContext.Provider
        value={{ name, value: currentValue, onChange: handleChange, size, disabled }}
      >
        <div ref={ref} role="radiogroup" className={containerClasses} {...props}>
          {label && <span className={styles.groupLabel}>{label}</span>}
          <div className={styles.options}>
            {children}
          </div>
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
