import React, { forwardRef, useState } from 'react';
import { Button } from '../../atoms/Button';
import { InsetField } from '../../atoms/InsetField';
import styles from './NewsletterSection.module.css';

export type NewsletterSectionVariant = 'simple' | 'card' | 'split';

export interface NewsletterSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSubmit'> {
  /**
   * Variant style
   * @default 'simple'
   */
  variant?: NewsletterSectionVariant;
  /**
   * Section title
   */
  title: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Submit button text
   * @default 'Subscribe'
   */
  buttonText?: string;
  /**
   * Email placeholder
   * @default 'Enter your email'
   */
  placeholder?: string;
  /**
   * Form submit handler
   */
  onSubmit?: (email: string) => void;
  /**
   * Privacy text
   */
  privacyText?: React.ReactNode;
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
 * NewsletterSection - Marketing newsletter subscription section
 */
export const NewsletterSection = forwardRef<HTMLElement, NewsletterSectionProps>(
  (
    {
      variant = 'simple',
      title,
      description,
      buttonText = 'Subscribe',
      placeholder = 'Enter your email',
      onSubmit,
      privacyText,
      image,
      imageAlt = 'Newsletter',
      background = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = useState('');

    const classNames = [
      styles.newsletter,
      styles[variant],
      styles[`bg-${background}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (email && onSubmit) {
        onSubmit(email);
        setEmail('');
      }
    };

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
            <form className={styles.form} onSubmit={handleSubmit}>
              <InsetField
                type="email"
                placeholder={placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="md"
                className={styles.input}
              />
              <Button
                type="submit"
                variant={isPrimaryBg ? 'flat' : 'convex'}
                size="md"
              >
                {buttonText}
              </Button>
            </form>
            {privacyText && (
              <p className={styles.privacyText}>{privacyText}</p>
            )}
          </div>
        </div>
      </section>
    );
  }
);

NewsletterSection.displayName = 'NewsletterSection';
