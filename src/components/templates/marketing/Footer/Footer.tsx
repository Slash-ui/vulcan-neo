import React, { forwardRef } from 'react';
import styles from './Footer.module.css';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Logo element
   */
  logo?: React.ReactNode;
  /**
   * Company description
   */
  description?: string;
  /**
   * Link groups
   */
  linkGroups?: FooterLinkGroup[];
  /**
   * Social media links
   */
  socialLinks?: FooterSocialLink[];
  /**
   * Bottom bar content (e.g., copyright, legal links)
   */
  bottomContent?: React.ReactNode;
  /**
   * Copyright text
   */
  copyright?: string;
  /**
   * Legal links
   */
  legalLinks?: FooterLink[];
  /**
   * Layout variant
   * @default 'default'
   */
  variant?: 'default' | 'simple' | 'centered';
}

/**
 * Footer - Marketing site footer component
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    {
      logo,
      description,
      linkGroups = [],
      socialLinks = [],
      bottomContent,
      copyright,
      legalLinks = [],
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [styles.footer, styles[variant], className]
      .filter(Boolean)
      .join(' ');

    return (
      <footer ref={ref} className={classNames} {...props}>
        <div className={styles.container}>
          {/* Main Content */}
          {variant !== 'simple' && (
            <div className={styles.main}>
              {/* Brand Column */}
              {(logo || description || socialLinks.length > 0) && (
                <div className={styles.brand}>
                  {logo && <div className={styles.logo}>{logo}</div>}
                  {description && (
                    <p className={styles.description}>{description}</p>
                  )}
                  {socialLinks.length > 0 && (
                    <div className={styles.socialLinks}>
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.socialLink}
                          aria-label={social.label}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Link Groups */}
              {linkGroups.length > 0 && (
                <div className={styles.linkGroups}>
                  {linkGroups.map((group, index) => (
                    <div key={index} className={styles.linkGroup}>
                      <h3 className={styles.groupTitle}>{group.title}</h3>
                      <ul className={styles.linkList}>
                        {group.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <a href={link.href} className={styles.link}>
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Simple Variant */}
          {variant === 'simple' && (
            <div className={styles.simpleContent}>
              {logo && <div className={styles.logo}>{logo}</div>}
              {linkGroups.length > 0 && (
                <nav className={styles.simpleNav}>
                  {linkGroups[0]?.links.map((link, index) => (
                    <a key={index} href={link.href} className={styles.link}>
                      {link.label}
                    </a>
                  ))}
                </nav>
              )}
              {socialLinks.length > 0 && (
                <div className={styles.socialLinks}>
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bottom Bar */}
          <div className={styles.bottom}>
            {bottomContent ? (
              bottomContent
            ) : (
              <>
                {copyright && (
                  <p className={styles.copyright}>{copyright}</p>
                )}
                {legalLinks.length > 0 && (
                  <nav className={styles.legalLinks}>
                    {legalLinks.map((link, index) => (
                      <a key={index} href={link.href} className={styles.legalLink}>
                        {link.label}
                      </a>
                    ))}
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';
