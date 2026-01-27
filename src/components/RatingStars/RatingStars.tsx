import React, { forwardRef, useState, useCallback } from 'react';
import styles from './RatingStars.module.css';

export type RatingStarsSize = 'sm' | 'md' | 'lg';

export interface RatingStarsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Current rating value (0-5)
   */
  value?: number;
  /**
   * Default value (uncontrolled)
   * @default 0
   */
  defaultValue?: number;
  /**
   * Callback when rating changes
   */
  onChange?: (value: number) => void;
  /**
   * Maximum rating value
   * @default 5
   */
  max?: number;
  /**
   * Size of the stars
   * @default 'md'
   */
  size?: RatingStarsSize;
  /**
   * Whether the rating is read-only
   * @default false
   */
  readOnly?: boolean;
  /**
   * Whether to allow half-star ratings
   * @default false
   */
  allowHalf?: boolean;
  /**
   * Whether to show the rating value
   * @default false
   */
  showValue?: boolean;
  /**
   * Color of the filled stars
   * @default 'warning'
   */
  color?: 'default' | 'warning' | 'primary';
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
}

/**
 * RatingStars - Neomorphic star rating display/input
 *
 * Interactive star rating with convex filled stars.
 */
export const RatingStars = forwardRef<HTMLDivElement, RatingStarsProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      onChange,
      max = 5,
      size = 'md',
      readOnly = false,
      allowHalf = false,
      showValue = false,
      color = 'warning',
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
    const displayValue = hoverValue !== null ? hoverValue : currentValue;

    const handleClick = useCallback((starValue: number) => {
      if (readOnly || disabled) return;

      const newValue = starValue === currentValue ? 0 : starValue;

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }, [currentValue, controlledValue, onChange, readOnly, disabled]);

    const handleMouseEnter = useCallback((starValue: number) => {
      if (readOnly || disabled) return;
      setHoverValue(starValue);
    }, [readOnly, disabled]);

    const handleMouseLeave = useCallback(() => {
      setHoverValue(null);
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent, starIndex: number) => {
      if (readOnly || disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleClick(starIndex + 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleClick(Math.min(max, currentValue + (allowHalf ? 0.5 : 1)));
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleClick(Math.max(0, currentValue - (allowHalf ? 0.5 : 1)));
          break;
      }
    }, [readOnly, disabled, handleClick, max, currentValue, allowHalf]);

    const containerClasses = [
      styles.container,
      disabled ? styles.disabled : '',
      readOnly ? styles.readOnly : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const starsClasses = [
      styles.stars,
      styles[size],
    ].join(' ');

    return (
      <div ref={ref} className={containerClasses} {...props}>
        <div
          className={starsClasses}
          onMouseLeave={handleMouseLeave}
          role="radiogroup"
          aria-label="Rating"
        >
          {Array.from({ length: max }).map((_, index) => {
            const starValue = index + 1;
            const isFilled = displayValue >= starValue;
            const isHalfFilled = allowHalf && displayValue >= starValue - 0.5 && displayValue < starValue;

            return (
              <button
                key={index}
                type="button"
                className={[
                  styles.star,
                  styles[`color-${color}`],
                  isFilled ? styles.filled : '',
                  isHalfFilled ? styles.half : '',
                ].filter(Boolean).join(' ')}
                onClick={() => handleClick(starValue)}
                onMouseEnter={() => handleMouseEnter(starValue)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={disabled || readOnly}
                role="radio"
                aria-checked={currentValue === starValue}
                aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
                tabIndex={readOnly || disabled ? -1 : 0}
              >
                <svg
                  className={styles.starIcon}
                  viewBox="0 0 24 24"
                  fill={isFilled || isHalfFilled ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {isHalfFilled ? (
                    <>
                      <defs>
                        <linearGradient id={`half-${index}`}>
                          <stop offset="50%" stopColor="currentColor" />
                          <stop offset="50%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                      <path
                        fill={`url(#half-${index})`}
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      />
                    </>
                  ) : (
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  )}
                </svg>
              </button>
            );
          })}
        </div>
        {showValue && (
          <span className={styles.value}>
            {currentValue.toFixed(allowHalf ? 1 : 0)} / {max}
          </span>
        )}
      </div>
    );
  }
);

RatingStars.displayName = 'RatingStars';
