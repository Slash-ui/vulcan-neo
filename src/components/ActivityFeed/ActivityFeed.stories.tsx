import type { Meta, StoryObj } from '@storybook/react';
import { ActivityFeed, ActivityItem } from './ActivityFeed';
import { Surface } from '../Surface';

const meta: Meta<typeof ActivityFeed> = {
  title: 'Organisms/ActivityFeed',
  component: ActivityFeed,
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
    showConnector: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleActivities: ActivityItem[] = [
  {
    id: 1,
    user: { name: 'John Doe', avatar: 'https://placehold.net/40x40?text=JD' },
    content: <><strong>John Doe</strong> commented on <a href="#">Project Alpha</a></>,
    timestamp: '2 minutes ago',
  },
  {
    id: 2,
    user: { name: 'Jane Smith', avatar: 'https://placehold.net/40x40?text=JS' },
    content: <><strong>Jane Smith</strong> uploaded 3 new files</>,
    timestamp: '1 hour ago',
    meta: 'Design files',
  },
  {
    id: 3,
    user: { name: 'Bob Johnson', avatar: 'https://placehold.net/40x40?text=BJ' },
    content: <><strong>Bob Johnson</strong> completed task <a href="#">Update documentation</a></>,
    timestamp: '3 hours ago',
  },
  {
    id: 4,
    user: { name: 'Alice Brown', avatar: 'https://placehold.net/40x40?text=AB' },
    content: <><strong>Alice Brown</strong> started a new discussion</>,
    timestamp: 'Yesterday',
    meta: '5 replies',
  },
];

export const Default: Story = {
  args: {
    items: sampleActivities,
  },
};

export const WithCustomIcons: Story = {
  render: () => {
    const CommentIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );

    const FileIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
      </svg>
    );

    const CheckIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    );

    const BellIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    );

    const activities: ActivityItem[] = [
      {
        id: 1,
        icon: <CommentIcon />,
        content: <>New comment on your post</>,
        timestamp: '5 minutes ago',
      },
      {
        id: 2,
        icon: <FileIcon />,
        content: <>New file uploaded to <a href="#">Documents</a></>,
        timestamp: '1 hour ago',
      },
      {
        id: 3,
        icon: <CheckIcon />,
        content: <>Task completed successfully</>,
        timestamp: '2 hours ago',
      },
      {
        id: 4,
        icon: <BellIcon />,
        content: <>System notification received</>,
        timestamp: 'Yesterday',
      },
    ];

    return <ActivityFeed items={activities} />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Small</p>
        <ActivityFeed items={sampleActivities.slice(0, 3)} size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Medium</p>
        <ActivityFeed items={sampleActivities.slice(0, 3)} size="md" />
      </div>
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Large</p>
        <ActivityFeed items={sampleActivities.slice(0, 3)} size="lg" />
      </div>
    </div>
  ),
};

export const WithoutConnector: Story = {
  args: {
    items: sampleActivities,
    showConnector: false,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    emptyMessage: 'No recent activity to show',
  },
};

export const NotificationsFeed: Story = {
  render: () => {
    const AlertIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );

    const SuccessIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    );

    const activities: ActivityItem[] = [
      {
        id: 1,
        icon: <AlertIcon />,
        content: <>Your password will expire in <strong>7 days</strong></>,
        timestamp: 'Just now',
      },
      {
        id: 2,
        icon: <SuccessIcon />,
        content: <>Payment of <strong>$99.00</strong> was successful</>,
        timestamp: '1 hour ago',
        meta: 'Order #12345',
      },
      {
        id: 3,
        icon: <AlertIcon />,
        content: <>Storage usage at <strong>85%</strong> capacity</>,
        timestamp: '2 hours ago',
      },
    ];

    return <ActivityFeed items={activities} />;
  },
};

export const DarkTheme: Story = {
  args: {
    items: sampleActivities,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
