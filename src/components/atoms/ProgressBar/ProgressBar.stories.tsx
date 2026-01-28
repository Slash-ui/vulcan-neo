import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';
import { Surface } from '../../foundation/Surface';

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
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'primary-light',
        'primary-dark',
        'secondary',
        'secondary-light',
        'secondary-dark',
        'tertiary',
        'tertiary-light',
        'tertiary-dark',
        'success',
        'warning',
        'error',
        'info',
      ],
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

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <ProgressBar value={70} color="default" aria-label="Default" />
      <ProgressBar value={70} color="primary" aria-label="Primary" />
      <ProgressBar value={70} color="primary-light" aria-label="Primary Light" />
      <ProgressBar value={70} color="primary-dark" aria-label="Primary Dark" />
      <ProgressBar value={70} color="secondary" aria-label="Secondary" />
      <ProgressBar value={70} color="secondary-light" aria-label="Secondary Light" />
      <ProgressBar value={70} color="secondary-dark" aria-label="Secondary Dark" />
      <ProgressBar value={70} color="tertiary" aria-label="Tertiary" />
      <ProgressBar value={70} color="tertiary-light" aria-label="Tertiary Light" />
      <ProgressBar value={70} color="tertiary-dark" aria-label="Tertiary Dark" />
      <ProgressBar value={70} color="success" aria-label="Success" />
      <ProgressBar value={70} color="warning" aria-label="Warning" />
      <ProgressBar value={70} color="error" aria-label="Error" />
      <ProgressBar value={70} color="info" aria-label="Info" />
    </div>
  ),
};

export const ColorsWithLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Primary</span>
        <ProgressBar value={65} color="primary" showLabel aria-label="Primary" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Secondary</span>
        <ProgressBar value={45} color="secondary" showLabel aria-label="Secondary" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Tertiary</span>
        <ProgressBar value={80} color="tertiary" showLabel aria-label="Tertiary" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Success</span>
        <ProgressBar value={100} color="success" showLabel aria-label="Success" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Warning</span>
        <ProgressBar value={55} color="warning" showLabel aria-label="Warning" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Error</span>
        <ProgressBar value={25} color="error" showLabel aria-label="Error" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Info</span>
        <ProgressBar value={90} color="info" showLabel aria-label="Info" />
      </div>
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
    color: 'success',
    'aria-label': 'Complete',
  },
};

export const DarkTheme: Story = {
  args: {
    value: 70,
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', maxWidth: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const DarkThemeColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <ProgressBar value={70} color="primary" aria-label="Primary" />
      <ProgressBar value={70} color="secondary" aria-label="Secondary" />
      <ProgressBar value={70} color="tertiary" aria-label="Tertiary" />
      <ProgressBar value={70} color="success" aria-label="Success" />
      <ProgressBar value={70} color="warning" aria-label="Warning" />
      <ProgressBar value={70} color="error" aria-label="Error" />
      <ProgressBar value={70} color="info" aria-label="Info" />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', maxWidth: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};
