import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sun, Moon, Volume2, VolumeX, Wifi, WifiOff, Eye, EyeOff } from 'lucide-react';
import { Switch } from './Switch';
import { Surface } from '../../foundation/Surface';

const colorOptions = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'];

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    labelPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
    showIcons: {
      control: 'boolean',
    },
    checkedColor: {
      control: 'select',
      options: colorOptions,
    },
    uncheckedColor: {
      control: 'select',
      options: colorOptions,
    },
    customCheckedColor: {
      control: 'color',
    },
    customUncheckedColor: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const LabelLeft: Story = {
  args: {
    label: 'Dark mode',
    labelPosition: 'left',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium" />
      <Switch size="lg" label="Large" />
    </div>
  ),
};

export const Checked: Story = {
  args: {
    label: 'Enabled feature',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
};

export const DarkTheme: Story = {
  args: {
    label: 'Dark theme switch',
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

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch label="Default (unchecked)" />
      <Switch label="Checked" defaultChecked />
      <Switch label="Disabled unchecked" disabled />
      <Switch label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const WithoutIcons: Story = {
  args: {
    label: 'No icons',
    showIcons: false,
  },
};

export const CustomIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch
        label="Dark mode"
        checkedIcon={<Moon size={16} strokeWidth={3} />}
        uncheckedIcon={<Sun size={16} strokeWidth={3} />}
      />
      <Switch
        label="Sound"
        checkedIcon={<Volume2 size={16} strokeWidth={3} />}
        uncheckedIcon={<VolumeX size={16} strokeWidth={3} />}
        defaultChecked
      />
      <Switch
        label="WiFi"
        checkedIcon={<Wifi size={16} strokeWidth={3} />}
        uncheckedIcon={<WifiOff size={16} strokeWidth={3} />}
      />
      <Switch
        label="Visibility"
        checkedIcon={<Eye size={16} strokeWidth={3} />}
        uncheckedIcon={<EyeOff size={16} strokeWidth={3} />}
        defaultChecked
      />
    </div>
  ),
};

export const IconVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch label="With icons (default)" />
      <Switch label="Without icons" showIcons={false} />
      <Switch
        label="Custom icons"
        checkedIcon={<Moon size={16} strokeWidth={3} />}
        uncheckedIcon={<Sun size={16} strokeWidth={3} />}
      />
    </div>
  ),
};

export const CheckedColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch label="Primary" checkedColor="primary" defaultChecked />
      <Switch label="Secondary" checkedColor="secondary" defaultChecked />
      <Switch label="Tertiary" checkedColor="tertiary" defaultChecked />
      <Switch label="Success (default)" checkedColor="success" defaultChecked />
      <Switch label="Warning" checkedColor="warning" defaultChecked />
      <Switch label="Error" checkedColor="error" defaultChecked />
      <Switch label="Info" checkedColor="info" defaultChecked />
    </div>
  ),
};

export const UncheckedColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch label="Primary" uncheckedColor="primary" />
      <Switch label="Secondary" uncheckedColor="secondary" />
      <Switch label="Tertiary" uncheckedColor="tertiary" />
      <Switch label="Success" uncheckedColor="success" />
      <Switch label="Warning" uncheckedColor="warning" />
      <Switch label="Error (default)" uncheckedColor="error" />
      <Switch label="Info" uncheckedColor="info" />
    </div>
  ),
};

export const ColorCombinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch
        label="Primary / Secondary"
        checkedColor="primary"
        uncheckedColor="secondary"
      />
      <Switch
        label="Info / Warning"
        checkedColor="info"
        uncheckedColor="warning"
      />
      <Switch
        label="Tertiary / Primary"
        checkedColor="tertiary"
        uncheckedColor="primary"
        defaultChecked
      />
      <Switch
        label="Success / Error (default)"
        checkedColor="success"
        uncheckedColor="error"
      />
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch
        label="Purple / Pink"
        customCheckedColor="#8B5CF6"
        customUncheckedColor="#EC4899"
      />
      <Switch
        label="Teal / Orange"
        customCheckedColor="#14B8A6"
        customUncheckedColor="#F97316"
        defaultChecked
      />
      <Switch
        label="Indigo / Rose"
        customCheckedColor="#6366F1"
        customUncheckedColor="#F43F5E"
      />
      <Switch
        label="Emerald / Amber"
        customCheckedColor="#10B981"
        customUncheckedColor="#F59E0B"
        defaultChecked
      />
    </div>
  ),
};

export const CustomColorsWithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch
        label="Dark Mode"
        customCheckedColor="#6366F1"
        customUncheckedColor="#F59E0B"
        checkedIcon={<Moon size={16} strokeWidth={3} />}
        uncheckedIcon={<Sun size={16} strokeWidth={3} />}
        defaultChecked
      />
      <Switch
        label="WiFi"
        customCheckedColor="#14B8A6"
        customUncheckedColor="#94A3B8"
        checkedIcon={<Wifi size={16} strokeWidth={3} />}
        uncheckedIcon={<WifiOff size={16} strokeWidth={3} />}
      />
      <Switch
        label="Sound"
        customCheckedColor="#8B5CF6"
        customUncheckedColor="#EF4444"
        checkedIcon={<Volume2 size={16} strokeWidth={3} />}
        uncheckedIcon={<VolumeX size={16} strokeWidth={3} />}
        defaultChecked
      />
    </div>
  ),
};
