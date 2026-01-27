import type { Meta, StoryObj } from '@storybook/react';
import { InsetField } from './InsetField';
import { Surface } from '../Surface';

const meta: Meta<typeof InsetField> = {
  title: 'Atoms/InsetField',
  component: InsetField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', maxWidth: '400px' }}>
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

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    fullWidth: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'name@example.com',
    type: 'email',
    fullWidth: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
    fullWidth: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'name@example.com',
    defaultValue: 'invalid-email',
    error: 'Please enter a valid email address',
    fullWidth: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InsetField size="sm" placeholder="Small" fullWidth />
      <InsetField size="md" placeholder="Medium" fullWidth />
      <InsetField size="lg" placeholder="Large" fullWidth />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InsetField
        placeholder="Search..."
        leftIcon={<span>🔍</span>}
        fullWidth
      />
      <InsetField
        placeholder="Email"
        type="email"
        rightIcon={<span>✉️</span>}
        fullWidth
      />
      <InsetField
        placeholder="Amount"
        leftIcon={<span>$</span>}
        rightIcon={<span>.00</span>}
        fullWidth
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit',
    disabled: true,
    fullWidth: true,
  },
};

export const DarkTheme: Story = {
  args: {
    label: 'Dark Theme Input',
    placeholder: 'Enter text...',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', maxWidth: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
  parameters: {
    backgrounds: { default: 'neomorphic-dark' },
  },
};
