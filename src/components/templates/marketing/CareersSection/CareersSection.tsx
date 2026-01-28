import React, { forwardRef } from 'react';
import { Badge } from '../../../atoms/Badge';
import { Button } from '../../../atoms/Button';
import styles from './CareersSection.module.css';

export interface JobPosition {
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  href?: string;
  description?: string;
}

export interface CareersSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Section eyebrow text
   */
  eyebrow?: string;
  /**
   * Section title
   */
  title: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Job positions
   */
  positions: JobPosition[];
  /**
   * Layout variant
   * @default 'list'
   */
  variant?: 'list' | 'cards' | 'grouped';
  /**
   * Empty state message
   */
  emptyMessage?: string;
  /**
   * View all link text
   */
  viewAllText?: string;
  /**
   * View all link URL
   */
  viewAllHref?: string;
}

/**
 * CareersSection - Marketing careers/jobs section
 */
export const CareersSection = forwardRef<HTMLElement, CareersSectionProps>(
  (
    {
      eyebrow,
      title,
      description,
      positions,
      variant = 'list',
      emptyMessage = 'No open positions at the moment. Check back soon!',
      viewAllText,
      viewAllHref,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [styles.careers, styles[variant], className]
      .filter(Boolean)
      .join(' ');

    const groupedPositions = positions.reduce(
      (acc, position) => {
        if (!acc[position.department]) {
          acc[position.department] = [];
        }
        acc[position.department].push(position);
        return acc;
      },
      {} as Record<string, JobPosition[]>
    );

    const renderPositionCard = (position: JobPosition, index: number) => (
      <div key={index} className={styles.positionCard}>
        <div className={styles.positionMain}>
          <div className={styles.positionHeader}>
            <h3 className={styles.positionTitle}>{position.title}</h3>
            <Badge
              color={position.type === 'Remote' ? 'success' : 'default'}
              size="sm"
            >
              {position.type}
            </Badge>
          </div>
          <div className={styles.positionMeta}>
            <span className={styles.positionDepartment}>
              {position.department}
            </span>
            <span className={styles.positionDivider}>•</span>
            <span className={styles.positionLocation}>{position.location}</span>
          </div>
          {position.description && variant === 'cards' && (
            <p className={styles.positionDescription}>{position.description}</p>
          )}
        </div>
        {position.href && (
          <Button
            variant="flat"
            size="sm"
            onClick={() => window.open(position.href, '_blank')}
          >
            Apply
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 12L12 4M12 4H6M12 4V10" />
            </svg>
          </Button>
        )}
      </div>
    );

    return (
      <section ref={ref} className={classNames} {...props}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerContent}>
              {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
              <h2 className={styles.title}>{title}</h2>
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </div>
            {viewAllText && viewAllHref && (
              <a href={viewAllHref} className={styles.viewAll}>
                {viewAllText}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 8H13M9 4L13 8L9 12" />
                </svg>
              </a>
            )}
          </div>

          {/* Empty State */}
          {positions.length === 0 && (
            <div className={styles.emptyState}>{emptyMessage}</div>
          )}

          {/* List/Cards Layout */}
          {(variant === 'list' || variant === 'cards') && positions.length > 0 && (
            <div
              className={variant === 'cards' ? styles.cardsGrid : styles.list}
            >
              {positions.map((position, index) =>
                renderPositionCard(position, index)
              )}
            </div>
          )}

          {/* Grouped Layout */}
          {variant === 'grouped' && positions.length > 0 && (
            <div className={styles.grouped}>
              {Object.entries(groupedPositions).map(([department, jobs]) => (
                <div key={department} className={styles.departmentGroup}>
                  <h3 className={styles.departmentTitle}>{department}</h3>
                  <div className={styles.list}>
                    {jobs.map((position, index) =>
                      renderPositionCard(position, index)
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
);

CareersSection.displayName = 'CareersSection';
