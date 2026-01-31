import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';
import { Surface } from '../../foundation/Surface';
import { iconMapSm, createIconArgType, Sun, Moon, Volume2, VolumeX, Wifi, WifiOff, Eye, EyeOff } from '../../../../.storybook/icons';

/**
 * A toggle control for switching between two states (on/off).
 * Features a sliding thumb with optional icons for visual feedback.
 *
 * ## When to Use
 *
 * - **Feature toggles**: Enable or disable features in settings
 * - **Preferences**: Dark mode, notifications, auto-save
 * - **Binary choices**: Any on/off decision that takes effect immediately
 * - **Visibility controls**: Show/hide elements
 *
 * ## Key Features
 *
 * - **Neomorphic design**: Concave track with raised sliding thumb
 * - **State icons**: Optional icons for checked/unchecked states
 * - **Color customization**: Different colors for each state
 * - **Flexible labels**: Position labels on left or right
 *
 * ## Switch vs Checkbox
 *
 * Use **Switch** for settings that take effect immediately. Use **Checkbox** for
 * selections that require a form submission to apply.
 */
const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Content
    label: {
      control: 'text',
      description: 'Text label displayed next to the switch',
      table: { category: 'Content' },
    },
    labelPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Position of the label relative to the switch',
      table: { category: 'Content', defaultValue: { summary: 'right' } },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Switch size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    showIcons: {
      control: 'boolean',
      description: 'Show icons inside the thumb',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
    checkedIcon: {
      ...createIconArgType(iconMapSm, 'Icon for checked state'),
      table: { category: 'Appearance' },
    },
    uncheckedIcon: {
      ...createIconArgType(iconMapSm, 'Icon for unchecked state'),
      table: { category: 'Appearance' },
    },

    // Color
    checkedColor: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'],
      description: 'Track color when checked',
      table: { category: 'Color', defaultValue: { summary: 'success' } },
    },
    uncheckedColor: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'],
      description: 'Track color when unchecked',
      table: { category: 'Color', defaultValue: { summary: 'error' } },
    },
    customCheckedColor: {
      control: 'color',
      description: 'Custom hex color when checked',
      table: { category: 'Color' },
    },
    customUncheckedColor: {
      control: 'color',
      description: 'Custom hex color when unchecked',
      table: { category: 'Color' },
    },

    // State
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
      table: { category: 'State' },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Initial checked state (uncontrolled)',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch',
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
 * Default switch without label. Use controls to explore all options.
 */
export const Default: Story = {
  args: {},
};

// =============================================================================
// WITH LABELS
// =============================================================================

/**
 * Switch with label on the right (default position).
 */
export const WithLabel: Story = {
  args: {
    label: 'Enable notifications',
  },
};

/**
 * Label positioned on the left side.
 */
export const LabelLeft: Story = {
  args: {
    label: 'Dark mode',
    labelPosition: 'left',
  },
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Three sizes for different contexts.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium" />
      <Switch size="lg" label="Large" />
    </div>
  ),
};

/**
 * Small switch for compact layouts.
 */
export const SizeSmall: Story = {
  tags: ['!dev'],
  args: {
    size: 'sm',
    label: 'Small switch',
  },
};

/**
 * Medium switch (default size).
 */
export const SizeMedium: Story = {
  tags: ['!dev'],
  args: {
    size: 'md',
    label: 'Medium switch',
  },
};

/**
 * Large switch for touch interfaces.
 */
export const SizeLarge: Story = {
  tags: ['!dev'],
  args: {
    size: 'lg',
    label: 'Large switch',
  },
};

// =============================================================================
// STATES
// =============================================================================

/**
 * Pre-checked switch using `defaultChecked` prop.
 */
export const Checked: Story = {
  args: {
    label: 'Enabled feature',
    defaultChecked: true,
  },
};

/**
 * Disabled switches prevent interaction.
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
};

/**
 * All visual states: unchecked, checked, disabled unchecked, disabled checked.
 */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch label="Default (unchecked)" />
      <Switch label="Checked" defaultChecked />
      <Switch label="Disabled unchecked" disabled />
      <Switch label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

// =============================================================================
// WITH ICONS
// =============================================================================

/**
 * Show default check/X icons inside the thumb.
 */
export const WithIcons: Story = {
  args: {
    label: 'With icons',
    showIcons: true,
  },
};

/**
 * Custom icons for different use cases.
 */
export const CustomIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch
        label="Dark mode"
        checkedIcon={<Moon size={16} strokeWidth={3} />}
        uncheckedIcon={<Sun size={16} strokeWidth={3} />}
        showIcons
      />
      <Switch
        label="Sound"
        checkedIcon={<Volume2 size={16} strokeWidth={3} />}
        uncheckedIcon={<VolumeX size={16} strokeWidth={3} />}
        showIcons
        defaultChecked
      />
      <Switch
        label="WiFi"
        checkedIcon={<Wifi size={16} strokeWidth={3} />}
        uncheckedIcon={<WifiOff size={16} strokeWidth={3} />}
        showIcons
      />
      <Switch
        label="Visibility"
        checkedIcon={<Eye size={16} strokeWidth={3} />}
        uncheckedIcon={<EyeOff size={16} strokeWidth={3} />}
        showIcons
        defaultChecked
      />
    </div>
  ),
};

/**
 * Comparison of icon variants.
 */
export const IconVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch label="Without icons (default)" />
      <Switch label="With default icons" showIcons />
      <Switch
        label="Custom icons"
        checkedIcon={<Moon size={16} strokeWidth={3} />}
        uncheckedIcon={<Sun size={16} strokeWidth={3} />}
        showIcons
      />
    </div>
  ),
};

// =============================================================================
// COLORS
// =============================================================================

/**
 * Available colors for the checked (on) state.
 */
export const CheckedColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch label="Primary" checkedColor="primary" defaultChecked />
      <Switch label="Secondary" checkedColor="secondary" defaultChecked />
      <Switch label="Tertiary" checkedColor="tertiary" defaultChecked />
      <Switch label="Success (default)" checkedColor="success" defaultChecked />
      <Switch label="Warning" checkedColor="warning" defaultChecked />
      <Switch label="Error" checkedColor="error" defaultChecked />
      <Switch label="Info" checkedColor="info" defaultChecked />
    </div>
  ),
};

/**
 * Available colors for the unchecked (off) state.
 */
export const UncheckedColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch label="Primary" uncheckedColor="primary" />
      <Switch label="Secondary" uncheckedColor="secondary" />
      <Switch label="Tertiary" uncheckedColor="tertiary" />
      <Switch label="Success" uncheckedColor="success" />
      <Switch label="Warning" uncheckedColor="warning" />
      <Switch label="Error (default)" uncheckedColor="error" />
      <Switch label="Info" uncheckedColor="info" />
    </div>
  ),
};

/**
 * Combine different checked and unchecked colors.
 */
export const ColorCombinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch
        label="Primary / Secondary"
        checkedColor="primary"
        uncheckedColor="secondary"
      />
      <Switch
        label="Info / Warning"
        checkedColor="info"
        uncheckedColor="warning"
      />
      <Switch
        label="Tertiary / Primary"
        checkedColor="tertiary"
        uncheckedColor="primary"
        defaultChecked
      />
      <Switch
        label="Success / Error (default)"
        checkedColor="success"
        uncheckedColor="error"
      />
    </div>
  ),
};

/**
 * Use any hex colors for complete customization.
 */
export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch
        label="Purple / Pink"
        customCheckedColor="#8B5CF6"
        customUncheckedColor="#EC4899"
      />
      <Switch
        label="Teal / Orange"
        customCheckedColor="#14B8A6"
        customUncheckedColor="#F97316"
        defaultChecked
      />
      <Switch
        label="Indigo / Rose"
        customCheckedColor="#6366F1"
        customUncheckedColor="#F43F5E"
      />
      <Switch
        label="Emerald / Amber"
        customCheckedColor="#10B981"
        customUncheckedColor="#F59E0B"
        defaultChecked
      />
    </div>
  ),
};

/**
 * Custom colors combined with custom icons.
 */
export const CustomColorsWithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch
        label="Dark Mode"
        customCheckedColor="#6366F1"
        customUncheckedColor="#F59E0B"
        checkedIcon={<Moon size={16} strokeWidth={3} />}
        uncheckedIcon={<Sun size={16} strokeWidth={3} />}
        showIcons
        defaultChecked
      />
      <Switch
        label="WiFi"
        customCheckedColor="#14B8A6"
        customUncheckedColor="#94A3B8"
        checkedIcon={<Wifi size={16} strokeWidth={3} />}
        uncheckedIcon={<WifiOff size={16} strokeWidth={3} />}
        showIcons
      />
      <Switch
        label="Sound"
        customCheckedColor="#8B5CF6"
        customUncheckedColor="#EF4444"
        checkedIcon={<Volume2 size={16} strokeWidth={3} />}
        uncheckedIcon={<VolumeX size={16} strokeWidth={3} />}
        showIcons
        defaultChecked
      />
    </div>
  ),
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Switches adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    label: 'Dark theme switch',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
