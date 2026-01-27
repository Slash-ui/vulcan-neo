import React, { forwardRef } from 'react';
import styles from './Table.module.css';

export type TableSize = 'sm' | 'md' | 'lg';
export type TableVariant = 'flat' | 'striped' | 'bordered';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  accessor: keyof T | ((row: T) => React.ReactNode);
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

export interface TableProps<T> extends Omit<React.HTMLAttributes<HTMLTableElement>, 'children'> {
  /**
   * Column definitions
   */
  columns: Column<T>[];
  /**
   * Data array
   */
  data: T[];
  /**
   * Size variant
   * @default 'md'
   */
  size?: TableSize;
  /**
   * Table variant
   * @default 'flat'
   */
  variant?: TableVariant;
  /**
   * Row key extractor
   */
  rowKey?: keyof T | ((row: T, index: number) => string | number);
  /**
   * Empty state message
   */
  emptyMessage?: React.ReactNode;
  /**
   * Whether to show header
   * @default true
   */
  showHeader?: boolean;
  /**
   * Row click handler
   */
  onRowClick?: (row: T, index: number) => void;
  /**
   * Currently selected row keys
   */
  selectedRows?: (string | number)[];
  /**
   * Loading state
   */
  loading?: boolean;
}

/**
 * Table - Neomorphic data table component
 */
function TableComponent<T extends Record<string, unknown>>(
  {
    columns,
    data,
    size = 'md',
    variant = 'flat',
    rowKey = 'id' as keyof T,
    emptyMessage = 'No data available',
    showHeader = true,
    onRowClick,
    selectedRows,
    loading = false,
    className,
    ...props
  }: TableProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>
) {
  const classNames = [
    styles.tableWrapper,
    styles[size],
    styles[variant],
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const getRowKey = (row: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(row, index);
    }
    return (row[rowKey] as string | number) ?? index;
  };

  const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor] as React.ReactNode;
  };

  const isRowSelected = (row: T, index: number): boolean => {
    if (!selectedRows) return false;
    const key = getRowKey(row, index);
    return selectedRows.includes(key);
  };

  return (
    <div className={classNames}>
      <table ref={ref} className={styles.table} {...props}>
        {showHeader && (
          <thead className={styles.thead}>
            <tr className={styles.headerRow}>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`${styles.th} ${styles[`align-${column.align || 'left'}`]}`}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className={styles.tbody}>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className={styles.loadingCell}>
                <div className={styles.loadingSpinner} />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.emptyCell}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={getRowKey(row, index)}
                className={`${styles.row} ${onRowClick ? styles.clickable : ''} ${isRowSelected(row, index) ? styles.selected : ''}`}
                onClick={() => onRowClick?.(row, index)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`${styles.td} ${styles[`align-${column.align || 'left'}`]}`}
                  >
                    {getCellValue(row, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export const Table = forwardRef(TableComponent) as <T extends Record<string, unknown>>(
  props: TableProps<T> & { ref?: React.ForwardedRef<HTMLTableElement> }
) => React.ReactElement;
