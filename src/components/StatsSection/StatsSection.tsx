import React, { forwardRef } from 'react';
import styles from './StatsSection.module.css';

export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

export interface StatsSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Section eyebrow text
   */
  eyebrow?: string;
  /**
   * Section title
   */
  title?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Stats to display
   */
  stats: StatItem[];
  /**
   * Layout variant
   * @default 'simple'
   */
  variant?: 'simple' | 'cards' | 'inline';
  /**
   * Background color
   * @default 'default'
   */
  background?: 'default' | 'primary' | 'gradient';
}

/**
 * StatsSection - Marketing metrics/stats section
 */
export const StatsSection = forwardRef<HTMLElement, StatsSectionProps>(
  (
    {
      eyebrow,
      title,
      description,
      stats,
      variant = 'simple',
      background = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.stats,
      styles[variant],
      styles[`bg-${background}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <section ref={ref} className={classNames} {...props}>
        <div className={styles.container}>
          {(eyebrow || title || description) && (
            <div className={styles.header}>
              {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
              {title && <h2 className={styles.title}>{title}</h2>}
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </div>
          )}
          <div
            className={styles.statsGrid}
            style={{ '--stat-count': stats.length } as React.CSSProperties}
          >
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
                {stat.description && (
                  <span className={styles.statDescription}>
                    {stat.description}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

StatsSection.displayName = 'StatsSection';
