import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RatingStars } from './RatingStars';
import { Surface } from '../../foundation/Surface';

const meta: Meta<typeof RatingStars> = {
  title: 'Atoms/RatingStars',
  component: RatingStars,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    max: {
      control: { type: 'number', min: 1, max: 10 },
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'primary-light',
        'primary-dark',
        'secondary',
        'secondary-light',
        'secondary-dark',
        'tertiary',
        'tertiary-light',
        'tertiary-dark',
        'success',
        'warning',
        'error',
        'info',
      ],
    },
    customColor: {
      control: 'color',
      description: 'Custom hex color that overrides the color prop',
    },
    readOnly: {
      control: 'boolean',
    },
    allowHalf: {
      control: 'boolean',
    },
    showValue: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 3,
  },
};

const ControlledDemo = () => {
  const [value, setValue] = useState(4);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <RatingStars value={value} onChange={setValue} showValue />
      <span style={{ fontFamily: 'var(--neo-font-family)', color: 'var(--neo-text-secondary)' }}>
        Selected: {value} stars
      </span>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <RatingStars size="sm" defaultValue={4} />
      <RatingStars size="md" defaultValue={4} />
      <RatingStars size="lg" defaultValue={4} />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Default</span>
        <RatingStars color="default" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Primary</span>
        <RatingStars color="primary" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Primary Light</span>
        <RatingStars color="primary-light" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Primary Dark</span>
        <RatingStars color="primary-dark" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Secondary</span>
        <RatingStars color="secondary" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Secondary Light</span>
        <RatingStars color="secondary-light" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Secondary Dark</span>
        <RatingStars color="secondary-dark" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Tertiary</span>
        <RatingStars color="tertiary" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Tertiary Light</span>
        <RatingStars color="tertiary-light" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Tertiary Dark</span>
        <RatingStars color="tertiary-dark" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Success</span>
        <RatingStars color="success" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Warning</span>
        <RatingStars color="warning" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Error</span>
        <RatingStars color="error" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '120px', fontSize: '12px' }}>Info</span>
        <RatingStars color="info" defaultValue={4} />
      </div>
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    defaultValue: 4,
    showValue: true,
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4.5,
    readOnly: true,
    showValue: true,
  },
};

export const HalfStars: Story = {
  args: {
    defaultValue: 3.5,
    allowHalf: true,
    showValue: true,
  },
};

export const CustomMax: Story = {
  args: {
    max: 10,
    defaultValue: 7,
    showValue: true,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 3,
    disabled: true,
  },
};

export const ZeroRating: Story = {
  args: {
    defaultValue: 0,
    showValue: true,
  },
};

export const ProductRating: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RatingStars value={4.5} readOnly size="sm" />
        <span style={{ fontFamily: 'var(--neo-font-family)', fontSize: '14px', color: 'var(--neo-text)' }}>
          4.5 out of 5
        </span>
      </div>
      <span style={{ fontFamily: 'var(--neo-font-family)', fontSize: '12px', color: 'var(--neo-text-secondary)' }}>
        Based on 128 reviews
      </span>
    </div>
  ),
};

export const DarkTheme: Story = {
  args: {
    defaultValue: 4,
    showValue: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const DarkThemeColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <RatingStars color="primary" defaultValue={4} />
      <RatingStars color="secondary" defaultValue={4} />
      <RatingStars color="tertiary" defaultValue={4} />
      <RatingStars color="success" defaultValue={4} />
      <RatingStars color="warning" defaultValue={4} />
      <RatingStars color="error" defaultValue={4} />
      <RatingStars color="info" defaultValue={4} />
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

export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Coral</span>
        <RatingStars customColor="#FF6B6B" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Teal</span>
        <RatingStars customColor="#4ECDC4" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Sky Blue</span>
        <RatingStars customColor="#45B7D1" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Plum</span>
        <RatingStars customColor="#9B59B6" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Gold</span>
        <RatingStars customColor="#F39C12" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Hot Pink</span>
        <RatingStars customColor="#E91E63" defaultValue={4} />
      </div>
    </div>
  ),
};
