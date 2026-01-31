import React, { forwardRef, useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Typography } from '../../foundation/Typography';
import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button';
import { IconButton } from '../../atoms/IconButton';
import { Dropdown } from '../Dropdown';
import {
  MONTH_NAMES,
  DAY_NAMES,
  DAY_NAMES_FULL,
  isSameDay,
  isWeekend,
  isDateInRange,
  isRangeStart,
  isRangeEnd,
  isDateDisabled as checkDateDisabled,
  getCalendarDays,
  reorderDayNames,
  getYearRange,
  calculateDuration as calcDuration,
  type DateRange,
} from '../../../utils/date';
import styles from './Calendar.module.css';

export type CalendarSize = 'sm' | 'md' | 'lg';
export type CalendarElevation = 'low' | 'mid' | 'high';
export type CalendarNavVariant = 'flat' | 'convex';
export type CalendarTodayVariant = 'colored' | 'circle' | 'handdrawn';
export type CalendarVariant = 'full' | 'medium' | 'compact';
export type CalendarDurationUnit = 'days' | 'nights';

export interface CalendarIndicator {
  /**
   * The date to add indicator(s) to
   */
  date: Date;
  /**
   * Color(s) for the indicator dots (hex values or theme colors)
   * Can be a single color or array of colors for multiple dots
   */
  colors: string | string[];
}

// Re-export DateRange from utils for API compatibility
export type { DateRange } from '../../../utils/date';

export interface CalendarProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  /**
   * Selected date (single selection mode)
   */
  value?: Date | null;
  /**
   * Callback when date is selected (single selection mode)
   */
  onChange?: (date: Date) => void;
  /**
   * Enable date range selection mode
   * @default false
   */
  rangeSelection?: boolean;
  /**
   * Selected date range (range selection mode)
   */
  range?: DateRange;
  /**
   * Callback when date range changes (range selection mode)
   */
  onRangeChange?: (range: DateRange) => void;
  /**
   * Calendar layout variant
   * - full: Shows today's date panel on the left
   * - medium: Standard calendar layout (default)
   * - compact: Minimal layout with single-letter weekdays
   * @default 'medium'
   */
  variant?: CalendarVariant;
  /**
   * Size variant (only applies to medium and compact variants)
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
   * How to highlight today's date
   * - colored: Accent color text (default)
   * - circle: Solid circle outline
   * - handdrawn: Hand-drawn style circle
   * @default 'colored'
   */
  todayVariant?: CalendarTodayVariant;
  /**
   * Show a "Today" button that navigates to and selects today
   * @default false
   */
  showTodayButton?: boolean;
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
   */
  weekendColor?: string;
  /**
   * Date indicators (dots) to display below dates
   * Each indicator can have one or more colored dots
   */
  indicators?: CalendarIndicator[];
  /**
   * Year range for the year dropdown
   * @default [currentYear - 10, currentYear + 10]
   */
  yearRange?: [number, number];
  /**
   * Month names
   */
  monthNames?: string[];
  /**
   * Day names (will be truncated to first letter in compact variant)
   */
  dayNames?: string[];
  /**
   * How to display the duration in range selection mode (full variant only)
   * - days: Count includes both start and end dates (e.g., Jan 1-3 = 3 days)
   * - nights: Count excludes end date (e.g., Jan 1-3 = 2 nights)
   * @default 'days'
   */
  durationUnit?: CalendarDurationUnit;
  /**
   * Callback when the displayed month/year changes (navigation)
   */
  onMonthChange?: (year: number, month: number) => void;
  /**
   * Show week numbers in a column on the left
   * @default false
   */
  showWeekNumbers?: boolean;
}

// Use imported constants with local aliases for default props
const defaultMonthNames = [...MONTH_NAMES];
const defaultDayNames = [...DAY_NAMES];
const defaultFullDayNames = [...DAY_NAMES_FULL];

// Hand-drawn circle SVG path
const HanddrawnCircle: React.FC<{ size: number }> = ({ size }) => (
  <svg
    className={styles.handdrawnCircle}
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 8C25 6 10 22 8 50C6 78 25 94 50 92C75 90 94 75 92 50C90 25 75 10 50 8Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      style={{
        strokeDasharray: '4 2',
        animation: 'none',
      }}
    />
  </svg>
);

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
      rangeSelection = false,
      range,
      onRangeChange,
      variant = 'medium',
      size = 'md',
      elevation = 'mid',
      navVariant = 'convex',
      todayVariant = 'colored',
      showTodayButton = false,
      minDate,
      maxDate,
      disabledDates = [],
      firstDayOfWeek = 0,
      highlightWeekends = false,
      weekendColor,
      indicators = [],
      yearRange,
      monthNames = defaultMonthNames,
      dayNames = defaultDayNames,
      durationUnit = 'days',
      onMonthChange,
      showWeekNumbers = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Ref for keyboard navigation
    const daysGridRef = useRef<HTMLDivElement>(null);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [viewDate, setViewDate] = useState(value || range?.start || today);

    // Internal state for range selection (tracks if we're selecting start or end)
    const [rangeSelectionState, setRangeSelectionState] = useState<
      'start' | 'end'
    >('start');
    // Hover state for range preview
    const [hoverDate, setHoverDate] = useState<Date | null>(null);

    // Reset range selection state when range prop changes to a complete range or is cleared
    useEffect(() => {
      if (range?.start && range?.end) {
        setRangeSelectionState('start');
      } else if (!range?.start && !range?.end) {
        setRangeSelectionState('start');
      }
    }, [range?.start, range?.end]);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    // Determine effective size based on variant
    const effectiveSize = variant === 'compact' ? 'sm' : size;

    // Calculate year range
    const currentYear = today.getFullYear();
    const [minYear, maxYear] = yearRange || [
      currentYear - 10,
      currentYear + 10,
    ];
    const years = useMemo(
      () => getYearRange(minYear, maxYear),
      [minYear, maxYear]
    );

    // Get day names based on variant
    const displayDayNames = useMemo(() => {
      const names =
        variant === 'compact'
          ? dayNames.map((d) => d.charAt(0)) // Single letter for compact
          : dayNames;
      return reorderDayNames(names, firstDayOfWeek);
    }, [dayNames, firstDayOfWeek, variant]);

    // Build calendar grid including previous/next month days
    const calendarDays = useMemo(
      () => getCalendarDays(year, month, firstDayOfWeek),
      [year, month, firstDayOfWeek]
    );

    // Create indicator map for quick lookup
    const indicatorMap = useMemo(() => {
      const map = new Map<string, string[]>();
      indicators.forEach(({ date, colors }) => {
        const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        const colorArray = Array.isArray(colors) ? colors : [colors];
        map.set(key, colorArray);
      });
      return map;
    }, [indicators]);

    const getIndicatorsForDate = (date: Date): string[] => {
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      return indicatorMap.get(key) || [];
    };

    const isDisabled = (date: Date): boolean => {
      return checkDateDisabled(date, { minDate, maxDate, disabledDates });
    };

    const handlePrevMonth = () => {
      const newDate = new Date(year, month - 1, 1);
      setViewDate(newDate);
      onMonthChange?.(newDate.getFullYear(), newDate.getMonth());
    };

    const handleNextMonth = () => {
      const newDate = new Date(year, month + 1, 1);
      setViewDate(newDate);
      onMonthChange?.(newDate.getFullYear(), newDate.getMonth());
    };

    const handleMonthSelect = (monthId: string) => {
      const newMonth = parseInt(monthId, 10);
      setViewDate(new Date(year, newMonth, 1));
      onMonthChange?.(year, newMonth);
    };

    const handleYearSelect = (yearId: string) => {
      const newYear = parseInt(yearId, 10);
      setViewDate(new Date(newYear, month, 1));
      onMonthChange?.(newYear, month);
    };

    // Get ISO week number for a date
    const getWeekNumber = (date: Date): number => {
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    };

    // Get week numbers for the calendar grid (one per row)
    const weekNumbers = useMemo(() => {
      if (!showWeekNumbers) return [];
      const weeks: number[] = [];
      for (let i = 0; i < calendarDays.length; i += 7) {
        weeks.push(getWeekNumber(calendarDays[i].date));
      }
      return weeks;
    }, [calendarDays, showWeekNumbers]);

    // Keyboard navigation handler
    const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
      const totalDays = calendarDays.length;
      let newIndex = index;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = index > 0 ? index - 1 : totalDays - 1;
          break;
        case 'ArrowRight':
          e.preventDefault();
          newIndex = index < totalDays - 1 ? index + 1 : 0;
          break;
        case 'ArrowUp':
          e.preventDefault();
          newIndex = index >= 7 ? index - 7 : index + totalDays - 7;
          break;
        case 'ArrowDown':
          e.preventDefault();
          newIndex = index < totalDays - 7 ? index + 7 : index - totalDays + 7;
          break;
        case 'Home':
          e.preventDefault();
          // Go to first day of current week
          newIndex = Math.floor(index / 7) * 7;
          break;
        case 'End':
          e.preventDefault();
          // Go to last day of current week
          newIndex = Math.floor(index / 7) * 7 + 6;
          break;
        case 'PageUp':
          e.preventDefault();
          handlePrevMonth();
          return;
        case 'PageDown':
          e.preventDefault();
          handleNextMonth();
          return;
        case 'Enter':
        case ' ':
          e.preventDefault();
          const { date, isCurrentMonth } = calendarDays[index];
          handleDateClick(date, isCurrentMonth);
          return;
        default:
          return;
      }

      setFocusedIndex(newIndex);
      // Focus the new day button
      const buttons = daysGridRef.current?.querySelectorAll('button');
      if (buttons && buttons[newIndex]) {
        (buttons[newIndex] as HTMLButtonElement).focus();
      }
    }, [calendarDays, handlePrevMonth, handleNextMonth]);

    // Generate dropdown items for months
    const monthItems = useMemo(() => {
      return monthNames.map((name, idx) => ({
        id: String(idx),
        label: name,
      }));
    }, [monthNames]);

    // Generate dropdown items for years
    const yearItems = useMemo(() => {
      return years.map((y) => ({
        id: String(y),
        label: String(y),
      }));
    }, [years]);

    const handleDateClick = (date: Date, isCurrentMonth: boolean) => {
      if (!isCurrentMonth) {
        // Navigate to the month of the clicked date
        setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));
        return;
      }

      if (isDisabled(date)) return;

      if (rangeSelection) {
        // Range selection mode
        if (rangeSelectionState === 'start' || !range?.start) {
          // First click or restarting - set start date
          onRangeChange?.({ start: date, end: null });
          setRangeSelectionState('end');
          setHoverDate(null);
        } else {
          // Second click - set end date
          const start = range.start;
          // Ensure start is before end
          if (date.getTime() < start.getTime()) {
            onRangeChange?.({ start: date, end: start });
          } else {
            onRangeChange?.({ start, end: date });
          }
          setRangeSelectionState('start');
          setHoverDate(null);
        }
      } else {
        // Single selection mode
        onChange?.(date);
      }
    };

    const handleDateHover = (date: Date, isCurrentMonth: boolean) => {
      if (
        rangeSelection &&
        rangeSelectionState === 'end' &&
        range?.start &&
        isCurrentMonth
      ) {
        setHoverDate(date);
      }
    };

    const handleDateLeave = () => {
      // Clear hover state when leaving the calendar grid
      if (rangeSelection && rangeSelectionState === 'end') {
        setHoverDate(null);
      }
    };

    const handleTodayClick = () => {
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);

      // Navigate to today's month
      setViewDate(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));

      if (rangeSelection) {
        // In range mode, set today as start date
        onRangeChange?.({ start: todayDate, end: null });
        setRangeSelectionState('end');
      } else {
        // In single selection mode, select today
        onChange?.(todayDate);
      }
    };

    // Get range display (actual range or preview while hovering)
    const getDisplayRange = (): DateRange => {
      if (!rangeSelection) return { start: null, end: null };

      const start = range?.start || null;
      const end = range?.end || null;

      // If selecting end and hovering, show preview
      if (rangeSelectionState === 'end' && start && hoverDate && !end) {
        return { start, end: hoverDate };
      }

      return { start, end };
    };

    const displayRange = getDisplayRange();

    // Normalize the display range so start <= end for visual display
    const normalizedRange = useMemo(() => {
      if (!displayRange.start || !displayRange.end) return displayRange;
      if (displayRange.start.getTime() <= displayRange.end.getTime())
        return displayRange;
      return { start: displayRange.end, end: displayRange.start };
    }, [displayRange]);

    const classNames = [
      styles.calendar,
      styles[effectiveSize],
      styles[`elevation-${elevation}`],
      styles[`variant-${variant}`],
      highlightWeekends ? styles.highlightWeekends : '',
      rangeSelection ? styles.rangeMode : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const customStyle: React.CSSProperties = {
      ...style,
      ...(weekendColor &&
        ({
          '--calendar-weekend-color': weekendColor,
        } as React.CSSProperties)),
    };


    // Typography variants based on size
    const weekdayVariant = effectiveSize === 'lg' ? 'caption' : 'overline';
    const dayVariant =
      effectiveSize === 'lg'
        ? 'body1'
        : effectiveSize === 'sm'
          ? 'caption'
          : 'body2';

    // Format duration with bold numbers for display
    const formatDurationDisplay = (start: Date, end: Date): React.ReactNode => {
      const isInclusive = durationUnit === 'days';
      const duration = calcDuration(start, end, isInclusive);
      const { years, months, days, totalDays } = duration;

      const unit = durationUnit === 'days' ? 'day' : 'night';
      const units = durationUnit === 'days' ? 'days' : 'nights';

      // Helper to create a part with bold number
      const createPart = (num: number, label: string) => (
        <Typography key={label} variant="body2" component="span" color="inherit">
          <Typography
            variant="body2"
            component="span"
            color="inherit"
            style={{ fontWeight: 700 }}
          >
            {num}
          </Typography>{' '}
          {label}
        </Typography>
      );

      // Less than 30 days - show only days/nights
      if (totalDays < 30) {
        return createPart(totalDays, totalDays === 1 ? unit : units);
      }

      const parts: React.ReactNode[] = [];

      if (years > 0) {
        parts.push(createPart(years, years === 1 ? 'year' : 'years'));
      }
      if (months > 0) {
        parts.push(createPart(months, months === 1 ? 'month' : 'months'));
      }
      if (days > 0) {
        parts.push(createPart(days, days === 1 ? unit : units));
      }

      if (parts.length === 0) {
        return createPart(0, units);
      }
      if (parts.length === 1) {
        return parts[0];
      }
      if (parts.length === 2) {
        return (
          <>
            {parts[0]} and {parts[1]}
          </>
        );
      }
      return (
        <>
          {parts.slice(0, -1).map((part, i) => (
            <span key={i}>
              {part}
              {i < parts.length - 2 ? ', ' : ''}
            </span>
          ))}
          {' and '}
          {parts[parts.length - 1]}
        </>
      );
    };

    // Today panel for full variant
    const renderTodayPanel = () => {
      if (variant !== 'full') return null;

      // Range selection mode
      if (rangeSelection) {
        const start = range?.start;
        const end = range?.end;

        // No dates selected - show placeholder
        if (!start && !end) {
          return (
            <div className={styles.todayPanel}>
              <Typography
                variant="h6"
                color="secondary"
                className={styles.panelLabel}
              >
                Select dates
              </Typography>
              <Typography
                variant="body2"
                color="secondary"
                className={styles.panelHint}
              >
                Click a date to start
              </Typography>
            </div>
          );
        }

        // Only start date selected - show it prominently
        if (start && !end) {
          return (
            <div className={styles.todayPanel}>
              <Typography
                variant="overline"
                color="secondary"
                className={styles.panelLabel}
              >
                From
              </Typography>
              <Typography
                variant="h1"
                color="primary"
                className={styles.todayDay}
              >
                {start.getDate()}
              </Typography>
              <Typography
                variant="h6"
                color="secondary"
                className={styles.todayDayName}
              >
                {defaultFullDayNames[start.getDay()]}
              </Typography>
              <Typography
                variant="body2"
                color="secondary"
                className={styles.todayMonthYear}
              >
                {monthNames[start.getMonth()]} {start.getFullYear()}
              </Typography>
            </div>
          );
        }

        // Both dates selected - show From, To, and Duration
        if (start && end) {
          const duration = formatDurationDisplay(start, end);
          return (
            <div className={`${styles.todayPanel} ${styles.rangePanelFull}`}>
              <div className={styles.rangeDatesWrapper}>
                {/* From date */}
                <div className={styles.rangeDateBlock}>
                  <Typography
                    variant="overline"
                    color="secondary"
                    className={styles.panelLabel}
                  >
                    From
                  </Typography>
                  <Typography
                    variant="h3"
                    color="primary"
                    className={styles.rangeDateDay}
                  >
                    {start.getDate()}
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    {monthNames[start.getMonth()].slice(0, 3)}{' '}
                    {start.getFullYear()}
                  </Typography>
                </div>

                {/* To date */}
                <div className={styles.rangeDateBlock}>
                  <Typography
                    variant="overline"
                    color="secondary"
                    className={styles.panelLabel}
                  >
                    To
                  </Typography>
                  <Typography
                    variant="h3"
                    color="primary"
                    className={styles.rangeDateDay}
                  >
                    {end.getDate()}
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    {monthNames[end.getMonth()].slice(0, 3)} {end.getFullYear()}
                  </Typography>
                </div>
              </div>

              {/* Duration */}
              <div className={styles.durationBlock}>
                <Typography
                  variant="body2"
                  color="primary"
                  className={styles.durationText}
                >
                  {duration}
                </Typography>
              </div>
            </div>
          );
        }
      }

      // Single selection mode
      const displayDate = value || today;

      return (
        <div className={styles.todayPanel}>
          <Typography variant="h1" color="primary" className={styles.todayDay}>
            {displayDate.getDate()}
          </Typography>
          <Typography
            variant="h6"
            color="secondary"
            className={styles.todayDayName}
          >
            {defaultFullDayNames[displayDate.getDay()]}
          </Typography>
          <Typography
            variant="body2"
            color="secondary"
            className={styles.todayMonthYear}
          >
            {monthNames[displayDate.getMonth()]} {displayDate.getFullYear()}
          </Typography>
        </div>
      );
    };

    const renderCalendarContent = () => (
      <div className={styles.calendarContent}>
        {/* Header */}
        <div className={styles.header}>
          {/* Navigation buttons */}
          <div className={styles.navGroup}>
            <IconButton
              icon={<ChevronLeft size={iconSizes[effectiveSize]} />}
              onClick={handlePrevMonth}
              aria-label="Previous month"
              variant={navVariant}
              size={effectiveSize}
              elevation="low"
            />
            <IconButton
              icon={<ChevronRight size={iconSizes[effectiveSize]} />}
              onClick={handleNextMonth}
              aria-label="Next month"
              variant={navVariant}
              size={effectiveSize}
              elevation="low"
            />
          </div>

          {/* Month dropdown */}
          <Dropdown
            trigger={
              <Button
                label={variant === 'compact' ? monthNames[month].slice(0, 3) : monthNames[month]}
                rightIcon={<ChevronDown size={iconSizes[effectiveSize]} />}
                variant={navVariant === 'convex' ? 'convex' : 'flat'}
                size={effectiveSize}
                elevation="low"
              />
            }
            items={monthItems}
            onSelect={handleMonthSelect}
            placement="bottom-start"
          />

          {/* Year dropdown */}
          <Dropdown
            trigger={
              <Button
                label={String(year)}
                rightIcon={<ChevronDown size={iconSizes[effectiveSize]} />}
                variant={navVariant === 'convex' ? 'convex' : 'flat'}
                size={effectiveSize}
                elevation="low"
              />
            }
            items={yearItems}
            onSelect={handleYearSelect}
            placement="bottom-end"
          />
        </div>

        {/* Weekday headers */}
        <div className={[styles.weekdaysWrapper, showWeekNumbers ? styles.withWeekNumbers : ''].filter(Boolean).join(' ')}>
          {/* Week number header spacer */}
          {showWeekNumbers && (
            <Typography
              variant="overline"
              color="secondary"
              component="span"
              className={styles.weekNumberHeader}
            >
              Wk
            </Typography>
          )}
          <div className={styles.weekdays}>
            {displayDayNames.map((day, idx) => (
              <Typography
                key={`${day}-${idx}`}
                variant={weekdayVariant}
                color="secondary"
                component="span"
                className={styles.weekday}
              >
                {day}
              </Typography>
            ))}
          </div>
        </div>

        {/* Days grid with optional week numbers */}
        <div className={[styles.daysWrapper, showWeekNumbers ? styles.withWeekNumbers : ''].filter(Boolean).join(' ')}>
          {/* Week numbers column */}
          {showWeekNumbers && (
            <div className={styles.weekNumbers}>
              {weekNumbers.map((weekNum, idx) => (
                <Typography
                  key={`week-${idx}`}
                  variant="caption"
                  color="secondary"
                  component="span"
                  className={styles.weekNumber}
                >
                  {weekNum}
                </Typography>
              ))}
            </div>
          )}

          {/* Days grid */}
          <div className={styles.days} ref={daysGridRef} role="grid" aria-label="Calendar days">
            {calendarDays.map(({ date, isCurrentMonth }, index) => {
              const isSelected =
                !rangeSelection && value && isSameDay(date, value);
              const isToday = isSameDay(date, today);
              const disabled = isCurrentMonth && isDisabled(date);
              const isWeekendDay = isWeekend(date);
              const dateIndicators = getIndicatorsForDate(date);

              // Range selection states using normalized range for visual display
              const isStartOfRange =
                rangeSelection && isRangeStart(date, normalizedRange.start);
              const isEndOfRange =
                rangeSelection && isRangeEnd(date, normalizedRange.end);
              const isInRange =
                rangeSelection &&
                isDateInRange(date, normalizedRange.start, normalizedRange.end);
              const isRangePreview =
                rangeSelection &&
                rangeSelectionState === 'end' &&
                !range?.end &&
                hoverDate;

              return (
                <button
                  key={`${date.toISOString()}-${index}`}
                  className={[
                    styles.day,
                    isSelected ? styles.selected : '',
                    isToday && isCurrentMonth ? styles.today : '',
                    isToday && isCurrentMonth
                      ? styles[`today-${todayVariant}`]
                      : '',
                    disabled ? styles.disabled : '',
                    isWeekendDay ? styles.weekend : '',
                    !isCurrentMonth ? styles.otherMonth : '',
                    isStartOfRange ? styles.rangeStart : '',
                    isEndOfRange ? styles.rangeEnd : '',
                    isInRange ? styles.inRange : '',
                    isRangePreview && isInRange ? styles.rangePreview : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handleDateClick(date, isCurrentMonth)}
                  onMouseEnter={() => handleDateHover(date, isCurrentMonth)}
                  onMouseLeave={handleDateLeave}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  disabled={disabled}
                  tabIndex={focusedIndex === index || (focusedIndex === null && index === 0) ? 0 : -1}
                  role="gridcell"
                  aria-selected={
                    isSelected || isStartOfRange || isEndOfRange || undefined
                  }
                  aria-label={date.toDateString()}
                >
                  {/* Handdrawn circle for today */}
                  {isToday && isCurrentMonth && todayVariant === 'handdrawn' && (
                    <HanddrawnCircle
                      size={
                        effectiveSize === 'lg'
                          ? 52
                          : effectiveSize === 'sm'
                            ? 32
                            : 44
                      }
                    />
                  )}
                  <Typography
                    variant={dayVariant}
                    color="inherit"
                    component="span"
                    style={
                      isToday && isCurrentMonth ? { fontWeight: 700 } : undefined
                    }
                  >
                    {String(date.getDate()).padStart(2, '0')}
                  </Typography>
                  {dateIndicators.length > 0 && (
                    <div className={styles.indicators}>
                      {dateIndicators.map((color, idx) => (
                        <Badge
                          key={idx}
                          dot
                          size="sm"
                          filled
                          customColor={color}
                          className={styles.indicator}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Today button */}
        {showTodayButton && (
          <div className={styles.footer}>
            <Button
              label="Today"
              variant={navVariant === 'convex' ? 'convex' : 'flat'}
              size={effectiveSize}
              elevation="low"
              onClick={handleTodayClick}
            />
          </div>
        )}
      </div>
    );

    return (
      <div ref={ref} className={classNames} style={customStyle} {...props}>
        {renderTodayPanel()}
        {renderCalendarContent()}
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';
