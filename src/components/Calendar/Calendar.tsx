import React, { forwardRef, useState, useMemo } from 'react';
import styles from './Calendar.module.css';

export type CalendarSize = 'sm' | 'md' | 'lg';

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Selected date
   */
  value?: Date | null;
  /**
   * Callback when date is selected
   */
  onChange?: (date: Date) => void;
  /**
   * Size variant
   * @default 'md'
   */
  size?: CalendarSize;
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  /**
   * Disabled dates
   */
  disabledDates?: Date[];
  /**
   * First day of week (0 = Sunday, 1 = Monday)
   * @default 0
   */
  firstDayOfWeek?: 0 | 1;
  /**
   * Month names
   */
  monthNames?: string[];
  /**
   * Day names
   */
  dayNames?: string[];
}

const defaultMonthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const defaultDayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const isSameDay = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

/**
 * Calendar - Neomorphic calendar component
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value,
      onChange,
      size = 'md',
      minDate,
      maxDate,
      disabledDates = [],
      firstDayOfWeek = 0,
      monthNames = defaultMonthNames,
      dayNames = defaultDayNames,
      className,
      ...props
    },
    ref
  ) => {
    const today = new Date();
    const [viewDate, setViewDate] = useState(value || today);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const orderedDayNames = useMemo(() => {
      if (firstDayOfWeek === 0) return dayNames;
      return [...dayNames.slice(firstDayOfWeek), ...dayNames.slice(0, firstDayOfWeek)];
    }, [dayNames, firstDayOfWeek]);

    const calendarDays = useMemo(() => {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();

      let startDay = firstDay.getDay() - firstDayOfWeek;
      if (startDay < 0) startDay += 7;

      const days: (Date | null)[] = [];

      // Add empty slots for days before first of month
      for (let i = 0; i < startDay; i++) {
        days.push(null);
      }

      // Add days of month
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
      }

      // Add empty slots to complete the grid
      while (days.length % 7 !== 0) {
        days.push(null);
      }

      return days;
    }, [year, month, firstDayOfWeek]);

    const isDateDisabled = (date: Date): boolean => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return disabledDates.some((d) => isSameDay(d, date));
    };

    const handlePrevMonth = () => {
      setViewDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
      setViewDate(new Date(year, month + 1, 1));
    };

    const handleDateClick = (date: Date) => {
      if (!isDateDisabled(date)) {
        onChange?.(date);
      }
    };

    const classNames = [
      styles.calendar,
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

    return (
      <div ref={ref} className={classNames} {...props}>
        <div className={styles.header}>
          <button
            className={styles.navButton}
            onClick={handlePrevMonth}
            aria-label="Previous month"
          >
            <ChevronLeft />
          </button>
          <span className={styles.monthYear}>
            {monthNames[month]} {year}
          </span>
          <button
            className={styles.navButton}
            onClick={handleNextMonth}
            aria-label="Next month"
          >
            <ChevronRight />
          </button>
        </div>

        <div className={styles.weekdays}>
          {orderedDayNames.map((day) => (
            <span key={day} className={styles.weekday}>
              {day}
            </span>
          ))}
        </div>

        <div className={styles.days}>
          {calendarDays.map((date, index) => {
            if (!date) {
              return <span key={`empty-${index}`} className={styles.emptyDay} />;
            }

            const isSelected = value && isSameDay(date, value);
            const isToday = isSameDay(date, today);
            const disabled = isDateDisabled(date);

            return (
              <button
                key={date.toISOString()}
                className={[
                  styles.day,
                  isSelected ? styles.selected : '',
                  isToday ? styles.today : '',
                  disabled ? styles.disabled : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleDateClick(date)}
                disabled={disabled}
                aria-selected={isSelected ?? undefined}
                aria-label={date.toDateString()}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';
