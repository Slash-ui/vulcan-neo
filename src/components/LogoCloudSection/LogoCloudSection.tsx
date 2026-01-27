import React, { forwardRef } from 'react';
import styles from './LogoCloudSection.module.css';

export interface LogoItem {
  /**
   * Logo image URL, SVG string, or React node (for icon components)
   */
  logo: React.ReactNode;
  /**
   * Company/brand name (for alt text)
   */
  name: string;
  /**
   * Optional link URL
   */
  href?: string;
}

export interface LogoCloudSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Section eyebrow text
   */
  eyebrow?: string;
  /**
   * Section title
   */
  title?: string;
  /**
   * Logos to display
   */
  logos: LogoItem[];
  /**
   * Layout variant
   * @default 'simple'
   */
  variant?: 'simple' | 'grid' | 'marquee';
  /**
   * Grayscale logos
   * @default true
   */
  grayscale?: boolean;
}

/**
 * LogoCloudSection - Social proof logo cloud section
 */
export const LogoCloudSection = forwardRef<HTMLElement, LogoCloudSectionProps>(
  (
    {
      eyebrow,
      title,
      logos,
      variant = 'simple',
      grayscale = true,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.logoCloud,
      styles[variant],
      grayscale && styles.grayscale,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const renderLogo = (logo: LogoItem, index: number) => {
      const logoContent = (
        <div className={styles.logoWrapper}>
          {typeof logo.logo === 'string' ? (
            logo.logo.startsWith('<svg') ? (
              <div
                className={styles.logo}
                dangerouslySetInnerHTML={{ __html: logo.logo }}
                aria-label={logo.name}
              />
            ) : (
              <img
                src={logo.logo}
                alt={logo.name}
                className={styles.logo}
              />
            )
          ) : (
            <div className={styles.logo} aria-label={logo.name}>
              {logo.logo}
            </div>
          )}
        </div>
      );

      if (logo.href) {
        return (
          <a
            key={index}
            href={logo.href}
            className={styles.logoLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={logo.name}
          >
            {logoContent}
          </a>
        );
      }

      return <div key={index}>{logoContent}</div>;
    };

    return (
      <section ref={ref} className={classNames} {...props}>
        <div className={styles.container}>
          {(eyebrow || title) && (
            <div className={styles.header}>
              {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
              {title && <h2 className={styles.title}>{title}</h2>}
            </div>
          )}

          {/* Simple Layout */}
          {variant === 'simple' && (
            <div className={styles.logosSimple}>
              {logos.map((logo, index) => renderLogo(logo, index))}
            </div>
          )}

          {/* Grid Layout */}
          {variant === 'grid' && (
            <div
              className={styles.logosGrid}
              style={{ '--logo-count': Math.min(logos.length, 6) } as React.CSSProperties}
            >
              {logos.map((logo, index) => renderLogo(logo, index))}
            </div>
          )}

          {/* Marquee Layout */}
          {variant === 'marquee' && (
            <div className={styles.marqueeWrapper}>
              <div className={styles.marquee}>
                {logos.map((logo, index) => renderLogo(logo, index))}
                {logos.map((logo, index) => renderLogo(logo, index + logos.length))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
);

LogoCloudSection.displayName = 'LogoCloudSection';
