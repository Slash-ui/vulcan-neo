import React, { forwardRef, useState, useEffect, useCallback, useRef } from 'react';
import styles from './Carousel.module.css';

export type CarouselSize = 'sm' | 'md' | 'lg';

export interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Carousel slides
   */
  children: React.ReactNode[];
  /**
   * Auto-play interval in ms (0 to disable)
   * @default 0
   */
  autoPlay?: number;
  /**
   * Show navigation arrows
   * @default true
   */
  showArrows?: boolean;
  /**
   * Show pagination dots
   * @default true
   */
  showDots?: boolean;
  /**
   * Enable infinite loop
   * @default false
   */
  loop?: boolean;
  /**
   * Size variant
   * @default 'md'
   */
  size?: CarouselSize;
  /**
   * Callback when slide changes
   */
  onChange?: (index: number) => void;
  /**
   * Initial slide index
   * @default 0
   */
  initialIndex?: number;
}

/**
 * Carousel - Neomorphic carousel/slider component
 */
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      autoPlay = 0,
      showArrows = true,
      showDots = true,
      loop = false,
      size = 'md',
      onChange,
      initialIndex = 0,
      className,
      ...props
    },
    ref
  ) => {
    const slides = React.Children.toArray(children);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

    const totalSlides = slides.length;

    const goToSlide = useCallback(
      (index: number) => {
        if (isTransitioning) return;

        let newIndex = index;
        if (loop) {
          if (index < 0) newIndex = totalSlides - 1;
          if (index >= totalSlides) newIndex = 0;
        } else {
          if (index < 0 || index >= totalSlides) return;
        }

        setIsTransitioning(true);
        setCurrentIndex(newIndex);
        onChange?.(newIndex);

        setTimeout(() => setIsTransitioning(false), 300);
      },
      [isTransitioning, loop, totalSlides, onChange]
    );

    const goNext = useCallback(() => {
      goToSlide(currentIndex + 1);
    }, [currentIndex, goToSlide]);

    const goPrev = useCallback(() => {
      goToSlide(currentIndex - 1);
    }, [currentIndex, goToSlide]);

    // Auto-play
    useEffect(() => {
      if (autoPlay > 0) {
        autoPlayRef.current = setInterval(goNext, autoPlay);
        return () => {
          if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
          }
        };
      }
    }, [autoPlay, goNext]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };

    const classNames = [
      styles.carousel,
      styles[size],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const ChevronLeft = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    );

    const ChevronRight = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    );

    const canGoPrev = loop || currentIndex > 0;
    const canGoNext = loop || currentIndex < totalSlides - 1;

    return (
      <div
        ref={ref}
        className={classNames}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Image carousel"
        {...props}
      >
        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={styles.slide}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${totalSlides}`}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        {showArrows && (
          <>
            <button
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label="Previous slide"
            >
              <ChevronLeft />
            </button>
            <button
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={goNext}
              disabled={!canGoNext}
              aria-label="Next slide"
            >
              <ChevronRight />
            </button>
          </>
        )}

        {showDots && (
          <div className={styles.dots} role="tablist">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';
