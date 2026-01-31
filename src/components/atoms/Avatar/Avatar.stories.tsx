import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import { Surface } from '../../foundation/Surface';

/**
 * Displays a user's profile picture or initials with an optional status indicator.
 * Gracefully handles missing images by showing fallback initials.
 *
 * ## When to Use
 *
 * - **User profiles**: Display user photos in headers, comments, or lists
 * - **Team members**: Show team avatars in collaboration features
 * - **Chat applications**: Identify participants with status indicators
 * - **Account menus**: Display current user in navigation
 *
 * ## Key Features
 *
 * - **Image with fallback**: Shows initials when image fails to load
 * - **Neomorphic design**: Supports `convex`, `concave`, and `flat` variants
 * - **Status indicators**: Online, offline, busy, and away states
 * - **Five sizes**: From extra-small (xs) to extra-large (xl)
 *
 * ## Accessibility
 *
 * Always provide meaningful `alt` text when using images. For decorative avatars,
 * use an empty string (`alt=""`).
 *
 * ## Anatomy
 *
 * ![Avatar Anatomy](/docs/images/avatar-anatomy.png)
 */
const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Content
    src: {
      control: 'text',
      description: 'Image URL',
      table: { category: 'Content' },
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility',
      table: { category: 'Content' },
    },
    fallback: {
      control: 'text',
      description: 'Text to show when image is unavailable (typically initials)',
      table: { category: 'Content' },
    },

    // Appearance
    variant: {
      control: 'select',
      options: ['convex', 'concave', 'flat'],
      description: 'Visual style: **convex** (raised), **concave** (pressed), or **flat** (minimal)',
      table: { category: 'Appearance', defaultValue: { summary: 'convex' } },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Avatar size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },

    // Status
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'busy', 'away'],
      description: 'Status indicator color',
      table: { category: 'Status' },
    },
    statusBorder: {
      control: 'boolean',
      description: 'Show border around status indicator',
      table: { category: 'Status', defaultValue: { summary: 'true' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop';

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default avatar with an image. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    src: sampleImage,
    alt: 'John Doe',
  },
};

// =============================================================================
// CONTENT TYPES
// =============================================================================

/**
 * When no image is provided or the image fails to load, fallback initials are shown.
 */
export const WithFallback: Story = {
  args: {
    fallback: 'JD',
  },
};

/**
 * Invalid image URLs automatically fall back to initials.
 */
export const ImageError: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    fallback: 'ER',
    alt: 'Error fallback example',
  },
};

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * - **Convex** (default): Raised appearance
 * - **Concave**: Pressed/inset appearance
 * - **Flat**: No shadow
 */
export const Variants: Story = {
  render: () => (
    <>
      <Avatar variant="convex" fallback="CV" />
      <Avatar variant="concave" fallback="CC" />
      <Avatar variant="flat" fallback="FL" />
    </>
  ),
};

/**
 * Convex variant with raised appearance.
 */
export const VariantConvex: Story = {
  tags: ['!dev'],
  args: {
    fallback: 'CV',
    variant: 'convex',
  },
};

/**
 * Concave variant with pressed appearance.
 */
export const VariantConcave: Story = {
  tags: ['!dev'],
  args: {
    fallback: 'CC',
    variant: 'concave',
  },
};

/**
 * Flat variant with minimal styling.
 */
export const VariantFlat: Story = {
  tags: ['!dev'],
  args: {
    fallback: 'FL',
    variant: 'flat',
  },
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Five sizes from extra-small to extra-large.
 */
export const Sizes: Story = {
  render: () => (
    <>
      <Avatar size="xs" fallback="XS" />
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
    </>
  ),
};

/**
 * Extra-small avatar for compact layouts.
 */
export const SizeExtraSmall: Story = {
  tags: ['!dev'],
  args: {
    fallback: 'XS',
    size: 'xs',
  },
};

/**
 * Small avatar.
 */
export const SizeSmall: Story = {
  tags: ['!dev'],
  args: {
    fallback: 'SM',
    size: 'sm',
  },
};

/**
 * Medium avatar (default size).
 */
export const SizeMedium: Story = {
  tags: ['!dev'],
  args: {
    fallback: 'MD',
    size: 'md',
  },
};

/**
 * Large avatar for emphasis.
 */
export const SizeLarge: Story = {
  tags: ['!dev'],
  args: {
    fallback: 'LG',
    size: 'lg',
  },
};

/**
 * Extra-large avatar for profile pages.
 */
export const SizeExtraLarge: Story = {
  tags: ['!dev'],
  args: {
    fallback: 'XL',
    size: 'xl',
  },
};

// =============================================================================
// STATUS INDICATORS
// =============================================================================

/**
 * Show user availability with colored indicators:
 * - **Online**: Green - user is available
 * - **Away**: Yellow - user is idle
 * - **Busy**: Red - user is in a meeting or focused
 * - **Offline**: Gray - user is not available
 */
export const WithStatus: Story = {
  render: () => (
    <>
      <Avatar src={sampleImage} status="online" alt="Online user" />
      <Avatar src={sampleImage} status="away" alt="Away user" />
      <Avatar src={sampleImage} status="busy" alt="Busy user" />
      <Avatar src={sampleImage} status="offline" alt="Offline user" />
    </>
  ),
};

/**
 * Avatar with online status indicator.
 */
export const StatusOnline: Story = {
  tags: ['!dev'],
  args: {
    src: sampleImage,
    status: 'online',
    alt: 'Online user',
  },
};

/**
 * Avatar with away status indicator.
 */
export const StatusAway: Story = {
  tags: ['!dev'],
  args: {
    src: sampleImage,
    status: 'away',
    alt: 'Away user',
  },
};

/**
 * Avatar with busy status indicator.
 */
export const StatusBusy: Story = {
  tags: ['!dev'],
  args: {
    src: sampleImage,
    status: 'busy',
    alt: 'Busy user',
  },
};

/**
 * Avatar with offline status indicator.
 */
export const StatusOffline: Story = {
  tags: ['!dev'],
  args: {
    src: sampleImage,
    status: 'offline',
    alt: 'Offline user',
  },
};

/**
 * Status indicators scale proportionally with avatar size.
 */
export const StatusSizes: Story = {
  render: () => (
    <>
      <Avatar size="xs" fallback="XS" status="online" />
      <Avatar size="sm" fallback="SM" status="online" />
      <Avatar size="md" fallback="MD" status="online" />
      <Avatar size="lg" fallback="LG" status="online" />
      <Avatar size="xl" fallback="XL" status="online" />
    </>
  ),
};

/**
 * Remove the white border around the status indicator.
 */
export const WithoutStatusBorder: Story = {
  args: {
    src: sampleImage,
    status: 'online',
    statusBorder: false,
    alt: 'User without status border',
  },
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Avatars adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    fallback: 'DT',
    status: 'online',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1.5rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
