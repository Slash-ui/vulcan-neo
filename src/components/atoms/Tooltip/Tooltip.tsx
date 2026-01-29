import React, {
  forwardRef,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { Typography } from '../../foundation/Typography';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'content'
> {
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

interface Position {
  top: number;
  left: number;
  arrowLeft?: number;
  arrowTop?: number;
  actualPlacement: TooltipPlacement;
}

/**
 * Tooltip - Neomorphic tooltip popover
 *
 * Displays helpful information on hover with smooth neomorphic styling.
 * Uses a portal to render at document.body level to avoid z-index and overflow issues.
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
    const [position, setPosition] = useState<Position | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Detect theme from nearest Surface ancestor
    useEffect(() => {
      if (triggerRef.current) {
        const surface = triggerRef.current.closest('[data-theme]');
        if (surface) {
          const detectedTheme = surface.getAttribute('data-theme') as 'light' | 'dark';
          if (detectedTheme) {
            setTheme(detectedTheme);
          }
        }
      }
    }, []);

    const calculatePosition = useCallback(() => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const scaledTooltipRect = tooltipRef.current.getBoundingClientRect();

      // The tooltip is measured at INITIAL_SCALE (matches CSS transform: scale(0.8))
      // We need to calculate true dimensions at scale(1)
      const INITIAL_SCALE = 0.8;
      const tooltipWidth = scaledTooltipRect.width / INITIAL_SCALE;
      const tooltipHeight = scaledTooltipRect.height / INITIAL_SCALE;

      const gap = 10;
      const viewportPadding = 8;

      let top = 0;
      let left = 0;
      let actualPlacement = placement;

      // Calculate initial position based on placement using true dimensions
      switch (placement) {
        case 'top':
          top = triggerRect.top - tooltipHeight - gap;
          left = triggerRect.left + (triggerRect.width - tooltipWidth) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + gap;
          left = triggerRect.left + (triggerRect.width - tooltipWidth) / 2;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipHeight) / 2;
          left = triggerRect.left - tooltipWidth - gap;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipHeight) / 2;
          left = triggerRect.right + gap;
          break;
      }

      // Flip placement if tooltip goes out of viewport
      if (placement === 'top' && top < viewportPadding) {
        top = triggerRect.bottom + gap;
        actualPlacement = 'bottom';
      } else if (
        placement === 'bottom' &&
        top + tooltipHeight > window.innerHeight - viewportPadding
      ) {
        top = triggerRect.top - tooltipHeight - gap;
        actualPlacement = 'top';
      } else if (placement === 'left' && left < viewportPadding) {
        left = triggerRect.right + gap;
        actualPlacement = 'right';
      } else if (
        placement === 'right' &&
        left + tooltipWidth > window.innerWidth - viewportPadding
      ) {
        left = triggerRect.left - tooltipWidth - gap;
        actualPlacement = 'left';
      }

      // Calculate arrow position (center of trigger relative to tooltip)
      let arrowLeft: number | undefined;
      let arrowTop: number | undefined;

      // Constrain tooltip to viewport and calculate arrow offset
      if (actualPlacement === 'top' || actualPlacement === 'bottom') {
        const triggerCenterX = triggerRect.left + triggerRect.width / 2;

        // Constrain horizontal position
        left = Math.max(
          viewportPadding,
          Math.min(left, window.innerWidth - tooltipWidth - viewportPadding)
        );

        // Arrow should point to trigger center
        arrowLeft = triggerCenterX - left;
        // Clamp arrow position within tooltip bounds (with padding)
        arrowLeft = Math.max(16, Math.min(arrowLeft, tooltipWidth - 16));
      } else {
        const triggerCenterY = triggerRect.top + triggerRect.height / 2;

        // Constrain vertical position
        top = Math.max(
          viewportPadding,
          Math.min(top, window.innerHeight - tooltipHeight - viewportPadding)
        );

        // Arrow should point to trigger center
        arrowTop = triggerCenterY - top;
        // Clamp arrow position within tooltip bounds (with padding)
        arrowTop = Math.max(16, Math.min(arrowTop, tooltipHeight - 16));
      }

      setPosition({ top, left, arrowLeft, arrowTop, actualPlacement });
    }, [placement]);

    // Use useLayoutEffect for synchronous measurement before paint
    useLayoutEffect(() => {
      if (isVisible) {
        calculatePosition();
      } else {
        setPosition(null);
      }
    }, [isVisible, calculatePosition]);

    // Handle scroll and resize
    useEffect(() => {
      if (isVisible) {
        const handleUpdate = () => calculatePosition();
        window.addEventListener('scroll', handleUpdate, true);
        window.addEventListener('resize', handleUpdate);
        return () => {
          window.removeEventListener('scroll', handleUpdate, true);
          window.removeEventListener('resize', handleUpdate);
        };
      }
    }, [isVisible, calculatePosition]);

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

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

    const containerClasses = [styles.container, className || '']
      .filter(Boolean)
      .join(' ');

    const tooltipClasses = [
      styles.tooltip,
      position ? styles[position.actualPlacement] : styles[placement],
      position ? styles.visible : '',
    ]
      .filter(Boolean)
      .join(' ');

    // Determine if content is simple text or rich content
    const isSimpleContent =
      typeof content === 'string' || typeof content === 'number';

    // Arrow styles for dynamic positioning
    const arrowStyle: React.CSSProperties = {};
    if (position) {
      if (position.arrowLeft !== undefined) {
        arrowStyle.left = position.arrowLeft;
        arrowStyle.marginLeft = -6; // Half of arrow width
      }
      if (position.arrowTop !== undefined) {
        arrowStyle.top = position.arrowTop;
        arrowStyle.marginTop = -6; // Half of arrow height
      }
    }

    const tooltipElement = (
      <div
        ref={tooltipRef}
        className={tooltipClasses}
        style={
          position
            ? {
                top: position.top,
                left: position.left,
              }
            : {
                top: -9999,
                left: -9999,
              }
        }
        role="tooltip"
        aria-hidden={!isVisible}
        data-theme={theme}
      >
        <div className={styles.content}>
          {isSimpleContent ? (
            <Typography variant="caption" component="span">
              {content}
            </Typography>
          ) : (
            content
          )}
        </div>
        <span
          className={styles.arrow}
          style={
            position?.arrowLeft !== undefined ||
            position?.arrowTop !== undefined
              ? arrowStyle
              : undefined
          }
        />
      </div>
    );

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
        {isVisible && createPortal(tooltipElement, document.body)}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
