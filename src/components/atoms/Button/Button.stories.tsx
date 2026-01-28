import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Surface } from '../../foundation/Surface';
import {
  Plus,
  Minus,
  Check,
  X,
  Star,
  Heart,
  Bell,
  Mail,
  User,
  Settings,
  Home,
  Search,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
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
  Save,
  Send,
  RefreshCw,
  ExternalLink,
  Link,
  Bookmark,
  Flag,
  Tag,
  ShoppingCart,
  CreditCard,
  LogIn,
  LogOut,
  UserPlus,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  MoreHorizontal,
  MoreVertical,
  Filter,
  SlidersHorizontal,
  Zap,
  Award,
  Gift,
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Info,
  HelpCircle,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react';

// Map of icon names to components (20px for Button icons)
const iconMap = {
  none: null,
  Plus: <Plus size={20} />,
  Minus: <Minus size={20} />,
  Check: <Check size={20} />,
  X: <X size={20} />,
  Star: <Star size={20} />,
  Heart: <Heart size={20} />,
  Bell: <Bell size={20} />,
  Mail: <Mail size={20} />,
  User: <User size={20} />,
  Settings: <Settings size={20} />,
  Home: <Home size={20} />,
  Search: <Search size={20} />,
  ArrowRight: <ArrowRight size={20} />,
  ArrowLeft: <ArrowLeft size={20} />,
  ChevronRight: <ChevronRight size={20} />,
  ChevronLeft: <ChevronLeft size={20} />,
  Download: <Download size={20} />,
  Upload: <Upload size={20} />,
  Edit: <Edit size={20} />,
  Trash: <Trash size={20} />,
  Copy: <Copy size={20} />,
  Share: <Share size={20} />,
  Lock: <Lock size={20} />,
  Unlock: <Unlock size={20} />,
  Eye: <Eye size={20} />,
  EyeOff: <EyeOff size={20} />,
  Save: <Save size={20} />,
  Send: <Send size={20} />,
  RefreshCw: <RefreshCw size={20} />,
  ExternalLink: <ExternalLink size={20} />,
  Link: <Link size={20} />,
  Bookmark: <Bookmark size={20} />,
  Flag: <Flag size={20} />,
  Tag: <Tag size={20} />,
  ShoppingCart: <ShoppingCart size={20} />,
  CreditCard: <CreditCard size={20} />,
  LogIn: <LogIn size={20} />,
  LogOut: <LogOut size={20} />,
  UserPlus: <UserPlus size={20} />,
  Play: <Play size={20} />,
  Pause: <Pause size={20} />,
  SkipForward: <SkipForward size={20} />,
  SkipBack: <SkipBack size={20} />,
  Volume2: <Volume2 size={20} />,
  VolumeX: <VolumeX size={20} />,
  Maximize: <Maximize size={20} />,
  Minimize: <Minimize size={20} />,
  MoreHorizontal: <MoreHorizontal size={20} />,
  MoreVertical: <MoreVertical size={20} />,
  Filter: <Filter size={20} />,
  SlidersHorizontal: <SlidersHorizontal size={20} />,
  Zap: <Zap size={20} />,
  Award: <Award size={20} />,
  Gift: <Gift size={20} />,
  Calendar: <Calendar size={20} />,
  Clock: <Clock size={20} />,
  MapPin: <MapPin size={20} />,
  Phone: <Phone size={20} />,
  MessageCircle: <MessageCircle size={20} />,
  ThumbsUp: <ThumbsUp size={20} />,
  ThumbsDown: <ThumbsDown size={20} />,
  AlertCircle: <AlertCircle size={20} />,
  Info: <Info size={20} />,
  HelpCircle: <HelpCircle size={20} />,
  CheckCircle: <CheckCircle size={20} />,
  XCircle: <XCircle size={20} />,
  Loader2: <Loader2 size={20} />,
};

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
    leftIcon: {
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
      description: 'Icon to display before the label (select from Lucide icons)',
    },
    rightIcon: {
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
      description: 'Icon to display after the label (select from Lucide icons)',
    },
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
