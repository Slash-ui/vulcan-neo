import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Surface } from '../../foundation/Surface';

/**
 * A contextual popup that displays additional information on hover or focus.
 * Provides helpful hints without cluttering the interface.
 *
 * ## When to Use
 *
 * - **Icon clarification**: Explain what icon buttons do
 * - **Keyboard shortcuts**: Show hotkeys for actions
 * - **Truncated text**: Reveal full content on hover
 * - **Feature hints**: Provide contextual help
 *
 * ## Key Features
 *
 * - **Four placements**: Top, bottom, left, right positioning
 * - **Custom delay**: Control hover delay before showing
 * - **Rich content**: Support for formatted content, not just text
 * - **Auto-positioning**: Adjusts to stay within viewport
 *
 * ## Accessibility
 *
 * Tooltips are announced by screen readers. For critical information,
 * don't rely solely on tooltips—provide visible text alternatives.
 */
const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '6rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Content
    content: {
      control: 'text',
      description: 'Tooltip content (text or React node)',
      table: { category: 'Content' },
    },
    children: {
      control: false,
      description: 'Trigger element that shows tooltip on hover',
      table: { category: 'Content', type: { summary: 'ReactElement' } },
    },

    // Appearance
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to trigger',
      table: { category: 'Appearance', defaultValue: { summary: 'top' } },
    },

    // Behavior
    delay: {
      control: { type: 'number', min: 0, max: 1000 },
      description: 'Delay in milliseconds before showing tooltip',
      table: { category: 'Behavior', defaultValue: { summary: '200' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the tooltip',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default tooltip appearing above the trigger element.
 */
export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button label="Hover me" />,
  },
};

// =============================================================================
// PLACEMENTS
// =============================================================================

/**
 * Four placement options for different layout needs.
 */
export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
      <Tooltip content="Top tooltip" placement="top">
        <Button label="Top" />
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button label="Bottom" />
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left">
        <Button label="Left" />
      </Tooltip>
      <Tooltip content="Right tooltip" placement="right">
        <Button label="Right" />
      </Tooltip>
    </div>
  ),
};

// =============================================================================
// USE CASES
// =============================================================================

/**
 * Common use case: explaining icon button actions.
 */
export const WithIconButton: Story = {
  args: {
    content: 'More information',
    placement: 'right',
    children: <IconButton aria-label="Info" icon={<InfoIcon />} />,
  },
};

/**
 * Longer content wraps naturally within the tooltip.
 */
export const LongContent: Story = {
  args: {
    content: 'This is a longer tooltip with more detailed information that might span multiple lines.',
    children: <Button label="Hover for details" />,
  },
};

/**
 * Rich content with formatting for complex information.
 */
export const WithRichContent: Story = {
  args: {
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <strong>Keyboard shortcut</strong>
        <span style={{ opacity: 0.8 }}>Ctrl + S</span>
      </div>
    ),
    children: <Button label="Save" />,
  },
};

// =============================================================================
// DELAY OPTIONS
// =============================================================================

/**
 * Different delay values for various interaction patterns.
 */
export const CustomDelay: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip content="Instant (0ms)" delay={0}>
        <Button label="Instant" />
      </Tooltip>
      <Tooltip content="Normal (200ms)" delay={200}>
        <Button label="Normal" />
      </Tooltip>
      <Tooltip content="Slow (500ms)" delay={500}>
        <Button label="Slow" />
      </Tooltip>
    </div>
  ),
};

// =============================================================================
// STATES
// =============================================================================

/**
 * Disabled tooltip won't show on hover.
 */
export const Disabled: Story = {
  args: {
    content: 'You should not see this',
    disabled: true,
    children: <Button label="Disabled tooltip" />,
  },
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Tooltip adapts to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    content: 'Dark theme tooltip',
    children: <Button label="Hover me" />,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '6rem', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
};
