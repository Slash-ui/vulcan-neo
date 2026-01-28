import React, { forwardRef } from 'react';
import { Button } from '../Button';
import styles from './CTASection.module.css';

export type CTASectionVariant = 'simple' | 'split' | 'card' | 'full-width';

export interface CTASectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Variant style
   * @default 'simple'
   */
  variant?: CTASectionVariant;
  /**
   * Main title
   */
  title: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Primary CTA text
   */
  primaryCtaText: string;
  /**
   * Primary CTA click handler
   */
  onPrimaryCtaClick?: () => void;
  /**
   * Secondary CTA text
   */
  secondaryCtaText?: string;
  /**
   * Secondary CTA click handler
   */
  onSecondaryCtaClick?: () => void;
  /**
   * Image URL (for split variant)
   */
  image?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Background color
   * @default 'default'
   */
  background?: 'default' | 'primary' | 'gradient';
}

/**
 * CTASection - Marketing call-to-action section
 */
export const CTASection = forwardRef<HTMLElement, CTASectionProps>(
  (
    {
      variant = 'simple',
      title,
      description,
      primaryCtaText,
      onPrimaryCtaClick,
      secondaryCtaText,
      onSecondaryCtaClick,
      image,
      imageAlt = 'CTA image',
      background = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.cta,
      styles[variant],
      styles[`bg-${background}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const isPrimaryBg = background === 'primary' || background === 'gradient';

    return (
      <section ref={ref} className={classNames} {...props}>
        <div className={styles.container}>
          {variant === 'split' && image && (
            <div className={styles.imageWrapper}>
              <img src={image} alt={imageAlt} className={styles.image} />
            </div>
          )}
          <div className={styles.content}>
            <h2 className={styles.title}>{title}</h2>
            {description && <p className={styles.description}>{description}</p>}
            <div className={styles.actions}>
              <Button
                variant={isPrimaryBg ? 'flat' : 'convex'}
                size="lg"
                onClick={onPrimaryCtaClick}
              >
                {primaryCtaText}
              </Button>
              {secondaryCtaText && (
                <Button
                  variant="flat"
                  size="lg"
                  onClick={onSecondaryCtaClick}
                  className={isPrimaryBg ? styles.secondaryBtnLight : ''}
                >
                  {secondaryCtaText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

CTASection.displayName = 'CTASection';
