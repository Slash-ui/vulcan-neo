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
    children: createIconArgType(iconMapLg, 'Icon to display'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <X size={20} />,
    'aria-label': 'Close',
    variant: 'convex',
    size: 'md',
    elevation: 'mid',
  },
};

export const Variants: Story = {
  render: () => (
    <>
      <IconButton variant="convex" aria-label="Close"><X size={20} /></IconButton>
      <IconButton variant="flat" aria-label="Menu"><Menu size={20} /></IconButton>
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <IconButton size="sm" aria-label="Close"><X size={16} /></IconButton>
      <IconButton size="md" aria-label="Close"><X size={20} /></IconButton>
      <IconButton size="lg" aria-label="Close"><X size={24} /></IconButton>
    </>
  ),
};

export const Elevations: Story = {
  render: () => (
    <>
      <IconButton elevation="low" aria-label="Settings"><Settings size={20} /></IconButton>
      <IconButton elevation="mid" aria-label="Settings"><Settings size={20} /></IconButton>
      <IconButton elevation="high" aria-label="Settings"><Settings size={20} /></IconButton>
    </>
  ),
};

export const Shapes: Story = {
  render: () => (
    <>
      <IconButton shape="circle" aria-label="Add"><Plus size={20} /></IconButton>
      <IconButton shape="rounded" aria-label="Add"><Plus size={20} /></IconButton>
      <IconButton shape="square" aria-label="Add"><Plus size={20} /></IconButton>
    </>
  ),
};

export const IconShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <IconButton aria-label="Menu"><Menu size={20} /></IconButton>
        <IconButton aria-label="Search"><Search size={20} /></IconButton>
        <IconButton aria-label="Settings"><Settings size={20} /></IconButton>
        <IconButton aria-label="Bell"><Bell size={20} /></IconButton>
        <IconButton aria-label="User"><User size={20} /></IconButton>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <IconButton aria-label="Edit"><Edit size={20} /></IconButton>
        <IconButton aria-label="Trash"><Trash size={20} /></IconButton>
        <IconButton aria-label="Copy"><Copy size={20} /></IconButton>
        <IconButton aria-label="Share"><Share size={20} /></IconButton>
        <IconButton aria-label="Download"><Download size={20} /></IconButton>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <IconButton shape="rounded" aria-label="Play"><Play size={20} /></IconButton>
        <IconButton shape="rounded" aria-label="Pause"><Pause size={20} /></IconButton>
        <IconButton shape="rounded" aria-label="Skip Back"><SkipBack size={20} /></IconButton>
        <IconButton shape="rounded" aria-label="Skip Forward"><SkipForward size={20} /></IconButton>
        <IconButton shape="rounded" aria-label="Volume"><Volume2 size={20} /></IconButton>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <IconButton shape="square" aria-label="Grid"><Grid size={20} /></IconButton>
        <IconButton shape="square" aria-label="List"><List size={20} /></IconButton>
        <IconButton shape="square" aria-label="Columns"><Columns size={20} /></IconButton>
        <IconButton shape="square" aria-label="Rows"><Rows size={20} /></IconButton>
        <IconButton shape="square" aria-label="Filter"><Filter size={20} /></IconButton>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: <X size={20} />,
    'aria-label': 'Close',
    disabled: true,
  },
};

export const DarkTheme: Story = {
  args: {
    children: <X size={20} />,
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
