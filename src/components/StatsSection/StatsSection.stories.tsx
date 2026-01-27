import type { Meta, StoryObj } from '@storybook/react';
import { StatsSection } from './StatsSection';
import { Surface } from '../Surface';

const meta: Meta<typeof StatsSection> = {
  title: 'Marketing/StatsSection',
  component: StatsSection,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light">
        <Story />
      </Surface>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultStats = [
  { value: '10M+', label: 'Users', description: 'Active monthly users' },
  { value: '99.9%', label: 'Uptime', description: 'Guaranteed availability' },
  { value: '150+', label: 'Countries', description: 'Worldwide coverage' },
  { value: '24/7', label: 'Support', description: 'Always here to help' },
];

export const Default: Story = {
  args: {
    stats: defaultStats,
  },
};

export const WithHeader: Story = {
  args: {
    eyebrow: 'By the Numbers',
    title: 'Trusted by teams worldwide',
    description: 'Join the thousands of companies already using our platform.',
    stats: defaultStats,
  },
};

export const CardsVariant: Story = {
  args: {
    eyebrow: 'Our Impact',
    title: 'Numbers that speak for themselves',
    stats: defaultStats,
    variant: 'cards',
  },
};

export const InlineVariant: Story = {
  args: {
    title: 'Why choose us?',
    description:
      'We provide the best tools for modern teams to build and scale their products.',
    stats: [
      { value: '500+', label: 'Integrations' },
      { value: '4.9', label: 'Rating' },
      { value: '50K+', label: 'Customers' },
    ],
    variant: 'inline',
  },
};

export const PrimaryBackground: Story = {
  args: {
    stats: defaultStats,
    background: 'primary',
  },
};

export const GradientBackground: Story = {
  args: {
    eyebrow: 'Platform Stats',
    title: 'Built for scale',
    stats: defaultStats,
    background: 'gradient',
  },
};

export const CardsOnPrimary: Story = {
  args: {
    stats: defaultStats,
    variant: 'cards',
    background: 'primary',
  },
};

export const ThreeStats: Story = {
  args: {
    stats: [
      { value: '2M+', label: 'Downloads' },
      { value: '100+', label: 'Components' },
      { value: '5 min', label: 'Setup Time' },
    ],
  },
};

export const DarkTheme: Story = {
  args: {
    eyebrow: 'Growth',
    title: 'Scaling with confidence',
    stats: defaultStats,
    variant: 'cards',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark">
        <Story />
      </Surface>
    ),
  ],
};
