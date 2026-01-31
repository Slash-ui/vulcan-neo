import React, { forwardRef, useState } from 'react';
import { Avatar } from '../../../atoms/Avatar';
import { IconButton } from '../../../atoms/IconButton';
import styles from './TestimonialSection.module.css';

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number;
}

export interface TestimonialSectionProps extends React.HTMLAttributes<HTMLElement> {
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
   * Testimonials to display
   */
  testimonials: Testimonial[];
  /**
   * Layout variant
   * @default 'grid'
   */
  variant?: 'grid' | 'carousel' | 'single' | 'masonry';
  /**
   * Number of columns (for grid layout)
   * @default 3
   */
  columns?: 2 | 3;
}

/**
 * TestimonialSection - Marketing testimonials section
 */
export const TestimonialSection = forwardRef<HTMLElement, TestimonialSectionProps>(
  (
    {
      eyebrow,
      title,
      description,
      testimonials,
      variant = 'grid',
      columns = 3,
      className,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const classNames = [styles.testimonials, styles[variant], className]
      .filter(Boolean)
      .join(' ');

    const renderStars = (rating: number) => {
      return Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={i < rating ? styles.starFilled : styles.starEmpty}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M8 1L10.163 5.279L15 6.009L11.5 9.388L12.326 14.2L8 11.972L3.674 14.2L4.5 9.388L1 6.009L5.837 5.279L8 1Z" />
        </svg>
      ));
    };

    const handlePrev = () => {
      setCurrentIndex((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
    };

    const handleNext = () => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    };

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

          {/* Grid Layout */}
          {variant === 'grid' && (
            <div
              className={styles.grid}
              style={{ '--columns': columns } as React.CSSProperties}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.card}>
                  {testimonial.rating && (
                    <div className={styles.rating}>
                      {renderStars(testimonial.rating)}
                    </div>
                  )}
                  <blockquote className={styles.quote}>
                    "{testimonial.quote}"
                  </blockquote>
                  <div className={styles.author}>
                    {testimonial.avatar && (
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        size="md"
                      />
                    )}
                    <div className={styles.authorInfo}>
                      <span className={styles.authorName}>
                        {testimonial.author}
                      </span>
                      {(testimonial.role || testimonial.company) && (
                        <span className={styles.authorRole}>
                          {testimonial.role}
                          {testimonial.role && testimonial.company && ', '}
                          {testimonial.company}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Carousel Layout */}
          {variant === 'carousel' && (
            <div className={styles.carouselWrapper}>
              <IconButton
                variant="convex"
                size="md"
                onClick={handlePrev}
                className={styles.navButton}
                aria-label="Previous testimonial"
                icon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M12.5 15L7.5 10L12.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
              <div className={styles.carouselContent}>
                <div className={styles.carouselCard}>
                  {testimonials[currentIndex].rating && (
                    <div className={styles.rating}>
                      {renderStars(testimonials[currentIndex].rating!)}
                    </div>
                  )}
                  <blockquote className={styles.carouselQuote}>
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  <div className={styles.author}>
                    {testimonials[currentIndex].avatar && (
                      <Avatar
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].author}
                        size="lg"
                      />
                    )}
                    <div className={styles.authorInfo}>
                      <span className={styles.authorName}>
                        {testimonials[currentIndex].author}
                      </span>
                      {(testimonials[currentIndex].role ||
                        testimonials[currentIndex].company) && (
                        <span className={styles.authorRole}>
                          {testimonials[currentIndex].role}
                          {testimonials[currentIndex].role &&
                            testimonials[currentIndex].company &&
                            ', '}
                          {testimonials[currentIndex].company}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.dots}>
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <IconButton
                variant="convex"
                size="md"
                onClick={handleNext}
                className={styles.navButton}
                aria-label="Next testimonial"
                icon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M7.5 15L12.5 10L7.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
            </div>
          )}

          {/* Single Layout */}
          {variant === 'single' && testimonials[0] && (
            <div className={styles.singleCard}>
              {testimonials[0].rating && (
                <div className={styles.rating}>
                  {renderStars(testimonials[0].rating)}
                </div>
              )}
              <blockquote className={styles.singleQuote}>
                "{testimonials[0].quote}"
              </blockquote>
              <div className={styles.author}>
                {testimonials[0].avatar && (
                  <Avatar
                    src={testimonials[0].avatar}
                    alt={testimonials[0].author}
                    size="lg"
                  />
                )}
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>
                    {testimonials[0].author}
                  </span>
                  {(testimonials[0].role || testimonials[0].company) && (
                    <span className={styles.authorRole}>
                      {testimonials[0].role}
                      {testimonials[0].role && testimonials[0].company && ', '}
                      {testimonials[0].company}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Masonry Layout */}
          {variant === 'masonry' && (
            <div className={styles.masonry}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.card}>
                  {testimonial.rating && (
                    <div className={styles.rating}>
                      {renderStars(testimonial.rating)}
                    </div>
                  )}
                  <blockquote className={styles.quote}>
                    "{testimonial.quote}"
                  </blockquote>
                  <div className={styles.author}>
                    {testimonial.avatar && (
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        size="md"
                      />
                    )}
                    <div className={styles.authorInfo}>
                      <span className={styles.authorName}>
                        {testimonial.author}
                      </span>
                      {(testimonial.role || testimonial.company) && (
                        <span className={styles.authorRole}>
                          {testimonial.role}
                          {testimonial.role && testimonial.company && ', '}
                          {testimonial.company}
                        </span>
                      )}
                    </div>
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

TestimonialSection.displayName = 'TestimonialSection';
