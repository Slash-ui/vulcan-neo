/**
 * DateTime Utilities
 *
 * A collection of date and time utility functions for comparison,
 * range operations, calendar generation, and duration calculations.
 */

// =============================================================================
// TYPES
// =============================================================================

/**
 * Represents a date range with optional start and end dates
 */
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

/**
 * Structured duration broken down into years, months, and days
 */
export interface Duration {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

/**
 * Calendar day entry with date and month membership info
 */
export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
}

/**
 * Day of week (0 = Sunday, 1 = Monday, etc.)
 */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// =============================================================================
// LOCALE CONSTANTS
// =============================================================================

/**
 * Default full month names in English
 */
export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

/**
 * Default abbreviated month names in English
 */
export const MONTH_NAMES_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

/**
 * Default abbreviated day names in English (uppercase)
 */
export const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;

/**
 * Default abbreviated day names in English (capitalized)
 */
export const DAY_NAMES_CAPITALIZED = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

/**
 * Default full day names in English
 */
export const DAY_NAMES_FULL = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

/**
 * Default single-letter day names in English
 */
export const DAY_NAMES_SINGLE = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

// =============================================================================
// DATE COMPARISON FUNCTIONS
// =============================================================================

/**
 * Check if two dates represent the same calendar day
 * (ignores time component)
 */
export const isSameDay = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

/**
 * Check if two dates are in the same month and year
 */
export const isSameMonth = (a: Date, b: Date): boolean => {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
};

/**
 * Check if two dates are in the same year
 */
export const isSameYear = (a: Date, b: Date): boolean => {
  return a.getFullYear() === b.getFullYear();
};

/**
 * Check if a date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return isSameDay(date, today);
};

/**
 * Check if a date falls on a weekend (Saturday or Sunday)
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

/**
 * Check if a date is in the past (before today)
 */
export const isPast = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date.getTime());
  compareDate.setHours(0, 0, 0, 0);
  return compareDate < today;
};

/**
 * Check if a date is in the future (after today)
 */
export const isFuture = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date.getTime());
  compareDate.setHours(0, 0, 0, 0);
  return compareDate > today;
};

// =============================================================================
// DATE RANGE FUNCTIONS
// =============================================================================

/**
 * Check if a date falls within a range (exclusive of boundaries)
 * Returns false if start or end is null
 */
export const isDateInRange = (date: Date, start: Date | null, end: Date | null): boolean => {
  if (!start || !end) return false;
  const time = date.getTime();
  const startTime = start.getTime();
  const endTime = end.getTime();
  // Handle case where start > end
  const [minTime, maxTime] = startTime <= endTime ? [startTime, endTime] : [endTime, startTime];
  return time > minTime && time < maxTime;
};

/**
 * Check if a date falls within a range (inclusive of boundaries)
 * Returns false if start or end is null
 */
export const isDateInRangeInclusive = (
  date: Date,
  start: Date | null,
  end: Date | null
): boolean => {
  if (!start || !end) return false;
  const time = new Date(date.getTime()).setHours(0, 0, 0, 0);
  const startTime = new Date(start.getTime()).setHours(0, 0, 0, 0);
  const endTime = new Date(end.getTime()).setHours(0, 0, 0, 0);
  const [minTime, maxTime] = startTime <= endTime ? [startTime, endTime] : [endTime, startTime];
  return time >= minTime && time <= maxTime;
};

/**
 * Check if a date is the start of a range
 */
export const isRangeStart = (date: Date, start: Date | null): boolean => {
  if (!start) return false;
  return isSameDay(date, start);
};

/**
 * Check if a date is the end of a range
 */
export const isRangeEnd = (date: Date, end: Date | null): boolean => {
  if (!end) return false;
  return isSameDay(date, end);
};

/**
 * Normalize a date range so that start <= end
 * Swaps start and end if start is after end
 */
export const normalizeRange = (range: DateRange): DateRange => {
  if (!range.start || !range.end) return range;
  if (range.start.getTime() <= range.end.getTime()) return range;
  return { start: range.end, end: range.start };
};

// =============================================================================
// DATE CONSTRAINT FUNCTIONS
// =============================================================================

/**
 * Check if a date is disabled based on constraints
 */
export const isDateDisabled = (
  date: Date,
  options: {
    minDate?: Date;
    maxDate?: Date;
    disabledDates?: Date[];
  } = {}
): boolean => {
  const { minDate, maxDate, disabledDates = [] } = options;

  const compareDate = new Date(date.getTime());
  compareDate.setHours(0, 0, 0, 0);

  if (minDate) {
    const min = new Date(minDate.getTime());
    min.setHours(0, 0, 0, 0);
    if (compareDate < min) return true;
  }

  if (maxDate) {
    const max = new Date(maxDate.getTime());
    max.setHours(0, 0, 0, 0);
    if (compareDate > max) return true;
  }

  return disabledDates.some((d) => isSameDay(d, date));
};

// =============================================================================
// CALENDAR GRID FUNCTIONS
// =============================================================================

/**
 * Get the number of days in a month
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Get the first day of the month (0 = Sunday, 6 = Saturday)
 */
export const getFirstDayOfMonth = (year: number, month: number): DayOfWeek => {
  return new Date(year, month, 1).getDay() as DayOfWeek;
};

/**
 * Generate a calendar grid for a given month
 * Includes previous and next month days to fill the grid
 *
 * @param year - The year
 * @param month - The month (0-11)
 * @param firstDayOfWeek - Which day starts the week (0 = Sunday, 1 = Monday)
 * @param weeks - Number of weeks to display (default: 6)
 */
export const getCalendarDays = (
  year: number,
  month: number,
  firstDayOfWeek: 0 | 1 = 0,
  weeks: number = 6
): CalendarDay[] => {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  let startDay = firstDay.getDay() - firstDayOfWeek;
  if (startDay < 0) startDay += 7;

  const days: CalendarDay[] = [];
  const totalDays = weeks * 7;

  // Add previous month days
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  // Add current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // Add next month days to complete the grid
  const remainingDays = totalDays - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  return days;
};

/**
 * Reorder day names array based on first day of week
 */
export const reorderDayNames = <T extends string>(
  dayNames: readonly T[] | T[],
  firstDayOfWeek: 0 | 1
): T[] => {
  if (firstDayOfWeek === 0) return [...dayNames];
  return [...dayNames.slice(firstDayOfWeek), ...dayNames.slice(0, firstDayOfWeek)];
};

/**
 * Generate an array of years within a range
 */
export const getYearRange = (startYear: number, endYear: number): number[] => {
  const years: number[] = [];
  for (let y = startYear; y <= endYear; y++) {
    years.push(y);
  }
  return years;
};

// =============================================================================
// DURATION FUNCTIONS
// =============================================================================

/**
 * Calculate the number of days between two dates
 *
 * @param start - Start date
 * @param end - End date
 * @param inclusive - Whether to include both start and end dates (default: true)
 */
export const getDaysBetween = (start: Date, end: Date, inclusive: boolean = true): number => {
  const startTime = new Date(start.getTime()).setHours(0, 0, 0, 0);
  const endTime = new Date(end.getTime()).setHours(0, 0, 0, 0);
  const diffMs = Math.abs(endTime - startTime);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return inclusive ? days + 1 : days;
};

/**
 * Calculate duration between two dates as years, months, and days
 *
 * @param start - Start date
 * @param end - End date
 * @param inclusive - Whether to include both start and end dates (default: true)
 */
export const calculateDuration = (start: Date, end: Date, inclusive: boolean = true): Duration => {
  const totalDays = getDaysBetween(start, end, inclusive);

  // Calculate approximate years, months, and remaining days
  const years = Math.floor(totalDays / 365);
  const remainingDaysAfterYears = totalDays % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);
  const days = remainingDaysAfterYears % 30;

  return {
    years,
    months,
    days,
    totalDays,
  };
};

/**
 * Format a duration object to a human-readable string
 *
 * @param duration - Duration object
 * @param unit - Unit name for days ('day'/'days' or 'night'/'nights')
 */
export const formatDuration = (
  duration: Duration,
  unit: 'days' | 'nights' = 'days'
): string => {
  const { years, months, days, totalDays } = duration;
  const dayUnit = unit === 'days' ? 'day' : 'night';
  const dayUnits = unit === 'days' ? 'days' : 'nights';

  // Less than 30 days - show only days/nights
  if (totalDays < 30) {
    return `${totalDays} ${totalDays === 1 ? dayUnit : dayUnits}`;
  }

  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  }
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
  }
  if (days > 0) {
    parts.push(`${days} ${days === 1 ? dayUnit : dayUnits}`);
  }

  if (parts.length === 0) {
    return `0 ${dayUnits}`;
  }
  if (parts.length === 1) {
    return parts[0];
  }
  if (parts.length === 2) {
    return parts.join(' and ');
  }
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
};

// =============================================================================
// DATE MANIPULATION FUNCTIONS
// =============================================================================

/**
 * Get a date with time set to midnight (start of day)
 */
export const startOfDay = (date: Date): Date => {
  const result = new Date(date.getTime());
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * Get a date with time set to end of day (23:59:59.999)
 */
export const endOfDay = (date: Date): Date => {
  const result = new Date(date.getTime());
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * Get the first day of a month
 */
export const startOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Get the last day of a month
 */
export const endOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Add days to a date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Add months to a date
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date.getTime());
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Add years to a date
 */
export const addYears = (date: Date, years: number): Date => {
  const result = new Date(date.getTime());
  result.setFullYear(result.getFullYear() + years);
  return result;
};
