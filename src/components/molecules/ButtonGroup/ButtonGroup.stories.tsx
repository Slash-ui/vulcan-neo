import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Grid, List } from 'lucide-react';
import { ButtonGroup, ButtonGroupItem } from './ButtonGroup';
import { Surface } from '../../foundation/Surface';

/**
 * A component for grouping related buttons together with connected styling.
 * Creates segmented controls for toggling between related options.
 *
 * ## When to Use
 *
 * - **View switching**: Toggle between different view modes (grid/list, day/week/month)
 * - **Filter options**: Group related filter choices together
 * - **Segmented controls**: iOS-style segmented selection
 * - **Toolbar actions**: Related action buttons in toolbars
 *
 * ## Key Features
 *
 * - **Variants**: Convex (raised) or flat appearance
 * - **Sizes**: Small, medium, and large options
 * - **Orientations**: Horizontal or vertical layout
 * - **Elevation levels**: Low, mid, and high shadow depth
 * - **Full width**: Option to stretch across container
 *
 * ## Best Practices
 *
 * - Limit to 2-5 options for clarity
 * - Use clear, concise labels
 * - Maintain consistent button widths when possible
 * - Consider vertical orientation for narrow containers
 */
const meta: Meta<typeof ButtonGroup> = {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  subcomponents: {
    ButtonGroupItem: ButtonGroupItem as React.ComponentType<unknown>,
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface
        theme="light"
        style={{
          padding: '3rem',
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Appearance
    variant: {
      control: 'select',
      options: ['convex', 'flat'],
      description: 'Visual style of the button group',
      table: { category: 'Appearance', defaultValue: { summary: 'convex' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the buttons in the group',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    elevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
      description: 'Shadow depth level',
      table: { category: 'Appearance', defaultValue: { summary: 'mid' } },
    },

    // Layout
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the button layout',
      table: { category: 'Layout', defaultValue: { summary: 'horizontal' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the group stretches to full container width',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },

    // Content
    children: {
      control: false,
      description: 'ButtonGroupItem children',
      table: { category: 'Content' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default button group with three options. One item is selected by default.
 */
export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupItem selected>Day</ButtonGroupItem>
      <ButtonGroupItem>Week</ButtonGroupItem>
      <ButtonGroupItem>Month</ButtonGroupItem>
    </ButtonGroup>
  ),
};

// =============================================================================
// INTERACTIVE
// =============================================================================

/**
 * Interactive button group with click handling to change selection.
 */
export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState(0);
    return (
      <ButtonGroup>
        {['Day', 'Week', 'Month', 'Year'].map((label, index) => (
          <ButtonGroupItem
            key={label}
            selected={selected === index}
            onClick={() => setSelected(index)}
          >
            {label}
          </ButtonGroupItem>
        ))}
      </ButtonGroup>
    );
  },
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Three size options for different use cases.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Small
        </p>
        <ButtonGroup size="sm">
          <ButtonGroupItem selected>Option 1</ButtonGroupItem>
          <ButtonGroupItem>Option 2</ButtonGroupItem>
        </ButtonGroup>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Medium (default)
        </p>
        <ButtonGroup size="md">
          <ButtonGroupItem selected>Option 1</ButtonGroupItem>
          <ButtonGroupItem>Option 2</ButtonGroupItem>
        </ButtonGroup>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Large
        </p>
        <ButtonGroup size="lg">
          <ButtonGroupItem selected>Option 1</ButtonGroupItem>
          <ButtonGroupItem>Option 2</ButtonGroupItem>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// =============================================================================
// ELEVATIONS
// =============================================================================

/**
 * Three elevation levels for different shadow depths.
 */
export const Elevations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Low
        </p>
        <ButtonGroup elevation="low">
          <ButtonGroupItem selected>Option 1</ButtonGroupItem>
          <ButtonGroupItem>Option 2</ButtonGroupItem>
        </ButtonGroup>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Mid (default)
        </p>
        <ButtonGroup elevation="mid">
          <ButtonGroupItem selected>Option 1</ButtonGroupItem>
          <ButtonGroupItem>Option 2</ButtonGroupItem>
        </ButtonGroup>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          High
        </p>
        <ButtonGroup elevation="high">
          <ButtonGroupItem selected>Option 1</ButtonGroupItem>
          <ButtonGroupItem>Option 2</ButtonGroupItem>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// =============================================================================
// ORIENTATION
// =============================================================================

/**
 * Vertical orientation stacks buttons in a column.
 */
export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <ButtonGroupItem selected>Option 1</ButtonGroupItem>
      <ButtonGroupItem>Option 2</ButtonGroupItem>
      <ButtonGroupItem>Option 3</ButtonGroupItem>
    </ButtonGroup>
  ),
};

/**
 * Comparison of horizontal and vertical orientations.
 */
export const OrientationComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Horizontal
        </p>
        <ButtonGroup orientation="horizontal">
          <ButtonGroupItem selected>A</ButtonGroupItem>
          <ButtonGroupItem>B</ButtonGroupItem>
          <ButtonGroupItem>C</ButtonGroupItem>
        </ButtonGroup>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Vertical
        </p>
        <ButtonGroup orientation="vertical">
          <ButtonGroupItem selected>A</ButtonGroupItem>
          <ButtonGroupItem>B</ButtonGroupItem>
          <ButtonGroupItem>C</ButtonGroupItem>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// =============================================================================
// WITH DISABLED
// =============================================================================

/**
 * Individual buttons can be disabled within the group.
 */
export const WithDisabled: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupItem selected>Active</ButtonGroupItem>
      <ButtonGroupItem>Normal</ButtonGroupItem>
      <ButtonGroupItem disabled>Disabled</ButtonGroupItem>
    </ButtonGroup>
  ),
};

// =============================================================================
// FULL WIDTH
// =============================================================================

/**
 * Full width button group stretches to fill the container.
 */
export const FullWidth: Story = {
  render: () => (
    <ButtonGroup fullWidth>
      <ButtonGroupItem selected>Left</ButtonGroupItem>
      <ButtonGroupItem>Center</ButtonGroupItem>
      <ButtonGroupItem>Right</ButtonGroupItem>
    </ButtonGroup>
  ),
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', width: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};

// =============================================================================
// WITH ICONS
// =============================================================================

/**
 * Button groups with Lucide icons for visual actions like view switching.
 */
export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupItem selected>
        <Grid size={16} />
      </ButtonGroupItem>
      <ButtonGroupItem>
        <List size={16} />
      </ButtonGroupItem>
    </ButtonGroup>
  ),
};

/**
 * Icons combined with text labels.
 */
export const IconsWithLabels: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupItem selected>
        <Grid size={16} />
        <span style={{ marginLeft: '0.5rem' }}>Grid</span>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <List size={16} />
        <span style={{ marginLeft: '0.5rem' }}>List</span>
      </ButtonGroupItem>
    </ButtonGroup>
  ),
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Button groups adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupItem selected>Day</ButtonGroupItem>
      <ButtonGroupItem>Week</ButtonGroupItem>
      <ButtonGroupItem>Month</ButtonGroupItem>
    </ButtonGroup>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

// =============================================================================
// BUTTON GROUP ITEM PROPS
// =============================================================================

/**
 * ButtonGroupItem component props demonstration.
 *
 * **Props:**
 * - `selected`: Whether this button is selected/active
 * - `disabled`: Whether the button is disabled
 * - `children`: Button content (text, icons, or both)
 */
export const ButtonGroupItemProps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          selected=true
        </p>
        <ButtonGroup>
          <ButtonGroupItem selected>Selected</ButtonGroupItem>
          <ButtonGroupItem>Normal</ButtonGroupItem>
        </ButtonGroup>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          disabled=true
        </p>
        <ButtonGroup>
          <ButtonGroupItem>Normal</ButtonGroupItem>
          <ButtonGroupItem disabled>Disabled</ButtonGroupItem>
        </ButtonGroup>
      </div>
    </div>
  ),
};
