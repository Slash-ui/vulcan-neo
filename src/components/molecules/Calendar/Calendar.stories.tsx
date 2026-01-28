import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Calendar } from './Calendar';
import { Surface } from '../../foundation/Surface';

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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    firstDayOfWeek: {
      control: 'select',
      options: [0, 1],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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

export const WithSelectedDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date());

    return <Calendar value={date} onChange={setDate} />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Small</p>
        <Calendar size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Medium</p>
        <Calendar size="md" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Large</p>
        <Calendar size="lg" />
      </div>
    </div>
  ),
};

export const MondayFirst: Story = {
  args: {
    firstDayOfWeek: 1,
  },
};

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
        <Calendar value={date} onChange={setDate} minDate={minDate} maxDate={maxDate} />
      </div>
    );
  },
};

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
        <Calendar value={date} onChange={setDate} disabledDates={disabledDates} />
      </div>
    );
  },
};

export const CustomMonthNames: Story = {
  render: () => {
    const spanishMonths = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
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
