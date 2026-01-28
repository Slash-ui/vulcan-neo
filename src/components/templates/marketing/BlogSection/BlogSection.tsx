import React, { forwardRef } from 'react';
import { Badge } from '../Badge';
import { Avatar } from '../Avatar';
import styles from './BlogSection.module.css';

export interface BlogPost {
  title: string;
  excerpt?: string;
  image?: string;
  category?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  date?: string;
  readTime?: string;
  href?: string;
}

export interface BlogSectionProps extends React.HTMLAttributes<HTMLElement> {
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
   * Blog posts to display
   */
  posts: BlogPost[];
  /**
   * Layout variant
   * @default 'grid'
   */
  variant?: 'grid' | 'list' | 'featured';
  /**
   * Number of columns (for grid layout)
   * @default 3
   */
  columns?: 2 | 3;
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
 * BlogSection - Marketing blog posts section
 */
export const BlogSection = forwardRef<HTMLElement, BlogSectionProps>(
  (
    {
      eyebrow,
      title,
      description,
      posts,
      variant = 'grid',
      columns = 3,
      viewAllText,
      viewAllHref,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [styles.blog, styles[variant], className]
      .filter(Boolean)
      .join(' ');

    const renderPostCard = (post: BlogPost, index: number, featured = false) => {
      const CardWrapper = post.href ? 'a' : 'div';
      const wrapperProps = post.href
        ? { href: post.href, className: styles.cardLink }
        : {};

      return (
        <CardWrapper
          key={index}
          {...wrapperProps}
          className={`${styles.card} ${featured ? styles.featuredCard : ''}`}
        >
          {post.image && (
            <div className={styles.imageWrapper}>
              <img src={post.image} alt={post.title} className={styles.image} />
            </div>
          )}
          <div className={styles.content}>
            {post.category && (
              <Badge color="primary" size="sm" className={styles.category}>
                {post.category}
              </Badge>
            )}
            <h3 className={styles.postTitle}>{post.title}</h3>
            {post.excerpt && (
              <p className={styles.excerpt}>{post.excerpt}</p>
            )}
            <div className={styles.meta}>
              {post.author && (
                <div className={styles.author}>
                  {post.author.avatar && (
                    <Avatar
                      src={post.author.avatar}
                      alt={post.author.name}
                      size="sm"
                    />
                  )}
                  <span className={styles.authorName}>{post.author.name}</span>
                </div>
              )}
              {(post.date || post.readTime) && (
                <div className={styles.details}>
                  {post.date && <span>{post.date}</span>}
                  {post.date && post.readTime && <span>·</span>}
                  {post.readTime && <span>{post.readTime}</span>}
                </div>
              )}
            </div>
          </div>
        </CardWrapper>
      );
    };

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

          {/* Grid Layout */}
          {variant === 'grid' && (
            <div
              className={styles.grid}
              style={{ '--columns': columns } as React.CSSProperties}
            >
              {posts.map((post, index) => renderPostCard(post, index))}
            </div>
          )}

          {/* List Layout */}
          {variant === 'list' && (
            <div className={styles.list}>
              {posts.map((post, index) => renderPostCard(post, index))}
            </div>
          )}

          {/* Featured Layout */}
          {variant === 'featured' && posts.length > 0 && (
            <div className={styles.featured}>
              <div className={styles.featuredMain}>
                {renderPostCard(posts[0], 0, true)}
              </div>
              {posts.length > 1 && (
                <div className={styles.featuredSide}>
                  {posts.slice(1, 4).map((post, index) =>
                    renderPostCard(post, index + 1)
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }
);

BlogSection.displayName = 'BlogSection';
