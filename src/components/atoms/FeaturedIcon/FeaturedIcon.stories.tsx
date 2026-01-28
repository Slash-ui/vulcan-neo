import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeaturedIcon } from './FeaturedIcon';
import { Surface } from '../../foundation/Surface';
import {
  iconMapXl,
  createIconArgType,
  Star,
  Bell,
  Zap,
  CheckCircle,
  AlertCircle,
  XCircle,
  Globe,
  Cloud,
  Shield,
  Target,
  Code,
  Terminal,
  Database,
  Cpu,
} from '../../../../.storybook/icons';

const meta: Meta<typeof FeaturedIcon> = {
  title: 'Atoms/FeaturedIcon',
  component: FeaturedIcon,
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
      options: ['convex', 'concave', 'flat'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    elevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
    },
    children: createIconArgType(iconMapXl, 'Icon to display'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Star size={24} />,
    variant: 'convex',
    size: 'md',
    elevation: 'mid',
  },
};

export const Variants: Story = {
  render: () => (
    <>
      <FeaturedIcon variant="convex"><Star size={24} /></FeaturedIcon>
      <FeaturedIcon variant="concave"><Star size={24} /></FeaturedIcon>
      <FeaturedIcon variant="flat"><Star size={24} /></FeaturedIcon>
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <FeaturedIcon size="sm"><Star size={16} /></FeaturedIcon>
      <FeaturedIcon size="md"><Star size={24} /></FeaturedIcon>
      <FeaturedIcon size="lg"><Star size={32} /></FeaturedIcon>
      <FeaturedIcon size="xl"><Star size={40} /></FeaturedIcon>
    </>
  ),
};

export const Elevations: Story = {
  render: () => (
    <>
      <FeaturedIcon elevation="low"><Star size={24} /></FeaturedIcon>
      <FeaturedIcon elevation="mid"><Star size={24} /></FeaturedIcon>
      <FeaturedIcon elevation="high"><Star size={24} /></FeaturedIcon>
    </>
  ),
};

export const Colors: Story = {
  render: () => (
    <>
      <FeaturedIcon color="default"><Bell size={24} /></FeaturedIcon>
      <FeaturedIcon color="primary"><Bell size={24} /></FeaturedIcon>
      <FeaturedIcon color="success"><Bell size={24} /></FeaturedIcon>
      <FeaturedIcon color="warning"><Bell size={24} /></FeaturedIcon>
      <FeaturedIcon color="error"><Bell size={24} /></FeaturedIcon>
    </>
  ),
};

export const Shapes: Story = {
  render: () => (
    <>
      <FeaturedIcon shape="circle"><Star size={24} /></FeaturedIcon>
      <FeaturedIcon shape="rounded"><Star size={24} /></FeaturedIcon>
      <FeaturedIcon shape="square"><Star size={24} /></FeaturedIcon>
    </>
  ),
};

export const IconShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <FeaturedIcon color="primary"><Zap size={24} /></FeaturedIcon>
        <FeaturedIcon color="success"><CheckCircle size={24} /></FeaturedIcon>
        <FeaturedIcon color="warning"><AlertCircle size={24} /></FeaturedIcon>
        <FeaturedIcon color="error"><XCircle size={24} /></FeaturedIcon>
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <FeaturedIcon><Globe size={24} /></FeaturedIcon>
        <FeaturedIcon><Cloud size={24} /></FeaturedIcon>
        <FeaturedIcon><Shield size={24} /></FeaturedIcon>
        <FeaturedIcon><Target size={24} /></FeaturedIcon>
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <FeaturedIcon shape="square"><Code size={24} /></FeaturedIcon>
        <FeaturedIcon shape="square"><Terminal size={24} /></FeaturedIcon>
        <FeaturedIcon shape="square"><Database size={24} /></FeaturedIcon>
        <FeaturedIcon shape="square"><Cpu size={24} /></FeaturedIcon>
      </div>
    </div>
  ),
};

export const DarkTheme: Story = {
  args: {
    children: <Star size={24} />,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1.5rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
