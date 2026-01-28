import React, { forwardRef, useState } from 'react';
import styles from './FAQSection.module.css';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps extends React.HTMLAttributes<HTMLElement> {
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
   * FAQ items
   */
  items: FAQItem[];
  /**
   * Layout variant
   * @default 'accordion'
   */
  variant?: 'accordion' | 'grid' | 'two-column';
  /**
   * Allow multiple items open (for accordion)
   * @default false
   */
  allowMultiple?: boolean;
}

/**
 * FAQSection - Marketing FAQ section component
 */
export const FAQSection = forwardRef<HTMLElement, FAQSectionProps>(
  (
    {
      eyebrow,
      title,
      description,
      items,
      variant = 'accordion',
      allowMultiple = false,
      className,
      ...props
    },
    ref
  ) => {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set());

    const classNames = [styles.faq, styles[variant], className]
      .filter(Boolean)
      .join(' ');

    const toggleItem = (index: number) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          if (!allowMultiple) {
            next.clear();
          }
          next.add(index);
        }
        return next;
      });
    };

    const renderAccordionItem = (item: FAQItem, index: number) => {
      const isOpen = openItems.has(index);
      return (
        <div
          key={index}
          className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}
        >
          <button
            type="button"
            className={styles.accordionButton}
            onClick={() => toggleItem(index)}
            aria-expanded={isOpen}
          >
            <span className={styles.question}>{item.question}</span>
            <svg
              className={styles.chevron}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className={styles.answerWrapper}>
            <p className={styles.answer}>{item.answer}</p>
          </div>
        </div>
      );
    };

    const renderGridItem = (item: FAQItem, index: number) => (
      <div key={index} className={styles.gridItem}>
        <h3 className={styles.gridQuestion}>{item.question}</h3>
        <p className={styles.gridAnswer}>{item.answer}</p>
      </div>
    );

    return (
      <section ref={ref} className={classNames} {...props}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            <h2 className={styles.title}>{title}</h2>
            {description && (
              <p className={styles.description}>{description}</p>
            )}
          </div>

          {/* Accordion Layout */}
          {variant === 'accordion' && (
            <div className={styles.accordion}>
              {items.map((item, index) => renderAccordionItem(item, index))}
            </div>
          )}

          {/* Grid Layout */}
          {variant === 'grid' && (
            <div className={styles.grid}>
              {items.map((item, index) => renderGridItem(item, index))}
            </div>
          )}

          {/* Two-Column Layout */}
          {variant === 'two-column' && (
            <div className={styles.twoColumn}>
              <div className={styles.column}>
                {items
                  .slice(0, Math.ceil(items.length / 2))
                  .map((item, index) => renderAccordionItem(item, index))}
              </div>
              <div className={styles.column}>
                {items
                  .slice(Math.ceil(items.length / 2))
                  .map((item, index) =>
                    renderAccordionItem(item, index + Math.ceil(items.length / 2))
                  )}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
);

FAQSection.displayName = 'FAQSection';
