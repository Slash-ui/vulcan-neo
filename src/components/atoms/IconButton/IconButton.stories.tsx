import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';
import { Surface } from '../../foundation/Surface';
import {
  X,
  Menu,
  Settings,
  Plus,
  Minus,
  Check,
  Star,
  Heart,
  Bell,
  Mail,
  User,
  Home,
  Search,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
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
  RotateCcw,
  ExternalLink,
  Link,
  Bookmark,
  Flag,
  MoreHorizontal,
  MoreVertical,
  Filter,
  SlidersHorizontal,
  Zap,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Fullscreen,
  Sun,
  Moon,
  Grid,
  List,
  LayoutGrid,
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
  Printer,
  Camera,
  Image,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Wifi,
  WifiOff,
  Bluetooth,
  Battery,
  Power,
  LogIn,
  LogOut,
  UserPlus,
  Users,
  Folder,
  File,
  FileText,
  Clipboard,
  Archive,
  Inbox,
  PanelLeft,
  PanelRight,
  Sidebar,
  Columns,
  Rows,
} from 'lucide-react';

// Map of icon names to components (20px for IconButton)
const iconMap = {
  X: <X size={20} />,
  Menu: <Menu size={20} />,
  Settings: <Settings size={20} />,
  Plus: <Plus size={20} />,
  Minus: <Minus size={20} />,
  Check: <Check size={20} />,
  Star: <Star size={20} />,
  Heart: <Heart size={20} />,
  Bell: <Bell size={20} />,
  Mail: <Mail size={20} />,
  User: <User size={20} />,
  Home: <Home size={20} />,
  Search: <Search size={20} />,
  ArrowRight: <ArrowRight size={20} />,
  ArrowLeft: <ArrowLeft size={20} />,
  ArrowUp: <ArrowUp size={20} />,
  ArrowDown: <ArrowDown size={20} />,
  ChevronRight: <ChevronRight size={20} />,
  ChevronLeft: <ChevronLeft size={20} />,
  ChevronUp: <ChevronUp size={20} />,
  ChevronDown: <ChevronDown size={20} />,
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
  RotateCcw: <RotateCcw size={20} />,
  ExternalLink: <ExternalLink size={20} />,
  Link: <Link size={20} />,
  Bookmark: <Bookmark size={20} />,
  Flag: <Flag size={20} />,
  MoreHorizontal: <MoreHorizontal size={20} />,
  MoreVertical: <MoreVertical size={20} />,
  Filter: <Filter size={20} />,
  SlidersHorizontal: <SlidersHorizontal size={20} />,
  Zap: <Zap size={20} />,
  Play: <Play size={20} />,
  Pause: <Pause size={20} />,
  SkipForward: <SkipForward size={20} />,
  SkipBack: <SkipBack size={20} />,
  Volume2: <Volume2 size={20} />,
  VolumeX: <VolumeX size={20} />,
  Maximize: <Maximize size={20} />,
  Minimize: <Minimize size={20} />,
  Fullscreen: <Fullscreen size={20} />,
  Sun: <Sun size={20} />,
  Moon: <Moon size={20} />,
  Grid: <Grid size={20} />,
  List: <List size={20} />,
  LayoutGrid: <LayoutGrid size={20} />,
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
  Printer: <Printer size={20} />,
  Camera: <Camera size={20} />,
  Image: <Image size={20} />,
  Mic: <Mic size={20} />,
  MicOff: <MicOff size={20} />,
  Video: <Video size={20} />,
  VideoOff: <VideoOff size={20} />,
  Wifi: <Wifi size={20} />,
  WifiOff: <WifiOff size={20} />,
  Bluetooth: <Bluetooth size={20} />,
  Battery: <Battery size={20} />,
  Power: <Power size={20} />,
  LogIn: <LogIn size={20} />,
  LogOut: <LogOut size={20} />,
  UserPlus: <UserPlus size={20} />,
  Users: <Users size={20} />,
  Folder: <Folder size={20} />,
  File: <File size={20} />,
  FileText: <FileText size={20} />,
  Clipboard: <Clipboard size={20} />,
  Archive: <Archive size={20} />,
  Inbox: <Inbox size={20} />,
  PanelLeft: <PanelLeft size={20} />,
  PanelRight: <PanelRight size={20} />,
  Sidebar: <Sidebar size={20} />,
  Columns: <Columns size={20} />,
  Rows: <Rows size={20} />,
};

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
    children: {
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
      description: 'Icon to display (select from Lucide icons)',
    },
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
