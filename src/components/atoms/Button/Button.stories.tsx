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
