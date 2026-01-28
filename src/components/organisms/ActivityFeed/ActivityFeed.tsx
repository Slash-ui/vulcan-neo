import React, { forwardRef } from 'react';
import styles from './ActivityFeed.module.css';

export type ActivityFeedSize = 'sm' | 'md' | 'lg';

export interface ActivityItem {
  id: string | number;
  user?: {
    name: string;
    avatar?: string;
  };
  icon?: React.ReactNode;
  content: React.ReactNode;
  timestamp: string;
  meta?: React.ReactNode;
}

export interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Activity items
   */
  items: ActivityItem[];
  /**
   * Size variant
   * @default 'md'
   */
  size?: ActivityFeedSize;
  /**
   * Whether to show timeline connector
   * @default true
   */
  showConnector?: boolean;
  /**
   * Empty state message
   */
  emptyMessage?: React.ReactNode;
}

const defaultIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/**
 * ActivityFeed - Neomorphic activity timeline component
 */
export const ActivityFeed = forwardRef<HTMLDivElement, ActivityFeedProps>(
  (
    {
      items,
      size = 'md',
      showConnector = true,
      emptyMessage = 'No activity yet',
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.feed,
      styles[size],
      showConnector ? styles.withConnector : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    if (items.length === 0) {
      return (
        <div ref={ref} className={`${styles.feed} ${styles.empty}`} {...props}>
          {emptyMessage}
        </div>
      );
    }

    return (
      <div ref={ref} className={classNames} {...props}>
        {items.map((item, index) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.indicator}>
              {item.user?.avatar ? (
                <img
                  src={item.user.avatar}
                  alt={item.user.name}
                  className={styles.avatar}
                />
              ) : (
                <span className={styles.icon}>{item.icon || defaultIcon}</span>
              )}
              {showConnector && index < items.length - 1 && (
                <div className={styles.connector} />
              )}
            </div>

            <div className={styles.content}>
              <div className={styles.main}>{item.content}</div>
              <div className={styles.footer}>
                <span className={styles.timestamp}>{item.timestamp}</span>
                {item.meta && <span className={styles.meta}>{item.meta}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

ActivityFeed.displayName = 'ActivityFeed';
