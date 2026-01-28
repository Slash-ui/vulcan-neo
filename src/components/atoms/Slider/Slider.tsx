import React, { forwardRef, useId, useState, useCallback, useRef, useEffect } from 'react';
import { Typography } from '../../foundation/Typography';
import { hexToRgb, lightenColor, darkenColor } from '../../../utils/color';
import styles from './Slider.module.css';

export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderVariant = 'default' | 'gradient' | 'glow';
export type SliderOrientation = 'horizontal' | 'vertical';
export type SliderColor =
  | 'default'
  | 'primary'
  | 'primary-light'
  | 'primary-dark'
  | 'secondary'
  | 'secondary-light'
  | 'secondary-dark'
  | 'tertiary'
  | 'tertiary-light'
  | 'tertiary-dark'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

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
   * Visual variant
   * - default: Simple elevated indicator
   * - gradient: Gradient fill
   * - glow: Glowing indicator
   * @default 'glow'
   */
  variant?: SliderVariant;
  /**
   * Slider orientation
   * @default 'horizontal'
   */
  orientation?: SliderOrientation;
  /**
   * The color of the slider fill
   * @default 'primary'
   */
  color?: SliderColor;
  /**
   * Custom color (hex value). Overrides the color prop.
   * @example "#FF5733" or "#F53"
   */
  customColor?: string;
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
      variant = 'glow',
      orientation = 'horizontal',
      color = 'primary',
      customColor,
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
    const isVertical = orientation === 'vertical';

    const updateValue = useCallback((clientX: number, clientY: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();

      let ratio: number;
      if (isVertical) {
        // For vertical, calculate from bottom (0) to top (100)
        const y = rect.bottom - clientY;
        ratio = Math.max(0, Math.min(1, y / rect.height));
      } else {
        const x = clientX - rect.left;
        ratio = Math.max(0, Math.min(1, x / rect.width));
      }

      const rawValue = min + ratio * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      if (controlledValue === undefined) {
        setInternalValue(clampedValue);
      }
      onChange?.(clampedValue);
    }, [min, max, step, controlledValue, onChange, isVertical]);

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(true);
      updateValue(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      if (disabled) return;
      setIsDragging(true);
      updateValue(e.touches[0].clientX, e.touches[0].clientY);
    };

    useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        updateValue(e.clientX, e.clientY);
      };

      const handleTouchMove = (e: TouchEvent) => {
        updateValue(e.touches[0].clientX, e.touches[0].clientY);
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
      styles[orientation],
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const colorClass = customColor ? 'color-custom' : `color-${color}`;
    const sliderClasses = [
      styles.slider,
      styles[size],
      styles[orientation],
      isDragging ? styles.dragging : '',
    ].join(' ');

    const fillClasses = [
      styles.fill,
      styles[variant],
      styles[colorClass],
    ].join(' ');

    // Generate custom style for customColor
    let fillStyle: React.CSSProperties = isVertical
      ? { height: `${percentage}%` }
      : { width: `${percentage}%` };

    if (customColor) {
      const rgb = hexToRgb(customColor);
      const lightColor = lightenColor(customColor, 0.3);
      const darkColor10 = darkenColor(customColor, 0.1);
      const darkColor20 = darkenColor(customColor, 0.2);

      if (isVertical) {
        fillStyle = {
          ...fillStyle,
          background: `linear-gradient(90deg, ${lightColor} 0%, ${customColor} 30%, ${darkColor10} 70%, ${darkColor20} 100%)`,
        };
      } else {
        fillStyle = {
          ...fillStyle,
          background: `linear-gradient(180deg, ${lightColor} 0%, ${customColor} 30%, ${darkColor10} 70%, ${darkColor20} 100%)`,
        };
      }

      if (variant === 'glow') {
        fillStyle.boxShadow = `
          0 4px 8px rgba(0, 0, 0, 0.25),
          0 2px 4px rgba(0, 0, 0, 0.15),
          0 0 16px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5),
          0 0 32px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3),
          inset 0 2px 4px rgba(255, 255, 255, 0.4),
          inset 0 -2px 4px rgba(0, 0, 0, 0.15)
        `;
      }
    }

    const thumbStyle: React.CSSProperties = isVertical
      ? { bottom: `${percentage}%` }
      : { left: `${percentage}%` };

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {(label || showValue) && (
          <div className={styles.header}>
            {label && (
              <Typography
                component="label"
                variant="body2"
                // @ts-expect-error - htmlFor is valid for label elements
                htmlFor={id}
                className={styles.label}
              >
                {label}
              </Typography>
            )}
            {showValue && (
              <Typography variant="body2" className={styles.value}>
                {formatValue(currentValue)}
              </Typography>
            )}
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
              className={fillClasses}
              style={fillStyle}
            />
          </div>
          <div
            role="slider"
            tabIndex={disabled ? -1 : 0}
            id={id}
            className={styles.thumb}
            style={thumbStyle}
            onKeyDown={handleKeyDown}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-disabled={disabled}
            aria-orientation={orientation}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
