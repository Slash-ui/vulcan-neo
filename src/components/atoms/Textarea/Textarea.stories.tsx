import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';
import { Surface } from '../../foundation/Surface';

/**
 * A multi-line text input for longer form content like comments or descriptions.
 * Features a concave neomorphic design with optional label and helper text.
 *
 * ## When to Use
 *
 * - **Comments**: User feedback, reviews, or notes
 * - **Descriptions**: Product descriptions, bio fields
 * - **Messages**: Contact forms, chat input
 * - **Code/Text**: Any multi-line text content
 *
 * ## Key Features
 *
 * - **Neomorphic design**: Concave (inset) appearance for input fields
 * - **Resize options**: Control user resizing behavior
 * - **Validation states**: Error messages with visual feedback
 * - **Helper text**: Guidance text below the field
 *
 * ## Accessibility
 *
 * Always provide a `label` for screen readers. The component automatically
 * associates labels with the textarea via `id` attributes.
 */
const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', maxWidth: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Content
    label: {
      control: 'text',
      description: 'Label text above the textarea',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when empty',
      table: { category: 'Content' },
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the textarea',
      table: { category: 'Content' },
    },
    defaultValue: {
      control: 'text',
      description: 'Initial value (uncontrolled)',
      table: { category: 'Content' },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Textarea size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior',
      table: { category: 'Appearance', defaultValue: { summary: 'vertical' } },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'Disable the textarea',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    error: {
      control: 'text',
      description: 'Error message (shows error state when set)',
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
 * Default textarea with placeholder. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    size: 'md',
  },
};

// =============================================================================
// WITH LABEL
// =============================================================================

/**
 * Textarea with a label for form context.
 */
export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
  },
};

/**
 * Label with helper text providing additional guidance.
 */
export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    helperText: 'Maximum 500 characters',
  },
};

// =============================================================================
// VALIDATION
// =============================================================================

/**
 * Error state with validation message.
 */
export const WithError: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    error: 'Message is required',
    defaultValue: '',
  },
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Three sizes for different form densities.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Textarea size="sm" placeholder="Small textarea" label="Small" />
      <Textarea size="md" placeholder="Medium textarea" label="Medium" />
      <Textarea size="lg" placeholder="Large textarea" label="Large" />
    </div>
  ),
};

// =============================================================================
// RESIZE OPTIONS
// =============================================================================

/**
 * Control how users can resize the textarea.
 */
export const ResizeOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Textarea resize="none" placeholder="Cannot resize" label="None" />
      <Textarea resize="vertical" placeholder="Vertical only" label="Vertical" />
      <Textarea resize="both" placeholder="Both directions" label="Both" />
    </div>
  ),
};

// =============================================================================
// STATES
// =============================================================================

/**
 * Disabled state prevents user interaction.
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Cannot edit...',
    disabled: true,
  },
};

/**
 * Pre-filled content showing how text displays.
 */
export const WithValue: Story = {
  args: {
    label: 'Notes',
    defaultValue: 'This is some pre-filled content that demonstrates how the textarea looks with actual text content inside it.',
  },
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Textarea adapts to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', maxWidth: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};
