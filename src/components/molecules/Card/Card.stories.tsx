import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Surface } from '../../foundation/Surface';
import { Button } from '../../atoms/Button';

/**
 * A neomorphic card container for grouping related content.
 * The backbone of neomorphic layouts with soft shadows and depth.
 *
 * ## When to Use
 *
 * - **Content grouping**: Organize related information together
 * - **Product cards**: Display items in e-commerce or galleries
 * - **Dashboard widgets**: Create distinct sections in dashboards
 * - **Forms**: Contain form elements in a visually distinct area
 *
 * ## Key Features
 *
 * - **Neomorphic design**: Supports `convex`, `concave`, and `flat` variants
 * - **Flexible corners**: Customizable border radius from none to full
 * - **Sub-components**: CardHeader, CardBody, and CardFooter for structure
 * - **Elevation levels**: Control shadow intensity
 *
 * ## Best Practices
 *
 * - Use consistent elevation across related cards
 * - Match rounded corners with your design system
 * - Use sub-components for complex card layouts
 */
const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Content
    children: {
      control: false,
      description: 'Card content (React node)',
      table: { category: 'Content' },
    },

    // Appearance
    variant: {
      control: 'select',
      options: ['convex', 'flat', 'concave'],
      description: 'Visual style: **convex** (raised), **flat** (minimal), or **concave** (sunken)',
      table: { category: 'Appearance', defaultValue: { summary: 'convex' } },
    },
    elevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
      description: 'Shadow intensity',
      table: { category: 'Appearance', defaultValue: { summary: 'mid' } },
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    padded: {
      control: 'boolean',
      description: 'Whether the card has padding',
      table: { category: 'Appearance', defaultValue: { summary: 'true' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default card with convex styling. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 1rem' }}>Card Title</h3>
        <p style={{ margin: 0, color: 'var(--neo-text-secondary)' }}>
          This is a basic neomorphic card with elevated appearance.
        </p>
      </div>
    ),
  },
};

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * - **Convex** (default): Raised appearance with outer shadows
 * - **Flat**: No shadows, minimal style
 * - **Concave**: Pressed appearance with inner shadows
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <Card variant="convex" style={{ width: '200px' }}>
        <h4 style={{ margin: 0 }}>Convex</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Elevated/popped out</p>
      </Card>
      <Card variant="flat" style={{ width: '200px' }}>
        <h4 style={{ margin: 0 }}>Flat</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>No shadow</p>
      </Card>
      <Card variant="concave" style={{ width: '200px' }}>
        <h4 style={{ margin: 0 }}>Concave</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Sunken/pressed in</p>
      </Card>
    </div>
  ),
};

/**
 * Convex variant with raised appearance.
 */
export const VariantConvex: Story = {
  tags: ['!dev'],
  args: {
    variant: 'convex',
    children: (
      <div>
        <h4 style={{ margin: 0 }}>Convex Card</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Elevated appearance</p>
      </div>
    ),
  },
};

/**
 * Flat variant with minimal styling.
 */
export const VariantFlat: Story = {
  tags: ['!dev'],
  args: {
    variant: 'flat',
    children: (
      <div>
        <h4 style={{ margin: 0 }}>Flat Card</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>No shadow</p>
      </div>
    ),
  },
};

/**
 * Concave variant with sunken appearance.
 */
export const VariantConcave: Story = {
  tags: ['!dev'],
  args: {
    variant: 'concave',
    children: (
      <div>
        <h4 style={{ margin: 0 }}>Concave Card</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Pressed in</p>
      </div>
    ),
  },
};

// =============================================================================
// ELEVATIONS
// =============================================================================

/**
 * Control shadow intensity for convex and concave variants.
 */
export const Elevations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <Card elevation="low" style={{ width: '200px' }}>
        <h4 style={{ margin: 0 }}>Low Elevation</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>4px shadow depth</p>
      </Card>
      <Card elevation="mid" style={{ width: '200px' }}>
        <h4 style={{ margin: 0 }}>Mid Elevation</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>8px shadow depth</p>
      </Card>
      <Card elevation="high" style={{ width: '200px' }}>
        <h4 style={{ margin: 0 }}>High Elevation</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>16px shadow depth</p>
      </Card>
    </div>
  ),
};

/**
 * Low elevation with subtle shadows.
 */
export const ElevationLow: Story = {
  tags: ['!dev'],
  args: {
    elevation: 'low',
    children: (
      <div>
        <h4 style={{ margin: 0 }}>Low Elevation</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Subtle shadow</p>
      </div>
    ),
  },
};

/**
 * Medium elevation (default).
 */
export const ElevationMid: Story = {
  tags: ['!dev'],
  args: {
    elevation: 'mid',
    children: (
      <div>
        <h4 style={{ margin: 0 }}>Mid Elevation</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Default shadow</p>
      </div>
    ),
  },
};

/**
 * High elevation with pronounced shadows.
 */
export const ElevationHigh: Story = {
  tags: ['!dev'],
  args: {
    elevation: 'high',
    children: (
      <div>
        <h4 style={{ margin: 0 }}>High Elevation</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Strong shadow</p>
      </div>
    ),
  },
};

// =============================================================================
// ROUNDED CORNERS
// =============================================================================

/**
 * Customize border radius from sharp corners to pill-shaped.
 */
export const RoundedCorners: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <Card rounded="none" style={{ width: '150px' }}>
        <h4 style={{ margin: 0 }}>None</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Sharp</p>
      </Card>
      <Card rounded="sm" style={{ width: '150px' }}>
        <h4 style={{ margin: 0 }}>Small</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Subtle</p>
      </Card>
      <Card rounded="md" style={{ width: '150px' }}>
        <h4 style={{ margin: 0 }}>Medium</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Default</p>
      </Card>
      <Card rounded="lg" style={{ width: '150px' }}>
        <h4 style={{ margin: 0 }}>Large</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Rounded</p>
      </Card>
      <Card rounded="xl" style={{ width: '150px' }}>
        <h4 style={{ margin: 0 }}>XL</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Extra</p>
      </Card>
      <Card rounded="full" style={{ width: '150px' }}>
        <h4 style={{ margin: 0 }}>Full</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Pill</p>
      </Card>
    </div>
  ),
};

/**
 * No rounded corners (sharp edges).
 */
export const RoundedNone: Story = {
  tags: ['!dev'],
  args: {
    rounded: 'none',
    children: (
      <div>
        <h4 style={{ margin: 0 }}>Sharp Corners</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>No border radius</p>
      </div>
    ),
  },
};

/**
 * Small border radius.
 */
export const RoundedSmall: Story = {
  tags: ['!dev'],
  args: {
    rounded: 'sm',
    children: (
      <div>
        <h4 style={{ margin: 0 }}>Small Radius</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Subtle rounding</p>
      </div>
    ),
  },
};

/**
 * Medium border radius (default).
 */
export const RoundedMedium: Story = {
  tags: ['!dev'],
  args: {
    rounded: 'md',
    children: (
      <div>
        <h4 style={{ margin: 0 }}>Medium Radius</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Default rounding</p>
      </div>
    ),
  },
};

/**
 * Large border radius.
 */
export const RoundedLarge: Story = {
  tags: ['!dev'],
  args: {
    rounded: 'lg',
    children: (
      <div>
        <h4 style={{ margin: 0 }}>Large Radius</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>More rounding</p>
      </div>
    ),
  },
};

/**
 * Extra large border radius.
 */
export const RoundedXL: Story = {
  tags: ['!dev'],
  args: {
    rounded: 'xl',
    children: (
      <div>
        <h4 style={{ margin: 0 }}>XL Radius</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Pronounced rounding</p>
      </div>
    ),
  },
};

/**
 * Full border radius (pill-shaped).
 */
export const RoundedFull: Story = {
  tags: ['!dev'],
  args: {
    rounded: 'full',
    children: (
      <div>
        <h4 style={{ margin: 0 }}>Full Radius</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Pill-shaped</p>
      </div>
    ),
  },
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * Use CardHeader, CardBody, and CardFooter for structured layouts.
 */
export const WithSubComponents: Story = {
  render: () => (
    <Card style={{ width: '320px' }}>
      <CardHeader>
        <h3 style={{ margin: 0 }}>Product Card</h3>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0, color: 'var(--neo-text-secondary)' }}>
          This card demonstrates the use of CardHeader, CardBody, and CardFooter
          sub-components for structured content.
        </p>
      </CardBody>
      <CardFooter>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <Button variant="flat" size="sm" label="Cancel" />
          <Button size="sm" label="Confirm" />
        </div>
      </CardFooter>
    </Card>
  ),
};

// =============================================================================
// USE CASES
// =============================================================================

/**
 * Example of a product card with image, title, description, and action.
 */
export const ProductCard: Story = {
  render: () => (
    <Card style={{ width: '280px' }} elevation="high">
      <div
        style={{
          height: '160px',
          background: 'linear-gradient(135deg, var(--neo-accent-primary), var(--neo-accent-secondary))',
          borderRadius: 'var(--neo-radius-md)',
          marginBottom: '1rem',
        }}
      />
      <h3 style={{ margin: '0 0 0.5rem' }}>Premium Headphones</h3>
      <p style={{ margin: '0 0 1rem', color: 'var(--neo-text-secondary)', fontSize: '14px' }}>
        Wireless noise-canceling headphones with premium sound quality.
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>$299</span>
        <Button size="sm" label="Add to Cart" />
      </div>
    </Card>
  ),
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Cards adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 1rem' }}>Dark Theme Card</h3>
        <p style={{ margin: 0 }}>
          Cards adapt to the dark theme automatically.
        </p>
      </div>
    ),
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
 * All variants on dark background.
 */
export const DarkThemeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <Card variant="convex" style={{ width: '200px' }}>
        <h4 style={{ margin: 0 }}>Convex</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Elevated</p>
      </Card>
      <Card variant="flat" style={{ width: '200px' }}>
        <h4 style={{ margin: 0 }}>Flat</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>No shadow</p>
      </Card>
      <Card variant="concave" style={{ width: '200px' }}>
        <h4 style={{ margin: 0 }}>Concave</h4>
        <p style={{ margin: '0.5rem 0 0', fontSize: '14px' }}>Sunken</p>
      </Card>
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
