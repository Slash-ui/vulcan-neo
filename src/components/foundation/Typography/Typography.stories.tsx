import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from './Typography';
import { Surface } from '../Surface';

/**
 * A flexible typography component for consistent text styling across your application.
 * Provides semantic HTML elements with predefined styles for headings, body text, and more.
 *
 * ## When to Use
 *
 * - **Headings**: Page titles, section headers, card titles
 * - **Body text**: Paragraphs, descriptions, content blocks
 * - **UI text**: Buttons, labels, captions, helper text
 * - **Special text**: Overlines, subtitles, emphasized content
 *
 * ## Key Features
 *
 * - **13 variants**: From h1 to overline for all text needs
 * - **Semantic colors**: Primary, secondary, disabled, and status colors
 * - **Text alignment**: Left, center, right, justify
 * - **Text overflow**: Truncate with ellipsis using noWrap
 * - **Custom elements**: Render any variant as a different HTML element
 *
 * ## Best Practices
 *
 * - Use semantic variants (h1-h6) for proper document structure
 * - Use `gutterBottom` for consistent vertical rhythm
 * - Use `component` prop when you need different HTML semantics
 */
const meta: Meta<typeof Typography> = {
  title: 'Foundation/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Content
    children: {
      control: false,
      description: 'Text content to render',
      table: { category: 'Content' },
    },

    // Appearance
    variant: {
      control: 'select',
      options: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'subtitle1', 'subtitle2',
        'body1', 'body2',
        'button', 'caption', 'overline',
      ],
      description: 'Typography style variant',
      table: { category: 'Appearance', defaultValue: { summary: 'body1' } },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'disabled', 'error', 'success', 'warning', 'info', 'inherit'],
      description: 'Text color',
      table: { category: 'Appearance', defaultValue: { summary: 'primary' } },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify', 'inherit'],
      description: 'Text alignment',
      table: { category: 'Appearance', defaultValue: { summary: 'inherit' } },
    },

    // Behavior
    component: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'label'],
      description: 'HTML element to render (overrides default)',
      table: { category: 'Behavior' },
    },
    noWrap: {
      control: 'boolean',
      description: 'Truncate text with ellipsis on overflow',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    gutterBottom: {
      control: 'boolean',
      description: 'Add margin below the text',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    inline: {
      control: 'boolean',
      description: 'Display as inline element',
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
 * Default typography. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    variant: 'body1',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
};

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * All 13 typography variants from headings to overlines.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="h1">h1. Heading</Typography>
      <Typography variant="h2">h2. Heading</Typography>
      <Typography variant="h3">h3. Heading</Typography>
      <Typography variant="h4">h4. Heading</Typography>
      <Typography variant="h5">h5. Heading</Typography>
      <Typography variant="h6">h6. Heading</Typography>
      <Typography variant="subtitle1">subtitle1. Lorem ipsum dolor sit amet</Typography>
      <Typography variant="subtitle2">subtitle2. Lorem ipsum dolor sit amet</Typography>
      <Typography variant="body1">body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography>
      <Typography variant="body2">body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography>
      <Typography variant="button">button text</Typography>
      <Typography variant="caption">caption text</Typography>
      <Typography variant="overline">overline text</Typography>
    </div>
  ),
};

/**
 * Heading 1 variant.
 */
export const VariantH1: Story = {
  tags: ['!dev'],
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

/**
 * Heading 2 variant.
 */
export const VariantH2: Story = {
  tags: ['!dev'],
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

/**
 * Heading 3 variant.
 */
export const VariantH3: Story = {
  tags: ['!dev'],
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

/**
 * Heading 4 variant.
 */
export const VariantH4: Story = {
  tags: ['!dev'],
  args: {
    variant: 'h4',
    children: 'Heading 4',
  },
};

/**
 * Heading 5 variant.
 */
export const VariantH5: Story = {
  tags: ['!dev'],
  args: {
    variant: 'h5',
    children: 'Heading 5',
  },
};

/**
 * Heading 6 variant.
 */
export const VariantH6: Story = {
  tags: ['!dev'],
  args: {
    variant: 'h6',
    children: 'Heading 6',
  },
};

/**
 * Subtitle 1 variant.
 */
export const VariantSubtitle1: Story = {
  tags: ['!dev'],
  args: {
    variant: 'subtitle1',
    children: 'Subtitle 1 text',
  },
};

/**
 * Subtitle 2 variant.
 */
export const VariantSubtitle2: Story = {
  tags: ['!dev'],
  args: {
    variant: 'subtitle2',
    children: 'Subtitle 2 text',
  },
};

/**
 * Body 1 variant (default).
 */
export const VariantBody1: Story = {
  tags: ['!dev'],
  args: {
    variant: 'body1',
    children: 'Body 1 is the default body text style.',
  },
};

/**
 * Body 2 variant.
 */
export const VariantBody2: Story = {
  tags: ['!dev'],
  args: {
    variant: 'body2',
    children: 'Body 2 is a smaller body text style.',
  },
};

/**
 * Button text variant.
 */
export const VariantButton: Story = {
  tags: ['!dev'],
  args: {
    variant: 'button',
    children: 'Button Text',
  },
};

/**
 * Caption variant.
 */
export const VariantCaption: Story = {
  tags: ['!dev'],
  args: {
    variant: 'caption',
    children: 'Caption text for small labels',
  },
};

/**
 * Overline variant.
 */
export const VariantOverline: Story = {
  tags: ['!dev'],
  args: {
    variant: 'overline',
    children: 'Overline Text',
  },
};

// =============================================================================
// COLORS
// =============================================================================

/**
 * All available text colors including semantic status colors.
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Typography color="primary">Primary - main text color</Typography>
      <Typography color="secondary">Secondary - subdued text</Typography>
      <Typography color="disabled">Disabled - inactive text</Typography>
      <Typography color="error">Error - error states</Typography>
      <Typography color="success">Success - success states</Typography>
      <Typography color="warning">Warning - warning states</Typography>
      <Typography color="info">Info - informational states</Typography>
    </div>
  ),
};

/**
 * Primary text color.
 */
export const ColorPrimary: Story = {
  tags: ['!dev'],
  args: {
    color: 'primary',
    children: 'Primary color text',
  },
};

/**
 * Secondary text color.
 */
export const ColorSecondary: Story = {
  tags: ['!dev'],
  args: {
    color: 'secondary',
    children: 'Secondary color text',
  },
};

/**
 * Error text color.
 */
export const ColorError: Story = {
  tags: ['!dev'],
  args: {
    color: 'error',
    children: 'Error color text',
  },
};

/**
 * Success text color.
 */
export const ColorSuccess: Story = {
  tags: ['!dev'],
  args: {
    color: 'success',
    children: 'Success color text',
  },
};

// =============================================================================
// ALIGNMENT
// =============================================================================

/**
 * Text alignment options.
 */
export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography align="left">Left aligned text</Typography>
      <Typography align="center">Center aligned text</Typography>
      <Typography align="right">Right aligned text</Typography>
      <Typography align="justify">
        Justified text - Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
    </div>
  ),
};

/**
 * Left aligned text.
 */
export const AlignLeft: Story = {
  tags: ['!dev'],
  args: {
    align: 'left',
    children: 'Left aligned text',
  },
};

/**
 * Center aligned text.
 */
export const AlignCenter: Story = {
  tags: ['!dev'],
  args: {
    align: 'center',
    children: 'Center aligned text',
  },
};

/**
 * Right aligned text.
 */
export const AlignRight: Story = {
  tags: ['!dev'],
  args: {
    align: 'right',
    children: 'Right aligned text',
  },
};

// =============================================================================
// FEATURES
// =============================================================================

/**
 * Truncate overflowing text with an ellipsis.
 */
export const NoWrap: Story = {
  render: () => (
    <div style={{ width: '250px', border: '1px dashed var(--neo-color-outline)', padding: '0.5rem' }}>
      <Typography noWrap>
        This is a very long text that will be truncated with an ellipsis when it overflows
      </Typography>
    </div>
  ),
};

/**
 * Add consistent spacing below text elements.
 */
export const GutterBottom: Story = {
  render: () => (
    <div>
      <Typography variant="h4" gutterBottom>
        Heading with Gutter Bottom
      </Typography>
      <Typography>
        This paragraph follows the heading with proper spacing.
      </Typography>
    </div>
  ),
};

/**
 * Render a variant as a different HTML element.
 */
export const CustomComponent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Typography variant="h4" component="div">
        h4 styled as a div
      </Typography>
      <Typography variant="body1" component="span">
        body1 styled as a span
      </Typography>
      <Typography variant="subtitle1" component="label">
        subtitle1 styled as a label
      </Typography>
    </div>
  ),
};

// =============================================================================
// USE CASES
// =============================================================================

/**
 * Example of an article layout with proper heading hierarchy.
 */
export const ArticleExample: Story = {
  render: () => (
    <article style={{ maxWidth: '600px' }}>
      <Typography variant="overline" color="info" gutterBottom>
        Featured Article
      </Typography>
      <Typography variant="h3" gutterBottom>
        The Future of Design Systems
      </Typography>
      <Typography variant="subtitle1" color="secondary" gutterBottom>
        Exploring how modern design systems are evolving to meet the needs of
        complex applications and diverse teams.
      </Typography>
      <Typography gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris.
      </Typography>
      <Typography gutterBottom>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </Typography>
      <Typography variant="caption" color="secondary">
        Published on January 28, 2026 · 5 min read
      </Typography>
    </article>
  ),
};

/**
 * Example of typography in a card context.
 */
export const CardExample: Story = {
  render: () => (
    <div
      style={{
        padding: '1.5rem',
        background: 'var(--neo-bg)',
        borderRadius: 'var(--neo-radius-md)',
        boxShadow: '-6px -6px 12px var(--neo-shadow-light), 6px 6px 12px var(--neo-shadow-dark)',
        maxWidth: '400px',
      }}
    >
      <Typography variant="overline" color="info" gutterBottom>
        New Feature
      </Typography>
      <Typography variant="h6" gutterBottom>
        Dark Mode Support
      </Typography>
      <Typography variant="body2" color="secondary" gutterBottom>
        We've added full dark mode support to all components. Toggle between
        light and dark themes seamlessly.
      </Typography>
      <Typography variant="button" color="info">
        Learn more →
      </Typography>
    </div>
  ),
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Typography adapts to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    variant: 'body1',
    children: 'Typography on dark surface.',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

/**
 * All colors on dark background.
 */
export const DarkThemeColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Typography color="primary">Primary text</Typography>
      <Typography color="secondary">Secondary text</Typography>
      <Typography color="error">Error text</Typography>
      <Typography color="success">Success text</Typography>
      <Typography color="warning">Warning text</Typography>
      <Typography color="info">Info text</Typography>
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
