import React, { forwardRef } from 'react';
import styles from './ContentSection.module.css';

export interface ContentSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Section eyebrow text
   */
  eyebrow?: string;
  /**
   * Section title
   */
  title?: string;
  /**
   * Rich content (HTML or React nodes)
   */
  children: React.ReactNode;
  /**
   * Layout variant
   * @default 'default'
   */
  variant?: 'default' | 'wide' | 'narrow';
  /**
   * Show table of contents
   * @default false
   */
  showToc?: boolean;
  /**
   * Table of contents items
   */
  tocItems?: { id: string; label: string; level?: number }[];
  /**
   * Sidebar content
   */
  sidebar?: React.ReactNode;
  /**
   * Sidebar position
   * @default 'right'
   */
  sidebarPosition?: 'left' | 'right';
}

/**
 * ContentSection - Marketing rich text content section
 */
export const ContentSection = forwardRef<HTMLElement, ContentSectionProps>(
  (
    {
      eyebrow,
      title,
      children,
      variant = 'default',
      showToc = false,
      tocItems = [],
      sidebar,
      sidebarPosition = 'right',
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.content,
      styles[variant],
      sidebar && styles.hasSidebar,
      sidebarPosition === 'left' && styles.sidebarLeft,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <section ref={ref} className={classNames} {...props}>
        <div className={styles.container}>
          {/* Header */}
          {(eyebrow || title) && (
            <div className={styles.header}>
              {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
              {title && <h1 className={styles.title}>{title}</h1>}
            </div>
          )}

          <div className={styles.layout}>
            {/* Table of Contents */}
            {showToc && tocItems.length > 0 && (
              <aside className={styles.toc}>
                <h4 className={styles.tocTitle}>On this page</h4>
                <nav className={styles.tocNav}>
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={styles.tocLink}
                      style={{
                        paddingLeft: `calc(var(--neo-space-md) * ${item.level || 1})`,
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </aside>
            )}

            {/* Main Content */}
            <article className={styles.article}>
              <div className={styles.prose}>{children}</div>
            </article>

            {/* Sidebar */}
            {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}
          </div>
        </div>
      </section>
    );
  }
);

ContentSection.displayName = 'ContentSection';
