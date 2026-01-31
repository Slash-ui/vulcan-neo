import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Surface } from '../../foundation/Surface';
import {
  iconMapXs,
  createIconArgType,
  Check,
  Star,
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Lock,
  Zap,
  Heart,
  ArrowRight,
  Award,
} from '../../../../.storybook/icons';

/**
 * A small label for highlighting status, counts, or categories. Use badges to
 * draw attention to new items, indicate status, or categorize content.
 *
 * ## When to Use
 *
 * - **Status labels**: Active, pending, completed, etc.
 * - **Counts**: Notification counts, item quantities
 * - **Categories**: Tags, labels, filters
 * - **Indicators**: New, featured, sale, premium
 *
 * ## Key Features
 *
 * - **Two display modes**: Text badges or dot indicators
 * - **Filled or outlined**: Use `filled` for emphasis, default for subtle
 * - **Icons**: Add left/right icons for context
 * - **Color themes**: Brand colors + semantic status colors
 * - **Custom colors**: Any hex color with auto-contrast text
 *
 * ## Best Practices
 *
 * - Keep badge text short (1-2 words)
 * - Use semantic colors (`success`, `error`, etc.) for status
 * - Use `filled` sparingly for important items
 * - Dot badges work well for simple presence indicators
 */
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
    // Content
    children: {
      control: 'text',
      description: 'Badge text content',
      table: { category: 'Content' },
    },
    leftIcon: {
      ...createIconArgType(iconMapXs, 'Icon before text'),
      table: { category: 'Content' },
    },
    rightIcon: {
      ...createIconArgType(iconMapXs, 'Icon after text'),
      table: { category: 'Content' },
    },
    dot: {
      control: 'boolean',
      description: 'Show as a small dot instead of text',
      table: { category: 'Content', defaultValue: { summary: 'false' } },
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
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    filled: {
      control: 'boolean',
      description: 'Use filled background instead of outlined style',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },

    // Color
    color: {
      control: 'select',
      options: [
        'default',
        'primary', 'primary-light', 'primary-dark',
        'secondary', 'secondary-light', 'secondary-dark',
        'tertiary', 'tertiary-light', 'tertiary-dark',
        'success', 'warning', 'error', 'info',
      ],
      description: 'Color theme',
      table: { category: 'Color', defaultValue: { summary: 'default' } },
    },
    customColor: {
      control: 'color',
      description: 'Custom hex color (requires `filled={true}`)',
      table: { category: 'Color' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default badge. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    children: 'Badge',
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
      <Badge variant="convex">Convex</Badge>
      <Badge variant="concave">Concave</Badge>
      <Badge variant="flat">Flat</Badge>
    </>
  ),
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Three sizes for different contexts.
 */
export const Sizes: Story = {
  render: () => (
    <>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </>
  ),
};

// =============================================================================
// COLORS
// =============================================================================

/**
 * Default (outlined) style shows colored text on the surface background.
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge color="default">Default</Badge>
        <Badge color="primary">Primary</Badge>
        <Badge color="secondary">Secondary</Badge>
        <Badge color="tertiary">Tertiary</Badge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge color="success">Success</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="error">Error</Badge>
        <Badge color="info">Info</Badge>
      </div>
    </div>
  ),
};

/**
 * Use `filled` for more prominent badges. The background uses the color
 * and text automatically adjusts for contrast.
 */
export const Filled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge filled color="default">Default</Badge>
        <Badge filled color="primary">Primary</Badge>
        <Badge filled color="secondary">Secondary</Badge>
        <Badge filled color="tertiary">Tertiary</Badge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge filled color="success">Success</Badge>
        <Badge filled color="warning">Warning</Badge>
        <Badge filled color="error">Error</Badge>
        <Badge filled color="info">Info</Badge>
      </div>
    </div>
  ),
};

/**
 * Use any hex color with `customColor`. Requires `filled={true}`.
 * Text color is automatically calculated for contrast.
 */
export const CustomColors: Story = {
  render: () => (
    <>
      <Badge filled customColor="#FF6B6B">Coral</Badge>
      <Badge filled customColor="#4ECDC4">Teal</Badge>
      <Badge filled customColor="#45B7D1">Sky Blue</Badge>
      <Badge filled customColor="#96CEB4">Sage</Badge>
      <Badge filled customColor="#DDA0DD">Plum</Badge>
      <Badge filled customColor="#2C3E50">Dark Slate</Badge>
    </>
  ),
};

// =============================================================================
// WITH ICONS
// =============================================================================

/**
 * Add icons for visual context. Icons can be on the left, right, or both sides.
 */
export const WithIcons: Story = {
  render: () => (
    <>
      <Badge leftIcon={<Check size={12} />} color="success">Verified</Badge>
      <Badge rightIcon={<Star size={12} />} color="warning">Featured</Badge>
      <Badge leftIcon={<Check size={12} />} rightIcon={<ArrowRight size={12} />}>Both</Badge>
    </>
  ),
};

/**
 * Icons work great with filled badges for status indicators.
 */
export const FilledWithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge filled color="success" leftIcon={<CheckCircle size={12} />}>Approved</Badge>
        <Badge filled color="error" leftIcon={<XCircle size={12} />}>Rejected</Badge>
        <Badge filled color="warning" leftIcon={<AlertCircle size={12} />}>Pending</Badge>
        <Badge filled color="info" leftIcon={<Info size={12} />}>Info</Badge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge filled color="primary" leftIcon={<Bell size={12} />}>Notifications</Badge>
        <Badge filled color="secondary" leftIcon={<Lock size={12} />}>Secure</Badge>
        <Badge filled color="tertiary" leftIcon={<Zap size={12} />}>Fast</Badge>
        <Badge filled customColor="#E91E63" leftIcon={<Heart size={12} />}>Loved</Badge>
      </div>
    </div>
  ),
};

// =============================================================================
// DOT BADGES
// =============================================================================

/**
 * Use `dot` for minimal status indicators without text.
 */
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

/**
 * Dot badges scale with the size prop.
 */
export const DotSizes: Story = {
  render: () => (
    <>
      <Badge dot size="sm" color="primary" />
      <Badge dot size="md" color="primary" />
      <Badge dot size="lg" color="primary" />
    </>
  ),
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Badges adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  render: () => (
    <>
      <Badge>Default</Badge>
      <Badge filled color="primary">Filled</Badge>
      <Badge dot color="success" />
    </>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
