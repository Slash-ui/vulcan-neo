import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DatePicker } from './DatePicker';
import { Surface } from '../../foundation/Surface';
import { Typography } from '../../foundation/Typography';

/**
 * A date selection component with calendar dropdown, validation, and formatting options.
 * Provides accessible date input with keyboard navigation support.
 *
 * ## When to Use
 *
 * - **Forms**: Collect dates for events, bookings, or profiles
 * - **Filters**: Date-based filtering in data tables
 * - **Scheduling**: Select dates for appointments or deadlines
 * - **Avoid for**: Date ranges (use DateRangePicker), time selection (use TimePicker)
 *
 * ## Key Features
 *
 * - **Calendar dropdown**: Visual date selection with month navigation
 * - **Date constraints**: Set min/max dates to limit selection
 * - **Custom formatting**: Display dates in any format
 * - **Clearable**: Optional clear button to reset selection
 * - **Keyboard accessible**: Full keyboard navigation support
 *
 * ## Best Practices
 *
 * - Always include a label for accessibility
 * - Use placeholder to hint at expected format
 * - Set minDate/maxDate when date range is constrained
 * - Show error messages for invalid selections
 */
const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem', minHeight: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Content
    value: {
      control: false,
      description: 'Selected date value (controlled)',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no date is selected',
      table: { category: 'Content', defaultValue: { summary: 'Select a date' } },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
      table: { category: 'Content' },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed below the input',
      table: { category: 'Content' },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size. Match with surrounding form elements.',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    error: {
      control: 'boolean',
      description: 'Show error styling',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },

    // Behavior
    onChange: {
      action: 'changed',
      description: 'Callback when date selection changes',
      table: { category: 'Behavior' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable date selection',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button when a date is selected',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
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
    formatDate: {
      control: false,
      description: 'Custom function to format the displayed date',
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default date picker. Click to open the calendar dropdown.
 */
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div style={{ width: 280 }}>
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

// =============================================================================
// FEATURES
// =============================================================================

/**
 * Date picker with a label for form contexts.
 */
export const WithLabel: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div style={{ width: 280 }}>
        <DatePicker value={date} onChange={setDate} label="Date of Birth" />
      </div>
    );
  },
};

/**
 * Date picker with a pre-selected value.
 */
export const WithValue: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());

    return (
      <div style={{ width: 280 }}>
        <DatePicker value={date} onChange={setDate} label="Selected Date" />
      </div>
    );
  },
};

/**
 * Date picker in error state with validation message.
 */
export const WithError: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div style={{ width: 280 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          label="Event Date"
          error
          errorMessage="Please select a date"
        />
      </div>
    );
  },
};

/**
 * Disabled date picker for read-only contexts.
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <DatePicker value={new Date()} disabled label="Disabled Date" />
    </div>
  ),
};

/**
 * Date picker without the clear button for required fields.
 */
export const NotClearable: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());

    return (
      <div style={{ width: 280 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          label="Required Date"
          clearable={false}
        />
      </div>
    );
  },
};

/**
 * Constrain selectable dates to a specific range.
 * Only dates within the next 3 months are available.
 */
export const WithMinMaxDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());

    return (
      <div style={{ width: 280 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          label="Booking Date"
          placeholder="Select a future date"
          minDate={minDate}
          maxDate={maxDate}
        />
        <Typography variant="caption" color="secondary" style={{ marginTop: '0.5rem', display: 'block' }}>
          Only dates within the next 3 months are available
        </Typography>
      </div>
    );
  },
};

/**
 * Custom date formatting using ISO format.
 */
export const CustomFormat: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());

    return (
      <div style={{ width: 280 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          label="ISO Format"
          formatDate={(d) => d.toISOString().split('T')[0]}
        />
      </div>
    );
  },
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Compare all size variants.
 */
export const Sizes: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 280 }}>
        <DatePicker value={date} onChange={setDate} size="sm" label="Small" />
        <DatePicker value={date} onChange={setDate} size="md" label="Medium" />
        <DatePicker value={date} onChange={setDate} size="lg" label="Large" />
      </div>
    );
  },
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Date picker adapts to dark theme automatically.
 */
export const DarkTheme: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div style={{ width: 280 }}>
        <DatePicker value={date} onChange={setDate} label="Select Date" />
      </div>
    );
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem', minHeight: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};
