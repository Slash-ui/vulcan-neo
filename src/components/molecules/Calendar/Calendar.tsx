import React, { forwardRef, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Typography } from '../../foundation/Typography';
import styles from './Calendar.module.css';

export type CalendarSize = 'sm' | 'md' | 'lg';
export type CalendarElevation = 'low' | 'mid' | 'high';
export type CalendarNavVariant = 'flat' | 'convex';

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
   * Elevation level of the calendar shadow
   * @default 'mid'
   */
  elevation?: CalendarElevation;
  /**
   * Visual style of navigation buttons
   * @default 'convex'
   */
  navVariant?: CalendarNavVariant;
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
   * Highlight weekend days with a different color
   * @default false
   */
  highlightWeekends?: boolean;
  /**
   * Custom color for weekend days (hex value)
   * Only applies when highlightWeekends is true
   * @default uses theme secondary color
   * @example "#FF5733" or "#F53"
   */
  weekendColor?: string;
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

const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
};

// Icon sizes based on calendar size
const iconSizes: Record<CalendarSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
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
      elevation = 'mid',
      navVariant = 'convex',
      minDate,
      maxDate,
      disabledDates = [],
      firstDayOfWeek = 0,
      highlightWeekends = false,
      weekendColor,
      monthNames = defaultMonthNames,
      dayNames = defaultDayNames,
      className,
      style,
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
      styles[`elevation-${elevation}`],
      highlightWeekends ? styles.highlightWeekends : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const customStyle: React.CSSProperties = {
      ...style,
      ...(weekendColor && {
        '--calendar-weekend-color': weekendColor,
      } as React.CSSProperties),
    };

    const navButtonClassNames = [
      styles.navButton,
      styles[`nav-${navVariant}`],
    ]
      .filter(Boolean)
      .join(' ');

    // Typography variants based on size
    const headerVariant = size === 'lg' ? 'h5' : size === 'sm' ? 'body2' : 'h6';
    const weekdayVariant = size === 'lg' ? 'caption' : 'overline';
    const dayVariant = size === 'lg' ? 'body1' : size === 'sm' ? 'caption' : 'body2';

    return (
      <div ref={ref} className={classNames} style={customStyle} {...props}>
        <div className={styles.header}>
          <button
            className={navButtonClassNames}
            onClick={handlePrevMonth}
            aria-label="Previous month"
          >
            <ChevronLeft size={iconSizes[size]} />
          </button>
          <Typography variant={headerVariant} weight="semibold" component="span">
            {monthNames[month]} {year}
          </Typography>
          <button
            className={navButtonClassNames}
            onClick={handleNextMonth}
            aria-label="Next month"
          >
            <ChevronRight size={iconSizes[size]} />
          </button>
        </div>

        <div className={styles.weekdays}>
          {orderedDayNames.map((day) => (
            <Typography
              key={day}
              variant={weekdayVariant}
              weight="semibold"
              color="secondary"
              component="span"
              className={styles.weekday}
            >
              {day}
            </Typography>
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
            const isWeekendDay = isWeekend(date);

            return (
              <button
                key={date.toISOString()}
                className={[
                  styles.day,
                  isSelected ? styles.selected : '',
                  isToday ? styles.today : '',
                  disabled ? styles.disabled : '',
                  isWeekendDay ? styles.weekend : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleDateClick(date)}
                disabled={disabled}
                aria-selected={isSelected ?? undefined}
                aria-label={date.toDateString()}
              >
                <Typography
                  variant={dayVariant}
                  weight={isToday ? 'bold' : 'medium'}
                  color="inherit"
                  component="span"
                >
                  {date.getDate()}
                </Typography>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';
