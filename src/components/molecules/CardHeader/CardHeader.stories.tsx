import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardHeader } from './CardHeader';
import { Card, CardBody } from '../Card';
import { IconButton } from '../../atoms/IconButton';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';
import { Surface } from '../../foundation/Surface';

const meta: Meta<typeof CardHeader> = {
  title: 'Molecules/CardHeader',
  component: CardHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem' }}>
        <Card style={{ maxWidth: '400px' }}>
          <Story />
          <CardBody>
            <p style={{ margin: 0, color: 'var(--neo-text-secondary)' }}>
              Card content goes here...
            </p>
          </CardBody>
        </Card>
      </Surface>
    ),
  ],
  argTypes: {
    bordered: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

export const Default: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card subtitle or description',
  },
};

export const WithActions: Story = {
  args: {
    title: 'Team Members',
    subtitle: '5 members',
    actions: <IconButton aria-label="More options"><MoreIcon /></IconButton>,
  },
};

export const WithAvatar: Story = {
  args: {
    title: 'John Doe',
    subtitle: 'Software Engineer',
    icon: <Avatar fallback="JD" size="md" />,
    actions: <IconButton aria-label="More options"><MoreIcon /></IconButton>,
  },
};

export const WithBadge: Story = {
  args: {
    title: 'Notifications',
    subtitle: 'Recent activity',
    actions: <Badge color="primary">12</Badge>,
  },
};

export const Bordered: Story = {
  args: {
    title: 'Settings',
    subtitle: 'Manage your preferences',
    bordered: true,
  },
};

export const DarkTheme: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card subtitle',
    actions: <IconButton aria-label="More options"><MoreIcon /></IconButton>,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Card style={{ maxWidth: '400px' }}>
          <Story />
          <CardBody>
            <p style={{ margin: 0, color: 'var(--neo-text-secondary)' }}>
              Card content goes here...
            </p>
          </CardBody>
        </Card>
      </Surface>
    ),
  ],
};
