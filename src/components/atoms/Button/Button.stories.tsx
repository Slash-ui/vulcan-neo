import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Surface } from '../../foundation/Surface';
import {
  iconMapLg,
  createIconArgType,
  Plus,
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  Download,
  Upload,
  Save,
  Send,
  Edit,
  Trash,
  Copy,
  Share,
  LogIn,
  LogOut,
  UserPlus,
  Settings,
} from '../../../../.storybook/icons';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['convex', 'flat', 'fab'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    elevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
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
      description: 'Custom background color (hex)',
    },
    shadowColor: {
      control: 'select',
      options: [
        undefined,
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
      description: 'Shadow color theme for neomorphic effect',
    },
    customShadowColor: {
      control: 'color',
      description: 'Custom shadow color (hex)',
    },
    fullWidth: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    leftIcon: createIconArgType(iconMapLg, 'Icon to display before the label'),
    rightIcon: createIconArgType(iconMapLg, 'Icon to display after the label'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Button',
    variant: 'convex',
    size: 'md',
    elevation: 'mid',
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <Button size="sm" label="Small" />
      <Button size="md" label="Medium" />
      <Button size="lg" label="Large" />
    </>
  ),
};

export const Elevations: Story = {
  render: () => (
    <>
      <Button elevation="low" label="Low" />
      <Button elevation="mid" label="Medium" />
      <Button elevation="high" label="High" />
    </>
  ),
};

export const Flat: Story = {
  args: {
    label: 'Flat Button',
    variant: 'flat',
  },
};

export const FAB: Story = {
  render: () => (
    <>
      <Button variant="fab" size="sm" leftIcon={<Plus size={16} />} />
      <Button variant="fab" leftIcon={<Plus size={20} />} />
      <Button variant="fab" size="lg" leftIcon={<Plus size={24} />} />
    </>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <>
      <Button leftIcon={<ArrowLeft size={20} />} label="Back" />
      <Button rightIcon={<ArrowRight size={20} />} label="Next" />
      <Button leftIcon={<ShoppingCart size={20} />} rightIcon={<ArrowRight size={20} />} label="Add to Cart" />
    </>
  ),
};

export const IconVariety: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button leftIcon={<Download size={20} />} label="Download" />
        <Button leftIcon={<Upload size={20} />} label="Upload" />
        <Button leftIcon={<Save size={20} />} label="Save" />
        <Button leftIcon={<Send size={20} />} label="Send" />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button leftIcon={<Edit size={20} />} label="Edit" />
        <Button leftIcon={<Trash size={20} />} label="Delete" />
        <Button leftIcon={<Copy size={20} />} label="Copy" />
        <Button leftIcon={<Share size={20} />} label="Share" />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button leftIcon={<LogIn size={20} />} label="Sign In" />
        <Button leftIcon={<LogOut size={20} />} label="Sign Out" />
        <Button leftIcon={<UserPlus size={20} />} label="Sign Up" />
        <Button leftIcon={<Settings size={20} />} label="Settings" />
      </div>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    label: 'Loading...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Button',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', width: '300px' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const DarkTheme: Story = {
  args: {
    label: 'Dark Theme',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button color="primary" label="Primary" />
        <Button color="primary-light" label="Primary Light" />
        <Button color="primary-dark" label="Primary Dark" />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button color="secondary" label="Secondary" />
        <Button color="secondary-light" label="Secondary Light" />
        <Button color="secondary-dark" label="Secondary Dark" />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button color="tertiary" label="Tertiary" />
        <Button color="tertiary-light" label="Tertiary Light" />
        <Button color="tertiary-dark" label="Tertiary Dark" />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button color="success" label="Success" />
        <Button color="warning" label="Warning" />
        <Button color="error" label="Error" />
        <Button color="info" label="Info" />
      </div>
    </div>
  ),
};

export const ColoredWithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button color="primary" leftIcon={<Save size={20} />} label="Save" />
      <Button color="success" leftIcon={<Download size={20} />} label="Download" />
      <Button color="error" leftIcon={<Trash size={20} />} label="Delete" />
      <Button color="info" leftIcon={<Send size={20} />} label="Send" />
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button customColor="#8B5CF6" label="Purple" />
      <Button customColor="#EC4899" label="Pink" />
      <Button customColor="#14B8A6" label="Teal" />
      <Button customColor="#F97316" label="Orange" />
    </div>
  ),
};

export const ColoredElevations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button color="primary" elevation="low" label="Low" />
        <Button color="primary" elevation="mid" label="Medium" />
        <Button color="primary" elevation="high" label="High" />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button color="success" elevation="low" label="Low" />
        <Button color="success" elevation="mid" label="Medium" />
        <Button color="success" elevation="high" label="High" />
      </div>
    </div>
  ),
};

export const ColoredFAB: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="fab" color="primary" leftIcon={<Plus size={20} />} />
      <Button variant="fab" color="secondary" leftIcon={<Edit size={20} />} />
      <Button variant="fab" color="success" leftIcon={<Save size={20} />} />
      <Button variant="fab" color="error" leftIcon={<Trash size={20} />} />
      <Button variant="fab" customColor="#8B5CF6" leftIcon={<Share size={20} />} />
    </div>
  ),
};

export const ColoredFlat: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button variant="flat" color="primary" label="Primary" />
      <Button variant="flat" color="success" label="Success" />
      <Button variant="flat" color="error" label="Error" />
      <Button variant="flat" customColor="#8B5CF6" label="Custom" />
    </div>
  ),
};

export const ShadowColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button shadowColor="primary" label="Primary Shadow" />
        <Button shadowColor="secondary" label="Secondary Shadow" />
        <Button shadowColor="tertiary" label="Tertiary Shadow" />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button shadowColor="success" label="Success Shadow" />
        <Button shadowColor="warning" label="Warning Shadow" />
        <Button shadowColor="error" label="Error Shadow" />
        <Button shadowColor="info" label="Info Shadow" />
      </div>
    </div>
  ),
};

export const ShadowColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button shadowColor="primary-light" label="Primary Light" />
        <Button shadowColor="primary" label="Primary" />
        <Button shadowColor="primary-dark" label="Primary Dark" />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button shadowColor="secondary-light" label="Secondary Light" />
        <Button shadowColor="secondary" label="Secondary" />
        <Button shadowColor="secondary-dark" label="Secondary Dark" />
      </div>
    </div>
  ),
};

export const CustomShadowColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button customShadowColor="#8B5CF6" label="Purple Shadow" />
      <Button customShadowColor="#EC4899" label="Pink Shadow" />
      <Button customShadowColor="#14B8A6" label="Teal Shadow" />
      <Button customShadowColor="#F97316" label="Orange Shadow" />
    </div>
  ),
};

export const ColorWithMatchingShadow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button color="primary" shadowColor="primary" label="Primary" />
      <Button color="success" shadowColor="success" label="Success" />
      <Button color="error" shadowColor="error" label="Error" />
      <Button customColor="#8B5CF6" customShadowColor="#8B5CF6" label="Custom" />
    </div>
  ),
};

export const ShadowColorElevations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button shadowColor="primary" elevation="low" label="Low" />
        <Button shadowColor="primary" elevation="mid" label="Medium" />
        <Button shadowColor="primary" elevation="high" label="High" />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button shadowColor="error" elevation="low" label="Low" />
        <Button shadowColor="error" elevation="mid" label="Medium" />
        <Button shadowColor="error" elevation="high" label="High" />
      </div>
    </div>
  ),
};

export const ShadowColorFAB: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="fab" shadowColor="primary" leftIcon={<Plus size={20} />} />
      <Button variant="fab" shadowColor="success" leftIcon={<Save size={20} />} />
      <Button variant="fab" shadowColor="error" leftIcon={<Trash size={20} />} />
      <Button variant="fab" customShadowColor="#8B5CF6" leftIcon={<Share size={20} />} />
    </div>
  ),
};
