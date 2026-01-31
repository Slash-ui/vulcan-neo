import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';
import { Surface } from '../../foundation/Surface';
import {
  iconMapLg,
  createIconArgType,
  X,
  Menu,
  Settings,
  Plus,
  Search,
  Bell,
  User,
  Edit,
  Trash,
  Copy,
  Share,
  Download,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Grid,
  List,
  Columns,
  Rows,
  Filter,
} from '../../../../.storybook/icons';

/**
 * A button that displays only an icon, used for compact actions and toolbars.
 * Provides the same interactive feedback as regular buttons in a smaller footprint.
 *
 * ## When to Use
 *
 * - **Toolbars**: Compact action buttons in editor or app toolbars
 * - **Close buttons**: Dismiss modals, panels, or notifications
 * - **Navigation**: Menu toggles, back buttons, settings access
 * - **Media controls**: Play, pause, skip, volume buttons
 *
 * ## Key Features
 *
 * - **Neomorphic design**: Supports `convex` and `flat` variants
 * - **Multiple shapes**: Circle, square, or rounded buttons
 * - **Three sizes**: Small, medium, and large
 * - **Accessible**: Requires `aria-label` for screen readers
 *
 * ## Accessibility
 *
 * Always provide an `aria-label` that describes the action, not the icon.
 * For example, use "Close dialog" instead of "X icon".
 */
const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
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
    icon: {
      ...createIconArgType(iconMapLg, 'Icon to display'),
      table: { category: 'Content' },
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label (required for screen readers)',
      table: { category: 'Content' },
    },

    // Appearance
    variant: {
      control: 'select',
      options: ['convex', 'flat'],
      description: 'Visual style: **convex** (raised) or **flat** (minimal)',
      table: { category: 'Appearance', defaultValue: { summary: 'convex' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'Button shape',
      table: { category: 'Appearance', defaultValue: { summary: 'circle' } },
    },
    elevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
      description: 'Shadow intensity',
      table: { category: 'Appearance', defaultValue: { summary: 'mid' } },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default icon button. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    icon: <X size={20} />,
    'aria-label': 'Close',
    variant: 'convex',
    size: 'md',
    elevation: 'mid',
  },
};

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * - **Convex** (default): Raised appearance with shadows
 * - **Flat**: No shadows, minimal style
 */
export const Variants: Story = {
  render: () => (
    <>
      <IconButton variant="convex" aria-label="Close" icon={<X size={20} />} />
      <IconButton variant="flat" aria-label="Menu" icon={<Menu size={20} />} />
    </>
  ),
};

/**
 * Convex variant with raised appearance.
 */
export const VariantConvex: Story = {
  tags: ['!dev'],
  args: {
    icon: <X size={20} />,
    'aria-label': 'Close',
    variant: 'convex',
  },
};

/**
 * Flat variant with minimal styling.
 */
export const VariantFlat: Story = {
  tags: ['!dev'],
  args: {
    icon: <Menu size={20} />,
    'aria-label': 'Menu',
    variant: 'flat',
  },
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Three sizes for different contexts. Match icon size to button size.
 */
export const Sizes: Story = {
  render: () => (
    <>
      <IconButton size="sm" aria-label="Close" icon={<X size={16} />} />
      <IconButton size="md" aria-label="Close" icon={<X size={20} />} />
      <IconButton size="lg" aria-label="Close" icon={<X size={24} />} />
    </>
  ),
};

/**
 * Small icon button for compact layouts.
 */
export const SizeSmall: Story = {
  tags: ['!dev'],
  args: {
    icon: <X size={16} />,
    'aria-label': 'Close',
    size: 'sm',
  },
};

/**
 * Medium icon button (default size).
 */
export const SizeMedium: Story = {
  tags: ['!dev'],
  args: {
    icon: <X size={20} />,
    'aria-label': 'Close',
    size: 'md',
  },
};

/**
 * Large icon button for emphasis.
 */
export const SizeLarge: Story = {
  tags: ['!dev'],
  args: {
    icon: <X size={24} />,
    'aria-label': 'Close',
    size: 'lg',
  },
};

// =============================================================================
// ELEVATIONS
// =============================================================================

/**
 * Control shadow intensity for the convex variant.
 */
export const Elevations: Story = {
  render: () => (
    <>
      <IconButton elevation="low" aria-label="Settings" icon={<Settings size={20} />} />
      <IconButton elevation="mid" aria-label="Settings" icon={<Settings size={20} />} />
      <IconButton elevation="high" aria-label="Settings" icon={<Settings size={20} />} />
    </>
  ),
};

/**
 * Low elevation with subtle shadows.
 */
export const ElevationLow: Story = {
  tags: ['!dev'],
  args: {
    icon: <Settings size={20} />,
    'aria-label': 'Settings',
    elevation: 'low',
  },
};

/**
 * Medium elevation (default).
 */
export const ElevationMid: Story = {
  tags: ['!dev'],
  args: {
    icon: <Settings size={20} />,
    'aria-label': 'Settings',
    elevation: 'mid',
  },
};

/**
 * High elevation with pronounced shadows.
 */
export const ElevationHigh: Story = {
  tags: ['!dev'],
  args: {
    icon: <Settings size={20} />,
    'aria-label': 'Settings',
    elevation: 'high',
  },
};

// =============================================================================
// SHAPES
// =============================================================================

/**
 * Three shapes for different visual contexts.
 */
export const Shapes: Story = {
  render: () => (
    <>
      <IconButton shape="circle" aria-label="Add" icon={<Plus size={20} />} />
      <IconButton shape="rounded" aria-label="Add" icon={<Plus size={20} />} />
      <IconButton shape="square" aria-label="Add" icon={<Plus size={20} />} />
    </>
  ),
};

/**
 * Circle shape (default).
 */
export const ShapeCircle: Story = {
  tags: ['!dev'],
  args: {
    icon: <Plus size={20} />,
    'aria-label': 'Add',
    shape: 'circle',
  },
};

/**
 * Rounded square shape.
 */
export const ShapeRounded: Story = {
  tags: ['!dev'],
  args: {
    icon: <Plus size={20} />,
    'aria-label': 'Add',
    shape: 'rounded',
  },
};

/**
 * Square shape with sharp corners.
 */
export const ShapeSquare: Story = {
  tags: ['!dev'],
  args: {
    icon: <Plus size={20} />,
    'aria-label': 'Add',
    shape: 'square',
  },
};

// =============================================================================
// USE CASES
// =============================================================================

/**
 * Common icon button patterns organized by use case.
 */
export const IconShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <IconButton aria-label="Menu" icon={<Menu size={20} />} />
        <IconButton aria-label="Search" icon={<Search size={20} />} />
        <IconButton aria-label="Settings" icon={<Settings size={20} />} />
        <IconButton aria-label="Bell" icon={<Bell size={20} />} />
        <IconButton aria-label="User" icon={<User size={20} />} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <IconButton aria-label="Edit" icon={<Edit size={20} />} />
        <IconButton aria-label="Trash" icon={<Trash size={20} />} />
        <IconButton aria-label="Copy" icon={<Copy size={20} />} />
        <IconButton aria-label="Share" icon={<Share size={20} />} />
        <IconButton aria-label="Download" icon={<Download size={20} />} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <IconButton shape="rounded" aria-label="Play" icon={<Play size={20} />} />
        <IconButton shape="rounded" aria-label="Pause" icon={<Pause size={20} />} />
        <IconButton shape="rounded" aria-label="Skip Back" icon={<SkipBack size={20} />} />
        <IconButton shape="rounded" aria-label="Skip Forward" icon={<SkipForward size={20} />} />
        <IconButton shape="rounded" aria-label="Volume" icon={<Volume2 size={20} />} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <IconButton shape="square" aria-label="Grid" icon={<Grid size={20} />} />
        <IconButton shape="square" aria-label="List" icon={<List size={20} />} />
        <IconButton shape="square" aria-label="Columns" icon={<Columns size={20} />} />
        <IconButton shape="square" aria-label="Rows" icon={<Rows size={20} />} />
        <IconButton shape="square" aria-label="Filter" icon={<Filter size={20} />} />
      </div>
    </div>
  ),
};

// =============================================================================
// STATES
// =============================================================================

/**
 * Disabled state prevents interaction and reduces opacity.
 */
export const Disabled: Story = {
  args: {
    icon: <X size={20} />,
    'aria-label': 'Close',
    disabled: true,
  },
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Icon buttons adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    icon: <X size={20} />,
    'aria-label': 'Close',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1.5rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
