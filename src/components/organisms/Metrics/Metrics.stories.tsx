import type { Meta, StoryObj } from '@storybook/react-vite';
import { Metrics, MetricCard, MetricItem } from './Metrics';
import { Surface } from '../foundation/Surface';

const meta: Meta<typeof Metrics> = {
  title: 'Organisms/Metrics',
  component: Metrics,
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
    columns: {
      control: 'select',
      options: [1, 2, 3, 4],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMetrics: MetricItem[] = [
  {
    id: 1,
    label: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up',
  },
  {
    id: 2,
    label: 'Subscriptions',
    value: '2,350',
    change: '+180',
    trend: 'up',
  },
  {
    id: 3,
    label: 'Sales',
    value: '12,234',
    change: '-5.3%',
    trend: 'down',
  },
  {
    id: 4,
    label: 'Active Now',
    value: '573',
    change: '+201',
    trend: 'up',
  },
];

export const Default: Story = {
  args: {
    items: sampleMetrics,
    columns: 4,
  },
};

export const WithIcons: Story = {
  render: () => {
    const DollarIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );

    const UsersIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );

    const ShoppingCartIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    );

    const ActivityIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    );

    const items: MetricItem[] = [
      { id: 1, label: 'Revenue', value: '$45,231', change: '+20%', trend: 'up', icon: <DollarIcon /> },
      { id: 2, label: 'Users', value: '2,350', change: '+180', trend: 'up', icon: <UsersIcon /> },
      { id: 3, label: 'Orders', value: '12,234', change: '-5%', trend: 'down', icon: <ShoppingCartIcon /> },
      { id: 4, label: 'Active', value: '573', trend: 'neutral', icon: <ActivityIcon /> },
    ];

    return <Metrics items={items} columns={4} />;
  },
};

export const WithDescriptions: Story = {
  render: () => {
    const items: MetricItem[] = [
      {
        id: 1,
        label: 'Monthly Revenue',
        value: '$45,231.89',
        change: '+20.1%',
        trend: 'up',
        description: 'Compared to last month',
      },
      {
        id: 2,
        label: 'New Customers',
        value: '2,350',
        change: '+180',
        trend: 'up',
        description: 'New sign-ups this month',
      },
      {
        id: 3,
        label: 'Churn Rate',
        value: '2.4%',
        change: '-0.5%',
        trend: 'down',
        description: 'Down from 2.9% last month',
      },
    ];

    return <Metrics items={items} columns={3} />;
  },
};

export const Sizes: Story = {
  render: () => {
    const items: MetricItem[] = [
      { id: 1, label: 'Revenue', value: '$45,231', change: '+20%', trend: 'up' },
      { id: 2, label: 'Users', value: '2,350', change: '+180', trend: 'up' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Small</p>
          <Metrics items={items} columns={2} size="sm" />
        </div>
        <div>
          <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Medium</p>
          <Metrics items={items} columns={2} size="md" />
        </div>
        <div>
          <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Large</p>
          <Metrics items={items} columns={2} size="lg" />
        </div>
      </div>
    );
  },
};

export const SingleMetricCard: Story = {
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <MetricCard
        label="Total Revenue"
        value="$45,231.89"
        change="+20.1% from last month"
        trend="up"
      />
    </div>
  ),
};

export const TwoColumns: Story = {
  args: {
    items: sampleMetrics.slice(0, 2),
    columns: 2,
  },
};

export const ThreeColumns: Story = {
  args: {
    items: sampleMetrics.slice(0, 3),
    columns: 3,
  },
};

export const DarkTheme: Story = {
  args: {
    items: sampleMetrics,
    columns: 4,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
