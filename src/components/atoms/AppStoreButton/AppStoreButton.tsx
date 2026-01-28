import React, { forwardRef } from 'react';
import { Typography } from '../../foundation/Typography';
import styles from './AppStoreButton.module.css';

export type AppStoreButtonVariant = 'convex' | 'flat';
export type AppStoreButtonSize = 'sm' | 'md' | 'lg';
export type AppStoreButtonElevation = 'low' | 'mid' | 'high';
export type AppStoreButtonStore = 'apple' | 'google';

export interface AppStoreButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Which store the button is for
   */
  store: AppStoreButtonStore;
  /**
   * The visual variant of the button
   * @default 'convex'
   */
  variant?: AppStoreButtonVariant;
  /**
   * The size of the button
   * @default 'md'
   */
  size?: AppStoreButtonSize;
  /**
   * The elevation level of the shadow
   * @default 'mid'
   */
  elevation?: AppStoreButtonElevation;
  /**
   * Custom icon element to display. Accepts any React node including
   * icon library components (Lucide, FontAwesome, React Icons, etc.)
   *
   * @example
   * // With Lucide icons
   * <AppStoreButton store="apple" icon={<Apple />} />
   *
   * // With FontAwesome
   * <AppStoreButton store="google" icon={<FontAwesomeIcon icon={faGooglePlay} />} />
   *
   * // With custom SVG
   * <AppStoreButton store="apple" icon={<CustomAppleIcon />} />
   */
  icon?: React.ReactNode;
}

/**
 * AppStoreButton - Neomorphic button for app store downloads
 *
 * Consumer provides the icon for flexibility.
 */
export const AppStoreButton = forwardRef<HTMLButtonElement, AppStoreButtonProps>(
  (
    {
      store,
      variant = 'convex',
      size = 'md',
      elevation = 'mid',
      icon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.appStoreButton,
      styles[variant],
      styles[size],
      styles[`elevation-${elevation}`],
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const storeLabel = store === 'apple' ? 'App Store' : 'Google Play';
    const storeText = store === 'apple' ? 'Download on the' : 'GET IT ON';

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled}
        {...props}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.textContainer}>
          <Typography variant="caption" component="span" color="inherit" className={styles.subtext}>
            {storeText}
          </Typography>
          <Typography variant="subtitle2" component="span" color="inherit" className={styles.storeName}>
            {storeLabel}
          </Typography>
        </span>
      </button>
    );
  }
);

AppStoreButton.displayName = 'AppStoreButton';
