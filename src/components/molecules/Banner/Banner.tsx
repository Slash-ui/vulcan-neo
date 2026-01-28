import React, { forwardRef, useState } from 'react';
import { Button } from '../../atoms/Button';
import { IconButton } from '../../atoms/IconButton';
import styles from './Banner.module.css';

export type BannerVariant = 'info' | 'success' | 'warning' | 'error' | 'primary' | 'gradient';
export type BannerPosition = 'top' | 'bottom' | 'inline';

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Banner variant
   * @default 'info'
   */
  variant?: BannerVariant;
  /**
   * Banner position
   * @default 'inline'
   */
  position?: BannerPosition;
  /**
   * Banner content/message
   */
  children: React.ReactNode;
  /**
   * CTA button text
   */
  ctaText?: string;
  /**
   * CTA button click handler
   */
  onCtaClick?: () => void;
  /**
   * CTA link URL (alternative to onCtaClick)
   */
  ctaHref?: string;
  /**
   * Show close button
   * @default false
   */
  dismissible?: boolean;
  /**
   * Close button click handler
   */
  onDismiss?: () => void;
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
}

/**
 * Banner - Marketing announcement banner component
 */
export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      variant = 'info',
      position = 'inline',
      children,
      ctaText,
      onCtaClick,
      ctaHref,
      dismissible = false,
      onDismiss,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const handleDismiss = () => {
      setVisible(false);
      onDismiss?.();
    };

    const classNames = [
      styles.banner,
      styles[variant],
      styles[`position-${position}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const renderCta = () => {
      if (!ctaText) return null;

      if (ctaHref) {
        return (
          <a href={ctaHref} className={styles.ctaLink}>
            {ctaText}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 8H13M9 4L13 8L9 12" />
            </svg>
          </a>
        );
      }

      return (
        <Button
          variant="flat"
          size="sm"
          onClick={onCtaClick}
          className={styles.ctaButton}
        >
          {ctaText}
        </Button>
      );
    };

    return (
      <div ref={ref} className={classNames} role="banner" {...props}>
        <div className={styles.container}>
          <div className={styles.content}>
            {icon && <span className={styles.icon}>{icon}</span>}
            <p className={styles.message}>{children}</p>
          </div>
          <div className={styles.actions}>
            {renderCta()}
            {dismissible && (
              <IconButton
                variant="flat"
                size="sm"
                onClick={handleDismiss}
                className={styles.closeButton}
                aria-label="Dismiss banner"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </IconButton>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Banner.displayName = 'Banner';
