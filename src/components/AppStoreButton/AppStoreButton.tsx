import React, { forwardRef } from 'react';
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
   * Icon element to display (consumer provides the icon)
   */
  icon: React.ReactNode;
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
        <span className={styles.icon}>{icon}</span>
        <span className={styles.textContainer}>
          <span className={styles.subtext}>{storeText}</span>
          <span className={styles.storeName}>{storeLabel}</span>
        </span>
      </button>
    );
  }
);

AppStoreButton.displayName = 'AppStoreButton';
