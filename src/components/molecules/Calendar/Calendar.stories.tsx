import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Calendar } from './Calendar';
import { Surface } from '../../foundation/Surface';

/**
 * A date picker component for selecting dates from a monthly calendar view.
 * Provides intuitive navigation between months with customizable date constraints.
 *
 * ## When to Use
 *
 * - **Date selection**: Booking, scheduling, and appointment forms
 * - **Date filtering**: Filter content by date ranges
 * - **Event displays**: Show dates with special significance
 * - **Form inputs**: Date fields in registration or checkout forms
 *
 * ## Key Features
 *
 * - **Size variants**: Small, medium, and large for different contexts
 * - **Date constraints**: Min/max dates and specific disabled dates
 * - **Localization**: Customizable month and day names
 * - **Week start**: Option to start week on Sunday or Monday
 * - **Accessible**: Full keyboard navigation and ARIA support
 *
 * ## Best Practices
 *
 * - Set appropriate min/max dates to prevent invalid selections
 * - Use localized month and day names for international users
 * - Consider the context when choosing size (inline vs modal)
 * - Highlight today's date for user orientation
 */
const meta: Meta<typeof Calendar> = {
  title: 'Molecules/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the calendar',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },

    // State
    value: {
      control: 'date',
      description: 'Currently selected date',
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
      description: 'Callback when a date is selected',
      table: { category: 'Events' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default calendar with date selection. Click a date to select it.
 */
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div>
        <Calendar value={date} onChange={setDate} />
        {date && (
          <p style={{ marginTop: '1rem', color: 'var(--neo-text-secondary)' }}>
            Selected: {date.toDateString()}
          </p>
        )}
      </div>
    );
  },
};

// =============================================================================
// WITH SELECTED DATE
// =============================================================================

/**
 * Calendar with a pre-selected date (today).
 */
export const WithSelectedDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date());

    return <Calendar value={date} onChange={setDate} />;
  },
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Three size options for different use cases and container sizes.
 */
export const Sizes: Story = {
  render: () => (
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
        <Calendar size="sm" />
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
        <Calendar size="md" />
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
        <Calendar size="lg" />
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
  },
};

/**
 * Comparison of Sunday vs Monday week start.
 */
export const WeekStartComparison: Story = {
  render: () => (
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
        <Calendar firstDayOfWeek={0} />
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
        <Calendar firstDayOfWeek={1} />
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
  render: () => {
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
  render: () => {
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
  render: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--neo-text-secondary)' }}>
          Only today and future dates are selectable
        </p>
        <Calendar value={date} onChange={setDate} minDate={today} />
      </div>
    );
  },
};

// =============================================================================
// LOCALIZATION
// =============================================================================

/**
 * Calendar with Spanish month and day names.
 */
export const SpanishLocale: Story = {
  render: () => {
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
    const spanishDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

    return (
      <Calendar
        monthNames={spanishMonths}
        dayNames={spanishDays}
        firstDayOfWeek={1}
      />
    );
  },
};

/**
 * Calendar with German month and day names.
 */
export const GermanLocale: Story = {
  render: () => {
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
    const germanDays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

    return (
      <Calendar
        monthNames={germanMonths}
        dayNames={germanDays}
        firstDayOfWeek={1}
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
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    return <Calendar value={date} onChange={setDate} />;
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

/**
 * All sizes in dark theme.
 */
export const DarkThemeSizes: Story = {
  render: () => (
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
        <Calendar size="sm" />
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
        <Calendar size="md" />
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
        <Calendar size="lg" />
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
