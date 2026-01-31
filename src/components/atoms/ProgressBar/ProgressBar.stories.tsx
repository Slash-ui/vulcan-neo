import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';
import { Surface } from '../../foundation/Surface';

/**
 * A visual indicator that displays progress toward a goal or completion.
 * The track has a concave (inset) appearance with a raised fill bar.
 *
 * ## When to Use
 *
 * - **Loading states**: Show progress during file uploads or downloads
 * - **Multi-step processes**: Indicate progress through a wizard or form
 * - **Task completion**: Display percentage complete for tasks or goals
 * - **Skill levels**: Show proficiency or experience levels
 *
 * ## Key Features
 *
 * - **Neomorphic design**: Concave track with raised fill bar
 * - **Three variants**: Default, gradient, and glow effects
 * - **Color themes**: Brand colors + semantic status colors
 * - **Custom labels**: Format labels as percentages, steps, or custom text
 *
 * ## Accessibility
 *
 * Always provide an `aria-label` describing what the progress represents.
 * The component uses `role="progressbar"` with proper ARIA attributes.
 */
const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', maxWidth: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Value
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value',
      table: { category: 'Value' },
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value (default 100)',
      table: { category: 'Value', defaultValue: { summary: '100' } },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Bar height',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    variant: {
      control: 'select',
      options: ['default', 'gradient', 'glow'],
      description: 'Visual effect: **default**, **gradient**, or **glow**',
      table: { category: 'Appearance', defaultValue: { summary: 'default' } },
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
      description: 'Custom hex color (overrides color prop)',
      table: { category: 'Color' },
    },

    // Label
    showLabel: {
      control: 'boolean',
      description: 'Show percentage label',
      table: { category: 'Label', defaultValue: { summary: 'false' } },
    },
    formatLabel: {
      control: false,
      description: 'Custom label formatter function: `(value, max) => string`',
      table: { category: 'Label' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default progress bar. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    value: 60,
    'aria-label': 'Progress',
  },
};

// =============================================================================
// WITH LABEL
// =============================================================================

/**
 * Shows percentage label next to the bar.
 */
export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
    'aria-label': 'Download progress',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <ProgressBar value={50} size="sm" aria-label="Small progress" />
      <ProgressBar value={50} size="md" aria-label="Medium progress" />
      <ProgressBar value={50} size="lg" aria-label="Large progress" />
    </div>
  ),
};

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * - **Default**: Solid fill color
 * - **Gradient**: Color gradient effect
 * - **Glow**: Adds a glow around the fill
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <ProgressBar value={60} variant="default" showLabel aria-label="Default" />
      <ProgressBar value={60} variant="gradient" showLabel aria-label="Gradient" />
      <ProgressBar value={60} variant="glow" showLabel aria-label="Glow" />
    </div>
  ),
};

// =============================================================================
// COLORS
// =============================================================================

/**
 * All available color themes.
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <ProgressBar value={70} color="default" aria-label="Default" />
      <ProgressBar value={70} color="primary" aria-label="Primary" />
      <ProgressBar value={70} color="primary-light" aria-label="Primary Light" />
      <ProgressBar value={70} color="primary-dark" aria-label="Primary Dark" />
      <ProgressBar value={70} color="secondary" aria-label="Secondary" />
      <ProgressBar value={70} color="secondary-light" aria-label="Secondary Light" />
      <ProgressBar value={70} color="secondary-dark" aria-label="Secondary Dark" />
      <ProgressBar value={70} color="tertiary" aria-label="Tertiary" />
      <ProgressBar value={70} color="tertiary-light" aria-label="Tertiary Light" />
      <ProgressBar value={70} color="tertiary-dark" aria-label="Tertiary Dark" />
      <ProgressBar value={70} color="success" aria-label="Success" />
      <ProgressBar value={70} color="warning" aria-label="Warning" />
      <ProgressBar value={70} color="error" aria-label="Error" />
      <ProgressBar value={70} color="info" aria-label="Info" />
    </div>
  ),
};

/**
 * Semantic colors with labels for status indication.
 */
export const ColorsWithLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Primary</span>
        <ProgressBar value={65} color="primary" showLabel aria-label="Primary" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Secondary</span>
        <ProgressBar value={45} color="secondary" showLabel aria-label="Secondary" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Tertiary</span>
        <ProgressBar value={80} color="tertiary" showLabel aria-label="Tertiary" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Success</span>
        <ProgressBar value={100} color="success" showLabel aria-label="Success" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Warning</span>
        <ProgressBar value={55} color="warning" showLabel aria-label="Warning" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Error</span>
        <ProgressBar value={25} color="error" showLabel aria-label="Error" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Info</span>
        <ProgressBar value={90} color="info" showLabel aria-label="Info" />
      </div>
    </div>
  ),
};

/**
 * Use any hex color with the `customColor` prop.
 */
export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Coral</span>
        <ProgressBar value={70} customColor="#FF6B6B" aria-label="Coral" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Teal</span>
        <ProgressBar value={65} customColor="#4ECDC4" aria-label="Teal" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Sky Blue</span>
        <ProgressBar value={80} customColor="#45B7D1" aria-label="Sky Blue" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Sage</span>
        <ProgressBar value={55} customColor="#96CEB4" aria-label="Sage" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Plum</span>
        <ProgressBar value={90} customColor="#9B59B6" aria-label="Plum" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Gold</span>
        <ProgressBar value={75} customColor="#F39C12" aria-label="Gold" />
      </div>
    </div>
  ),
};

// =============================================================================
// CUSTOM LABELS
// =============================================================================

/**
 * Use `formatLabel` to customize the label format.
 */
export const CustomLabel: Story = {
  args: {
    value: 3,
    max: 5,
    showLabel: true,
    formatLabel: (value, max) => `${value} of ${max} steps`,
    'aria-label': 'Step progress',
  },
};

// =============================================================================
// STATES
// =============================================================================

/**
 * Empty state (0% progress).
 */
export const Empty: Story = {
  args: {
    value: 0,
    showLabel: true,
    'aria-label': 'Empty progress',
  },
};

/**
 * Complete state (100% progress) with success color.
 */
export const Complete: Story = {
  args: {
    value: 100,
    showLabel: true,
    color: 'success',
    'aria-label': 'Complete',
  },
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Progress bars adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    value: 70,
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', maxWidth: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};

/**
 * Color themes on dark background.
 */
export const DarkThemeColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <ProgressBar value={70} color="primary" aria-label="Primary" />
      <ProgressBar value={70} color="secondary" aria-label="Secondary" />
      <ProgressBar value={70} color="tertiary" aria-label="Tertiary" />
      <ProgressBar value={70} color="success" aria-label="Success" />
      <ProgressBar value={70} color="warning" aria-label="Warning" />
      <ProgressBar value={70} color="error" aria-label="Error" />
      <ProgressBar value={70} color="info" aria-label="Info" />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', maxWidth: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};
