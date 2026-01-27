import React, { forwardRef, useMemo } from 'react';
import styles from './Pagination.module.css';

export type PaginationSize = 'sm' | 'md' | 'lg';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * Current page (1-indexed)
   */
  page: number;
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   * Callback when page changes
   */
  onChange: (page: number) => void;
  /**
   * Number of page buttons to show
   * @default 5
   */
  siblingCount?: number;
  /**
   * Size of the pagination
   * @default 'md'
   */
  size?: PaginationSize;
  /**
   * Whether to show first/last page buttons
   * @default true
   */
  showFirstLast?: boolean;
  /**
   * Whether to show prev/next buttons
   * @default true
   */
  showPrevNext?: boolean;
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const DOTS = '...';

/**
 * Pagination - Neomorphic pagination component
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page,
      totalPages,
      onChange,
      siblingCount = 1,
      size = 'md',
      showFirstLast = true,
      showPrevNext = true,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const paginationRange = useMemo(() => {
      const totalPageNumbers = siblingCount + 5;

      if (totalPageNumbers >= totalPages) {
        return range(1, totalPages);
      }

      const leftSiblingIndex = Math.max(page - siblingCount, 1);
      const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

      const firstPageIndex = 1;
      const lastPageIndex = totalPages;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = range(1, leftItemCount);
        return [...leftRange, DOTS, totalPages];
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = range(totalPages - rightItemCount + 1, totalPages);
        return [firstPageIndex, DOTS, ...rightRange];
      }

      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      }

      return range(1, totalPages);
    }, [totalPages, page, siblingCount]);

    const handlePageChange = (newPage: number) => {
      if (disabled || newPage < 1 || newPage > totalPages || newPage === page) return;
      onChange(newPage);
    };

    const classNames = [
      styles.pagination,
      styles[size],
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const ChevronLeft = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    );

    const ChevronRight = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    );

    const ChevronsLeft = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="11 17 6 12 11 7" />
        <polyline points="18 17 13 12 18 7" />
      </svg>
    );

    const ChevronsRight = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="13 17 18 12 13 7" />
        <polyline points="6 17 11 12 6 7" />
      </svg>
    );

    return (
      <nav ref={ref} className={classNames} aria-label="Pagination" {...props}>
        <ul className={styles.list}>
          {showFirstLast && (
            <li>
              <button
                className={styles.button}
                onClick={() => handlePageChange(1)}
                disabled={disabled || page === 1}
                aria-label="Go to first page"
              >
                <ChevronsLeft />
              </button>
            </li>
          )}
          {showPrevNext && (
            <li>
              <button
                className={styles.button}
                onClick={() => handlePageChange(page - 1)}
                disabled={disabled || page === 1}
                aria-label="Go to previous page"
              >
                <ChevronLeft />
              </button>
            </li>
          )}
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <li key={`dots-${index}`} className={styles.dots}>
                  {DOTS}
                </li>
              );
            }

            return (
              <li key={pageNumber}>
                <button
                  className={[
                    styles.button,
                    styles.pageButton,
                    page === pageNumber ? styles.active : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => handlePageChange(pageNumber as number)}
                  disabled={disabled}
                  aria-label={`Go to page ${pageNumber}`}
                  aria-current={page === pageNumber ? 'page' : undefined}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}
          {showPrevNext && (
            <li>
              <button
                className={styles.button}
                onClick={() => handlePageChange(page + 1)}
                disabled={disabled || page === totalPages}
                aria-label="Go to next page"
              >
                <ChevronRight />
              </button>
            </li>
          )}
          {showFirstLast && (
            <li>
              <button
                className={styles.button}
                onClick={() => handlePageChange(totalPages)}
                disabled={disabled || page === totalPages}
                aria-label="Go to last page"
              >
                <ChevronsRight />
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';
