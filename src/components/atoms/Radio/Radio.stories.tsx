import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';
import { Surface } from '../../foundation/Surface';

/**
 * A form control for selecting a single option from a group of choices.
 * Only one radio button in a group can be selected at a time.
 *
 * ## When to Use
 *
 * - **Single selection**: Choose one option from a list of mutually exclusive choices
 * - **Settings**: Select a preference from predefined options
 * - **Surveys**: Answer single-choice questions
 * - **Payment methods**: Select one payment option
 *
 * ## Key Features
 *
 * - **Neomorphic design**: Concave (pressed) appearance that pops when selected
 * - **Flexible labels**: Position labels on left or right
 * - **Group behavior**: Use the same `name` prop to create a radio group
 * - **Accessible**: Full keyboard support and ARIA attributes
 *
 * ## Accessibility
 *
 * Always provide a `label` or `aria-label` for screen readers. Group related
 * radio buttons using the same `name` prop for proper keyboard navigation.
 */
const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
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
      description: 'Text label displayed next to the radio button',
      table: { category: 'Content' },
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label relative to the radio button',
      table: { category: 'Content', defaultValue: { summary: 'right' } },
    },
    name: {
      control: 'text',
      description: 'Group name for radio buttons (required for grouping)',
      table: { category: 'Content' },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Radio button size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'Disable the radio button',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Initial selected state (uncontrolled)',
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
 * Default radio button with a label. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    label: 'Radio option',
    size: 'md',
  },
};

// =============================================================================
// STATES
// =============================================================================

/**
 * Pre-selected radio button using `defaultChecked` prop.
 */
export const Checked: Story = {
  args: {
    label: 'Selected',
    defaultChecked: true,
  },
};

/**
 * Three sizes for different contexts and densities.
 */
export const Sizes: Story = {
  render: () => (
    <>
      <Radio size="sm" label="Small" name="sizes" />
      <Radio size="md" label="Medium" name="sizes" />
      <Radio size="lg" label="Large" name="sizes" />
    </>
  ),
};

/**
 * Labels can be positioned on either side of the radio button.
 */
export const LabelPositions: Story = {
  render: () => (
    <>
      <Radio labelPosition="left" label="Label on left" name="position" />
      <Radio labelPosition="right" label="Label on right" name="position" />
    </>
  ),
};

/**
 * Radio buttons without visible labels. Always provide `aria-label` for accessibility.
 */
export const WithoutLabel: Story = {
  render: () => (
    <>
      <Radio size="sm" name="nolabel" aria-label="Small radio" />
      <Radio size="md" name="nolabel" aria-label="Medium radio" />
      <Radio size="lg" name="nolabel" aria-label="Large radio" />
    </>
  ),
};

/**
 * Disabled radio buttons prevent user interaction.
 */
export const Disabled: Story = {
  render: () => (
    <>
      <Radio label="Disabled unselected" disabled name="disabled" />
      <Radio label="Disabled selected" disabled defaultChecked name="disabled2" />
    </>
  ),
};

// =============================================================================
// USE CASES
// =============================================================================

/**
 * Example of a radio group for single selection. All radios share the same `name`.
 */
export const RadioGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Radio label="Option 1" name="group" defaultChecked />
      <Radio label="Option 2" name="group" />
      <Radio label="Option 3" name="group" />
      <Radio label="Option 4 (disabled)" name="group" disabled />
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
 * Radio buttons adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    label: 'Dark theme radio',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
