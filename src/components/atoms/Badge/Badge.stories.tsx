import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Surface } from '../../foundation/Surface';
import {
  Check,
  Star,
  Heart,
  Bell,
  Mail,
  User,
  Settings,
  Home,
  Search,
  Plus,
  Minus,
  X,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Download,
  Upload,
  Edit,
  Trash,
  Copy,
  Share,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Zap,
  Award,
  Gift,
  Bookmark,
  Flag,
  Tag,
} from 'lucide-react';

// Map of icon names to components
const iconMap = {
  none: null,
  Check: <Check size={12} />,
  Star: <Star size={12} />,
  Heart: <Heart size={12} />,
  Bell: <Bell size={12} />,
  Mail: <Mail size={12} />,
  User: <User size={12} />,
  Settings: <Settings size={12} />,
  Home: <Home size={12} />,
  Search: <Search size={12} />,
  Plus: <Plus size={12} />,
  Minus: <Minus size={12} />,
  X: <X size={12} />,
  AlertCircle: <AlertCircle size={12} />,
  Info: <Info size={12} />,
  CheckCircle: <CheckCircle size={12} />,
  XCircle: <XCircle size={12} />,
  ArrowRight: <ArrowRight size={12} />,
  ArrowLeft: <ArrowLeft size={12} />,
  ChevronRight: <ChevronRight size={12} />,
  ChevronLeft: <ChevronLeft size={12} />,
  ExternalLink: <ExternalLink size={12} />,
  Download: <Download size={12} />,
  Upload: <Upload size={12} />,
  Edit: <Edit size={12} />,
  Trash: <Trash size={12} />,
  Copy: <Copy size={12} />,
  Share: <Share size={12} />,
  Lock: <Lock size={12} />,
  Unlock: <Unlock size={12} />,
  Eye: <Eye size={12} />,
  EyeOff: <EyeOff size={12} />,
  Calendar: <Calendar size={12} />,
  Clock: <Clock size={12} />,
  MapPin: <MapPin size={12} />,
  Phone: <Phone size={12} />,
  Zap: <Zap size={12} />,
  Award: <Award size={12} />,
  Gift: <Gift size={12} />,
  Bookmark: <Bookmark size={12} />,
  Flag: <Flag size={12} />,
  Tag: <Tag size={12} />,
};

type IconName = keyof typeof iconMap;

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
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
      options: ['convex', 'concave', 'flat'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
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
    },
    filled: {
      control: 'boolean',
    },
    dot: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
    leftIcon: {
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
      description: 'Icon to display before the content (select from Lucide icons)',
    },
    rightIcon: {
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
      description: 'Icon to display after the content (select from Lucide icons)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'convex',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <>
      <Badge variant="convex">Convex</Badge>
      <Badge variant="concave">Concave</Badge>
      <Badge variant="flat">Flat</Badge>
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge color="default">Default</Badge>
        <Badge color="primary">Primary</Badge>
        <Badge color="primary-light">Primary Light</Badge>
        <Badge color="primary-dark">Primary Dark</Badge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge color="secondary">Secondary</Badge>
        <Badge color="secondary-light">Secondary Light</Badge>
        <Badge color="secondary-dark">Secondary Dark</Badge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge color="tertiary">Tertiary</Badge>
        <Badge color="tertiary-light">Tertiary Light</Badge>
        <Badge color="tertiary-dark">Tertiary Dark</Badge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge color="success">Success</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="error">Error</Badge>
        <Badge color="info">Info</Badge>
      </div>
    </div>
  ),
};

export const Filled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge filled color="default">Default</Badge>
        <Badge filled color="primary">Primary</Badge>
        <Badge filled color="primary-light">Primary Light</Badge>
        <Badge filled color="primary-dark">Primary Dark</Badge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge filled color="secondary">Secondary</Badge>
        <Badge filled color="secondary-light">Secondary Light</Badge>
        <Badge filled color="secondary-dark">Secondary Dark</Badge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge filled color="tertiary">Tertiary</Badge>
        <Badge filled color="tertiary-light">Tertiary Light</Badge>
        <Badge filled color="tertiary-dark">Tertiary Dark</Badge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge filled color="success">Success</Badge>
        <Badge filled color="warning">Warning</Badge>
        <Badge filled color="error">Error</Badge>
        <Badge filled color="info">Info</Badge>
      </div>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <>
      <Badge filled customColor="#FF6B6B">Coral</Badge>
      <Badge filled customColor="#4ECDC4">Teal</Badge>
      <Badge filled customColor="#45B7D1">Sky Blue</Badge>
      <Badge filled customColor="#96CEB4">Sage</Badge>
      <Badge filled customColor="#FFEAA7">Cream</Badge>
      <Badge filled customColor="#DDA0DD">Plum</Badge>
      <Badge filled customColor="#2C3E50">Dark Slate</Badge>
    </>
  ),
};

export const FilledWithIcons: Story = {
  render: () => (
    <>
      <Badge filled color="success" leftIcon={<Check size={12} />}>Verified</Badge>
      <Badge filled color="warning" rightIcon={<Star size={12} />}>Featured</Badge>
      <Badge filled color="error">Critical</Badge>
      <Badge filled color="primary" leftIcon={<Star size={12} />}>New</Badge>
      <Badge filled color="info" leftIcon={<Check size={12} />}>Updated</Badge>
      <Badge filled customColor="#9B59B6" leftIcon={<Award size={12} />}>Premium</Badge>
    </>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <>
      <Badge leftIcon={<Check size={12} />} color="success">Verified</Badge>
      <Badge rightIcon={<Star size={12} />} color="warning">Featured</Badge>
      <Badge leftIcon={<Check size={12} />} rightIcon={<ArrowRight size={12} />}>Both</Badge>
    </>
  ),
};

export const IconVariety: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge filled color="primary" leftIcon={<Bell size={12} />}>Notifications</Badge>
        <Badge filled color="success" leftIcon={<CheckCircle size={12} />}>Approved</Badge>
        <Badge filled color="error" leftIcon={<XCircle size={12} />}>Rejected</Badge>
        <Badge filled color="warning" leftIcon={<AlertCircle size={12} />}>Warning</Badge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge filled color="info" leftIcon={<Info size={12} />}>Info</Badge>
        <Badge filled color="secondary" leftIcon={<Lock size={12} />}>Secure</Badge>
        <Badge filled color="tertiary" leftIcon={<Zap size={12} />}>Fast</Badge>
        <Badge filled customColor="#E91E63" leftIcon={<Heart size={12} />}>Loved</Badge>
      </div>
    </div>
  ),
};

export const Dots: Story = {
  render: () => (
    <>
      <Badge dot color="default" />
      <Badge dot color="primary" />
      <Badge dot color="success" />
      <Badge dot color="warning" />
      <Badge dot color="error" />
    </>
  ),
};

export const DotSizes: Story = {
  render: () => (
    <>
      <Badge dot size="sm" color="primary" />
      <Badge dot size="md" color="primary" />
      <Badge dot size="lg" color="primary" />
    </>
  ),
};

export const DarkTheme: Story = {
  args: {
    children: 'Badge',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
