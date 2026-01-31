import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
import { Surface } from '../../foundation/Surface';

/**
 * A form control that allows users to select one or more options from a set.
 * Supports three visual states: unchecked, checked, and indeterminate.
 *
 * ## When to Use
 *
 * - **Multiple selections**: Allow users to select multiple options from a list
 * - **Terms acceptance**: Confirm agreement to terms and conditions
 * - **Settings toggles**: Enable or disable features in settings pages
 * - **Bulk selection**: Select all or partial items in a list
 *
 * ## Key Features
 *
 * - **Neomorphic design**: Concave (pressed) appearance that pops when checked
 * - **Three states**: Unchecked, checked, and indeterminate
 * - **Flexible labels**: Position labels on left or right
 * - **Accessible**: Full keyboard support and ARIA attributes
 *
 * ## Accessibility
 *
 * Always provide a `label` or `aria-label` for screen readers. Use the
 * `indeterminate` state when a parent checkbox has mixed child selections.
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Content
    label: {
      control: 'text',
      description: 'Text label displayed next to the checkbox',
      table: { category: 'Content' },
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label relative to the checkbox',
      table: { category: 'Content', defaultValue: { summary: 'right' } },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Show indeterminate state (mixed selection)',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Initial checked state (uncontrolled)',
      table: { category: 'State' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default checkbox with a label. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    size: 'md',
  },
};

// =============================================================================
// STATES
// =============================================================================

/**
 * Pre-checked checkbox using `defaultChecked` prop.
 */
export const Checked: Story = {
  args: {
    label: 'Checked',
    defaultChecked: true,
  },
};

/**
 * Three sizes for different contexts and densities.
 */
export const Sizes: Story = {
  render: () => (
    <>
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium" />
      <Checkbox size="lg" label="Large" />
    </>
  ),
};

/**
 * Small checkbox for compact layouts.
 */
export const SizeSmall: Story = {
  tags: ['!dev'],
  args: {
    size: 'sm',
    label: 'Small checkbox',
  },
};

/**
 * Medium checkbox (default size).
 */
export const SizeMedium: Story = {
  tags: ['!dev'],
  args: {
    size: 'md',
    label: 'Medium checkbox',
  },
};

/**
 * Large checkbox for touch interfaces.
 */
export const SizeLarge: Story = {
  tags: ['!dev'],
  args: {
    size: 'lg',
    label: 'Large checkbox',
  },
};

/**
 * Labels can be positioned on either side of the checkbox.
 */
export const LabelPositions: Story = {
  render: () => (
    <>
      <Checkbox labelPosition="left" label="Label on left" />
      <Checkbox labelPosition="right" label="Label on right" />
    </>
  ),
};

/**
 * Label positioned on the left.
 */
export const LabelLeft: Story = {
  tags: ['!dev'],
  args: {
    label: 'Label on left',
    labelPosition: 'left',
  },
};

/**
 * Checkboxes without visible labels. Always provide `aria-label` for accessibility.
 */
export const WithoutLabel: Story = {
  render: () => (
    <>
      <Checkbox size="sm" aria-label="Small checkbox" />
      <Checkbox size="md" aria-label="Medium checkbox" />
      <Checkbox size="lg" aria-label="Large checkbox" />
    </>
  ),
};

/**
 * The indeterminate state indicates a partial selection, commonly used
 * for "select all" checkboxes when only some children are selected.
 */
export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
};

/**
 * All three visual states: unchecked, checked, and indeterminate.
 */
export const States: Story = {
  render: () => (
    <>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
    </>
  ),
};

/**
 * Disabled checkboxes prevent user interaction.
 */
export const Disabled: Story = {
  render: () => (
    <>
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </>
  ),
};

/**
 * Disabled unchecked checkbox.
 */
export const DisabledUnchecked: Story = {
  tags: ['!dev'],
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

/**
 * Disabled checked checkbox.
 */
export const DisabledChecked: Story = {
  tags: ['!dev'],
  args: {
    label: 'Disabled selected',
    disabled: true,
    defaultChecked: true,
  },
};

// =============================================================================
// USE CASES
// =============================================================================

/**
 * Example of a checkbox group for multiple selections.
 */
export const CheckboxGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Checkbox label="Option 1" name="group" defaultChecked />
      <Checkbox label="Option 2" name="group" />
      <Checkbox label="Option 3" name="group" />
      <Checkbox label="Option 4" name="group" disabled />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Checkboxes adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    label: 'Dark theme checkbox',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
