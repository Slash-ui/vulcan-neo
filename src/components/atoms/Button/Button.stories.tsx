import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Surface } from '../../foundation/Surface';

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
    label: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Button',
    variant: 'convex',
    size: 'md',
    elevation: 'mid',
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <Button size="sm" label="Small" />
      <Button size="md" label="Medium" />
      <Button size="lg" label="Large" />
    </>
  ),
};

export const Elevations: Story = {
  render: () => (
    <>
      <Button elevation="low" label="Low" />
      <Button elevation="mid" label="Medium" />
      <Button elevation="high" label="High" />
    </>
  ),
};

export const Flat: Story = {
  args: {
    label: 'Flat Button',
    variant: 'flat',
  },
};

export const FAB: Story = {
  render: () => (
    <>
      <Button variant="fab" size="sm" leftIcon={<span>+</span>} />
      <Button variant="fab" leftIcon={<span>+</span>} />
      <Button variant="fab" size="lg" leftIcon={<span>+</span>} />
    </>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <>
      <Button leftIcon={<span>←</span>} label="Back" />
      <Button rightIcon={<span>→</span>} label="Next" />
      <Button leftIcon={<span>🛒</span>} rightIcon={<span>→</span>} label="Add to Cart" />
    </>
  ),
};

export const Loading: Story = {
  args: {
    label: 'Loading...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Button',
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
    label: 'Dark Theme',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
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
