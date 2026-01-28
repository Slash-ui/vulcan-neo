import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Slider } from './Slider';
import { Surface } from '../foundation/Surface';

const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', width: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
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
    defaultValue: 50,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Volume',
    defaultValue: 75,
    showValue: true,
  },
};

const ControlledDemo = () => {
  const [value, setValue] = useState(50);
  return (
    <Slider
      label="Brightness"
      value={value}
      onChange={setValue}
      showValue
      formatValue={(v) => `${v}%`}
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Slider label="Small" size="sm" defaultValue={30} showValue />
      <Slider label="Medium" size="md" defaultValue={50} showValue />
      <Slider label="Large" size="lg" defaultValue={70} showValue />
    </div>
  ),
};

export const CustomRange: Story = {
  args: {
    label: 'Temperature',
    min: -20,
    max: 50,
    defaultValue: 22,
    showValue: true,
    formatValue: (v) => `${v}°C`,
  },
};

export const Steps: Story = {
  args: {
    label: 'Rating',
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 5,
    showValue: true,
  },
};

export const LargeSteps: Story = {
  args: {
    label: 'Quantity',
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 50,
    showValue: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    defaultValue: 60,
    disabled: true,
    showValue: true,
  },
};

export const CustomFormat: Story = {
  args: {
    label: 'Price',
    min: 0,
    max: 1000,
    defaultValue: 500,
    showValue: true,
    formatValue: (v) => `$${v}`,
  },
};

export const MultipleSliders: Story = {
  render: () => {
    const [rgb, setRgb] = useState({ r: 108, g: 92, b: 231 });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Slider
          label="Red"
          min={0}
          max={255}
          value={rgb.r}
          onChange={(r) => setRgb({ ...rgb, r })}
          showValue
        />
        <Slider
          label="Green"
          min={0}
          max={255}
          value={rgb.g}
          onChange={(g) => setRgb({ ...rgb, g })}
          showValue
        />
        <Slider
          label="Blue"
          min={0}
          max={255}
          value={rgb.b}
          onChange={(b) => setRgb({ ...rgb, b })}
          showValue
        />
        <div
          style={{
            height: '60px',
            borderRadius: '12px',
            background: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
            boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.1), inset -4px -4px 8px rgba(255,255,255,0.5)'
          }}
        />
      </div>
    );
  },
};

export const DarkTheme: Story = {
  args: {
    label: 'Volume',
    defaultValue: 60,
    showValue: true,
    formatValue: (v) => `${v}%`,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', width: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};
