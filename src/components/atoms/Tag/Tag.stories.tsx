import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tag } from './Tag';
import { Surface } from '../../foundation/Surface';

/**
 * A compact label for categorization, filtering, or status indication.
 * Supports multiple visual variants and optional remove functionality.
 *
 * ## When to Use
 *
 * - **Categorization**: Label items with categories or topics
 * - **Filtering**: Show active filters that can be removed
 * - **Status indicators**: Display state or type information
 * - **Hashtags**: Social media style tagging
 *
 * ## Key Features
 *
 * - **Four variants**: Convex, concave, extrude, and flat styles
 * - **Removable tags**: Optional close button for filter chips
 * - **Icon support**: Add icons for visual context
 * - **Color themes**: Full palette including custom colors
 */
const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
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
    children: {
      control: 'text',
      description: 'Tag label text',
      table: { category: 'Content' },
    },
    leftIcon: {
      control: false,
      description: 'Icon displayed before the label',
      table: { category: 'Content' },
    },

    // Appearance
    variant: {
      control: 'select',
      options: ['convex', 'concave', 'extrude', 'flat'],
      description: 'Visual style of the tag',
      table: { category: 'Appearance', defaultValue: { summary: 'convex' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tag size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    filled: {
      control: 'boolean',
      description: 'Use filled background instead of subtle',
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
    removable: {
      control: 'boolean',
      description: 'Show remove button',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    onRemove: {
      action: 'removed',
      description: 'Callback when remove button is clicked',
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const HashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default tag with convex styling. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    children: 'Tag',
    variant: 'convex',
    size: 'md',
  },
};

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * Four visual styles for different design contexts.
 */
export const Variants: Story = {
  render: () => (
    <>
      <Tag variant="convex">Convex</Tag>
      <Tag variant="concave">Concave</Tag>
      <Tag variant="extrude">Extrude</Tag>
      <Tag variant="flat">Flat</Tag>
    </>
  ),
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Three sizes for different contexts and densities.
 */
export const Sizes: Story = {
  render: () => (
    <>
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </>
  ),
};

// =============================================================================
// COLORS
// =============================================================================

/**
 * Primary color options for common use cases.
 */
export const Colors: Story = {
  render: () => (
    <>
      <Tag color="default">Default</Tag>
      <Tag color="primary">Primary</Tag>
      <Tag color="secondary">Secondary</Tag>
      <Tag color="tertiary">Tertiary</Tag>
      <Tag color="success">Success</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="error">Error</Tag>
      <Tag color="info">Info</Tag>
    </>
  ),
};

/**
 * Full color palette including light and dark variants.
 */
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Tag color="default">Default</Tag>
        <Tag color="primary">Primary</Tag>
        <Tag color="primary-light">Primary Light</Tag>
        <Tag color="primary-dark">Primary Dark</Tag>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Tag color="secondary">Secondary</Tag>
        <Tag color="secondary-light">Secondary Light</Tag>
        <Tag color="secondary-dark">Secondary Dark</Tag>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Tag color="tertiary">Tertiary</Tag>
        <Tag color="tertiary-light">Tertiary Light</Tag>
        <Tag color="tertiary-dark">Tertiary Dark</Tag>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Tag color="success">Success</Tag>
        <Tag color="warning">Warning</Tag>
        <Tag color="error">Error</Tag>
        <Tag color="info">Info</Tag>
      </div>
    </div>
  ),
};

/**
 * Filled tags have solid color backgrounds for higher emphasis.
 */
export const FilledColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Tag color="default" filled>Default</Tag>
        <Tag color="primary" filled>Primary</Tag>
        <Tag color="primary-light" filled>Primary Light</Tag>
        <Tag color="primary-dark" filled>Primary Dark</Tag>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Tag color="secondary" filled>Secondary</Tag>
        <Tag color="secondary-light" filled>Secondary Light</Tag>
        <Tag color="secondary-dark" filled>Secondary Dark</Tag>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Tag color="tertiary" filled>Tertiary</Tag>
        <Tag color="tertiary-light" filled>Tertiary Light</Tag>
        <Tag color="tertiary-dark" filled>Tertiary Dark</Tag>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Tag color="success" filled>Success</Tag>
        <Tag color="warning" filled>Warning</Tag>
        <Tag color="error" filled>Error</Tag>
        <Tag color="info" filled>Info</Tag>
      </div>
    </div>
  ),
};

/**
 * Use any hex color for brand-specific or custom designs.
 */
export const CustomColors: Story = {
  render: () => (
    <>
      <Tag filled customColor="#8B5CF6">Purple</Tag>
      <Tag filled customColor="#EC4899">Pink</Tag>
      <Tag filled customColor="#14B8A6">Teal</Tag>
      <Tag filled customColor="#F97316">Orange</Tag>
      <Tag filled customColor="#6366F1">Indigo</Tag>
      <Tag filled customColor="#10B981">Emerald</Tag>
    </>
  ),
};

// =============================================================================
// WITH ICONS
// =============================================================================

/**
 * Tags with leading icons for hashtag-style labeling.
 */
export const WithIcons: Story = {
  render: () => (
    <>
      <Tag leftIcon={<HashIcon />}>design</Tag>
      <Tag leftIcon={<HashIcon />} color="primary">react</Tag>
      <Tag leftIcon={<HashIcon />} color="success">typescript</Tag>
    </>
  ),
};

// =============================================================================
// REMOVABLE
// =============================================================================

/**
 * Tags with a remove button for filter chip behavior.
 */
export const Removable: Story = {
  args: {
    children: 'Removable',
    removable: true,
    onRemove: () => console.log('Remove clicked'),
  },
};

const RemovableDemo = () => {
  const [tags, setTags] = useState(['React', 'TypeScript', 'CSS', 'Neomorphism']);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <>
      {tags.map((tag) => (
        <Tag
          key={tag}
          removable
          onRemove={() => removeTag(tag)}
          color="primary"
        >
          {tag}
        </Tag>
      ))}
      {tags.length === 0 && <span style={{ color: 'var(--neo-text-secondary)' }}>All tags removed</span>}
    </>
  );
};

/**
 * Interactive example showing tags being removed from a list.
 */
export const RemovableInteractive: Story = {
  render: () => <RemovableDemo />,
};

// =============================================================================
// USE CASES
// =============================================================================

/**
 * Mixed variants and colors for a tag cloud display.
 */
export const TagCloud: Story = {
  render: () => (
    <>
      <Tag color="primary" variant="convex">JavaScript</Tag>
      <Tag color="success" variant="concave">Python</Tag>
      <Tag color="warning" variant="extrude">Go</Tag>
      <Tag color="error" variant="flat">Rust</Tag>
      <Tag color="secondary" variant="convex">TypeScript</Tag>
      <Tag color="tertiary" variant="concave">React</Tag>
      <Tag color="info" variant="extrude">Vue</Tag>
      <Tag color="primary-dark" variant="flat">Angular</Tag>
    </>
  ),
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Tags adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    children: 'Dark Theme',
    color: 'primary',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
