import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  // Constants
  MONTH_NAMES,
  MONTH_NAMES_SHORT,
  DAY_NAMES,
  DAY_NAMES_CAPITALIZED,
  DAY_NAMES_FULL,
  DAY_NAMES_SINGLE,
  // Date comparison
  isSameDay,
  isSameMonth,
  isSameYear,
  isToday,
  isWeekend,
  isPast,
  isFuture,
  // Date range
  isDateInRange,
  isDateInRangeInclusive,
  isRangeStart,
  isRangeEnd,
  normalizeRange,
  // Date constraints
  isDateDisabled,
  // Calendar grid
  getDaysInMonth,
  getFirstDayOfMonth,
  getCalendarDays,
  reorderDayNames,
  getYearRange,
  // Duration
  getDaysBetween,
  calculateDuration,
  formatDuration,
  // Date manipulation
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  addDays,
  addMonths,
  addYears,
} from './datetime';

// =============================================================================
// LOCALE CONSTANTS
// =============================================================================

describe('locale constants', () => {
  describe('MONTH_NAMES', () => {
    it('has 12 months', () => {
      expect(MONTH_NAMES).toHaveLength(12);
    });

    it('starts with January and ends with December', () => {
      expect(MONTH_NAMES[0]).toBe('January');
      expect(MONTH_NAMES[11]).toBe('December');
    });
  });

  describe('MONTH_NAMES_SHORT', () => {
    it('has 12 months', () => {
      expect(MONTH_NAMES_SHORT).toHaveLength(12);
    });

    it('has abbreviated names', () => {
      expect(MONTH_NAMES_SHORT[0]).toBe('Jan');
      expect(MONTH_NAMES_SHORT[11]).toBe('Dec');
    });
  });

  describe('DAY_NAMES', () => {
    it('has 7 days', () => {
      expect(DAY_NAMES).toHaveLength(7);
    });

    it('starts with Sunday', () => {
      expect(DAY_NAMES[0]).toBe('SUN');
      expect(DAY_NAMES[6]).toBe('SAT');
    });
  });

  describe('DAY_NAMES_CAPITALIZED', () => {
    it('has capitalized names', () => {
      expect(DAY_NAMES_CAPITALIZED[0]).toBe('Sun');
      expect(DAY_NAMES_CAPITALIZED[1]).toBe('Mon');
    });
  });

  describe('DAY_NAMES_FULL', () => {
    it('has full day names', () => {
      expect(DAY_NAMES_FULL[0]).toBe('Sunday');
      expect(DAY_NAMES_FULL[3]).toBe('Wednesday');
    });
  });

  describe('DAY_NAMES_SINGLE', () => {
    it('has single letter names', () => {
      expect(DAY_NAMES_SINGLE).toEqual(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
    });
  });
});

// =============================================================================
// DATE COMPARISON FUNCTIONS
// =============================================================================

describe('date comparison functions', () => {
  describe('isSameDay', () => {
    it('returns true for same dates', () => {
      const date1 = new Date(2024, 5, 15);
      const date2 = new Date(2024, 5, 15);
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it('returns true for same day with different times', () => {
      const date1 = new Date(2024, 5, 15, 9, 30);
      const date2 = new Date(2024, 5, 15, 18, 45);
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it('returns false for different days', () => {
      const date1 = new Date(2024, 5, 15);
      const date2 = new Date(2024, 5, 16);
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('returns false for different months', () => {
      const date1 = new Date(2024, 5, 15);
      const date2 = new Date(2024, 6, 15);
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('returns false for different years', () => {
      const date1 = new Date(2024, 5, 15);
      const date2 = new Date(2025, 5, 15);
      expect(isSameDay(date1, date2)).toBe(false);
    });
  });

  describe('isSameMonth', () => {
    it('returns true for same month and year', () => {
      const date1 = new Date(2024, 5, 1);
      const date2 = new Date(2024, 5, 30);
      expect(isSameMonth(date1, date2)).toBe(true);
    });

    it('returns false for different months', () => {
      const date1 = new Date(2024, 5, 15);
      const date2 = new Date(2024, 6, 15);
      expect(isSameMonth(date1, date2)).toBe(false);
    });

    it('returns false for same month different year', () => {
      const date1 = new Date(2024, 5, 15);
      const date2 = new Date(2025, 5, 15);
      expect(isSameMonth(date1, date2)).toBe(false);
    });
  });

  describe('isSameYear', () => {
    it('returns true for same year', () => {
      const date1 = new Date(2024, 0, 1);
      const date2 = new Date(2024, 11, 31);
      expect(isSameYear(date1, date2)).toBe(true);
    });

    it('returns false for different years', () => {
      const date1 = new Date(2024, 5, 15);
      const date2 = new Date(2025, 5, 15);
      expect(isSameYear(date1, date2)).toBe(false);
    });
  });

  describe('isToday', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns true for today', () => {
      vi.setSystemTime(new Date(2024, 5, 15, 12, 0, 0));
      expect(isToday(new Date(2024, 5, 15))).toBe(true);
    });

    it('returns true for today with different time', () => {
      vi.setSystemTime(new Date(2024, 5, 15, 12, 0, 0));
      expect(isToday(new Date(2024, 5, 15, 23, 59, 59))).toBe(true);
    });

    it('returns false for yesterday', () => {
      vi.setSystemTime(new Date(2024, 5, 15, 12, 0, 0));
      expect(isToday(new Date(2024, 5, 14))).toBe(false);
    });

    it('returns false for tomorrow', () => {
      vi.setSystemTime(new Date(2024, 5, 15, 12, 0, 0));
      expect(isToday(new Date(2024, 5, 16))).toBe(false);
    });
  });

  describe('isWeekend', () => {
    it('returns true for Saturday', () => {
      // June 15, 2024 is a Saturday
      expect(isWeekend(new Date(2024, 5, 15))).toBe(true);
    });

    it('returns true for Sunday', () => {
      // June 16, 2024 is a Sunday
      expect(isWeekend(new Date(2024, 5, 16))).toBe(true);
    });

    it('returns false for Monday', () => {
      // June 17, 2024 is a Monday
      expect(isWeekend(new Date(2024, 5, 17))).toBe(false);
    });

    it('returns false for Friday', () => {
      // June 14, 2024 is a Friday
      expect(isWeekend(new Date(2024, 5, 14))).toBe(false);
    });
  });

  describe('isPast', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 5, 15, 12, 0, 0));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns true for dates before today', () => {
      expect(isPast(new Date(2024, 5, 14))).toBe(true);
      expect(isPast(new Date(2024, 4, 15))).toBe(true);
      expect(isPast(new Date(2023, 5, 15))).toBe(true);
    });

    it('returns false for today', () => {
      expect(isPast(new Date(2024, 5, 15))).toBe(false);
    });

    it('returns false for future dates', () => {
      expect(isPast(new Date(2024, 5, 16))).toBe(false);
    });
  });

  describe('isFuture', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 5, 15, 12, 0, 0));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns true for dates after today', () => {
      expect(isFuture(new Date(2024, 5, 16))).toBe(true);
      expect(isFuture(new Date(2024, 6, 15))).toBe(true);
      expect(isFuture(new Date(2025, 5, 15))).toBe(true);
    });

    it('returns false for today', () => {
      expect(isFuture(new Date(2024, 5, 15))).toBe(false);
    });

    it('returns false for past dates', () => {
      expect(isFuture(new Date(2024, 5, 14))).toBe(false);
    });
  });
});

// =============================================================================
// DATE RANGE FUNCTIONS
// =============================================================================

describe('date range functions', () => {
  describe('isDateInRange', () => {
    const start = new Date(2024, 5, 10);
    const end = new Date(2024, 5, 20);

    it('returns true for date within range (exclusive)', () => {
      expect(isDateInRange(new Date(2024, 5, 15), start, end)).toBe(true);
    });

    it('returns false for start date (exclusive)', () => {
      expect(isDateInRange(new Date(2024, 5, 10), start, end)).toBe(false);
    });

    it('returns false for end date (exclusive)', () => {
      expect(isDateInRange(new Date(2024, 5, 20), start, end)).toBe(false);
    });

    it('returns false for date before range', () => {
      expect(isDateInRange(new Date(2024, 5, 5), start, end)).toBe(false);
    });

    it('returns false for date after range', () => {
      expect(isDateInRange(new Date(2024, 5, 25), start, end)).toBe(false);
    });

    it('returns false if start is null', () => {
      expect(isDateInRange(new Date(2024, 5, 15), null, end)).toBe(false);
    });

    it('returns false if end is null', () => {
      expect(isDateInRange(new Date(2024, 5, 15), start, null)).toBe(false);
    });

    it('handles reversed range (start > end)', () => {
      expect(isDateInRange(new Date(2024, 5, 15), end, start)).toBe(true);
    });
  });

  describe('isDateInRangeInclusive', () => {
    const start = new Date(2024, 5, 10);
    const end = new Date(2024, 5, 20);

    it('returns true for date within range', () => {
      expect(isDateInRangeInclusive(new Date(2024, 5, 15), start, end)).toBe(true);
    });

    it('returns true for start date (inclusive)', () => {
      expect(isDateInRangeInclusive(new Date(2024, 5, 10), start, end)).toBe(true);
    });

    it('returns true for end date (inclusive)', () => {
      expect(isDateInRangeInclusive(new Date(2024, 5, 20), start, end)).toBe(true);
    });

    it('returns false for date before range', () => {
      expect(isDateInRangeInclusive(new Date(2024, 5, 5), start, end)).toBe(false);
    });

    it('returns false for date after range', () => {
      expect(isDateInRangeInclusive(new Date(2024, 5, 25), start, end)).toBe(false);
    });

    it('returns false if start is null', () => {
      expect(isDateInRangeInclusive(new Date(2024, 5, 15), null, end)).toBe(false);
    });

    it('returns false if end is null', () => {
      expect(isDateInRangeInclusive(new Date(2024, 5, 15), start, null)).toBe(false);
    });
  });

  describe('isRangeStart', () => {
    it('returns true for start date', () => {
      const start = new Date(2024, 5, 10);
      expect(isRangeStart(new Date(2024, 5, 10), start)).toBe(true);
    });

    it('returns false for different date', () => {
      const start = new Date(2024, 5, 10);
      expect(isRangeStart(new Date(2024, 5, 15), start)).toBe(false);
    });

    it('returns false if start is null', () => {
      expect(isRangeStart(new Date(2024, 5, 10), null)).toBe(false);
    });
  });

  describe('isRangeEnd', () => {
    it('returns true for end date', () => {
      const end = new Date(2024, 5, 20);
      expect(isRangeEnd(new Date(2024, 5, 20), end)).toBe(true);
    });

    it('returns false for different date', () => {
      const end = new Date(2024, 5, 20);
      expect(isRangeEnd(new Date(2024, 5, 15), end)).toBe(false);
    });

    it('returns false if end is null', () => {
      expect(isRangeEnd(new Date(2024, 5, 20), null)).toBe(false);
    });
  });

  describe('normalizeRange', () => {
    it('returns same range if start <= end', () => {
      const range = { start: new Date(2024, 5, 10), end: new Date(2024, 5, 20) };
      const result = normalizeRange(range);
      expect(result.start).toEqual(range.start);
      expect(result.end).toEqual(range.end);
    });

    it('swaps start and end if start > end', () => {
      const start = new Date(2024, 5, 20);
      const end = new Date(2024, 5, 10);
      const range = { start, end };
      const result = normalizeRange(range);
      expect(result.start).toEqual(end);
      expect(result.end).toEqual(start);
    });

    it('returns same range if start is null', () => {
      const range = { start: null, end: new Date(2024, 5, 20) };
      const result = normalizeRange(range);
      expect(result).toEqual(range);
    });

    it('returns same range if end is null', () => {
      const range = { start: new Date(2024, 5, 10), end: null };
      const result = normalizeRange(range);
      expect(result).toEqual(range);
    });

    it('returns same range if both are null', () => {
      const range = { start: null, end: null };
      const result = normalizeRange(range);
      expect(result).toEqual(range);
    });
  });
});

// =============================================================================
// DATE CONSTRAINT FUNCTIONS
// =============================================================================

describe('date constraint functions', () => {
  describe('isDateDisabled', () => {
    it('returns false with no constraints', () => {
      expect(isDateDisabled(new Date(2024, 5, 15))).toBe(false);
    });

    it('returns true for date before minDate', () => {
      const minDate = new Date(2024, 5, 10);
      expect(isDateDisabled(new Date(2024, 5, 5), { minDate })).toBe(true);
    });

    it('returns false for date equal to minDate', () => {
      const minDate = new Date(2024, 5, 10);
      expect(isDateDisabled(new Date(2024, 5, 10), { minDate })).toBe(false);
    });

    it('returns false for date after minDate', () => {
      const minDate = new Date(2024, 5, 10);
      expect(isDateDisabled(new Date(2024, 5, 15), { minDate })).toBe(false);
    });

    it('returns true for date after maxDate', () => {
      const maxDate = new Date(2024, 5, 20);
      expect(isDateDisabled(new Date(2024, 5, 25), { maxDate })).toBe(true);
    });

    it('returns false for date equal to maxDate', () => {
      const maxDate = new Date(2024, 5, 20);
      expect(isDateDisabled(new Date(2024, 5, 20), { maxDate })).toBe(false);
    });

    it('returns false for date before maxDate', () => {
      const maxDate = new Date(2024, 5, 20);
      expect(isDateDisabled(new Date(2024, 5, 15), { maxDate })).toBe(false);
    });

    it('returns true for date in disabledDates', () => {
      const disabledDates = [new Date(2024, 5, 15), new Date(2024, 5, 20)];
      expect(isDateDisabled(new Date(2024, 5, 15), { disabledDates })).toBe(true);
    });

    it('returns false for date not in disabledDates', () => {
      const disabledDates = [new Date(2024, 5, 15), new Date(2024, 5, 20)];
      expect(isDateDisabled(new Date(2024, 5, 16), { disabledDates })).toBe(false);
    });

    it('handles combined constraints', () => {
      const options = {
        minDate: new Date(2024, 5, 10),
        maxDate: new Date(2024, 5, 20),
        disabledDates: [new Date(2024, 5, 15)],
      };
      expect(isDateDisabled(new Date(2024, 5, 5), options)).toBe(true); // before min
      expect(isDateDisabled(new Date(2024, 5, 25), options)).toBe(true); // after max
      expect(isDateDisabled(new Date(2024, 5, 15), options)).toBe(true); // disabled
      expect(isDateDisabled(new Date(2024, 5, 12), options)).toBe(false); // valid
    });
  });
});

// =============================================================================
// CALENDAR GRID FUNCTIONS
// =============================================================================

describe('calendar grid functions', () => {
  describe('getDaysInMonth', () => {
    it('returns 31 for January', () => {
      expect(getDaysInMonth(2024, 0)).toBe(31);
    });

    it('returns 28 for February in non-leap year', () => {
      expect(getDaysInMonth(2023, 1)).toBe(28);
    });

    it('returns 29 for February in leap year', () => {
      expect(getDaysInMonth(2024, 1)).toBe(29);
    });

    it('returns 30 for April', () => {
      expect(getDaysInMonth(2024, 3)).toBe(30);
    });

    it('returns 31 for December', () => {
      expect(getDaysInMonth(2024, 11)).toBe(31);
    });
  });

  describe('getFirstDayOfMonth', () => {
    it('returns correct day for January 2024 (Monday)', () => {
      expect(getFirstDayOfMonth(2024, 0)).toBe(1); // Monday
    });

    it('returns correct day for June 2024 (Saturday)', () => {
      expect(getFirstDayOfMonth(2024, 5)).toBe(6); // Saturday
    });

    it('returns correct day for September 2024 (Sunday)', () => {
      expect(getFirstDayOfMonth(2024, 8)).toBe(0); // Sunday
    });
  });

  describe('getCalendarDays', () => {
    it('returns 42 days (6 weeks) by default', () => {
      const days = getCalendarDays(2024, 5); // June 2024
      expect(days).toHaveLength(42);
    });

    it('includes previous month days at start', () => {
      const days = getCalendarDays(2024, 5); // June 2024 starts on Saturday
      // First day should be from May (previous month)
      expect(days[0].isCurrentMonth).toBe(false);
      expect(days[0].date.getMonth()).toBe(4); // May
    });

    it('includes current month days', () => {
      const days = getCalendarDays(2024, 5); // June 2024
      const currentMonthDays = days.filter((d) => d.isCurrentMonth);
      expect(currentMonthDays).toHaveLength(30); // June has 30 days
    });

    it('includes next month days at end', () => {
      const days = getCalendarDays(2024, 5); // June 2024
      const lastDay = days[days.length - 1];
      expect(lastDay.isCurrentMonth).toBe(false);
      expect(lastDay.date.getMonth()).toBe(6); // July
    });

    it('respects firstDayOfWeek = 1 (Monday)', () => {
      const days = getCalendarDays(2024, 0, 1); // January 2024, Monday first
      // January 1, 2024 is a Monday, so first day should be Jan 1
      expect(days[0].date.getDate()).toBe(1);
      expect(days[0].isCurrentMonth).toBe(true);
    });

    it('respects custom weeks parameter when month fits', () => {
      // February 2026 starts on Sunday, so it fits perfectly in 4 weeks (28 days)
      const days = getCalendarDays(2026, 1, 0, 4); // 4 weeks for Feb 2026
      expect(days).toHaveLength(28);
    });

    it('returns more than requested weeks if month needs it', () => {
      // June 2024 starts on Saturday, needs 6 prev month days + 30 June days = 36 minimum
      const days = getCalendarDays(2024, 5, 0, 5); // 5 weeks requested
      expect(days.length).toBeGreaterThanOrEqual(35);
    });
  });

  describe('reorderDayNames', () => {
    it('returns same order for firstDayOfWeek = 0', () => {
      const result = reorderDayNames(DAY_NAMES, 0);
      expect(result).toEqual([...DAY_NAMES]);
    });

    it('reorders for firstDayOfWeek = 1 (Monday first)', () => {
      const result = reorderDayNames(DAY_NAMES, 1);
      expect(result[0]).toBe('MON');
      expect(result[6]).toBe('SUN');
    });

    it('works with full day names', () => {
      const result = reorderDayNames(DAY_NAMES_FULL, 1);
      expect(result[0]).toBe('Monday');
      expect(result[6]).toBe('Sunday');
    });
  });

  describe('getYearRange', () => {
    it('returns array of years from start to end', () => {
      const result = getYearRange(2020, 2025);
      expect(result).toEqual([2020, 2021, 2022, 2023, 2024, 2025]);
    });

    it('returns single year if start equals end', () => {
      const result = getYearRange(2024, 2024);
      expect(result).toEqual([2024]);
    });

    it('returns empty array if start > end', () => {
      const result = getYearRange(2025, 2020);
      expect(result).toEqual([]);
    });
  });
});

// =============================================================================
// DURATION FUNCTIONS
// =============================================================================

describe('duration functions', () => {
  describe('getDaysBetween', () => {
    it('returns 1 for same day (inclusive)', () => {
      const date = new Date(2024, 5, 15);
      expect(getDaysBetween(date, date, true)).toBe(1);
    });

    it('returns 0 for same day (exclusive)', () => {
      const date = new Date(2024, 5, 15);
      expect(getDaysBetween(date, date, false)).toBe(0);
    });

    it('returns correct count for date range (inclusive)', () => {
      const start = new Date(2024, 5, 10);
      const end = new Date(2024, 5, 15);
      expect(getDaysBetween(start, end, true)).toBe(6); // 10, 11, 12, 13, 14, 15
    });

    it('returns correct count for date range (exclusive)', () => {
      const start = new Date(2024, 5, 10);
      const end = new Date(2024, 5, 15);
      expect(getDaysBetween(start, end, false)).toBe(5); // nights between
    });

    it('handles reversed dates', () => {
      const start = new Date(2024, 5, 15);
      const end = new Date(2024, 5, 10);
      expect(getDaysBetween(start, end, true)).toBe(6);
    });

    it('defaults to inclusive', () => {
      const start = new Date(2024, 5, 10);
      const end = new Date(2024, 5, 15);
      expect(getDaysBetween(start, end)).toBe(6);
    });
  });

  describe('calculateDuration', () => {
    it('returns correct duration for short period', () => {
      const start = new Date(2024, 5, 10);
      const end = new Date(2024, 5, 15);
      const result = calculateDuration(start, end, true);
      expect(result.totalDays).toBe(6);
      expect(result.years).toBe(0);
      expect(result.months).toBe(0);
      expect(result.days).toBe(6);
    });

    it('returns correct duration for months', () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 2, 15); // ~74 days
      const result = calculateDuration(start, end, true);
      expect(result.totalDays).toBe(75);
      expect(result.years).toBe(0);
      expect(result.months).toBe(2);
      expect(result.days).toBe(15);
    });

    it('returns correct duration for years', () => {
      const start = new Date(2022, 0, 1);
      const end = new Date(2024, 6, 15); // ~2.5 years
      const result = calculateDuration(start, end, true);
      expect(result.years).toBeGreaterThanOrEqual(2);
      expect(result.totalDays).toBeGreaterThan(365 * 2);
    });

    it('handles exclusive counting', () => {
      const start = new Date(2024, 5, 10);
      const end = new Date(2024, 5, 15);
      const inclusive = calculateDuration(start, end, true);
      const exclusive = calculateDuration(start, end, false);
      expect(inclusive.totalDays).toBe(exclusive.totalDays + 1);
    });
  });

  describe('formatDuration', () => {
    it('formats single day', () => {
      const duration = { years: 0, months: 0, days: 1, totalDays: 1 };
      expect(formatDuration(duration, 'days')).toBe('1 day');
    });

    it('formats multiple days', () => {
      const duration = { years: 0, months: 0, days: 5, totalDays: 5 };
      expect(formatDuration(duration, 'days')).toBe('5 days');
    });

    it('formats nights unit', () => {
      const duration = { years: 0, months: 0, days: 5, totalDays: 5 };
      expect(formatDuration(duration, 'nights')).toBe('5 nights');
    });

    it('formats single night', () => {
      const duration = { years: 0, months: 0, days: 1, totalDays: 1 };
      expect(formatDuration(duration, 'nights')).toBe('1 night');
    });

    it('formats months and days', () => {
      const duration = { years: 0, months: 2, days: 15, totalDays: 75 };
      expect(formatDuration(duration, 'days')).toBe('2 months and 15 days');
    });

    it('formats single month', () => {
      const duration = { years: 0, months: 1, days: 0, totalDays: 30 };
      expect(formatDuration(duration, 'days')).toBe('1 month');
    });

    it('formats years, months, and days', () => {
      const duration = { years: 2, months: 3, days: 15, totalDays: 825 };
      expect(formatDuration(duration, 'days')).toBe('2 years, 3 months and 15 days');
    });

    it('formats single year', () => {
      const duration = { years: 1, months: 0, days: 0, totalDays: 365 };
      expect(formatDuration(duration, 'days')).toBe('1 year');
    });

    it('formats years and months without days', () => {
      const duration = { years: 1, months: 6, days: 0, totalDays: 545 };
      expect(formatDuration(duration, 'days')).toBe('1 year and 6 months');
    });

    it('returns 0 days for zero duration', () => {
      const duration = { years: 0, months: 0, days: 0, totalDays: 0 };
      expect(formatDuration(duration, 'days')).toBe('0 days');
    });

    it('shows only days/nights for totalDays < 30', () => {
      const duration = { years: 0, months: 0, days: 25, totalDays: 25 };
      expect(formatDuration(duration, 'days')).toBe('25 days');
    });
  });
});

// =============================================================================
// DATE MANIPULATION FUNCTIONS
// =============================================================================

describe('date manipulation functions', () => {
  describe('startOfDay', () => {
    it('sets time to midnight', () => {
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);
      const result = startOfDay(date);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it('preserves the date', () => {
      const date = new Date(2024, 5, 15, 14, 30);
      const result = startOfDay(date);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(15);
    });

    it('does not mutate original date', () => {
      const date = new Date(2024, 5, 15, 14, 30);
      startOfDay(date);
      expect(date.getHours()).toBe(14);
    });
  });

  describe('endOfDay', () => {
    it('sets time to end of day', () => {
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);
      const result = endOfDay(date);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });

    it('preserves the date', () => {
      const date = new Date(2024, 5, 15, 14, 30);
      const result = endOfDay(date);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(15);
    });

    it('does not mutate original date', () => {
      const date = new Date(2024, 5, 15, 14, 30);
      endOfDay(date);
      expect(date.getHours()).toBe(14);
    });
  });

  describe('startOfMonth', () => {
    it('returns first day of month', () => {
      const date = new Date(2024, 5, 15);
      const result = startOfMonth(date);
      expect(result.getDate()).toBe(1);
      expect(result.getMonth()).toBe(5);
      expect(result.getFullYear()).toBe(2024);
    });

    it('works for last day of month', () => {
      const date = new Date(2024, 5, 30);
      const result = startOfMonth(date);
      expect(result.getDate()).toBe(1);
    });
  });

  describe('endOfMonth', () => {
    it('returns last day of month', () => {
      const date = new Date(2024, 5, 15); // June
      const result = endOfMonth(date);
      expect(result.getDate()).toBe(30); // June has 30 days
      expect(result.getMonth()).toBe(5);
    });

    it('handles February in leap year', () => {
      const date = new Date(2024, 1, 15); // February 2024
      const result = endOfMonth(date);
      expect(result.getDate()).toBe(29);
    });

    it('handles February in non-leap year', () => {
      const date = new Date(2023, 1, 15); // February 2023
      const result = endOfMonth(date);
      expect(result.getDate()).toBe(28);
    });

    it('handles months with 31 days', () => {
      const date = new Date(2024, 0, 15); // January
      const result = endOfMonth(date);
      expect(result.getDate()).toBe(31);
    });
  });

  describe('addDays', () => {
    it('adds positive days', () => {
      const date = new Date(2024, 5, 15);
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(20);
    });

    it('subtracts with negative days', () => {
      const date = new Date(2024, 5, 15);
      const result = addDays(date, -5);
      expect(result.getDate()).toBe(10);
    });

    it('crosses month boundary', () => {
      const date = new Date(2024, 5, 28); // June 28
      const result = addDays(date, 5);
      expect(result.getMonth()).toBe(6); // July
      expect(result.getDate()).toBe(3);
    });

    it('crosses year boundary', () => {
      const date = new Date(2024, 11, 30); // December 30
      const result = addDays(date, 5);
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0); // January
    });

    it('does not mutate original date', () => {
      const date = new Date(2024, 5, 15);
      addDays(date, 5);
      expect(date.getDate()).toBe(15);
    });
  });

  describe('addMonths', () => {
    it('adds positive months', () => {
      const date = new Date(2024, 5, 15); // June
      const result = addMonths(date, 3);
      expect(result.getMonth()).toBe(8); // September
    });

    it('subtracts with negative months', () => {
      const date = new Date(2024, 5, 15); // June
      const result = addMonths(date, -3);
      expect(result.getMonth()).toBe(2); // March
    });

    it('crosses year boundary', () => {
      const date = new Date(2024, 10, 15); // November
      const result = addMonths(date, 3);
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(1); // February
    });

    it('does not mutate original date', () => {
      const date = new Date(2024, 5, 15);
      addMonths(date, 3);
      expect(date.getMonth()).toBe(5);
    });
  });

  describe('addYears', () => {
    it('adds positive years', () => {
      const date = new Date(2024, 5, 15);
      const result = addYears(date, 2);
      expect(result.getFullYear()).toBe(2026);
    });

    it('subtracts with negative years', () => {
      const date = new Date(2024, 5, 15);
      const result = addYears(date, -2);
      expect(result.getFullYear()).toBe(2022);
    });

    it('preserves month and day', () => {
      const date = new Date(2024, 5, 15);
      const result = addYears(date, 1);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(15);
    });

    it('does not mutate original date', () => {
      const date = new Date(2024, 5, 15);
      addYears(date, 2);
      expect(date.getFullYear()).toBe(2024);
    });
  });
});
