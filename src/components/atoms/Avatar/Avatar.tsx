import React, { forwardRef, useState } from 'react';
import styles from './Avatar.module.css';

export type AvatarVariant = 'convex' | 'concave' | 'flat';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The visual variant of the avatar
   * @default 'convex'
   */
  variant?: AvatarVariant;
  /**
   * The size of the avatar
   * @default 'md'
   */
  size?: AvatarSize;
  /**
   * Image source URL
   */
  src?: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Fallback text (initials) when image is not available
   */
  fallback?: string;
  /**
   * Status indicator
   */
  status?: AvatarStatus;
  /**
   * Whether status indicator should have a border
   * @default true
   */
  statusBorder?: boolean;
}

/**
 * Avatar - Neomorphic user avatar with optional status indicator
 *
 * Displays user image or fallback initials with neomorphic styling.
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      variant = 'convex',
      size = 'md',
      src,
      alt = '',
      fallback,
      status,
      statusBorder = true,
      className,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    const classNames = [
      styles.avatar,
      styles[variant],
      styles[size],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const showFallback = !src || imageError;

    return (
      <div ref={ref} className={classNames} {...props}>
        {showFallback ? (
          <span className={styles.fallback}>{fallback}</span>
        ) : (
          <img
            src={src}
            alt={alt}
            className={styles.image}
            onError={() => setImageError(true)}
          />
        )}
        {status && (
          <span
            className={[
              styles.status,
              styles[`status-${status}`],
              statusBorder ? styles.statusBorder : '',
            ].filter(Boolean).join(' ')}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
