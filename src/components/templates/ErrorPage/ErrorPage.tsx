import React, { forwardRef } from 'react';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import styles from './ErrorPage.module.css';

export type ErrorPageVariant = 'simple' | 'split' | 'illustration' | 'minimal';
export type ErrorPageSize = 'sm' | 'md' | 'lg';

export interface ErrorPageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Error code to display
   * @default '404'
   */
  errorCode?: string;
  /**
   * Main title/heading
   * @default 'Page not found'
   */
  title?: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Layout variant
   * @default 'simple'
   */
  variant?: ErrorPageVariant;
  /**
   * Size variant
   * @default 'md'
   */
  size?: ErrorPageSize;
  /**
   * Primary action button text
   */
  primaryActionText?: string;
  /**
   * Primary action callback or href
   */
  onPrimaryAction?: () => void;
  /**
   * Primary action href (renders as link)
   */
  primaryActionHref?: string;
  /**
   * Secondary action button text
   */
  secondaryActionText?: string;
  /**
   * Secondary action callback
   */
  onSecondaryAction?: () => void;
  /**
   * Secondary action href
   */
  secondaryActionHref?: string;
  /**
   * Custom illustration/image element
   */
  illustration?: React.ReactNode;
  /**
   * Show search input
   * @default false
   */
  showSearch?: boolean;
  /**
   * Search placeholder
   */
  searchPlaceholder?: string;
  /**
   * Search submit callback
   */
  onSearch?: (query: string) => void;
  /**
   * Quick links to show
   */
  quickLinks?: Array<{
    title: string;
    description?: string;
    href: string;
    icon?: React.ReactNode;
  }>;
}

/**
 * ErrorPage - Neomorphic error page component for 404 and other error states
 */
export const ErrorPage = forwardRef<HTMLDivElement, ErrorPageProps>(
  (
    {
      errorCode = '404',
      title = 'Page not found',
      description = "Sorry, the page you're looking for doesn't exist or has been moved.",
      variant = 'simple',
      size = 'md',
      primaryActionText = 'Go home',
      onPrimaryAction,
      primaryActionHref = '/',
      secondaryActionText = 'Go back',
      onSecondaryAction,
      secondaryActionHref,
      illustration,
      showSearch = false,
      searchPlaceholder = 'Search...',
      onSearch,
      quickLinks,
      className,
      ...props
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(searchQuery);
    };

    const handlePrimaryClick = () => {
      if (onPrimaryAction) {
        onPrimaryAction();
      } else if (primaryActionHref) {
        window.location.href = primaryActionHref;
      }
    };

    const handleSecondaryClick = () => {
      if (onSecondaryAction) {
        onSecondaryAction();
      } else if (secondaryActionHref) {
        window.location.href = secondaryActionHref;
      } else {
        window.history.back();
      }
    };

    const classNames = [
      styles.errorPage,
      styles[variant],
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const renderContent = () => (
      <div className={styles.content}>
        <Badge variant="flat" color="error" size={size === 'sm' ? 'sm' : 'md'}>
          {errorCode} error
        </Badge>

        <h1 className={styles.title}>{title}</h1>

        {description && <p className={styles.description}>{description}</p>}

        {showSearch && (
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <div className={styles.searchInputWrapper}>
              <svg
                className={styles.searchIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                className={styles.searchInput}
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" variant="convex" size={size === 'lg' ? 'lg' : 'md'} label="Search" />
          </form>
        )}

        <div className={styles.actions}>
          {secondaryActionText && (
            <Button
              variant="flat"
              size={size === 'lg' ? 'lg' : 'md'}
              onClick={handleSecondaryClick}
              leftIcon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              }
              label={secondaryActionText}
            />
          )}
          <Button
            variant="convex"
            size={size === 'lg' ? 'lg' : 'md'}
            onClick={handlePrimaryClick}
            label={primaryActionText}
          />
        </div>

        {quickLinks && quickLinks.length > 0 && (
          <div className={styles.quickLinks}>
            <p className={styles.quickLinksLabel}>Here are some helpful links:</p>
            <div className={styles.quickLinksGrid}>
              {quickLinks.map((link, index) => (
                <a key={index} href={link.href} className={styles.quickLink}>
                  {link.icon && (
                    <span className={styles.quickLinkIcon}>{link.icon}</span>
                  )}
                  <div className={styles.quickLinkContent}>
                    <span className={styles.quickLinkTitle}>{link.title}</span>
                    {link.description && (
                      <span className={styles.quickLinkDescription}>
                        {link.description}
                      </span>
                    )}
                  </div>
                  <svg
                    className={styles.quickLinkArrow}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );

    const renderIllustration = () => {
      if (illustration) {
        return <div className={styles.illustrationWrapper}>{illustration}</div>;
      }

      // Default illustration
      return (
        <div className={styles.illustrationWrapper}>
          <div className={styles.defaultIllustration}>
            <svg viewBox="0 0 200 200" className={styles.illustrationSvg}>
              <circle cx="100" cy="100" r="80" className={styles.illustrationCircle} />
              <text
                x="100"
                y="115"
                textAnchor="middle"
                className={styles.illustrationText}
              >
                {errorCode}
              </text>
            </svg>
          </div>
        </div>
      );
    };

    if (variant === 'minimal') {
      return (
        <div ref={ref} className={classNames} {...props}>
          <div className={styles.minimalContent}>
            <span className={styles.minimalCode}>{errorCode}</span>
            <div className={styles.minimalDivider} />
            <span className={styles.minimalTitle}>{title}</span>
          </div>
        </div>
      );
    }

    if (variant === 'split') {
      return (
        <div ref={ref} className={classNames} {...props}>
          <div className={styles.splitContainer}>
            <div className={styles.splitContent}>{renderContent()}</div>
            <div className={styles.splitIllustration}>{renderIllustration()}</div>
          </div>
        </div>
      );
    }

    if (variant === 'illustration') {
      return (
        <div ref={ref} className={classNames} {...props}>
          <div className={styles.illustrationContainer}>
            {renderIllustration()}
            {renderContent()}
          </div>
        </div>
      );
    }

    // Simple variant (default)
    return (
      <div ref={ref} className={classNames} {...props}>
        <div className={styles.simpleContainer}>{renderContent()}</div>
      </div>
    );
  }
);

ErrorPage.displayName = 'ErrorPage';
