import type { Meta, StoryObj } from '@storybook/react-vite';
import { Users, MoreHorizontal } from 'lucide-react';
import { BadgeGroup } from './BadgeGroup';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';
import { Surface } from '../../foundation/Surface';

const sampleUsers = [
  { initials: 'JD', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop' },
  { initials: 'AS', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
  { initials: 'MK', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop' },
  { initials: 'RW', src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop' },
  { initials: 'PT', src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop' },
  { initials: 'LH' },
  { initials: 'CB' },
];

// Children options for the control
const childrenOptions = {
  'Avatars (7 users)': sampleUsers.map((user, i) => (
    <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
  )),
  'Avatars (4 users)': sampleUsers.slice(0, 4).map((user, i) => (
    <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
  )),
  'Badges (6 tags)': [
    <Badge key="1" color="primary">React</Badge>,
    <Badge key="2" color="success">TypeScript</Badge>,
    <Badge key="3" color="warning">Node.js</Badge>,
    <Badge key="4" color="error">Python</Badge>,
    <Badge key="5" color="default">Go</Badge>,
    <Badge key="6" color="primary">Rust</Badge>,
  ],
  'Badges (3 tags)': [
    <Badge key="1" color="primary">React</Badge>,
    <Badge key="2" color="success">TypeScript</Badge>,
    <Badge key="3" color="warning">Node.js</Badge>,
  ],
  'Initials Only': [
    <Avatar key="1" fallback="A" size="md" />,
    <Avatar key="2" fallback="B" size="md" />,
    <Avatar key="3" fallback="C" size="md" />,
    <Avatar key="4" fallback="D" size="md" />,
    <Avatar key="5" fallback="E" size="md" />,
  ],
};

// Overflow indicator options for the control
const overflowIndicatorOptions = {
  'Default (+N)': undefined,
  'Primary Filled': (count: number) => (
    <Badge color="primary" filled size="md">+{count}</Badge>
  ),
  'Success with text': (count: number) => (
    <Badge color="success" filled size="md">{count} more</Badge>
  ),
  'Error Filled': (count: number) => (
    <Badge color="error" filled size="md">+{count}</Badge>
  ),
  'With Icon': (
    <Badge color="default" size="md" leftIcon={<Users size={12} />}>more</Badge>
  ),
  'Icon Only': (
    <Badge color="default" size="md"><MoreHorizontal size={14} /></Badge>
  ),
  'Custom Purple': (count: number) => (
    <Badge customColor="#8B5CF6" filled size="md">+{count}</Badge>
  ),
  'Custom Pink': (count: number) => (
    <Badge customColor="#EC4899" filled size="md">{count} hidden</Badge>
  ),
};

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
      description: 'Maximum number of items to display before showing overflow count',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the badges',
    },
    overflowDirection: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Direction of overflow stacking',
    },
    spacing: {
      control: 'select',
      options: ['compact', 'normal', 'loose'],
      description: 'Spacing between stacked items',
    },
    animate: {
      control: 'boolean',
      description: 'Enable hover animation that expands items',
    },
    children: {
      control: 'select',
      options: Object.keys(childrenOptions),
      mapping: childrenOptions,
      description: 'Badge/Avatar children',
    },
    overflowIndicator: {
      control: 'select',
      options: Object.keys(overflowIndicatorOptions),
      mapping: overflowIndicatorOptions,
      description: 'Custom overflow indicator (ReactNode or render function)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    max: 3,
    size: 'md',
    overflowDirection: 'right',
    spacing: 'normal',
    animate: false,
    children: childrenOptions['Avatars (7 users)'],
    overflowIndicator: undefined,
  },
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
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <BadgeGroup size="sm" max={args.max} overflowDirection={args.overflowDirection}>
        {sampleUsers.map((user, i) => (
          <Avatar key={i} src={user.src} fallback={user.initials} size="sm" />
        ))}
      </BadgeGroup>
      <BadgeGroup size="md" max={args.max} overflowDirection={args.overflowDirection}>
        {sampleUsers.map((user, i) => (
          <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
        ))}
      </BadgeGroup>
      <BadgeGroup size="lg" max={args.max} overflowDirection={args.overflowDirection}>
        {sampleUsers.map((user, i) => (
          <Avatar key={i} src={user.src} fallback={user.initials} size="lg" />
        ))}
      </BadgeGroup>
    </div>
  ),
  args: {
    max: 4,
    overflowDirection: 'right',
  },
};

export const OverflowLeft: Story = {
  args: {
    max: 3,
    size: 'md',
    overflowDirection: 'left',
    children: childrenOptions['Avatars (7 users)'],
  },
};

export const WithBadges: Story = {
  args: {
    max: 4,
    size: 'md',
    overflowDirection: 'right',
    children: childrenOptions['Badges (6 tags)'],
  },
};

export const NoOverflow: Story = {
  args: {
    size: 'md',
    children: childrenOptions['Badges (3 tags)'],
  },
};

export const Spacing: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '14px', color: 'var(--neo-text-secondary)' }}>Compact</p>
        <BadgeGroup spacing="compact" max={args.max} animate={args.animate}>
          {sampleUsers.map((user, i) => (
            <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
          ))}
        </BadgeGroup>
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '14px', color: 'var(--neo-text-secondary)' }}>Normal</p>
        <BadgeGroup spacing="normal" max={args.max} animate={args.animate}>
          {sampleUsers.map((user, i) => (
            <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
          ))}
        </BadgeGroup>
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '14px', color: 'var(--neo-text-secondary)' }}>Loose</p>
        <BadgeGroup spacing="loose" max={args.max} animate={args.animate}>
          {sampleUsers.map((user, i) => (
            <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
          ))}
        </BadgeGroup>
      </div>
    </div>
  ),
  args: {
    max: 5,
    animate: false,
  },
};

export const Animated: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '14px', color: 'var(--neo-text-secondary)' }}>
          Hover over the avatars to see them expand
        </p>
        <BadgeGroup max={4} animate>
          {sampleUsers.map((user, i) => (
            <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
          ))}
        </BadgeGroup>
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '14px', color: 'var(--neo-text-secondary)' }}>
          Compact spacing with animation
        </p>
        <BadgeGroup max={4} animate spacing="compact">
          {sampleUsers.map((user, i) => (
            <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
          ))}
        </BadgeGroup>
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '14px', color: 'var(--neo-text-secondary)' }}>
          Loose spacing with animation
        </p>
        <BadgeGroup max={4} animate spacing="loose">
          {sampleUsers.map((user, i) => (
            <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
          ))}
        </BadgeGroup>
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '14px', color: 'var(--neo-text-secondary)' }}>
          Left direction with animation
        </p>
        <BadgeGroup max={4} animate overflowDirection="left">
          {sampleUsers.map((user, i) => (
            <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
          ))}
        </BadgeGroup>
      </div>
    </div>
  ),
};

export const CustomOverflowIndicator: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Using render function to access count */}
      <BadgeGroup
        max={3}
        overflowIndicator={(count) => (
          <Badge color="primary" filled size="md">
            {count} more
          </Badge>
        )}
      >
        {sampleUsers.map((user, i) => (
          <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
        ))}
      </BadgeGroup>

      {/* Using static ReactNode */}
      <BadgeGroup
        max={3}
        overflowIndicator={
          <Badge color="success" filled size="md" leftIcon={<Users size={12} />}>
            more
          </Badge>
        }
      >
        {sampleUsers.map((user, i) => (
          <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
        ))}
      </BadgeGroup>

      {/* Icon only indicator */}
      <BadgeGroup
        max={4}
        overflowIndicator={
          <Badge color="default" size="md">
            <MoreHorizontal size={14} />
          </Badge>
        }
      >
        {sampleUsers.map((user, i) => (
          <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
        ))}
      </BadgeGroup>

      {/* Filled colored badges */}
      <BadgeGroup
        max={3}
        overflowIndicator={(count) => (
          <Badge color="error" filled size="md">
            +{count}
          </Badge>
        )}
      >
        {sampleUsers.map((user, i) => (
          <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
        ))}
      </BadgeGroup>
    </div>
  ),
};

export const CustomColorOverflow: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <BadgeGroup
        max={3}
        overflowIndicator={(count) => (
          <Badge customColor="#8B5CF6" filled size="md">
            +{count}
          </Badge>
        )}
      >
        {sampleUsers.map((user, i) => (
          <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
        ))}
      </BadgeGroup>

      <BadgeGroup
        max={4}
        overflowIndicator={(count) => (
          <Badge customColor="#EC4899" filled size="md">
            {count} hidden
          </Badge>
        )}
      >
        {sampleUsers.map((user, i) => (
          <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
        ))}
      </BadgeGroup>
    </div>
  ),
};

export const DarkTheme: Story = {
  args: {
    max: 4,
    size: 'md',
    overflowDirection: 'right',
    children: childrenOptions['Avatars (7 users)'],
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
