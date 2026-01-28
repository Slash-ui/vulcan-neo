import React, { forwardRef, useState } from 'react';
import { Button } from '../../../atoms/Button';
import { Badge } from '../../../atoms/Badge';
import styles from './PricingSection.module.css';

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  description?: string;
  price: string | number;
  period?: string;
  yearlyPrice?: string | number;
  features: (string | PricingFeature)[];
  ctaText?: string;
  onCtaClick?: () => void;
  popular?: boolean;
  badge?: string;
}

export interface PricingSectionProps extends React.HTMLAttributes<HTMLElement> {
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
   * Pricing plans to display
   */
  plans: PricingPlan[];
  /**
   * Show billing toggle (monthly/yearly)
   * @default false
   */
  showBillingToggle?: boolean;
}

/**
 * PricingSection - Marketing pricing section component
 */
export const PricingSection = forwardRef<HTMLElement, PricingSectionProps>(
  (
    {
      eyebrow,
      title,
      description,
      plans,
      showBillingToggle = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isYearly, setIsYearly] = useState(false);

    const classNames = [styles.pricing, className].filter(Boolean).join(' ');

    const formatPrice = (price: string | number) => {
      if (typeof price === 'string') return price;
      return `$${price}`;
    };

    return (
      <section ref={ref} className={classNames} {...props}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            <h2 className={styles.title}>{title}</h2>
            {description && <p className={styles.description}>{description}</p>}

            {/* Billing Toggle */}
            {showBillingToggle && (
              <div className={styles.billingToggle}>
                <span className={!isYearly ? styles.activeToggle : ''}>
                  Monthly
                </span>
                <button
                  type="button"
                  className={styles.toggleButton}
                  onClick={() => setIsYearly(!isYearly)}
                  aria-pressed={isYearly}
                >
                  <span
                    className={`${styles.toggleKnob} ${isYearly ? styles.toggleKnobActive : ''}`}
                  />
                </button>
                <span className={isYearly ? styles.activeToggle : ''}>
                  Yearly
                  <Badge color="success" size="sm" className={styles.saveBadge}>
                    Save 20%
                  </Badge>
                </span>
              </div>
            )}
          </div>

          {/* Plans Grid */}
          <div
            className={styles.plansGrid}
            style={{ '--plan-count': plans.length } as React.CSSProperties}
          >
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`${styles.planCard} ${plan.popular ? styles.popularCard : ''}`}
              >
                {plan.badge && (
                  <Badge
                    color="primary"
                    className={styles.planBadge}
                  >
                    {plan.badge}
                  </Badge>
                )}
                <div className={styles.planHeader}>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  {plan.description && (
                    <p className={styles.planDescription}>{plan.description}</p>
                  )}
                </div>
                <div className={styles.planPrice}>
                  <span className={styles.priceAmount}>
                    {formatPrice(
                      isYearly && plan.yearlyPrice
                        ? plan.yearlyPrice
                        : plan.price
                    )}
                  </span>
                  {plan.period && (
                    <span className={styles.pricePeriod}>/{plan.period}</span>
                  )}
                </div>
                <ul className={styles.featuresList}>
                  {plan.features.map((feature, featureIndex) => {
                    const featureText =
                      typeof feature === 'string' ? feature : feature.text;
                    const included =
                      typeof feature === 'string' ? true : feature.included;
                    return (
                      <li
                        key={featureIndex}
                        className={`${styles.featureItem} ${!included ? styles.featureNotIncluded : ''}`}
                      >
                        {included ? (
                          <svg
                            className={styles.checkIcon}
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M13.3 4.3L6 11.6L2.7 8.3"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            className={styles.xIcon}
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M12 4L4 12M4 4L12 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        {featureText}
                      </li>
                    );
                  })}
                </ul>
                {plan.ctaText && (
                  <Button
                    variant={plan.popular ? 'convex' : 'flat'}
                    size="md"
                    onClick={plan.onCtaClick}
                    style={{ width: '100%' }}
                  >
                    {plan.ctaText}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

PricingSection.displayName = 'PricingSection';
