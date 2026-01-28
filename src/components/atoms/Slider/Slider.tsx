import React, { forwardRef, useId, useState, useCallback, useRef, useEffect } from 'react';
import styles from './Slider.module.css';

export type SliderSize = 'sm' | 'md' | 'lg';

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Label for the slider
   */
  label?: string;
  /**
   * Minimum value
   * @default 0
   */
  min?: number;
  /**
   * Maximum value
   * @default 100
   */
  max?: number;
  /**
   * Step increment
   * @default 1
   */
  step?: number;
  /**
   * Current value (controlled)
   */
  value?: number;
  /**
   * Default value (uncontrolled)
   * @default 50
   */
  defaultValue?: number;
  /**
   * Callback when value changes
   */
  onChange?: (value: number) => void;
  /**
   * The size of the slider
   * @default 'md'
   */
  size?: SliderSize;
  /**
   * Whether to show value label
   * @default false
   */
  showValue?: boolean;
  /**
   * Format function for the value label
   */
  formatValue?: (value: number) => string;
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
}

/**
 * Slider - Neomorphic range slider with convex thumb
 *
 * Concave track with a convex (elevated) draggable thumb.
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      label,
      min = 0,
      max = 100,
      step = 1,
      value: controlledValue,
      defaultValue = 50,
      onChange,
      size = 'md',
      showValue = false,
      formatValue = (v) => String(v),
      disabled = false,
      className,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;

    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const percentage = ((currentValue - min) / (max - min)) * 100;

    const updateValue = useCallback((clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, x / rect.width));
      const rawValue = min + ratio * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      if (controlledValue === undefined) {
        setInternalValue(clampedValue);
      }
      onChange?.(clampedValue);
    }, [min, max, step, controlledValue, onChange]);

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(true);
      updateValue(e.clientX);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      if (disabled) return;
      setIsDragging(true);
      updateValue(e.touches[0].clientX);
    };

    useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        updateValue(e.clientX);
      };

      const handleTouchMove = (e: TouchEvent) => {
        updateValue(e.touches[0].clientX);
      };

      const handleEnd = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }, [isDragging, updateValue]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      let newValue = currentValue;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = Math.min(max, currentValue + step);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = Math.max(min, currentValue - step);
          break;
        case 'Home':
          newValue = min;
          break;
        case 'End':
          newValue = max;
          break;
        default:
          return;
      }

      e.preventDefault();
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const containerClasses = [
      styles.container,
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const sliderClasses = [
      styles.slider,
      styles[size],
      isDragging ? styles.dragging : '',
    ].join(' ');

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {(label || showValue) && (
          <div className={styles.header}>
            {label && <label htmlFor={id} className={styles.label}>{label}</label>}
            {showValue && <span className={styles.value}>{formatValue(currentValue)}</span>}
          </div>
        )}
        <div
          ref={trackRef}
          className={sliderClasses}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div
            role="slider"
            tabIndex={disabled ? -1 : 0}
            id={id}
            className={styles.thumb}
            style={{ left: `${percentage}%` }}
            onKeyDown={handleKeyDown}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-disabled={disabled}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
