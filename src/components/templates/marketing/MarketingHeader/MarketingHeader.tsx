import React, { forwardRef, useState } from 'react';
import { Button } from '../../../atoms/Button';
import { IconButton } from '../../../atoms/IconButton';
import styles from './MarketingHeader.module.css';

export interface MarketingNavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  children?: MarketingNavItem[];
}

export interface MarketingHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Logo element or image URL
   */
  logo: React.ReactNode;
  /**
   * Navigation items
   */
  navItems?: MarketingNavItem[];
  /**
   * Primary CTA button text
   */
  ctaText?: string;
  /**
   * Primary CTA button click handler
   */
  onCtaClick?: () => void;
  /**
   * Secondary CTA button text
   */
  secondaryCtaText?: string;
  /**
   * Secondary CTA button click handler
   */
  onSecondaryCtaClick?: () => void;
  /**
   * Show announcement banner
   */
  announcement?: React.ReactNode;
  /**
   * Sticky header
   * @default false
   */
  sticky?: boolean;
  /**
   * Transparent background (for hero overlays)
   * @default false
   */
  transparent?: boolean;
}

/**
 * MarketingHeader - Marketing site header with navigation and CTAs
 */
export const MarketingHeader = forwardRef<HTMLElement, MarketingHeaderProps>(
  (
    {
      logo,
      navItems = [],
      ctaText,
      onCtaClick,
      secondaryCtaText,
      onSecondaryCtaClick,
      announcement,
      sticky = false,
      transparent = false,
      className,
      ...props
    },
    ref
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const classNames = [
      styles.header,
      sticky && styles.sticky,
      transparent && styles.transparent,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleNavItemClick = (item: MarketingNavItem) => {
      if (item.children) {
        setOpenDropdown(openDropdown === item.label ? null : item.label);
      } else if (item.onClick) {
        item.onClick();
      }
    };

    return (
      <>
        {announcement && (
          <div className={styles.announcement}>{announcement}</div>
        )}
        <header ref={ref} className={classNames} {...props}>
          <div className={styles.container}>
            <div className={styles.logoWrapper}>{logo}</div>

            {/* Desktop Navigation */}
            <nav className={styles.desktopNav}>
              {navItems.map((item) => (
                <div key={item.label} className={styles.navItemWrapper}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={styles.navLink}
                      onClick={item.onClick}
                    >
                      {item.label}
                      {item.children && (
                        <svg
                          className={styles.chevron}
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M3 4.5L6 7.5L9 4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </a>
                  ) : (
                    <button
                      type="button"
                      className={styles.navLink}
                      onClick={() => handleNavItemClick(item)}
                    >
                      {item.label}
                      {item.children && (
                        <svg
                          className={`${styles.chevron} ${openDropdown === item.label ? styles.chevronOpen : ''}`}
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M3 4.5L6 7.5L9 4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  )}
                  {item.children && openDropdown === item.label && (
                    <div className={styles.dropdown}>
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className={styles.dropdownItem}
                          onClick={child.onClick}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className={styles.ctaWrapper}>
              {secondaryCtaText && (
                <Button
                  variant="flat"
                  size="sm"
                  onClick={onSecondaryCtaClick}
                  className={styles.secondaryCta}
                  label={secondaryCtaText}
                />
              )}
              {ctaText && (
                <Button
                  variant="convex"
                  size="sm"
                  onClick={onCtaClick}
                  label={ctaText}
                />
              )}
            </div>

            {/* Mobile Menu Button */}
            <IconButton
              variant="flat"
              size="md"
              className={styles.mobileMenuBtn}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              icon={
                mobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 12H21M3 6H21M3 18H21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                )
              }
            />
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={styles.mobileMenu}>
              <nav className={styles.mobileNav}>
                {navItems.map((item) => (
                  <div key={item.label} className={styles.mobileNavItem}>
                    {item.href ? (
                      <a href={item.href} className={styles.mobileNavLink}>
                        {item.label}
                      </a>
                    ) : (
                      <>
                        <button
                          type="button"
                          className={styles.mobileNavLink}
                          onClick={() => handleNavItemClick(item)}
                        >
                          {item.label}
                          {item.children && (
                            <svg
                              className={`${styles.chevron} ${openDropdown === item.label ? styles.chevronOpen : ''}`}
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M3 4.5L6 7.5L9 4.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                        {item.children && openDropdown === item.label && (
                          <div className={styles.mobileDropdown}>
                            {item.children.map((child) => (
                              <a
                                key={child.label}
                                href={child.href}
                                className={styles.mobileDropdownItem}
                                onClick={child.onClick}
                              >
                                {child.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </nav>
              <div className={styles.mobileCta}>
                {secondaryCtaText && (
                  <Button
                    variant="flat"
                    size="md"
                    onClick={onSecondaryCtaClick}
                    style={{ width: '100%' }}
                    label={secondaryCtaText}
                  />
                )}
                {ctaText && (
                  <Button
                    variant="convex"
                    size="md"
                    onClick={onCtaClick}
                    style={{ width: '100%' }}
                    label={ctaText}
                  />
                )}
              </div>
            </div>
          )}
        </header>
      </>
    );
  }
);

MarketingHeader.displayName = 'MarketingHeader';
