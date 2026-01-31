import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Slider } from './Slider';
import { Surface } from '../../foundation/Surface';

/**
 * An interactive control for selecting a value from a continuous range.
 * Features a concave track with a raised thumb for the neomorphic aesthetic.
 *
 * ## When to Use
 *
 * - **Volume controls**: Adjust audio or video volume
 * - **Brightness/Contrast**: Image or display settings
 * - **Price filters**: Select price ranges in e-commerce
 * - **Progress**: Scrub through media playback
 *
 * ## Key Features
 *
 * - **Neomorphic design**: Concave track with raised draggable thumb
 * - **Two orientations**: Horizontal (default) and vertical
 * - **Three variants**: Default, gradient, and glow effects
 * - **Custom formatting**: Format displayed values (%, $, °C, etc.)
 *
 * ## Best Practices
 *
 * - Use labels to describe what the slider controls
 * - Show the current value when precision matters
 * - Use appropriate step sizes for the value range
 */
const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', width: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Value
    value: {
      control: { type: 'number' },
      description: 'Current value (controlled)',
      table: { category: 'Value' },
    },
    defaultValue: {
      control: { type: 'number' },
      description: 'Initial value (uncontrolled)',
      table: { category: 'Value' },
    },
    min: {
      control: 'number',
      description: 'Minimum value',
      table: { category: 'Value', defaultValue: { summary: '0' } },
    },
    max: {
      control: 'number',
      description: 'Maximum value',
      table: { category: 'Value', defaultValue: { summary: '100' } },
    },
    step: {
      control: 'number',
      description: 'Step increment',
      table: { category: 'Value', defaultValue: { summary: '1' } },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Track and thumb size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    variant: {
      control: 'select',
      options: ['default', 'gradient', 'glow'],
      description: 'Visual effect: **default**, **gradient**, or **glow**',
      table: { category: 'Appearance', defaultValue: { summary: 'default' } },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Slider orientation',
      table: { category: 'Appearance', defaultValue: { summary: 'horizontal' } },
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
    label: {
      control: 'text',
      description: 'Label text above the slider',
      table: { category: 'Label' },
    },
    showValue: {
      control: 'boolean',
      description: 'Show current value',
      table: { category: 'Label', defaultValue: { summary: 'false' } },
    },
    formatValue: {
      control: false,
      description: 'Custom value formatter function: `(value) => string`',
      table: { category: 'Label' },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'Disable the slider',
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
 * Default horizontal slider. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    defaultValue: 50,
  },
};

// =============================================================================
// WITH LABEL
// =============================================================================

/**
 * Slider with label and visible value display.
 */
export const WithLabel: Story = {
  args: {
    label: 'Volume',
    defaultValue: 75,
    showValue: true,
  },
};

// =============================================================================
// CONTROLLED
// =============================================================================

const ControlledDemo = () => {
  const [value, setValue] = useState(50);
  return (
    <Slider
      label="Brightness"
      value={value}
      onChange={setValue}
      showValue
      formatValue={(v) => `${v}%`}
    />
  );
};

/**
 * Controlled component with external state management.
 */
export const Controlled: Story = {
  render: () => <ControlledDemo />,
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
      <Slider label="Small" size="sm" defaultValue={30} showValue />
      <Slider label="Medium" size="md" defaultValue={50} showValue />
      <Slider label="Large" size="lg" defaultValue={70} showValue />
    </div>
  ),
};

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * - **Default**: Solid fill color
 * - **Gradient**: Color gradient effect on track fill
 * - **Glow**: Adds a glow around the filled track
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Slider label="Default" variant="default" defaultValue={60} showValue />
      <Slider label="Gradient" variant="gradient" defaultValue={60} showValue />
      <Slider label="Glow" variant="glow" defaultValue={60} showValue />
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
      <Slider color="default" defaultValue={70} />
      <Slider color="primary" defaultValue={70} />
      <Slider color="secondary" defaultValue={70} />
      <Slider color="tertiary" defaultValue={70} />
      <Slider color="success" defaultValue={70} />
      <Slider color="warning" defaultValue={70} />
      <Slider color="error" defaultValue={70} />
      <Slider color="info" defaultValue={70} />
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
        <Slider customColor="#FF6B6B" defaultValue={70} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Teal</span>
        <Slider customColor="#4ECDC4" defaultValue={65} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Plum</span>
        <Slider customColor="#9B59B6" defaultValue={90} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Gold</span>
        <Slider customColor="#F39C12" defaultValue={75} style={{ flex: 1 }} />
      </div>
    </div>
  ),
};

// =============================================================================
// VERTICAL ORIENTATION
// =============================================================================

/**
 * Vertical sliders for space-constrained layouts or audio mixer UIs.
 */
export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end', height: '250px' }}>
      <Slider orientation="vertical" defaultValue={70} color="primary" />
      <Slider orientation="vertical" defaultValue={50} color="secondary" />
      <Slider orientation="vertical" defaultValue={85} color="tertiary" />
      <Slider orientation="vertical" defaultValue={30} color="success" />
      <Slider orientation="vertical" defaultValue={60} color="warning" />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', width: 'auto' }}>
        <Story />
      </Surface>
    ),
  ],
};

/**
 * Vertical slider sizes.
 */
export const VerticalSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end', height: '200px' }}>
      <Slider orientation="vertical" size="sm" defaultValue={60} />
      <Slider orientation="vertical" size="md" defaultValue={60} />
      <Slider orientation="vertical" size="lg" defaultValue={60} />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', width: 'auto' }}>
        <Story />
      </Surface>
    ),
  ],
};

// =============================================================================
// CUSTOM RANGES
// =============================================================================

/**
 * Custom min/max range with formatted value display.
 */
export const CustomRange: Story = {
  args: {
    label: 'Temperature',
    min: -20,
    max: 50,
    defaultValue: 22,
    showValue: true,
    formatValue: (v) => `${v}°C`,
  },
};

/**
 * Discrete steps for whole number selection.
 */
export const Steps: Story = {
  args: {
    label: 'Rating',
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 5,
    showValue: true,
  },
};

/**
 * Large step increments for coarse adjustments.
 */
export const LargeSteps: Story = {
  args: {
    label: 'Quantity',
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 50,
    showValue: true,
  },
};

/**
 * Custom currency formatting.
 */
export const CustomFormat: Story = {
  args: {
    label: 'Price',
    min: 0,
    max: 1000,
    defaultValue: 500,
    showValue: true,
    formatValue: (v) => `$${v}`,
  },
};

// =============================================================================
// STATES
// =============================================================================

/**
 * Disabled state prevents interaction.
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    defaultValue: 60,
    disabled: true,
    showValue: true,
  },
};

// =============================================================================
// USE CASES
// =============================================================================

/**
 * RGB color picker example with multiple coordinated sliders.
 */
export const MultipleSliders: Story = {
  render: () => {
    const [rgb, setRgb] = useState({ r: 108, g: 92, b: 231 });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Slider
          label="Red"
          min={0}
          max={255}
          value={rgb.r}
          onChange={(r) => setRgb({ ...rgb, r })}
          showValue
          customColor="#FF4444"
        />
        <Slider
          label="Green"
          min={0}
          max={255}
          value={rgb.g}
          onChange={(g) => setRgb({ ...rgb, g })}
          showValue
          customColor="#44FF44"
        />
        <Slider
          label="Blue"
          min={0}
          max={255}
          value={rgb.b}
          onChange={(b) => setRgb({ ...rgb, b })}
          showValue
          customColor="#4444FF"
        />
        <div
          style={{
            height: '60px',
            borderRadius: '12px',
            background: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
            boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.1), inset -4px -4px 8px rgba(255,255,255,0.5)'
          }}
        />
      </div>
    );
  },
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Sliders adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    label: 'Volume',
    defaultValue: 60,
    showValue: true,
    formatValue: (v) => `${v}%`,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', width: '400px' }}>
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
      <Slider color="primary" defaultValue={70} />
      <Slider color="secondary" defaultValue={70} />
      <Slider color="tertiary" defaultValue={70} />
      <Slider color="success" defaultValue={70} />
      <Slider color="warning" defaultValue={70} />
      <Slider color="error" defaultValue={70} />
      <Slider color="info" defaultValue={70} />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', width: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};

/**
 * Vertical sliders on dark background.
 */
export const DarkThemeVertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end', height: '200px' }}>
      <Slider orientation="vertical" defaultValue={80} color="primary" />
      <Slider orientation="vertical" defaultValue={65} color="secondary" />
      <Slider orientation="vertical" defaultValue={70} color="tertiary" />
      <Slider orientation="vertical" defaultValue={55} color="success" />
      <Slider orientation="vertical" defaultValue={75} color="warning" />
      <Slider orientation="vertical" defaultValue={90} color="error" />
      <Slider orientation="vertical" defaultValue={60} color="info" />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', width: 'auto' }}>
        <Story />
      </Surface>
    ),
  ],
};
