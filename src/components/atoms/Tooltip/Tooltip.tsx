import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * Tooltip content
   */
  content: React.ReactNode;
  /**
   * Placement of the tooltip
   * @default 'top'
   */
  placement?: TooltipPlacement;
  /**
   * Delay before showing tooltip (ms)
   * @default 200
   */
  delay?: number;
  /**
   * Whether tooltip is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Trigger element
   */
  children: React.ReactElement;
}

/**
 * Tooltip - Neomorphic tooltip popover
 *
 * Displays helpful information on hover with smooth neomorphic styling.
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      placement = 'top',
      delay = 200,
      disabled = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const calculatePosition = useCallback(() => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const gap = 8;

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - gap;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + gap;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - gap;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + gap;
          break;
      }

      // Keep tooltip in viewport
      const padding = 8;
      left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));
      top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding));

      setPosition({ top, left });
    }, [placement]);

    useEffect(() => {
      if (isVisible) {
        calculatePosition();
        window.addEventListener('scroll', calculatePosition);
        window.addEventListener('resize', calculatePosition);
        return () => {
          window.removeEventListener('scroll', calculatePosition);
          window.removeEventListener('resize', calculatePosition);
        };
      }
    }, [isVisible, calculatePosition]);

    const handleMouseEnter = () => {
      if (disabled) return;
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsVisible(false);
    };

    const handleFocus = () => {
      if (disabled) return;
      setIsVisible(true);
    };

    const handleBlur = () => {
      setIsVisible(false);
    };

    const containerClasses = [
      styles.container,
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const tooltipClasses = [
      styles.tooltip,
      styles[placement],
      isVisible ? styles.visible : '',
    ].join(' ');

    return (
      <div ref={ref} className={containerClasses} {...props}>
        <div
          ref={triggerRef}
          className={styles.trigger}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {children}
        </div>
        {isVisible && (
          <div
            ref={tooltipRef}
            className={tooltipClasses}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
            }}
            role="tooltip"
          >
            <div className={styles.content}>{content}</div>
            <span className={styles.arrow} />
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
