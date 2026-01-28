import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Slider } from './Slider';
import { Surface } from '../../foundation/Surface';

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
    variant: {
      control: 'select',
      options: ['default', 'gradient', 'glow'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
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

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Slider label="Default" variant="default" defaultValue={60} showValue />
      <Slider label="Gradient" variant="gradient" defaultValue={60} showValue />
      <Slider label="Glow" variant="glow" defaultValue={60} showValue />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Slider color="default" defaultValue={70} />
      <Slider color="primary" defaultValue={70} />
      <Slider color="primary-light" defaultValue={70} />
      <Slider color="primary-dark" defaultValue={70} />
      <Slider color="secondary" defaultValue={70} />
      <Slider color="secondary-light" defaultValue={70} />
      <Slider color="secondary-dark" defaultValue={70} />
      <Slider color="tertiary" defaultValue={70} />
      <Slider color="tertiary-light" defaultValue={70} />
      <Slider color="tertiary-dark" defaultValue={70} />
      <Slider color="success" defaultValue={70} />
      <Slider color="warning" defaultValue={70} />
      <Slider color="error" defaultValue={70} />
      <Slider color="info" defaultValue={70} />
    </div>
  ),
};

export const ColorsWithLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Primary</span>
        <Slider color="primary" defaultValue={65} showValue style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Secondary</span>
        <Slider color="secondary" defaultValue={45} showValue style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Tertiary</span>
        <Slider color="tertiary" defaultValue={80} showValue style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Success</span>
        <Slider color="success" defaultValue={100} showValue style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Warning</span>
        <Slider color="warning" defaultValue={55} showValue style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Error</span>
        <Slider color="error" defaultValue={25} showValue style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '100px', fontSize: '12px' }}>Info</span>
        <Slider color="info" defaultValue={90} showValue style={{ flex: 1 }} />
      </div>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Coral</span>
        <Slider customColor="#FF6B6B" defaultValue={70} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Teal</span>
        <Slider customColor="#4ECDC4" defaultValue={65} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Sky Blue</span>
        <Slider customColor="#45B7D1" defaultValue={80} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Sage</span>
        <Slider customColor="#96CEB4" defaultValue={55} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Plum</span>
        <Slider customColor="#9B59B6" defaultValue={90} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '12px' }}>Gold</span>
        <Slider customColor="#F39C12" defaultValue={75} style={{ flex: 1 }} />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end', height: '250px' }}>
      <Slider orientation="vertical" defaultValue={70} color="primary" />
      <Slider orientation="vertical" defaultValue={50} color="secondary" />
      <Slider orientation="vertical" defaultValue={85} color="tertiary" />
      <Slider orientation="vertical" defaultValue={30} color="success" />
      <Slider orientation="vertical" defaultValue={60} color="warning" />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', width: 'auto' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const VerticalSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end', height: '200px' }}>
      <Slider orientation="vertical" size="sm" defaultValue={60} />
      <Slider orientation="vertical" size="md" defaultValue={60} />
      <Slider orientation="vertical" size="lg" defaultValue={60} />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', width: 'auto' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const VerticalColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end', height: '200px' }}>
      <Slider orientation="vertical" defaultValue={80} color="primary" />
      <Slider orientation="vertical" defaultValue={65} color="primary-light" />
      <Slider orientation="vertical" defaultValue={70} color="primary-dark" />
      <Slider orientation="vertical" defaultValue={55} color="secondary" />
      <Slider orientation="vertical" defaultValue={75} color="tertiary" />
      <Slider orientation="vertical" defaultValue={90} color="success" />
      <Slider orientation="vertical" defaultValue={45} color="warning" />
      <Slider orientation="vertical" defaultValue={60} color="error" />
      <Slider orientation="vertical" defaultValue={85} color="info" />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', width: 'auto' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const VerticalCustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end', height: '200px' }}>
      <Slider orientation="vertical" customColor="#FF6B6B" defaultValue={80} />
      <Slider orientation="vertical" customColor="#4ECDC4" defaultValue={65} />
      <Slider orientation="vertical" customColor="#45B7D1" defaultValue={70} />
      <Slider orientation="vertical" customColor="#9B59B6" defaultValue={55} />
      <Slider orientation="vertical" customColor="#F39C12" defaultValue={75} />
      <Slider orientation="vertical" customColor="#E91E63" defaultValue={90} />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', width: 'auto' }}>
        <Story />
      </Surface>
    ),
  ],
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
          customColor="#FF4444"
        />
        <Slider
          label="Green"
          min={0}
          max={255}
          value={rgb.g}
          onChange={(g) => setRgb({ ...rgb, g })}
          showValue
          customColor="#44FF44"
        />
        <Slider
          label="Blue"
          min={0}
          max={255}
          value={rgb.b}
          onChange={(b) => setRgb({ ...rgb, b })}
          showValue
          customColor="#4444FF"
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

export const DarkThemeColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Slider color="primary" defaultValue={70} />
      <Slider color="secondary" defaultValue={70} />
      <Slider color="tertiary" defaultValue={70} />
      <Slider color="success" defaultValue={70} />
      <Slider color="warning" defaultValue={70} />
      <Slider color="error" defaultValue={70} />
      <Slider color="info" defaultValue={70} />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', width: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const DarkThemeVertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end', height: '200px' }}>
      <Slider orientation="vertical" defaultValue={80} color="primary" />
      <Slider orientation="vertical" defaultValue={65} color="secondary" />
      <Slider orientation="vertical" defaultValue={70} color="tertiary" />
      <Slider orientation="vertical" defaultValue={55} color="success" />
      <Slider orientation="vertical" defaultValue={75} color="warning" />
      <Slider orientation="vertical" defaultValue={90} color="error" />
      <Slider orientation="vertical" defaultValue={60} color="info" />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', width: 'auto' }}>
        <Story />
      </Surface>
    ),
  ],
};
