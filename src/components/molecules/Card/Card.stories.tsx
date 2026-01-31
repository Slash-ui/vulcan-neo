import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Surface } from '../../foundation/Surface';
import { Button } from '../../atoms/Button';
import { Typography } from '../../foundation/Typography';

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
      description: 'Card content (React node)',
      table: { category: 'Content' },
    },

    // Appearance
    variant: {
      control: 'select',
      options: ['convex', 'flat', 'concave'],
      description:
        'Visual style: **convex** (raised), **flat** (minimal), or **concave** (sunken)',
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
        <Typography variant="h6" gutterBottom>
          Card Title
        </Typography>
        <Typography color="secondary">
          This is a basic neomorphic card with elevated appearance.
        </Typography>
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
        <Typography variant="h6">Convex</Typography>
        <Typography variant="body2" color="secondary">
          Elevated/popped out
        </Typography>
      </Card>
      <Card variant="flat" style={{ width: '200px' }}>
        <Typography variant="h6">Flat</Typography>
        <Typography variant="body2" color="secondary">
          No shadow
        </Typography>
      </Card>
      <Card variant="concave" style={{ width: '200px' }}>
        <Typography variant="h6">Concave</Typography>
        <Typography variant="body2" color="secondary">
          Sunken/pressed in
        </Typography>
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
        <Typography variant="h6">Convex Card</Typography>
        <Typography variant="body2" color="secondary">
          Elevated appearance
        </Typography>
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
        <Typography variant="h6">Flat Card</Typography>
        <Typography variant="body2" color="secondary">
          No shadow
        </Typography>
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
        <Typography variant="h6">Concave Card</Typography>
        <Typography variant="body2" color="secondary">
          Pressed in
        </Typography>
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
        <Typography variant="h6">Low Elevation</Typography>
        <Typography variant="body2" color="secondary">
          4px shadow depth
        </Typography>
      </Card>
      <Card elevation="mid" style={{ width: '200px' }}>
        <Typography variant="h6">Mid Elevation</Typography>
        <Typography variant="body2" color="secondary">
          8px shadow depth
        </Typography>
      </Card>
      <Card elevation="high" style={{ width: '200px' }}>
        <Typography variant="h6">High Elevation</Typography>
        <Typography variant="body2" color="secondary">
          16px shadow depth
        </Typography>
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
        <Typography variant="h6">Low Elevation</Typography>
        <Typography variant="body2" color="secondary">
          Subtle shadow
        </Typography>
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
        <Typography variant="h6">Mid Elevation</Typography>
        <Typography variant="body2" color="secondary">
          Default shadow
        </Typography>
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
        <Typography variant="h6">High Elevation</Typography>
        <Typography variant="body2" color="secondary">
          Strong shadow
        </Typography>
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
        <Typography variant="h6">None</Typography>
        <Typography variant="body2" color="secondary">
          Sharp
        </Typography>
      </Card>
      <Card rounded="sm" style={{ width: '150px' }}>
        <Typography variant="h6">Small</Typography>
        <Typography variant="body2" color="secondary">
          Subtle
        </Typography>
      </Card>
      <Card rounded="md" style={{ width: '150px' }}>
        <Typography variant="h6">Medium</Typography>
        <Typography variant="body2" color="secondary">
          Default
        </Typography>
      </Card>
      <Card rounded="lg" style={{ width: '150px' }}>
        <Typography variant="h6">Large</Typography>
        <Typography variant="body2" color="secondary">
          Rounded
        </Typography>
      </Card>
      <Card rounded="xl" style={{ width: '150px' }}>
        <Typography variant="h6">XL</Typography>
        <Typography variant="body2" color="secondary">
          Extra
        </Typography>
      </Card>
      <Card rounded="full" style={{ width: '150px' }}>
        <Typography variant="h6">Full</Typography>
        <Typography variant="body2" color="secondary">
          Pill
        </Typography>
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
        <Typography variant="h6">Sharp Corners</Typography>
        <Typography variant="body2" color="secondary">
          No border radius
        </Typography>
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
        <Typography variant="h6">Small Radius</Typography>
        <Typography variant="body2" color="secondary">
          Subtle rounding
        </Typography>
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
        <Typography variant="h6">Medium Radius</Typography>
        <Typography variant="body2" color="secondary">
          Default rounding
        </Typography>
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
        <Typography variant="h6">Large Radius</Typography>
        <Typography variant="body2" color="secondary">
          More rounding
        </Typography>
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
        <Typography variant="h6">XL Radius</Typography>
        <Typography variant="body2" color="secondary">
          Pronounced rounding
        </Typography>
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
        <Typography variant="h6">Full Radius</Typography>
        <Typography variant="body2" color="secondary">
          Pill-shaped
        </Typography>
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
        <Typography variant="h6">Product Card</Typography>
      </CardHeader>
      <CardBody>
        <Typography color="secondary">
          This card demonstrates the use of CardHeader, CardBody, and CardFooter
          sub-components for structured content.
        </Typography>
      </CardBody>
      <CardFooter>
        <div
          style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}
        >
          <Button variant="flat" size="sm" label="Cancel" />
          <Button size="sm" label="Confirm" />
        </div>
      </CardFooter>
    </Card>
  ),
};

/**
 * CardHeader with title and subtitle.
 */
export const CardHeaderExample: Story = {
  tags: ['!dev'],
  render: () => (
    <Card style={{ width: '320px' }}>
      <CardHeader>
        <Typography variant="h6">Card Title</Typography>
        <Typography variant="body2" color="secondary">
          Subtitle text
        </Typography>
      </CardHeader>
      <CardBody>
        <Typography color="secondary">
          CardHeader provides a bordered section at the top of the card.
        </Typography>
      </CardBody>
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
          background:
            'linear-gradient(135deg, var(--neo-accent-primary), var(--neo-accent-secondary))',
          borderRadius: 'var(--neo-radius-md)',
          marginBottom: '1rem',
        }}
      />
      <Typography variant="h6" gutterBottom>
        Premium Headphones
      </Typography>
      <Typography variant="body2" color="secondary" gutterBottom>
        Wireless noise-canceling headphones with premium sound quality.
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">$299</Typography>
        <Button size="sm" label="Add to Cart" />
      </div>
    </Card>
  ),
};

/**
 * Example of a stats widget card.
 */
export const StatsWidget: Story = {
  render: () => (
    <Card style={{ width: '200px' }} variant="concave">
      <Typography variant="overline" color="secondary">
        Total Users
      </Typography>
      <Typography variant="h3">12,345</Typography>
      <Typography variant="caption" color="success">
        +12% from last month
      </Typography>
    </Card>
  ),
};

/**
 * Example of a notification card.
 */
export const NotificationCard: Story = {
  render: () => (
    <Card style={{ width: '360px' }}>
      <CardHeader>
        <Typography variant="h6">System Update</Typography>
        <Typography variant="caption" color="secondary">
          2 hours ago
        </Typography>
      </CardHeader>
      <CardBody>
        <Typography variant="body2" color="secondary">
          A new system update is available. Please restart your application to
          apply the changes.
        </Typography>
      </CardBody>
      <CardFooter>
        <div
          style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}
        >
          <Button variant="flat" size="sm" label="Remind Later" />
          <Button size="sm" label="Update Now" />
        </div>
      </CardFooter>
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
        <Typography variant="h6" gutterBottom>
          Dark Theme Card
        </Typography>
        <Typography color="secondary">
          Cards adapt to the dark theme automatically.
        </Typography>
      </div>
    ),
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
 * All variants on dark background.
 */
export const DarkThemeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <Card variant="convex" style={{ width: '200px' }}>
        <Typography variant="h6">Convex</Typography>
        <Typography variant="body2" color="secondary">
          Elevated
        </Typography>
      </Card>
      <Card variant="flat" style={{ width: '200px' }}>
        <Typography variant="h6">Flat</Typography>
        <Typography variant="body2" color="secondary">
          No shadow
        </Typography>
      </Card>
      <Card variant="concave" style={{ width: '200px' }}>
        <Typography variant="h6">Concave</Typography>
        <Typography variant="body2" color="secondary">
          Sunken
        </Typography>
      </Card>
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

/**
 * Card with sub-components on dark background.
 */
export const DarkThemeSubComponents: Story = {
  render: () => (
    <Card style={{ width: '320px' }}>
      <CardHeader>
        <Typography variant="h6">Dark Theme Header</Typography>
        <Typography variant="body2" color="secondary">
          Sub-components adapt
        </Typography>
      </CardHeader>
      <CardBody>
        <Typography color="secondary">
          CardHeader, CardBody, and CardFooter work seamlessly on dark
          backgrounds.
        </Typography>
      </CardBody>
      <CardFooter>
        <div
          style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}
        >
          <Button variant="flat" size="sm" label="Cancel" />
          <Button size="sm" label="Confirm" />
        </div>
      </CardFooter>
    </Card>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
