import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Calendar, CalendarIndicator, DateRange } from './Calendar';
import { Surface } from '../../foundation/Surface';

/**
 * A date picker component for selecting dates from a monthly calendar view.
 * Provides intuitive navigation between months and years with customizable date constraints.
 *
 * ## When to Use
 *
 * - **Date selection**: Booking, scheduling, and appointment forms
 * - **Date filtering**: Filter content by date ranges
 * - **Event displays**: Show dates with events using colored indicators
 * - **Form inputs**: Date fields in registration or checkout forms
 * - **Date range selection**: Hotel bookings, leave requests, report periods
 *
 * ## Key Features
 *
 * - **Layout variants**: Full (with today panel), medium (default), and compact
 * - **Size variants**: Small, medium, and large for different contexts
 * - **Elevation levels**: Low, mid, and high shadow depth
 * - **Navigation styles**: Flat or convex navigation buttons
 * - **Today indicators**: Colored text, circle outline, or hand-drawn style
 * - **Today button**: Quick navigation to select today
 * - **Month/Year dropdowns**: Quick navigation to any month or year
 * - **Date indicators**: Colored dots to mark events or important dates
 * - **Weekend highlighting**: Optionally highlight weekends with custom colors
 * - **Adjacent month days**: Shows previous/next month days for context
 * - **Date constraints**: Min/max dates and specific disabled dates
 * - **Localization**: Customizable month and day names
 * - **Week start**: Option to start week on Sunday or Monday
 * - **Range selection**: Select start and end dates with visual preview
 * - **Accessible**: Full keyboard navigation and ARIA support
 *
 * ## Best Practices
 *
 * - Set appropriate min/max dates to prevent invalid selections
 * - Use localized month and day names for international users
 * - Use indicators to highlight dates with events or deadlines
 * - Consider the context when choosing size (inline vs modal)
 */
const meta: Meta<typeof Calendar> = {
  title: 'Molecules/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface
        theme="light"
        style={{
          padding: '3rem',
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Layout
    variant: {
      control: 'select',
      options: ['full', 'medium', 'compact'],
      description: 'Calendar layout variant (full shows today panel on left)',
      table: { category: 'Layout', defaultValue: { summary: 'medium' } },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the calendar',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    elevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
      description: 'Shadow depth level of the calendar',
      table: { category: 'Appearance', defaultValue: { summary: 'mid' } },
    },
    navVariant: {
      control: 'select',
      options: ['flat', 'convex'],
      description: 'Visual style of navigation buttons',
      table: { category: 'Appearance', defaultValue: { summary: 'convex' } },
    },
    todayVariant: {
      control: 'select',
      options: ['colored', 'circle', 'handdrawn'],
      description: 'How to highlight today\'s date',
      table: { category: 'Appearance', defaultValue: { summary: 'colored' } },
    },
    showTodayButton: {
      control: 'boolean',
      description: 'Show a "Today" button that navigates to and selects today',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
    highlightWeekends: {
      control: 'boolean',
      description: 'Highlight weekend days (Saturday and Sunday) with a different color',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
    weekendColor: {
      control: 'color',
      description: 'Custom color for weekend days (only applies when highlightWeekends is true)',
      table: { category: 'Appearance' },
    },

    // State
    value: {
      control: 'date',
      description: 'Currently selected date (single selection mode)',
      table: { category: 'State' },
    },
    rangeSelection: {
      control: 'boolean',
      description: 'Enable date range selection mode',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    range: {
      control: false,
      description: 'Selected date range (range selection mode)',
      table: { category: 'State' },
    },

    // Behavior
    firstDayOfWeek: {
      control: 'select',
      options: [0, 1],
      description: 'First day of week (0 = Sunday, 1 = Monday)',
      table: { category: 'Behavior', defaultValue: { summary: '0' } },
    },
    minDate: {
      control: 'date',
      description: 'Minimum selectable date',
      table: { category: 'Behavior' },
    },
    maxDate: {
      control: 'date',
      description: 'Maximum selectable date',
      table: { category: 'Behavior' },
    },
    disabledDates: {
      control: false,
      description: 'Array of dates that cannot be selected',
      table: { category: 'Behavior' },
    },
    yearRange: {
      control: false,
      description: 'Year range for the year dropdown [min, max]',
      table: { category: 'Behavior' },
    },
    indicators: {
      control: false,
      description: 'Date indicators (colored dots) to display below dates',
      table: { category: 'Behavior' },
    },
    durationUnit: {
      control: 'select',
      options: ['days', 'nights'],
      description: 'How to display duration in range mode (days=inclusive, nights=exclusive)',
      table: { category: 'Behavior', defaultValue: { summary: 'days' } },
    },

    // Localization
    monthNames: {
      control: false,
      description: 'Custom month names for localization',
      table: { category: 'Localization' },
    },
    dayNames: {
      control: false,
      description: 'Custom day names for localization',
      table: { category: 'Localization' },
    },

    // Events
    onChange: {
      action: 'changed',
      description: 'Callback when a date is selected (single selection mode)',
      table: { category: 'Events' },
    },
    onRangeChange: {
      action: 'rangeChanged',
      description: 'Callback when date range changes (range selection mode)',
      table: { category: 'Events' },
    },
    onMonthChange: {
      action: 'monthChanged',
      description: 'Callback when the displayed month/year changes via navigation',
      table: { category: 'Events' },
    },

    // Features
    showWeekNumbers: {
      control: 'boolean',
      description: 'Show ISO week numbers in a column on the left',
      table: { category: 'Features', defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default calendar with month/year dropdowns and date selection.
 * Click a date to select it, use dropdowns to navigate months and years.
 * Use the controls panel to modify all props and see changes in real-time.
 */
export const Default: Story = {
  args: {
    variant: 'medium',
    size: 'md',
    elevation: 'mid',
    navVariant: 'convex',
    todayVariant: 'colored',
    showTodayButton: false,
    firstDayOfWeek: 0,
    highlightWeekends: false,
    rangeSelection: false,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    return (
      <div>
        <Calendar
          {...args}
          value={args.rangeSelection ? undefined : date}
          onChange={args.rangeSelection ? undefined : setDate}
          range={args.rangeSelection ? range : undefined}
          onRangeChange={args.rangeSelection ? setRange : undefined}
        />
        <div style={{ marginTop: '1rem', color: 'var(--neo-text-secondary)' }}>
          {args.rangeSelection ? (
            range.start && range.end ? (
              <p>Range: {range.start.toDateString()} - {range.end.toDateString()}</p>
            ) : range.start ? (
              <p>Start: {range.start.toDateString()} (click another date for end)</p>
            ) : (
              <p>Click a date to start selecting a range</p>
            )
          ) : (
            date ? (
              <p>Selected: {date.toDateString()}</p>
            ) : (
              <p>Click a date to select</p>
            )
          )}
        </div>
      </div>
    );
  },
};

// =============================================================================
// WITH INDICATORS
// =============================================================================

/**
 * Calendar with colored dot indicators to mark events or important dates.
 * Each date can have one or multiple colored dots.
 */
export const WithIndicators: Story = {
  args: {
    variant: 'medium',
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const indicators: CalendarIndicator[] = [
      { date: new Date(year, month, 1), colors: '#f59e0b' },
      { date: new Date(year, month, 4), colors: '#f59e0b' },
      { date: new Date(year, month, 13), colors: '#ec4899' },
      { date: new Date(year, month, 15), colors: ['#60a5fa', '#a78bfa'] },
      { date: new Date(year, month, 18), colors: '#22c55e' },
      { date: new Date(year, month, 23), colors: '#f59e0b' },
      { date: new Date(year, month, 28), colors: '#f59e0b' },
    ];

    return (
      <div>
        <Calendar {...args} value={date} onChange={setDate} indicators={indicators} />
        {date && (
          <p style={{ marginTop: '1rem', color: 'var(--neo-text-secondary)' }}>
            Selected: {date.toDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Multiple indicators on a single date to show multiple events.
 */
export const MultipleIndicators: Story = {
  args: {
    variant: 'medium',
    size: 'md',
  },
  render: (args) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const indicators: CalendarIndicator[] = [
      { date: new Date(year, month, 5), colors: ['#ef4444', '#3b82f6', '#22c55e'] },
      { date: new Date(year, month, 10), colors: ['#f59e0b', '#8b5cf6'] },
      { date: new Date(year, month, 15), colors: ['#ec4899'] },
      { date: new Date(year, month, 20), colors: ['#06b6d4', '#f97316', '#84cc16', '#a855f7'] },
    ];

    return <Calendar {...args} indicators={indicators} />;
  },
};

// =============================================================================
// WITH SELECTED DATE
// =============================================================================

/**
 * Calendar with a pre-selected date (today).
 */
export const WithSelectedDate: Story = {
  args: {
    size: 'md',
    elevation: 'mid',
    navVariant: 'convex',
  },
  render: (args) => {
    const [date, setDate] = useState<Date>(new Date());

    return <Calendar {...args} value={date} onChange={setDate} />;
  },
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Three size options for different use cases and container sizes.
 */
export const Sizes: Story = {
  args: {
    elevation: 'mid',
    navVariant: 'convex',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Small
        </p>
        <Calendar {...args} size="sm" />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Medium (default)
        </p>
        <Calendar {...args} size="md" />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Large
        </p>
        <Calendar {...args} size="lg" />
      </div>
    </div>
  ),
};

// =============================================================================
// ELEVATIONS
// =============================================================================

/**
 * Three elevation levels for different shadow depths.
 */
export const Elevations: Story = {
  args: {
    size: 'md',
    navVariant: 'convex',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Low
        </p>
        <Calendar {...args} elevation="low" />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Mid (default)
        </p>
        <Calendar {...args} elevation="mid" />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          High
        </p>
        <Calendar {...args} elevation="high" />
      </div>
    </div>
  ),
};

// =============================================================================
// NAVIGATION VARIANTS
// =============================================================================

/**
 * Flat navigation buttons have no shadow, creating a minimal appearance.
 */
export const FlatNavigation: Story = {
  args: {
    navVariant: 'flat',
    size: 'md',
    elevation: 'mid',
  },
};

/**
 * Comparison of navigation button styles.
 */
export const NavigationVariants: Story = {
  args: {
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Convex (default)
        </p>
        <Calendar {...args} navVariant="convex" />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Flat
        </p>
        <Calendar {...args} navVariant="flat" />
      </div>
    </div>
  ),
};

// =============================================================================
// WEEKEND HIGHLIGHTING
// =============================================================================

/**
 * Highlight weekend days (Saturday and Sunday) with a distinct color.
 */
export const HighlightWeekends: Story = {
  args: {
    highlightWeekends: true,
    size: 'md',
    elevation: 'mid',
  },
};

/**
 * Custom weekend color for brand-specific styling.
 */
export const CustomWeekendColor: Story = {
  args: {
    highlightWeekends: true,
    weekendColor: '#e91e63',
    size: 'md',
    elevation: 'mid',
  },
};

/**
 * Various weekend color options.
 */
export const WeekendColorOptions: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Default (secondary)
        </p>
        <Calendar {...args} highlightWeekends />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Pink
        </p>
        <Calendar {...args} highlightWeekends weekendColor="#e91e63" />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Orange
        </p>
        <Calendar {...args} highlightWeekends weekendColor="#ff9800" />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Red
        </p>
        <Calendar {...args} highlightWeekends weekendColor="#f44336" />
      </div>
    </div>
  ),
};

// =============================================================================
// WEEK START
// =============================================================================

/**
 * Calendar with Monday as the first day of the week.
 */
export const MondayFirst: Story = {
  args: {
    firstDayOfWeek: 1,
    size: 'md',
    elevation: 'mid',
  },
};

/**
 * Comparison of Sunday vs Monday week start.
 */
export const WeekStartComparison: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Sunday First (default)
        </p>
        <Calendar {...args} firstDayOfWeek={0} />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Monday First
        </p>
        <Calendar {...args} firstDayOfWeek={1} />
      </div>
    </div>
  ),
};

// =============================================================================
// DATE CONSTRAINTS
// =============================================================================

/**
 * Calendar with minimum and maximum date constraints.
 * Only dates within the current month are selectable.
 */
export const WithMinMaxDates: Story = {
  args: {
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--neo-text-secondary)' }}>
          Only dates in the current month are selectable
        </p>
        <Calendar
          {...args}
          value={date}
          onChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    );
  },
};

/**
 * Calendar with specific dates disabled.
 */
export const WithDisabledDates: Story = {
  args: {
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const today = new Date();
    const disabledDates = [
      new Date(today.getFullYear(), today.getMonth(), 10),
      new Date(today.getFullYear(), today.getMonth(), 15),
      new Date(today.getFullYear(), today.getMonth(), 20),
    ];
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--neo-text-secondary)' }}>
          Dates 10, 15, and 20 are disabled
        </p>
        <Calendar
          {...args}
          value={date}
          onChange={setDate}
          disabledDates={disabledDates}
        />
      </div>
    );
  },
};

/**
 * Calendar allowing only future dates (today and onwards).
 */
export const FutureDatesOnly: Story = {
  args: {
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--neo-text-secondary)' }}>
          Only today and future dates are selectable
        </p>
        <Calendar {...args} value={date} onChange={setDate} minDate={today} />
      </div>
    );
  },
};

// =============================================================================
// YEAR RANGE
// =============================================================================

/**
 * Custom year range for the year dropdown.
 */
export const CustomYearRange: Story = {
  args: {
    yearRange: [2020, 2030],
    size: 'md',
    elevation: 'mid',
  },
};

// =============================================================================
// LOCALIZATION
// =============================================================================

/**
 * Calendar with Spanish month and day names.
 */
export const SpanishLocale: Story = {
  args: {
    size: 'md',
    elevation: 'mid',
    firstDayOfWeek: 1,
  },
  render: (args) => {
    const spanishMonths = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const spanishDays = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

    return (
      <Calendar
        {...args}
        monthNames={spanishMonths}
        dayNames={spanishDays}
      />
    );
  },
};

/**
 * Calendar with German month and day names.
 */
export const GermanLocale: Story = {
  args: {
    size: 'md',
    elevation: 'mid',
    firstDayOfWeek: 1,
  },
  render: (args) => {
    const germanMonths = [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ];
    const germanDays = ['SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA'];

    return (
      <Calendar
        {...args}
        monthNames={germanMonths}
        dayNames={germanDays}
      />
    );
  },
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Calendar adapts to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const indicators: CalendarIndicator[] = [
      { date: new Date(year, month, 5), colors: '#f59e0b' },
      { date: new Date(year, month, 12), colors: '#22c55e' },
      { date: new Date(year, month, 18), colors: ['#60a5fa', '#ec4899'] },
    ];

    return <Calendar {...args} value={date} onChange={setDate} indicators={indicators} />;
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

/**
 * All sizes in dark theme.
 */
export const DarkThemeSizes: Story = {
  args: {
    elevation: 'mid',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Small
        </p>
        <Calendar {...args} size="sm" />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Medium
        </p>
        <Calendar {...args} size="md" />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Large
        </p>
        <Calendar {...args} size="lg" />
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

// =============================================================================
// RANGE SELECTION
// =============================================================================

/**
 * Enable range selection mode to select a start and end date.
 * Click once to set the start date, then click again to set the end date.
 * Hover over dates to preview the range before confirming.
 */
export const RangeSelection: Story = {
  args: {
    rangeSelection: true,
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    return (
      <div>
        <Calendar
          {...args}
          range={range}
          onRangeChange={setRange}
        />
        <div style={{ marginTop: '1rem', color: 'var(--neo-text-secondary)' }}>
          {range.start && range.end ? (
            <p>
              Selected: {range.start.toDateString()} - {range.end.toDateString()}
            </p>
          ) : range.start ? (
            <p>Start: {range.start.toDateString()} (click another date for end)</p>
          ) : (
            <p>Click a date to start selecting a range</p>
          )}
        </div>
      </div>
    );
  },
};

/**
 * Range selection with a pre-selected range.
 */
export const RangeSelectionPreSelected: Story = {
  args: {
    rangeSelection: true,
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 10);
    const end = new Date(today.getFullYear(), today.getMonth(), 20);
    const [range, setRange] = useState<DateRange>({ start, end });

    return (
      <div>
        <Calendar
          {...args}
          range={range}
          onRangeChange={setRange}
        />
        <div style={{ marginTop: '1rem', color: 'var(--neo-text-secondary)' }}>
          {range.start && range.end && (
            <p>
              Selected: {range.start.toDateString()} - {range.end.toDateString()}
            </p>
          )}
        </div>
      </div>
    );
  },
};

/**
 * Range selection with weekend highlighting.
 */
export const RangeWithWeekends: Story = {
  args: {
    rangeSelection: true,
    highlightWeekends: true,
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    return (
      <div>
        <Calendar
          {...args}
          range={range}
          onRangeChange={setRange}
        />
        <div style={{ marginTop: '1rem', color: 'var(--neo-text-secondary)' }}>
          {range.start && range.end ? (
            <p>
              Selected: {range.start.toDateString()} - {range.end.toDateString()}
            </p>
          ) : range.start ? (
            <p>Start: {range.start.toDateString()} (click another date for end)</p>
          ) : (
            <p>Click a date to start selecting a range</p>
          )}
        </div>
      </div>
    );
  },
};

/**
 * Range selection with date constraints.
 * Only allows selecting within the current month.
 */
export const RangeWithConstraints: Story = {
  args: {
    rangeSelection: true,
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    return (
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--neo-text-secondary)' }}>
          Only dates in the current month are selectable
        </p>
        <Calendar
          {...args}
          range={range}
          onRangeChange={setRange}
          minDate={minDate}
          maxDate={maxDate}
        />
        {range.start && range.end && (
          <p style={{ marginTop: '1rem', color: 'var(--neo-text-secondary)' }}>
            Selected: {range.start.toDateString()} - {range.end.toDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Range selection in dark theme.
 */
export const RangeSelectionDark: Story = {
  args: {
    rangeSelection: true,
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    return (
      <div>
        <Calendar
          {...args}
          range={range}
          onRangeChange={setRange}
        />
        <div style={{ marginTop: '1rem', color: 'var(--neo-text-secondary)' }}>
          {range.start && range.end ? (
            <p>
              Selected: {range.start.toDateString()} - {range.end.toDateString()}
            </p>
          ) : range.start ? (
            <p>Start: {range.start.toDateString()}</p>
          ) : (
            <p>Click a date to start selecting a range</p>
          )}
        </div>
      </div>
    );
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

// =============================================================================
// CALENDAR VARIANTS
// =============================================================================

/**
 * Full variant shows the selected date (or today if none) in a panel on the left.
 * In single selection mode, the panel updates to show the selected date.
 * Great for dashboard widgets or standalone date displays.
 */
export const FullVariant: Story = {
  args: {
    variant: 'full',
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <Calendar
        {...args}
        value={date}
        onChange={setDate}
      />
    );
  },
};

/**
 * Medium variant is the standard calendar layout (default).
 */
export const MediumVariant: Story = {
  args: {
    variant: 'medium',
    size: 'md',
    elevation: 'mid',
  },
};

/**
 * Compact variant uses single-letter weekday names and smaller sizing.
 * Ideal for tight spaces or mobile interfaces.
 */
export const CompactVariant: Story = {
  args: {
    variant: 'compact',
    elevation: 'mid',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <Calendar
        {...args}
        value={date}
        onChange={setDate}
      />
    );
  },
};

/**
 * Comparison of all three calendar variants.
 */
export const VariantComparison: Story = {
  args: {
    elevation: 'mid',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Compact
        </p>
        <Calendar {...args} variant="compact" />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Medium (default)
        </p>
        <Calendar {...args} variant="medium" />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Full
        </p>
        <Calendar {...args} variant="full" />
      </div>
    </div>
  ),
};

// =============================================================================
// TODAY VARIANTS
// =============================================================================

/**
 * Colored today variant highlights today with accent color text (default).
 */
export const TodayColored: Story = {
  args: {
    todayVariant: 'colored',
    size: 'md',
    elevation: 'mid',
  },
};

/**
 * Circle today variant shows a solid circle outline around today.
 */
export const TodayCircle: Story = {
  args: {
    todayVariant: 'circle',
    size: 'md',
    elevation: 'mid',
  },
};

/**
 * Handdrawn today variant shows a sketchy, hand-drawn circle around today.
 */
export const TodayHanddrawn: Story = {
  args: {
    todayVariant: 'handdrawn',
    size: 'md',
    elevation: 'mid',
  },
};

/**
 * Comparison of all today indicator variants.
 */
export const TodayVariantComparison: Story = {
  args: {
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Colored (default)
        </p>
        <Calendar {...args} todayVariant="colored" />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Circle
        </p>
        <Calendar {...args} todayVariant="circle" />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Handdrawn
        </p>
        <Calendar {...args} todayVariant="handdrawn" />
      </div>
    </div>
  ),
};

// =============================================================================
// TODAY BUTTON
// =============================================================================

/**
 * Calendar with a "Today" button for quick navigation.
 * In single selection mode, clicking Today selects today's date.
 */
export const WithTodayButton: Story = {
  args: {
    showTodayButton: true,
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div>
        <Calendar
          {...args}
          value={date}
          onChange={setDate}
        />
        {date && (
          <p style={{ marginTop: '1rem', color: 'var(--neo-text-secondary)' }}>
            Selected: {date.toDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Today button with range selection.
 * Clicking Today sets today as the start date of the range.
 */
export const TodayButtonWithRange: Story = {
  args: {
    rangeSelection: true,
    showTodayButton: true,
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    return (
      <div>
        <Calendar
          {...args}
          range={range}
          onRangeChange={setRange}
        />
        <div style={{ marginTop: '1rem', color: 'var(--neo-text-secondary)' }}>
          {range.start && range.end ? (
            <p>
              Selected: {range.start.toDateString()} - {range.end.toDateString()}
            </p>
          ) : range.start ? (
            <p>Start: {range.start.toDateString()} (click another date for end)</p>
          ) : (
            <p>Click "Today" or a date to start selecting</p>
          )}
        </div>
      </div>
    );
  },
};

// =============================================================================
// COMBINED FEATURES
// =============================================================================

/**
 * Full calendar variant with all features enabled.
 */
export const FullFeatured: Story = {
  args: {
    variant: 'full',
    todayVariant: 'handdrawn',
    showTodayButton: true,
    highlightWeekends: true,
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const indicators: CalendarIndicator[] = [
      { date: new Date(year, month, 5), colors: '#f59e0b' },
      { date: new Date(year, month, 12), colors: '#22c55e' },
      { date: new Date(year, month, 18), colors: ['#60a5fa', '#ec4899'] },
      { date: new Date(year, month, 25), colors: '#8b5cf6' },
    ];

    return (
      <Calendar
        {...args}
        indicators={indicators}
        value={date}
        onChange={setDate}
      />
    );
  },
};

/**
 * Full variant in dark theme.
 */
export const FullVariantDark: Story = {
  args: {
    variant: 'full',
    todayVariant: 'circle',
    showTodayButton: true,
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <Calendar
        {...args}
        value={date}
        onChange={setDate}
      />
    );
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

// =============================================================================
// FULL VARIANT WITH RANGE SELECTION
// =============================================================================

/**
 * Full variant with range selection shows From/To dates and duration in the left panel.
 * The panel dynamically updates as you select dates.
 */
export const FullVariantRangeSelection: Story = {
  args: {
    variant: 'full',
    rangeSelection: true,
    durationUnit: 'days',
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    return (
      <Calendar
        {...args}
        range={range}
        onRangeChange={setRange}
      />
    );
  },
};

/**
 * Full variant with pre-selected range shows the duration calculation.
 */
export const FullVariantRangePreSelected: Story = {
  args: {
    variant: 'full',
    rangeSelection: true,
    durationUnit: 'days',
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 5);
    const end = new Date(today.getFullYear(), today.getMonth(), 18);
    const [range, setRange] = useState<DateRange>({ start, end });

    return (
      <Calendar
        {...args}
        range={range}
        onRangeChange={setRange}
      />
    );
  },
};

/**
 * Full variant with nights unit (exclusive counting).
 * Useful for hotel bookings where you count nights stayed.
 */
export const FullVariantNightsUnit: Story = {
  args: {
    variant: 'full',
    rangeSelection: true,
    durationUnit: 'nights',
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 10);
    const end = new Date(today.getFullYear(), today.getMonth(), 15);
    const [range, setRange] = useState<DateRange>({ start, end });

    return (
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--neo-text-secondary)' }}>
          Hotel booking style: counts nights (check-in to check-out)
        </p>
        <Calendar
          {...args}
          range={range}
          onRangeChange={setRange}
        />
      </div>
    );
  },
};

/**
 * Comparison of days vs nights duration unit.
 */
export const DurationUnitComparison: Story = {
  args: {
    variant: 'full',
    rangeSelection: true,
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 10);
    const end = new Date(today.getFullYear(), today.getMonth(), 15);

    return (
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <p
            style={{
              margin: '0 0 0.5rem',
              fontSize: '14px',
              color: 'var(--neo-text-secondary)',
            }}
          >
            Days (inclusive: 10th to 15th = 6 days)
          </p>
          <Calendar
            {...args}
            durationUnit="days"
            range={{ start, end }}
          />
        </div>
        <div>
          <p
            style={{
              margin: '0 0 0.5rem',
              fontSize: '14px',
              color: 'var(--neo-text-secondary)',
            }}
          >
            Nights (exclusive: 10th to 15th = 5 nights)
          </p>
          <Calendar
            {...args}
            durationUnit="nights"
            range={{ start, end }}
          />
        </div>
      </div>
    );
  },
};

/**
 * Full variant with long range (shows months/years in duration).
 */
export const FullVariantLongRange: Story = {
  args: {
    variant: 'full',
    rangeSelection: true,
    durationUnit: 'days',
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const start = new Date(2024, 0, 15); // Jan 15, 2024
    const end = new Date(2025, 5, 20); // Jun 20, 2025

    return (
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--neo-text-secondary)' }}>
          Long range showing years, months, and days
        </p>
        <Calendar
          {...args}
          range={{ start, end }}
        />
      </div>
    );
  },
};

// =============================================================================
// WEEK NUMBERS
// =============================================================================

/**
 * Calendar with ISO week numbers displayed on the left side.
 * Week numbers follow the ISO 8601 standard where weeks start on Monday.
 */
export const WithWeekNumbers: Story = {
  args: {
    showWeekNumbers: true,
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div>
        <Calendar {...args} value={date} onChange={setDate} />
        {date && (
          <p style={{ marginTop: '1rem', color: 'var(--neo-text-secondary)' }}>
            Selected: {date.toDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Week numbers with Monday as the first day of week (common in Europe).
 */
export const WeekNumbersMondayStart: Story = {
  args: {
    showWeekNumbers: true,
    firstDayOfWeek: 1,
    size: 'md',
    elevation: 'mid',
  },
};

/**
 * Week numbers in different sizes.
 */
export const WeekNumbersSizes: Story = {
  args: {
    showWeekNumbers: true,
    elevation: 'mid',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Small
        </p>
        <Calendar {...args} size="sm" />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Medium
        </p>
        <Calendar {...args} size="md" />
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Large
        </p>
        <Calendar {...args} size="lg" />
      </div>
    </div>
  ),
};

/**
 * Week numbers with range selection.
 */
export const WeekNumbersWithRange: Story = {
  args: {
    showWeekNumbers: true,
    rangeSelection: true,
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    return (
      <div>
        <Calendar {...args} range={range} onRangeChange={setRange} />
        <div style={{ marginTop: '1rem', color: 'var(--neo-text-secondary)' }}>
          {range.start && range.end ? (
            <p>
              Selected: {range.start.toDateString()} - {range.end.toDateString()}
            </p>
          ) : range.start ? (
            <p>Start: {range.start.toDateString()}</p>
          ) : (
            <p>Click a date to start selecting a range</p>
          )}
        </div>
      </div>
    );
  },
};

// =============================================================================
// MONTH CHANGE CALLBACK
// =============================================================================

/**
 * Calendar with onMonthChange callback to track navigation.
 * Open the Actions panel to see the callback being triggered.
 */
export const WithMonthChangeCallback: Story = {
  args: {
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const [currentView, setCurrentView] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() });
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <div>
        <Calendar
          {...args}
          onMonthChange={(year, month) => {
            setCurrentView({ year, month });
          }}
        />
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.04)', borderRadius: '8px' }}>
          <p style={{ margin: 0, color: 'var(--neo-text-secondary)' }}>
            <strong>Currently viewing:</strong> {monthNames[currentView.month]} {currentView.year}
          </p>
        </div>
      </div>
    );
  },
};

// =============================================================================
// KEYBOARD NAVIGATION / ACCESSIBILITY
// =============================================================================

/**
 * Full keyboard navigation support for accessibility.
 *
 * **Keyboard shortcuts:**
 * - **Arrow keys**: Navigate between days
 * - **Home**: Go to first day of current week
 * - **End**: Go to last day of current week
 * - **Page Up**: Go to previous month
 * - **Page Down**: Go to next month
 * - **Enter / Space**: Select the focused date
 *
 * Click on a day first to focus the grid, then use keyboard to navigate.
 */
export const KeyboardNavigation: Story = {
  args: {
    size: 'md',
    elevation: 'mid',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div>
        <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 'bold', color: 'var(--neo-text)' }}>
            Keyboard Shortcuts
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--neo-text-secondary)', fontSize: '14px' }}>
            <li><strong>←↑↓→</strong> Navigate between days</li>
            <li><strong>Home</strong> First day of week</li>
            <li><strong>End</strong> Last day of week</li>
            <li><strong>Page Up/Down</strong> Previous/Next month</li>
            <li><strong>Enter/Space</strong> Select date</li>
          </ul>
        </div>
        <Calendar {...args} value={date} onChange={setDate} />
        {date && (
          <p style={{ marginTop: '1rem', color: 'var(--neo-text-secondary)' }}>
            Selected: {date.toDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Accessible calendar with all ARIA attributes properly set.
 * The calendar includes:
 * - role="grid" on the days container
 * - role="gridcell" on each day button
 * - aria-selected for selected dates
 * - aria-label with full date description
 * - Proper focus management with tabIndex
 */
export const AccessibleCalendar: Story = {
  args: {
    size: 'md',
    elevation: 'mid',
    todayVariant: 'circle',
    highlightWeekends: true,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const indicators: CalendarIndicator[] = [
      { date: new Date(year, month, 5), colors: '#22c55e' },
      { date: new Date(year, month, 15), colors: '#f59e0b' },
    ];

    return (
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--neo-text-secondary)' }}>
          This calendar demonstrates full accessibility support. Use Tab to focus
          the calendar, then arrow keys to navigate. Screen readers will announce
          each date as you move through the grid.
        </p>
        <Calendar
          {...args}
          value={date}
          onChange={setDate}
          indicators={indicators}
          aria-label="Event calendar for selecting dates"
        />
        {date && (
          <p style={{ marginTop: '1rem', color: 'var(--neo-text-secondary)' }}>
            Selected: {date.toDateString()}
          </p>
        )}
      </div>
    );
  },
};
