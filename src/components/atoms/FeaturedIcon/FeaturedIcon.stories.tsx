import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeaturedIcon } from './FeaturedIcon';
import { Surface } from '../../foundation/Surface';
import {
  iconMapXl,
  createIconArgType,
  Star,
  Bell,
  Zap,
  CheckCircle,
  AlertCircle,
  XCircle,
  Globe,
  Cloud,
  Shield,
  Target,
  Code,
  Terminal,
  Database,
  Cpu,
} from '../../../../.storybook/icons';

/**
 * A decorative container that highlights an icon with neomorphic styling.
 * Use it to draw attention to key features, status indicators, or actions.
 *
 * ## When to Use
 *
 * - **Feature highlights**: Showcase key features on landing pages
 * - **Status indicators**: Display success, warning, or error states
 * - **Empty states**: Accompany messages when no content is available
 * - **Card headers**: Add visual interest to card components
 *
 * ## Key Features
 *
 * - **Neomorphic design**: Supports `convex`, `concave`, and `flat` variants
 * - **Multiple shapes**: Circle, square, or rounded containers
 * - **Color themes**: Brand colors + semantic status colors
 * - **Flexible sizing**: Four sizes from small to extra-large
 *
 * ## Best Practices
 *
 * - Match icon size to container size for proper proportions
 * - Use semantic colors (`success`, `error`, etc.) for status indicators
 * - Keep icons simple and recognizable at all sizes
 */
const meta: Meta<typeof FeaturedIcon> = {
  title: 'Atoms/FeaturedIcon',
  component: FeaturedIcon,
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
    children: {
      ...createIconArgType(iconMapXl, 'Icon to display'),
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
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Container size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'Container shape',
      table: { category: 'Appearance', defaultValue: { summary: 'circle' } },
    },
    elevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
      description: 'Shadow intensity',
      table: { category: 'Appearance', defaultValue: { summary: 'mid' } },
    },

    // Color
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error'],
      description: 'Color theme for the icon',
      table: { category: 'Color', defaultValue: { summary: 'default' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default featured icon. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    children: <Star size={24} />,
    variant: 'convex',
    size: 'md',
    elevation: 'mid',
  },
};

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * - **Convex** (default): Raised appearance with outer shadows
 * - **Concave**: Pressed appearance with inner shadows
 * - **Flat**: No shadows, minimal style
 */
export const Variants: Story = {
  render: () => (
    <>
      <FeaturedIcon variant="convex"><Star size={24} /></FeaturedIcon>
      <FeaturedIcon variant="concave"><Star size={24} /></FeaturedIcon>
      <FeaturedIcon variant="flat"><Star size={24} /></FeaturedIcon>
    </>
  ),
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Four sizes available. Match icon size to container for proper proportions.
 */
export const Sizes: Story = {
  render: () => (
    <>
      <FeaturedIcon size="sm"><Star size={16} /></FeaturedIcon>
      <FeaturedIcon size="md"><Star size={24} /></FeaturedIcon>
      <FeaturedIcon size="lg"><Star size={32} /></FeaturedIcon>
      <FeaturedIcon size="xl"><Star size={40} /></FeaturedIcon>
    </>
  ),
};

// =============================================================================
// ELEVATIONS
// =============================================================================

/**
 * Control shadow intensity for convex and concave variants.
 */
export const Elevations: Story = {
  render: () => (
    <>
      <FeaturedIcon elevation="low"><Star size={24} /></FeaturedIcon>
      <FeaturedIcon elevation="mid"><Star size={24} /></FeaturedIcon>
      <FeaturedIcon elevation="high"><Star size={24} /></FeaturedIcon>
    </>
  ),
};

// =============================================================================
// COLORS
// =============================================================================

/**
 * Color themes for different contexts. Use semantic colors for status.
 */
export const Colors: Story = {
  render: () => (
    <>
      <FeaturedIcon color="default"><Bell size={24} /></FeaturedIcon>
      <FeaturedIcon color="primary"><Bell size={24} /></FeaturedIcon>
      <FeaturedIcon color="success"><Bell size={24} /></FeaturedIcon>
      <FeaturedIcon color="warning"><Bell size={24} /></FeaturedIcon>
      <FeaturedIcon color="error"><Bell size={24} /></FeaturedIcon>
    </>
  ),
};

// =============================================================================
// SHAPES
// =============================================================================

/**
 * Three container shapes for different visual contexts.
 */
export const Shapes: Story = {
  render: () => (
    <>
      <FeaturedIcon shape="circle"><Star size={24} /></FeaturedIcon>
      <FeaturedIcon shape="rounded"><Star size={24} /></FeaturedIcon>
      <FeaturedIcon shape="square"><Star size={24} /></FeaturedIcon>
    </>
  ),
};

// =============================================================================
// USE CASES
// =============================================================================

/**
 * Examples of common icon patterns and use cases.
 */
export const IconShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <FeaturedIcon color="primary"><Zap size={24} /></FeaturedIcon>
        <FeaturedIcon color="success"><CheckCircle size={24} /></FeaturedIcon>
        <FeaturedIcon color="warning"><AlertCircle size={24} /></FeaturedIcon>
        <FeaturedIcon color="error"><XCircle size={24} /></FeaturedIcon>
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <FeaturedIcon><Globe size={24} /></FeaturedIcon>
        <FeaturedIcon><Cloud size={24} /></FeaturedIcon>
        <FeaturedIcon><Shield size={24} /></FeaturedIcon>
        <FeaturedIcon><Target size={24} /></FeaturedIcon>
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <FeaturedIcon shape="square"><Code size={24} /></FeaturedIcon>
        <FeaturedIcon shape="square"><Terminal size={24} /></FeaturedIcon>
        <FeaturedIcon shape="square"><Database size={24} /></FeaturedIcon>
        <FeaturedIcon shape="square"><Cpu size={24} /></FeaturedIcon>
      </div>
    </div>
  ),
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Featured icons adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    children: <Star size={24} />,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1.5rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
