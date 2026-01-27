import React, { forwardRef } from 'react';
import { Button } from '../Button';
import styles from './HeroSection.module.css';

export type HeroSectionVariant = 'centered' | 'split' | 'image-background';
export type HeroSectionSize = 'sm' | 'md' | 'lg';

export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Variant style
   * @default 'centered'
   */
  variant?: HeroSectionVariant;
  /**
   * Size (padding)
   * @default 'md'
   */
  size?: HeroSectionSize;
  /**
   * Eyebrow/badge text
   */
  eyebrow?: React.ReactNode;
  /**
   * Main headline
   */
  title: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Primary CTA text
   */
  primaryCtaText?: string;
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
   * Image URL (for split or image-background variants)
   */
  image?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Background image URL (for image-background variant)
   */
  backgroundImage?: string;
  /**
   * Additional content below CTAs
   */
  additionalContent?: React.ReactNode;
}

/**
 * HeroSection - Marketing hero section component
 */
export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  (
    {
      variant = 'centered',
      size = 'md',
      eyebrow,
      title,
      description,
      primaryCtaText,
      onPrimaryCtaClick,
      secondaryCtaText,
      onSecondaryCtaClick,
      image,
      imageAlt = 'Hero image',
      backgroundImage,
      additionalContent,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.hero,
      styles[variant],
      styles[`size-${size}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const combinedStyle = backgroundImage
      ? {
          ...style,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
        }
      : style;

    return (
      <section ref={ref} className={classNames} style={combinedStyle} {...props}>
        <div className={styles.container}>
          <div className={styles.content}>
            {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
            <h1 className={styles.title}>{title}</h1>
            {description && <p className={styles.description}>{description}</p>}
            {(primaryCtaText || secondaryCtaText) && (
              <div className={styles.ctaWrapper}>
                {primaryCtaText && (
                  <Button
                    variant="convex"
                    size={size === 'lg' ? 'lg' : 'md'}
                    onClick={onPrimaryCtaClick}
                  >
                    {primaryCtaText}
                  </Button>
                )}
                {secondaryCtaText && (
                  <Button
                    variant="flat"
                    size={size === 'lg' ? 'lg' : 'md'}
                    onClick={onSecondaryCtaClick}
                  >
                    {secondaryCtaText}
                  </Button>
                )}
              </div>
            )}
            {additionalContent && (
              <div className={styles.additionalContent}>{additionalContent}</div>
            )}
          </div>
          {variant === 'split' && image && (
            <div className={styles.imageWrapper}>
              <img src={image} alt={imageAlt} className={styles.image} />
            </div>
          )}
        </div>
      </section>
    );
  }
);

HeroSection.displayName = 'HeroSection';
