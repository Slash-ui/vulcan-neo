import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';
import { Surface } from '../../foundation/Surface';
import {
  iconMapLg,
  createIconArgType,
  X,
  Menu,
  Settings,
  Plus,
  Search,
  Bell,
  User,
  Edit,
  Trash,
  Copy,
  Share,
  Download,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Grid,
  List,
  Columns,
  Rows,
  Filter,
} from '../../../../.storybook/icons';

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['convex', 'flat'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    elevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
    },
    disabled: {
      control: 'boolean',
    },
    icon: createIconArgType(iconMapLg, 'Icon to display'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <X size={20} />,
    'aria-label': 'Close',
    variant: 'convex',
    size: 'md',
    elevation: 'mid',
  },
};

export const Variants: Story = {
  render: () => (
    <>
      <IconButton variant="convex" aria-label="Close" icon={<X size={20} />} />
      <IconButton variant="flat" aria-label="Menu" icon={<Menu size={20} />} />
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <IconButton size="sm" aria-label="Close" icon={<X size={16} />} />
      <IconButton size="md" aria-label="Close" icon={<X size={20} />} />
      <IconButton size="lg" aria-label="Close" icon={<X size={24} />} />
    </>
  ),
};

export const Elevations: Story = {
  render: () => (
    <>
      <IconButton elevation="low" aria-label="Settings" icon={<Settings size={20} />} />
      <IconButton elevation="mid" aria-label="Settings" icon={<Settings size={20} />} />
      <IconButton elevation="high" aria-label="Settings" icon={<Settings size={20} />} />
    </>
  ),
};

export const Shapes: Story = {
  render: () => (
    <>
      <IconButton shape="circle" aria-label="Add" icon={<Plus size={20} />} />
      <IconButton shape="rounded" aria-label="Add" icon={<Plus size={20} />} />
      <IconButton shape="square" aria-label="Add" icon={<Plus size={20} />} />
    </>
  ),
};

export const IconShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <IconButton aria-label="Menu" icon={<Menu size={20} />} />
        <IconButton aria-label="Search" icon={<Search size={20} />} />
        <IconButton aria-label="Settings" icon={<Settings size={20} />} />
        <IconButton aria-label="Bell" icon={<Bell size={20} />} />
        <IconButton aria-label="User" icon={<User size={20} />} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <IconButton aria-label="Edit" icon={<Edit size={20} />} />
        <IconButton aria-label="Trash" icon={<Trash size={20} />} />
        <IconButton aria-label="Copy" icon={<Copy size={20} />} />
        <IconButton aria-label="Share" icon={<Share size={20} />} />
        <IconButton aria-label="Download" icon={<Download size={20} />} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <IconButton shape="rounded" aria-label="Play" icon={<Play size={20} />} />
        <IconButton shape="rounded" aria-label="Pause" icon={<Pause size={20} />} />
        <IconButton shape="rounded" aria-label="Skip Back" icon={<SkipBack size={20} />} />
        <IconButton shape="rounded" aria-label="Skip Forward" icon={<SkipForward size={20} />} />
        <IconButton shape="rounded" aria-label="Volume" icon={<Volume2 size={20} />} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <IconButton shape="square" aria-label="Grid" icon={<Grid size={20} />} />
        <IconButton shape="square" aria-label="List" icon={<List size={20} />} />
        <IconButton shape="square" aria-label="Columns" icon={<Columns size={20} />} />
        <IconButton shape="square" aria-label="Rows" icon={<Rows size={20} />} />
        <IconButton shape="square" aria-label="Filter" icon={<Filter size={20} />} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    icon: <X size={20} />,
    'aria-label': 'Close',
    disabled: true,
  },
};

export const DarkTheme: Story = {
  args: {
    icon: <X size={20} />,
    'aria-label': 'Close',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1.5rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
