import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';
import { Surface } from '../Surface';

const meta: Meta<typeof Select> = {
  title: 'Molecules/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', minHeight: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
];

export const Default: Story = {
  args: {
    placeholder: 'Select a country',
    options: countryOptions,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
  },
};

const ControlledDemo = () => {
  const [value, setValue] = useState('us');
  return (
    <Select
      label="Select Country"
      value={value}
      onChange={setValue}
      options={countryOptions}
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Select size="sm" label="Small" options={countryOptions} placeholder="Select..." />
      <Select size="md" label="Medium" options={countryOptions} placeholder="Select..." />
      <Select size="lg" label="Large" options={countryOptions} placeholder="Select..." />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
    helperText: 'Choose your country of residence',
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
    error: 'Please select a country',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Subscription Plan',
    placeholder: 'Select a plan',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise', disabled: true },
    ],
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', width: '400px', minHeight: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
    disabled: true,
  },
};

export const DarkTheme: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', minHeight: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};
