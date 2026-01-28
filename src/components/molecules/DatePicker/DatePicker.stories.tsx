import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DatePicker } from './DatePicker';
import { Surface } from '../../foundation/Surface';

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem', minHeight: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <DatePicker value={new Date()} disabled label="Disabled Date" />
    </div>
  ),
};

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
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--neo-text-secondary)' }}>
          Only dates within the next 3 months are available
        </p>
      </div>
    );
  },
};

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
