import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Surface } from '../Surface';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['convex', 'flat', 'fab'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    elevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
    },
    fullWidth: {
      control: 'boolean',
    },
    loading: {
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
    children: 'Button',
    variant: 'convex',
    size: 'md',
    elevation: 'mid',
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </>
  ),
};

export const Elevations: Story = {
  render: () => (
    <>
      <Button elevation="low">Low</Button>
      <Button elevation="mid">Medium</Button>
      <Button elevation="high">High</Button>
    </>
  ),
};

export const Flat: Story = {
  args: {
    children: 'Flat Button',
    variant: 'flat',
  },
};

export const FAB: Story = {
  render: () => (
    <>
      <Button variant="fab" size="sm">+</Button>
      <Button variant="fab">+</Button>
      <Button variant="fab" size="lg">+</Button>
    </>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <>
      <Button leftIcon={<span>←</span>}>Back</Button>
      <Button rightIcon={<span>→</span>}>Next</Button>
      <Button leftIcon={<span>🛒</span>} rightIcon={<span>→</span>}>
        Add to Cart
      </Button>
    </>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', width: '300px' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const DarkTheme: Story = {
  args: {
    children: 'Dark Theme',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
  parameters: {
    backgrounds: { default: 'neomorphic-dark' },
  },
};
