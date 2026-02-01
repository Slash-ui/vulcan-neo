import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardHeader } from './CardHeader';
import { Card, CardBody } from '../Card';
import { IconButton } from '../../atoms/IconButton';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';
import { Surface } from '../../foundation/Surface';
import { Typography } from '../../foundation/Typography';

/**
 * A structured header component for cards with title, subtitle, icon, and actions.
 * Provides consistent layout for card headers across the design system.
 *
 * ## When to Use
 *
 * - **Profile cards**: Display user avatar with name and role
 * - **Content cards**: Show title, metadata, and action buttons
 * - **List items**: Provide consistent header structure for card-based lists
 * - **Avoid for**: Simple cards without structured headers (use Typography directly)
 *
 * ## Key Features
 *
 * - **Flexible layout**: Icon, title/subtitle, and actions regions
 * - **Optional border**: Visual separation from card content
 * - **Avatar support**: Accepts any React node for icons or avatars
 * - **Actions slot**: Place buttons, badges, or dropdowns
 *
 * ## Best Practices
 *
 * - Keep titles concise (2-4 words)
 * - Use subtitle for secondary information like dates or counts
 * - Limit actions to 1-2 items to avoid clutter
 * - Use bordered variant when header needs visual separation
 */
const meta: Meta<typeof CardHeader> = {
  title: 'Molecules/CardHeader',
  component: CardHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem' }}>
        <Card style={{ maxWidth: '400px' }}>
          <Story />
          <CardBody>
            <Typography color="secondary">Card content goes here...</Typography>
          </CardBody>
        </Card>
      </Surface>
    ),
  ],
  argTypes: {
    // Content
    title: {
      control: 'text',
      description: 'Primary heading text for the card header',
      table: { category: 'Content' },
    },
    subtitle: {
      control: 'text',
      description: 'Secondary text displayed below the title',
      table: { category: 'Content' },
    },
    icon: {
      control: false,
      description: 'Icon, avatar, or image displayed before the title',
      table: { category: 'Content' },
    },
    actions: {
      control: false,
      description: 'Action buttons, badges, or dropdowns on the right side',
      table: { category: 'Content' },
    },

    // Appearance
    bordered: {
      control: 'boolean',
      description:
        'Show a border below the header. Use for visual separation from card content.',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
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

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default card header with title and subtitle. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card subtitle or description',
  },
};

// =============================================================================
// FEATURES
// =============================================================================

/**
 * Card header with action buttons on the right side.
 * Use for cards that need quick actions like edit, delete, or overflow menus.
 */
export const WithActions: Story = {
  args: {
    title: 'Team Members',
    subtitle: '5 members',
    actions: <IconButton aria-label="More options" icon={<MoreIcon />} />,
  },
};

/**
 * Card header with an avatar for user profiles or entity representations.
 */
export const WithAvatar: Story = {
  args: {
    title: 'John Doe',
    subtitle: 'Software Engineer',
    icon: <Avatar fallback="JD" size="md" />,
    actions: <IconButton aria-label="More options" icon={<MoreIcon />} />,
  },
};

/**
 * Card header with a badge for notifications or counts.
 */
export const WithBadge: Story = {
  args: {
    title: 'Notifications',
    subtitle: 'Recent activity',
    actions: <Badge color="primary">12</Badge>,
  },
};

/**
 * Bordered variant adds a visual divider between header and content.
 * Use when the header needs clear separation from the card body.
 */
export const Bordered: Story = {
  args: {
    title: 'Settings',
    subtitle: 'Manage your preferences',
    bordered: true,
  },
};

// =============================================================================
// USE CASES
// =============================================================================

/**
 * Profile card header combining avatar, name, role, and actions.
 */
export const ProfileCard: Story = {
  args: {
    title: 'Sarah Johnson',
    subtitle: 'Product Designer',
    icon: <Avatar fallback="SJ" size="md" />,
    actions: <Badge color="success">Online</Badge>,
    bordered: true,
  },
};

/**
 * Header without subtitle for simple cards.
 */
export const TitleOnly: Story = {
  tags: ['!dev'],
  args: {
    title: 'Quick Actions',
  },
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Card header adapts automatically to dark theme.
 */
export const DarkTheme: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card subtitle',
    actions: <IconButton aria-label="More options" icon={<MoreIcon />} />,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Card style={{ maxWidth: '400px' }}>
          <Story />
          <CardBody>
            <Typography color="secondary">Card content goes here...</Typography>
          </CardBody>
        </Card>
      </Surface>
    ),
  ],
};
