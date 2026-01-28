import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';
import { Surface } from '../Surface';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', maxWidth: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    max: {
      control: { type: 'number' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'gradient', 'glow'],
    },
    showLabel: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
    'aria-label': 'Progress',
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
    'aria-label': 'Download progress',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <ProgressBar value={50} size="sm" aria-label="Small progress" />
      <ProgressBar value={50} size="md" aria-label="Medium progress" />
      <ProgressBar value={50} size="lg" aria-label="Large progress" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <ProgressBar value={60} variant="default" showLabel aria-label="Default" />
      <ProgressBar value={60} variant="gradient" showLabel aria-label="Gradient" />
      <ProgressBar value={60} variant="glow" showLabel aria-label="Glow" />
    </div>
  ),
};

export const CustomLabel: Story = {
  args: {
    value: 3,
    max: 5,
    showLabel: true,
    formatLabel: (value, max) => `${value} of ${max} steps`,
    'aria-label': 'Step progress',
  },
};

export const Empty: Story = {
  args: {
    value: 0,
    showLabel: true,
    'aria-label': 'Empty progress',
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    showLabel: true,
    variant: 'glow',
    'aria-label': 'Complete',
  },
};

export const DarkTheme: Story = {
  args: {
    value: 70,
    variant: 'gradient',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', maxWidth: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
  globals: {
    backgrounds: {
      value: "neomorphic-dark"
    }
  },
};
