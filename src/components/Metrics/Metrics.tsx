import React, { forwardRef } from 'react';
import styles from './Metrics.module.css';

export type MetricsSize = 'sm' | 'md' | 'lg';
export type MetricsTrend = 'up' | 'down' | 'neutral';

export interface MetricItem {
  id: string | number;
  label: string;
  value: React.ReactNode;
  change?: React.ReactNode;
  trend?: MetricsTrend;
  icon?: React.ReactNode;
  description?: string;
}

export interface MetricsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Metric items
   */
  items: MetricItem[];
  /**
   * Size variant
   * @default 'md'
   */
  size?: MetricsSize;
  /**
   * Number of columns
   * @default 4
   */
  columns?: 1 | 2 | 3 | 4;
}

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Metric label
   */
  label: string;
  /**
   * Metric value
   */
  value: React.ReactNode;
  /**
   * Change indicator
   */
  change?: React.ReactNode;
  /**
   * Trend direction
   */
  trend?: MetricsTrend;
  /**
   * Icon
   */
  icon?: React.ReactNode;
  /**
   * Description text
   */
  description?: string;
  /**
   * Size variant
   * @default 'md'
   */
  size?: MetricsSize;
}

const TrendUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const TrendDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

/**
 * MetricCard - Single metric display card
 */
export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      label,
      value,
      change,
      trend,
      icon,
      description,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.card,
      styles[size],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        <div className={styles.cardHeader}>
          <span className={styles.label}>{label}</span>
          {icon && <span className={styles.icon}>{icon}</span>}
        </div>

        <div className={styles.valueRow}>
          <span className={styles.value}>{value}</span>
          {change && (
            <span className={`${styles.change} ${trend ? styles[trend] : ''}`}>
              {trend === 'up' && <TrendUpIcon />}
              {trend === 'down' && <TrendDownIcon />}
              {change}
            </span>
          )}
        </div>

        {description && <p className={styles.description}>{description}</p>}
      </div>
    );
  }
);

MetricCard.displayName = 'MetricCard';

/**
 * Metrics - Neomorphic metrics/stats grid component
 */
export const Metrics = forwardRef<HTMLDivElement, MetricsProps>(
  (
    {
      items,
      size = 'md',
      columns = 4,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.metrics,
      styles[`cols-${columns}`],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {items.map((item) => (
          <MetricCard
            key={item.id}
            label={item.label}
            value={item.value}
            change={item.change}
            trend={item.trend}
            icon={item.icon}
            description={item.description}
            size={size}
          />
        ))}
      </div>
    );
  }
);

Metrics.displayName = 'Metrics';
