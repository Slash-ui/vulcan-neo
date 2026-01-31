import type { Meta, StoryObj } from '@storybook/react-vite';
import { Users, MoreHorizontal } from 'lucide-react';
import { BadgeGroup } from './BadgeGroup';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';
import { Surface } from '../../foundation/Surface';

/**
 * A component for displaying stacked collections of avatars or badges with overflow handling.
 * Items overlap in a visually appealing stack with configurable density.
 *
 * ## When to Use
 *
 * - **User lists**: Show team members or collaborators
 * - **Assignees**: Display who's working on a task
 * - **Skill tags**: Compact tag lists with overflow
 * - **Participants**: Event attendees or chat members
 *
 * ## Key Features
 *
 * - **Overflow handling**: Shows "+N" indicator when items exceed max
 * - **Custom indicators**: Replace default overflow with any content
 * - **Hover animation**: Optional expand effect on hover
 * - **Flexible spacing**: Compact, normal, or loose stacking
 *
 * ## Best Practices
 *
 * - Set appropriate `max` based on available space
 * - Use consistent sizes for all children
 * - Consider using custom overflow indicators for better UX
 */
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
    // Content
    children: {
      control: 'select',
      options: ['Avatars (7 users)', 'Avatars (4 users)', 'Badges (6 tags)', 'Badges (3 tags)', 'Initials Only'],
      mapping: {
        'Avatars (7 users)': null, // Will be set in args
        'Avatars (4 users)': null,
        'Badges (6 tags)': null,
        'Badges (3 tags)': null,
        'Initials Only': null,
      },
      description: 'Badge or Avatar children to display',
      table: { category: 'Content' },
    },
    overflowIndicator: {
      control: 'select',
      options: ['Default (+N)', 'Primary Filled', 'Success with text', 'Error Filled', 'With Icon', 'Icon Only'],
      description: 'Custom overflow indicator (ReactNode or render function)',
      table: { category: 'Content' },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badges/avatars',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    spacing: {
      control: 'select',
      options: ['compact', 'normal', 'loose'],
      description: 'Overlap density between stacked items',
      table: { category: 'Appearance', defaultValue: { summary: 'normal' } },
    },

    // Behavior
    max: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum visible items before showing overflow',
      table: { category: 'Behavior' },
    },
    overflowDirection: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of overflow indicator',
      table: { category: 'Behavior', defaultValue: { summary: 'right' } },
    },
    animate: {
      control: 'boolean',
      description: 'Enable hover animation that expands items',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
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

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default avatar stack with overflow indicator. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    max: 3,
    size: 'md',
    overflowDirection: 'right',
    spacing: 'normal',
    animate: false,
  },
  render: (args) => (
    <BadgeGroup {...args}>
      {sampleUsers.map((user, i) => (
        <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
      ))}
    </BadgeGroup>
  ),
};

// =============================================================================
// MAX LIMIT
// =============================================================================

/**
 * Different max values control when overflow appears.
 */
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

// =============================================================================
// SIZES
// =============================================================================

/**
 * Three sizes for different contexts and densities.
 */
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

// =============================================================================
// OVERFLOW DIRECTION
// =============================================================================

/**
 * Overflow indicator on the left side instead of right.
 */
export const OverflowLeft: Story = {
  render: () => (
    <BadgeGroup max={3} overflowDirection="left">
      {sampleUsers.map((user, i) => (
        <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
      ))}
    </BadgeGroup>
  ),
};

// =============================================================================
// WITH BADGES
// =============================================================================

/**
 * Works with Badge components for skill tags or categories.
 */
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

/**
 * When all items fit, no overflow indicator is shown.
 */
export const NoOverflow: Story = {
  render: () => (
    <BadgeGroup>
      <Badge color="primary">React</Badge>
      <Badge color="success">TypeScript</Badge>
      <Badge color="warning">Node.js</Badge>
    </BadgeGroup>
  ),
};

// =============================================================================
// SPACING
// =============================================================================

/**
 * Three spacing options control overlap density.
 */
export const Spacing: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '14px', color: 'var(--neo-text-secondary)' }}>Compact</p>
        <BadgeGroup spacing="compact" max={5}>
          {sampleUsers.map((user, i) => (
            <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
          ))}
        </BadgeGroup>
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '14px', color: 'var(--neo-text-secondary)' }}>Normal</p>
        <BadgeGroup spacing="normal" max={5}>
          {sampleUsers.map((user, i) => (
            <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
          ))}
        </BadgeGroup>
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '14px', color: 'var(--neo-text-secondary)' }}>Loose</p>
        <BadgeGroup spacing="loose" max={5}>
          {sampleUsers.map((user, i) => (
            <Avatar key={i} src={user.src} fallback={user.initials} size="md" />
          ))}
        </BadgeGroup>
      </div>
    </div>
  ),
};

// =============================================================================
// ANIMATION
// =============================================================================

/**
 * Hover animation expands items for better visibility.
 */
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

// =============================================================================
// CUSTOM OVERFLOW INDICATORS
// =============================================================================

/**
 * Replace the default "+N" with custom styled indicators.
 */
export const CustomOverflowIndicator: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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

/**
 * Custom hex colors for brand-specific overflow indicators.
 */
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

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * BadgeGroup adapts to dark theme automatically.
 */
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
