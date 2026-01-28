import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeGroup } from './BadgeGroup';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';
import { Surface } from '../../foundation/Surface';

const meta: Meta<typeof BadgeGroup> = {
  title: 'Molecules/BadgeGroup',
  component: BadgeGroup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    max: {
      control: { type: 'number', min: 1, max: 10 },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    overflowDirection: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleUsers = [
  { initials: 'JD', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop' },
  { initials: 'AS', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
  { initials: 'MK', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop' },
  { initials: 'RW', src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop' },
  { initials: 'PT', src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop' },
  { initials: 'LH' },
  { initials: 'CB' },
];

export const Default: Story = {
  render: () => (
    <BadgeGroup max={4}>
      {sampleUsers.map((user, i) => (
        <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
      ))}
    </BadgeGroup>
  ),
};

export const WithMaxLimit: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <BadgeGroup max={3}>
        {sampleUsers.map((user, i) => (
          <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
        ))}
      </BadgeGroup>
      <BadgeGroup max={5}>
        {sampleUsers.map((user, i) => (
          <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
        ))}
      </BadgeGroup>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <BadgeGroup size="sm" max={4}>
        {sampleUsers.map((user, i) => (
          <Avatar key={i} src={user.src} fallback={user.initials} size="sm" />
        ))}
      </BadgeGroup>
      <BadgeGroup size="md" max={4}>
        {sampleUsers.map((user, i) => (
          <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
        ))}
      </BadgeGroup>
      <BadgeGroup size="lg" max={4}>
        {sampleUsers.map((user, i) => (
          <Avatar key={i} src={user.src} fallback={user.initials} size="lg" />
        ))}
      </BadgeGroup>
    </div>
  ),
};

export const OverflowLeft: Story = {
  render: () => (
    <BadgeGroup max={3} overflowDirection="left">
      {sampleUsers.map((user, i) => (
        <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
      ))}
    </BadgeGroup>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <BadgeGroup max={4}>
      <Badge color="primary">React</Badge>
      <Badge color="success">TypeScript</Badge>
      <Badge color="warning">Node.js</Badge>
      <Badge color="error">Python</Badge>
      <Badge color="default">Go</Badge>
      <Badge color="primary">Rust</Badge>
    </BadgeGroup>
  ),
};

export const NoOverflow: Story = {
  render: () => (
    <BadgeGroup>
      <Avatar fallback="A" size="md" />
      <Avatar fallback="B" size="md" />
      <Avatar fallback="C" size="md" />
    </BadgeGroup>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <BadgeGroup max={4}>
      {sampleUsers.map((user, i) => (
        <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
      ))}
    </BadgeGroup>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
