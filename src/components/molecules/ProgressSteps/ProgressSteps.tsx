import React, { forwardRef } from 'react';
import { Typography } from '../../foundation/Typography';
import styles from './ProgressSteps.module.css';

export type ProgressStepsSize = 'sm' | 'md' | 'lg';
export type ProgressStepsOrientation = 'horizontal' | 'vertical';

export interface Step {
  id: string | number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface ProgressStepsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Array of steps
   */
  steps: Step[];
  /**
   * Current active step index (0-based)
   */
  currentStep: number;
  /**
   * Callback when step is clicked
   */
  onStepClick?: (stepIndex: number) => void;
  /**
   * Size variant
   * @default 'md'
   */
  size?: ProgressStepsSize;
  /**
   * Orientation
   * @default 'horizontal'
   */
  orientation?: ProgressStepsOrientation;
  /**
   * Whether steps are clickable
   * @default false
   */
  clickable?: boolean;
  /**
   * Show check icon for completed steps
   * @default true
   */
  showCheckIcon?: boolean;
}

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/**
 * ProgressSteps - Neomorphic step indicator / progress tracker component
 */
export const ProgressSteps = forwardRef<HTMLDivElement, ProgressStepsProps>(
  (
    {
      steps,
      currentStep,
      onStepClick,
      size = 'md',
      orientation = 'horizontal',
      clickable = false,
      showCheckIcon = true,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.progressSteps,
      styles[size],
      styles[orientation],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const getStepStatus = (index: number): 'completed' | 'current' | 'upcoming' => {
      if (index < currentStep) return 'completed';
      if (index === currentStep) return 'current';
      return 'upcoming';
    };

    const handleStepClick = (index: number) => {
      if (clickable && onStepClick) {
        onStepClick(index);
      }
    };

    return (
      <div ref={ref} className={classNames} {...props}>
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.id}
              className={`${styles.step} ${styles[status]}`}
            >
              <button
                className={`${styles.stepButton} ${clickable ? styles.clickable : ''}`}
                onClick={() => handleStepClick(index)}
                disabled={!clickable}
                aria-current={status === 'current' ? 'step' : undefined}
              >
                <span className={styles.stepIndicator}>
                  {status === 'completed' && showCheckIcon ? (
                    <CheckIcon />
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    <span className={styles.stepNumber}>{index + 1}</span>
                  )}
                </span>
                <span className={styles.stepContent}>
                  <Typography variant="body2" className={styles.stepLabel}>{step.label}</Typography>
                  {step.description && (
                    <Typography variant="caption" color="secondary" className={styles.stepDescription}>{step.description}</Typography>
                  )}
                </span>
              </button>

              {!isLast && <div className={styles.connector} />}
            </div>
          );
        })}
      </div>
    );
  }
);

ProgressSteps.displayName = 'ProgressSteps';
