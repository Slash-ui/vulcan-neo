import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RatingStars } from './RatingStars';
import { Surface } from '../../foundation/Surface';

/**
 * An interactive star rating component for collecting or displaying ratings.
 * Supports both input (selectable) and display (read-only) modes.
 *
 * ## When to Use
 *
 * - **Product reviews**: Allow users to rate products or services
 * - **Feedback forms**: Collect satisfaction ratings
 * - **Display ratings**: Show average ratings on product cards
 * - **Skill levels**: Indicate proficiency or quality levels
 *
 * ## Key Features
 *
 * - **Interactive or read-only**: Toggle between input and display modes
 * - **Half-star support**: Allow half-star precision for more granular ratings
 * - **Color themes**: Brand colors + semantic status colors
 * - **Customizable**: Adjust max stars, show numeric value, custom colors
 *
 * ## Best Practices
 *
 * - Use `readOnly` for displaying ratings, omit for user input
 * - Show the numeric value alongside stars for clarity
 * - Use 5 stars for most rating scenarios (the default)
 */
const meta: Meta<typeof RatingStars> = {
  title: 'Atoms/RatingStars',
  component: RatingStars,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Value
    value: {
      control: { type: 'number', min: 0, max: 10, step: 0.5 },
      description: 'Current rating value (controlled)',
      table: { category: 'Value' },
    },
    defaultValue: {
      control: { type: 'number', min: 0, max: 10, step: 0.5 },
      description: 'Initial rating value (uncontrolled)',
      table: { category: 'Value' },
    },
    max: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum number of stars',
      table: { category: 'Value', defaultValue: { summary: '5' } },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Star size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    showValue: {
      control: 'boolean',
      description: 'Show numeric value next to stars',
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
      description: 'Custom hex color (overrides color prop)',
      table: { category: 'Color' },
    },

    // Behavior
    readOnly: {
      control: 'boolean',
      description: 'Disable interaction (display mode)',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    allowHalf: {
      control: 'boolean',
      description: 'Allow half-star selections',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the component',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default interactive rating. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    defaultValue: 3,
  },
};

// =============================================================================
// CONTROLLED
// =============================================================================

const ControlledDemo = () => {
  const [value, setValue] = useState(4);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <RatingStars value={value} onChange={setValue} showValue />
      <span style={{ fontFamily: 'var(--neo-font-family)', color: 'var(--neo-text-secondary)' }}>
        Selected: {value} stars
      </span>
    </div>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <RatingStars size="sm" defaultValue={4} />
      <RatingStars size="md" defaultValue={4} />
      <RatingStars size="lg" defaultValue={4} />
    </div>
  ),
};

/**
 * Small rating stars for compact layouts.
 */
export const SizeSmall: Story = {
  tags: ['!dev'],
  args: {
    size: 'sm',
    defaultValue: 4,
  },
};

/**
 * Medium rating stars (default size).
 */
export const SizeMedium: Story = {
  tags: ['!dev'],
  args: {
    size: 'md',
    defaultValue: 4,
  },
};

/**
 * Large rating stars for emphasis.
 */
export const SizeLarge: Story = {
  tags: ['!dev'],
  args: {
    size: 'lg',
    defaultValue: 4,
  },
};

// =============================================================================
// COLORS
// =============================================================================

/**
 * All available color themes.
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Default</span>
        <RatingStars color="default" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Primary</span>
        <RatingStars color="primary" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Secondary</span>
        <RatingStars color="secondary" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Tertiary</span>
        <RatingStars color="tertiary" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Success</span>
        <RatingStars color="success" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Warning</span>
        <RatingStars color="warning" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Error</span>
        <RatingStars color="error" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Info</span>
        <RatingStars color="info" defaultValue={4} />
      </div>
    </div>
  ),
};

/**
 * Primary color rating stars.
 */
export const ColorPrimary: Story = {
  tags: ['!dev'],
  args: {
    color: 'primary',
    defaultValue: 4,
  },
};

/**
 * Warning color rating stars (classic gold stars).
 */
export const ColorWarning: Story = {
  tags: ['!dev'],
  args: {
    color: 'warning',
    defaultValue: 4,
  },
};

/**
 * Use any hex color with the `customColor` prop.
 */
export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Coral</span>
        <RatingStars customColor="#FF6B6B" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Teal</span>
        <RatingStars customColor="#4ECDC4" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Sky Blue</span>
        <RatingStars customColor="#45B7D1" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Plum</span>
        <RatingStars customColor="#9B59B6" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Gold</span>
        <RatingStars customColor="#F39C12" defaultValue={4} />
      </div>
    </div>
  ),
};

// =============================================================================
// FEATURES
// =============================================================================

/**
 * Shows the numeric value next to the stars.
 */
export const WithValue: Story = {
  args: {
    defaultValue: 4,
    showValue: true,
  },
};

/**
 * Read-only mode for displaying ratings without interaction.
 */
export const ReadOnly: Story = {
  args: {
    value: 4.5,
    readOnly: true,
    showValue: true,
  },
};

/**
 * Enable half-star precision for more granular ratings.
 */
export const HalfStars: Story = {
  args: {
    defaultValue: 3.5,
    allowHalf: true,
    showValue: true,
  },
};

/**
 * Customize the maximum number of stars (default is 5).
 */
export const CustomMax: Story = {
  args: {
    max: 10,
    defaultValue: 7,
    showValue: true,
  },
};

/**
 * Disabled state prevents interaction.
 */
export const Disabled: Story = {
  args: {
    defaultValue: 3,
    disabled: true,
  },
};

/**
 * Empty state with zero rating.
 */
export const ZeroRating: Story = {
  args: {
    defaultValue: 0,
    showValue: true,
  },
};

// =============================================================================
// USE CASES
// =============================================================================

/**
 * Example of a product rating display with review count.
 */
export const ProductRating: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RatingStars value={4.5} readOnly size="sm" />
        <span style={{ fontFamily: 'var(--neo-font-family)', fontSize: '14px', color: 'var(--neo-text)' }}>
          4.5 out of 5
        </span>
      </div>
      <span style={{ fontFamily: 'var(--neo-font-family)', fontSize: '12px', color: 'var(--neo-text-secondary)' }}>
        Based on 128 reviews
      </span>
    </div>
  ),
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Rating stars adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    defaultValue: 4,
    showValue: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <RatingStars color="primary" defaultValue={4} />
      <RatingStars color="secondary" defaultValue={4} />
      <RatingStars color="tertiary" defaultValue={4} />
      <RatingStars color="success" defaultValue={4} />
      <RatingStars color="warning" defaultValue={4} />
      <RatingStars color="error" defaultValue={4} />
      <RatingStars color="info" defaultValue={4} />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
