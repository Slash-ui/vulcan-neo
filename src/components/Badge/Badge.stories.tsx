import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { Surface } from '../Surface';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
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
      options: ['convex', 'concave', 'flat'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error'],
    },
    dot: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'convex',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <>
      <Badge variant="convex">Convex</Badge>
      <Badge variant="concave">Concave</Badge>
      <Badge variant="flat">Flat</Badge>
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </>
  ),
};

export const Colors: Story = {
  render: () => (
    <>
      <Badge color="default">Default</Badge>
      <Badge color="primary">Primary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="error">Error</Badge>
    </>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <>
      <Badge leftIcon={<CheckIcon />} color="success">Verified</Badge>
      <Badge rightIcon={<StarIcon />} color="warning">Featured</Badge>
      <Badge leftIcon={<CheckIcon />} rightIcon={<StarIcon />}>Both</Badge>
    </>
  ),
};

export const Dots: Story = {
  render: () => (
    <>
      <Badge dot color="default" />
      <Badge dot color="primary" />
      <Badge dot color="success" />
      <Badge dot color="warning" />
      <Badge dot color="error" />
    </>
  ),
};

export const DotSizes: Story = {
  render: () => (
    <>
      <Badge dot size="sm" color="primary" />
      <Badge dot size="md" color="primary" />
      <Badge dot size="lg" color="primary" />
    </>
  ),
};

export const DarkTheme: Story = {
  args: {
    children: 'Badge',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
