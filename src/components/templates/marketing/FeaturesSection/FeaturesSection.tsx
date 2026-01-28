import React, { forwardRef } from 'react';
import { FeaturedIcon } from '../../atoms/FeaturedIcon';
import styles from './FeaturesSection.module.css';

export type FeaturesSectionLayout = 'grid' | 'list' | 'alternating';

export interface FeatureItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface FeaturesSectionProps extends React.HTMLAttributes<HTMLElement> {
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
   * Features to display
   */
  features: FeatureItem[];
  /**
   * Layout style
   * @default 'grid'
   */
  layout?: FeaturesSectionLayout;
  /**
   * Number of columns (for grid layout)
   * @default 3
   */
  columns?: 2 | 3 | 4;
}

/**
 * FeaturesSection - Marketing features section component
 */
export const FeaturesSection = forwardRef<HTMLElement, FeaturesSectionProps>(
  (
    {
      eyebrow,
      title,
      description,
      features,
      layout = 'grid',
      columns = 3,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [styles.features, styles[layout], className]
      .filter(Boolean)
      .join(' ');

    return (
      <section ref={ref} className={classNames} {...props}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            <h2 className={styles.title}>{title}</h2>
            {description && <p className={styles.description}>{description}</p>}
          </div>

          {/* Grid Layout */}
          {layout === 'grid' && (
            <div
              className={styles.grid}
              style={{ '--columns': columns } as React.CSSProperties}
            >
              {features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  {feature.icon && (
                    <FeaturedIcon
                      variant="convex"
                      color="primary"
                      size="md"
                      className={styles.featureIcon}
                    >
                      {feature.icon}
                    </FeaturedIcon>
                  )}
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* List Layout */}
          {layout === 'list' && (
            <div className={styles.list}>
              {features.map((feature, index) => (
                <div key={index} className={styles.listItem}>
                  <div className={styles.listContent}>
                    {feature.icon && (
                      <FeaturedIcon
                        variant="convex"
                        color="primary"
                        size="lg"
                        className={styles.featureIcon}
                      >
                        {feature.icon}
                      </FeaturedIcon>
                    )}
                    <div>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p className={styles.featureDescription}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  {feature.image && (
                    <div className={styles.listImage}>
                      <img
                        src={feature.image}
                        alt={feature.imageAlt || feature.title}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Alternating Layout */}
          {layout === 'alternating' && (
            <div className={styles.alternating}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${styles.alternatingItem} ${
                    index % 2 === 1 ? styles.reverse : ''
                  }`}
                >
                  <div className={styles.alternatingContent}>
                    {feature.icon && (
                      <FeaturedIcon
                        variant="convex"
                        color="primary"
                        size="lg"
                        className={styles.featureIcon}
                      >
                        {feature.icon}
                      </FeaturedIcon>
                    )}
                    <h3 className={styles.alternatingTitle}>{feature.title}</h3>
                    <p className={styles.alternatingDescription}>
                      {feature.description}
                    </p>
                  </div>
                  {feature.image && (
                    <div className={styles.alternatingImage}>
                      <img
                        src={feature.image}
                        alt={feature.imageAlt || feature.title}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
);

FeaturesSection.displayName = 'FeaturesSection';
