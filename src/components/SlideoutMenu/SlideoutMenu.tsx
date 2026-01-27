import React, { forwardRef, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './SlideoutMenu.module.css';

export type SlideoutPosition = 'left' | 'right';
export type SlideoutSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface SlideoutMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Whether the slideout is open
   */
  open: boolean;
  /**
   * Callback when slideout should close
   */
  onClose: () => void;
  /**
   * Position of the slideout
   * @default 'right'
   */
  position?: SlideoutPosition;
  /**
   * Size of the slideout
   * @default 'md'
   */
  size?: SlideoutSize;
  /**
   * Title of the slideout
   */
  title?: React.ReactNode;
  /**
   * Description text
   */
  description?: React.ReactNode;
  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Whether clicking overlay closes slideout
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether pressing Escape closes slideout
   * @default true
   */
  closeOnEscape?: boolean;
  /**
   * Footer content
   */
  footer?: React.ReactNode;
  /**
   * Portal container element
   */
  container?: Element;
}

/**
 * SlideoutMenu - Neomorphic slideout/drawer panel component
 */
export const SlideoutMenu = forwardRef<HTMLDivElement, SlideoutMenuProps>(
  (
    {
      open,
      onClose,
      position = 'right',
      size = 'md',
      title,
      description,
      showCloseButton = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      footer,
      container,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const slideoutRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<Element | null>(null);

    // Handle escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, closeOnEscape, onClose]);

    // Focus management
    useEffect(() => {
      if (open) {
        previousActiveElement.current = document.activeElement;
        slideoutRef.current?.focus();
      } else {
        (previousActiveElement.current as HTMLElement)?.focus();
      }
    }, [open]);

    // Lock body scroll
    useEffect(() => {
      if (open) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [open]);

    if (!open) return null;

    const handleOverlayClick = (event: React.MouseEvent) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    const CloseIcon = () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );

    const slideoutContent = (
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div
          ref={slideoutRef}
          className={`${styles.slideout} ${styles[position]} ${styles[size]} ${className || ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'slideout-title' : undefined}
          tabIndex={-1}
          {...props}
        >
          {(title || showCloseButton) && (
            <div className={styles.header}>
              <div className={styles.headerContent}>
                {title && (
                  <h2 id="slideout-title" className={styles.title}>
                    {title}
                  </h2>
                )}
                {description && (
                  <p className={styles.description}>{description}</p>
                )}
              </div>
              {showCloseButton && (
                <button
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="Close panel"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          )}

          <div className={styles.content}>{children}</div>

          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    );

    return createPortal(slideoutContent, container || document.body);
  }
);

SlideoutMenu.displayName = 'SlideoutMenu';
