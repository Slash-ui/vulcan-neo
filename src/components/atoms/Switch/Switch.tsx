import React, { forwardRef, useId } from 'react';
import { Check, X } from 'lucide-react';
import { Typography } from '../../foundation/Typography';
import { hexToRgb, lightenColor, darkenColor } from '../../../utils/color';
import styles from './Switch.module.css';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * The label for the switch
   */
  label?: string;
  /**
   * The size of the switch
   * @default 'sm'
   */
  size?: SwitchSize;
  /**
   * Position of the label relative to the switch
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
  /**
   * Whether to show icons inside the switch
   * @default false
   */
  showIcons?: boolean;
  /**
   * Custom icon for checked state (defaults to Check icon)
   */
  checkedIcon?: React.ReactNode;
  /**
   * Custom icon for unchecked state (defaults to X icon)
   */
  uncheckedIcon?: React.ReactNode;
  /**
   * Color for the checked/on state
   * @default 'success'
   */
  checkedColor?: SwitchColor;
  /**
   * Color for the unchecked/off state
   * @default 'info'
   */
  uncheckedColor?: SwitchColor;
  /**
   * Custom hex color for checked state (overrides checkedColor)
   */
  customCheckedColor?: string;
  /**
   * Custom hex color for unchecked state (overrides uncheckedColor)
   */
  customUncheckedColor?: string;
}

const iconSizes: Record<SwitchSize, number> = {
  sm: 12,
  md: 16,
  lg: 20,
};

/**
 * Switch - Neomorphic toggle switch
 *
 * A pill-shaped track with check/x icons and a convex (popped out) thumb button.
 * Customizable colors for checked and unchecked states.
 */

// Generate gradient styles for custom colors
const generateGradientStyle = (hexColor: string) => {
  const lightColor = lightenColor(hexColor, 0.2);
  const darkColor = darkenColor(hexColor, 0.15);
  const { r, g, b } = hexToRgb(hexColor);
  return {
    gradient: `linear-gradient(135deg, ${lightColor} 0%, rgb(${r}, ${g}, ${b}) 50%, ${darkColor} 100%)`,
    iconColor: darkColor,
  };
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      size = 'sm',
      labelPosition = 'right',
      showIcons = false,
      checkedIcon,
      uncheckedIcon,
      checkedColor = 'success',
      uncheckedColor = 'info',
      customCheckedColor,
      customUncheckedColor,
      className,
      disabled,
      id: providedId,
      style,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const iconSize = iconSizes[size];

    const containerClasses = [
      styles.container,
      styles[labelPosition],
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const switchClasses = [
      styles.switch,
      styles[size],
      // Add color classes only when not using custom colors
      !customCheckedColor ? styles[`checked-${checkedColor}`] : '',
      !customUncheckedColor ? styles[`unchecked-${uncheckedColor}`] : '',
    ]
      .filter(Boolean)
      .join(' ');

    // Default icons
    const defaultCheckedIcon = <Check size={iconSize} strokeWidth={3} />;
    const defaultUncheckedIcon = <X size={iconSize} strokeWidth={3} />;

    // Build custom style object for custom colors (with CSS custom properties)
    const customStyles = {
      ...style,
      ...(customCheckedColor && {
        '--switch-checked-gradient': generateGradientStyle(customCheckedColor).gradient,
        '--switch-checked-icon-color': generateGradientStyle(customCheckedColor).iconColor,
      }),
      ...(customUncheckedColor && {
        '--switch-unchecked-gradient': generateGradientStyle(customUncheckedColor).gradient,
        '--switch-unchecked-icon-color': generateGradientStyle(customUncheckedColor).iconColor,
      }),
    } as React.CSSProperties;

    const useCustomColors = customCheckedColor || customUncheckedColor;

    return (
      <label htmlFor={id} className={containerClasses} style={customStyles}>
        {label && labelPosition === 'left' && (
          <Typography variant="body2" component="span" className={styles.label}>
            {label}
          </Typography>
        )}
        <div className={`${switchClasses} ${useCustomColors ? styles.customColors : ''}`}>
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
            {showIcons && (
              <span className={styles.iconCheck}>
                {checkedIcon ?? defaultCheckedIcon}
              </span>
            )}
            <span className={styles.thumb} />
            {showIcons && (
              <span className={styles.iconX}>
                {uncheckedIcon ?? defaultUncheckedIcon}
              </span>
            )}
          </span>
        </div>
        {label && labelPosition === 'right' && (
          <Typography variant="body2" component="span" className={styles.label}>
            {label}
          </Typography>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
