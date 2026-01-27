import React, { forwardRef, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Whether the modal is open
   */
  open: boolean;
  /**
   * Callback when modal should close
   */
  onClose: () => void;
  /**
   * Modal title
   */
  title?: React.ReactNode;
  /**
   * Modal description
   */
  description?: React.ReactNode;
  /**
   * Size of the modal
   * @default 'md'
   */
  size?: ModalSize;
  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Whether clicking overlay closes modal
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether pressing Escape closes modal
   * @default true
   */
  closeOnEscape?: boolean;
  /**
   * Footer content (actions)
   */
  footer?: React.ReactNode;
  /**
   * Portal container element
   */
  container?: Element;
}

/**
 * Modal - Neomorphic modal dialog component
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      size = 'md',
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
    const modalRef = useRef<HTMLDivElement>(null);
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
        modalRef.current?.focus();
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

    const modalContent = (
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div
          ref={modalRef}
          className={`${styles.modal} ${styles[size]} ${className || ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
          tabIndex={-1}
          {...props}
        >
          {(title || showCloseButton) && (
            <div className={styles.header}>
              <div className={styles.headerContent}>
                {title && (
                  <h2 id="modal-title" className={styles.title}>
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="modal-description" className={styles.description}>
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="Close modal"
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

    return createPortal(modalContent, container || document.body);
  }
);

Modal.displayName = 'Modal';
