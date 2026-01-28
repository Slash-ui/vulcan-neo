import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Surface } from '../Surface';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
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
    elevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
    },
    variant: {
      control: 'select',
      options: ['convex', 'flat', 'concave'],
    },
    padded: {
      control: 'boolean',
    },
    interactive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Interactive: Story = {
  args: {
    interactive: true,
    children: (
      <div>
        <h3 style={{ margin: '0 0 1rem' }}>Interactive Card</h3>
        <p style={{ margin: 0, color: 'var(--neo-text-secondary)' }}>
          Click or hover to see the interaction effects.
        </p>
      </div>
    ),
  },
};

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
          <Button variant="flat" size="sm">Cancel</Button>
          <Button size="sm">Confirm</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

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
        <Button size="sm">Add to Cart</Button>
      </div>
    </Card>
  ),
};

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
  globals: {
    backgrounds: {
      value: "neomorphic-dark"
    }
  },
};
