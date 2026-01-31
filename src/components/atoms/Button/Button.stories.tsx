import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Surface } from '../../foundation/Surface';
import {
  iconMapLg,
  createIconArgType,
  Plus,
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  Download,
  Upload,
  Save,
  Send,
  Edit,
  Trash,
  Copy,
  Share,
  LogIn,
  LogOut,
  UserPlus,
  Settings,
} from '../../../../.storybook/icons';

/**
 * The primary interactive element for user actions. Buttons follow neomorphic design
 * with a raised (convex) default state that appears pressed when clicked.
 *
 * ## When to Use
 *
 * - **Primary actions**: Submit, save, confirm
 * - **Secondary actions**: Cancel, back, dismiss
 * - **Navigation**: Links styled as buttons
 * - **Floating actions**: FAB variant for prominent actions
 *
 * ## Key Features
 *
 * - **Neomorphic design**: Convex (raised), flat, and FAB variants
 * - **Color themes**: Brand colors + semantic status colors
 * - **Shadow colors**: Independent shadow coloring for creative effects
 * - **Icons**: Left, right, or icon-only buttons
 * - **States**: Loading spinner, disabled state
 *
 * ## Variants
 *
 * - **Convex** (default): Raised appearance, presses in on click
 * - **Flat**: Minimal style, good for secondary actions
 * - **FAB**: Circular floating action button
 *
 * ## Best Practices
 *
 * - Use one primary button per section
 * - Keep labels short and action-oriented
 * - Use semantic colors for destructive actions (error) or confirmations (success)
 * - FAB should be used for the single most important action
 */
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
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
    label: {
      control: 'text',
      description: 'Button text',
      table: { category: 'Content' },
    },
    leftIcon: {
      ...createIconArgType(iconMapLg, 'Icon before label'),
      table: { category: 'Content' },
    },
    rightIcon: {
      ...createIconArgType(iconMapLg, 'Icon after label'),
      table: { category: 'Content' },
    },

    // Appearance
    variant: {
      control: 'select',
      options: ['convex', 'flat', 'fab'],
      description: 'Visual style: **convex** (raised), **flat** (minimal), or **fab** (floating)',
      table: { category: 'Appearance', defaultValue: { summary: 'convex' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    elevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
      description: 'Shadow intensity',
      table: { category: 'Appearance', defaultValue: { summary: 'mid' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expand to fill container width',
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
      description: 'Background color theme',
      table: { category: 'Color', defaultValue: { summary: 'default' } },
    },
    customColor: {
      control: 'color',
      description: 'Custom background color (hex). Text auto-adjusts for contrast.',
      table: { category: 'Color' },
    },
    shadowColor: {
      control: 'select',
      options: [
        undefined, 'default',
        'primary', 'primary-light', 'primary-dark',
        'secondary', 'secondary-light', 'secondary-dark',
        'tertiary', 'tertiary-light', 'tertiary-dark',
        'success', 'warning', 'error', 'info',
      ],
      description: 'Shadow color theme (independent from background)',
      table: { category: 'Color' },
    },
    customShadowColor: {
      control: 'color',
      description: 'Custom shadow color (hex)',
      table: { category: 'Color' },
    },

    // State
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
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
 * Default button. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    label: 'Button',
  },
};

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * Minimal style without shadows. Good for secondary actions or dense UIs.
 */
export const Flat: Story = {
  args: {
    label: 'Flat Button',
    variant: 'flat',
  },
};

/**
 * Circular button for the most important action on a screen.
 * Typically used with an icon only.
 */
export const FAB: Story = {
  render: () => (
    <>
      <Button variant="fab" size="sm" leftIcon={<Plus size={16} />} />
      <Button variant="fab" leftIcon={<Plus size={20} />} />
      <Button variant="fab" size="lg" leftIcon={<Plus size={24} />} />
    </>
  ),
};

// =============================================================================
// SIZES & ELEVATIONS
// =============================================================================

/**
 * Three sizes for different contexts.
 */
export const Sizes: Story = {
  render: () => (
    <>
      <Button size="sm" label="Small" />
      <Button size="md" label="Medium" />
      <Button size="lg" label="Large" />
    </>
  ),
};

/**
 * Control shadow intensity. Higher elevation = more prominent.
 */
export const Elevations: Story = {
  render: () => (
    <>
      <Button elevation="low" label="Low" />
      <Button elevation="mid" label="Medium" />
      <Button elevation="high" label="High" />
    </>
  ),
};

// =============================================================================
// WITH ICONS
// =============================================================================

/**
 * Icons can be placed on the left, right, or both sides.
 */
export const WithIcons: Story = {
  render: () => (
    <>
      <Button leftIcon={<ArrowLeft size={20} />} label="Back" />
      <Button rightIcon={<ArrowRight size={20} />} label="Next" />
      <Button leftIcon={<ShoppingCart size={20} />} rightIcon={<ArrowRight size={20} />} label="Add to Cart" />
    </>
  ),
};

/**
 * Examples of typical button/icon combinations.
 */
export const IconVariety: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button leftIcon={<Download size={20} />} label="Download" />
        <Button leftIcon={<Upload size={20} />} label="Upload" />
        <Button leftIcon={<Save size={20} />} label="Save" />
        <Button leftIcon={<Send size={20} />} label="Send" />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button leftIcon={<Edit size={20} />} label="Edit" />
        <Button leftIcon={<Trash size={20} />} label="Delete" />
        <Button leftIcon={<Copy size={20} />} label="Copy" />
        <Button leftIcon={<Share size={20} />} label="Share" />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button leftIcon={<LogIn size={20} />} label="Sign In" />
        <Button leftIcon={<LogOut size={20} />} label="Sign Out" />
        <Button leftIcon={<UserPlus size={20} />} label="Sign Up" />
        <Button leftIcon={<Settings size={20} />} label="Settings" />
      </div>
    </div>
  ),
};

// =============================================================================
// COLORS
// =============================================================================

/**
 * Brand colors for primary actions, semantic colors for status.
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button color="primary" label="Primary" />
        <Button color="secondary" label="Secondary" />
        <Button color="tertiary" label="Tertiary" />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button color="success" label="Success" />
        <Button color="warning" label="Warning" />
        <Button color="error" label="Error" />
        <Button color="info" label="Info" />
      </div>
    </div>
  ),
};

/**
 * Use any hex color. Text automatically adjusts for contrast.
 */
export const CustomColors: Story = {
  render: () => (
    <>
      <Button customColor="#8B5CF6" label="Purple" />
      <Button customColor="#EC4899" label="Pink" />
      <Button customColor="#14B8A6" label="Teal" />
      <Button customColor="#F97316" label="Orange" />
    </>
  ),
};

/**
 * Combine colors with icons for contextual actions.
 */
export const ColoredWithIcons: Story = {
  render: () => (
    <>
      <Button color="primary" leftIcon={<Save size={20} />} label="Save" />
      <Button color="success" leftIcon={<Download size={20} />} label="Download" />
      <Button color="error" leftIcon={<Trash size={20} />} label="Delete" />
      <Button color="info" leftIcon={<Send size={20} />} label="Send" />
    </>
  ),
};

// =============================================================================
// SHADOW COLORS
// =============================================================================

/**
 * Set shadow color independently from background for creative effects.
 * The shadow uses lighter/darker shades of the specified color.
 */
export const ShadowColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button shadowColor="primary" label="Primary Shadow" />
        <Button shadowColor="secondary" label="Secondary Shadow" />
        <Button shadowColor="tertiary" label="Tertiary Shadow" />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button shadowColor="success" label="Success Shadow" />
        <Button shadowColor="error" label="Error Shadow" />
        <Button shadowColor="info" label="Info Shadow" />
      </div>
    </div>
  ),
};

/**
 * Set both `color` and `shadowColor` to the same value for a cohesive look.
 */
export const ColorWithMatchingShadow: Story = {
  render: () => (
    <>
      <Button color="primary" shadowColor="primary" label="Primary" />
      <Button color="success" shadowColor="success" label="Success" />
      <Button color="error" shadowColor="error" label="Error" />
      <Button customColor="#8B5CF6" customShadowColor="#8B5CF6" label="Custom" />
    </>
  ),
};

// =============================================================================
// STATES
// =============================================================================

/**
 * Shows a spinner and disables the button. Icons are hidden while loading.
 */
export const Loading: Story = {
  args: {
    label: 'Loading...',
    loading: true,
  },
};

/**
 * Prevents interaction and reduces opacity.
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

/**
 * Expands to fill the container width. Useful for forms and mobile UIs.
 */
export const FullWidth: Story = {
  args: {
    label: 'Full Width Button',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', width: '300px' }}>
        <Story />
      </Surface>
    ),
  ],
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Buttons adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  render: () => (
    <>
      <Button label="Default" />
      <Button color="primary" label="Primary" />
      <Button variant="flat" label="Flat" />
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
