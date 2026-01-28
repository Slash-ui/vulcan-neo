import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeaturedIcon } from './FeaturedIcon';
import { Surface } from '../../foundation/Surface';
import {
  Star,
  Bell,
  Heart,
  Mail,
  User,
  Settings,
  Home,
  Search,
  Plus,
  Check,
  X,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  ArrowRight,
  Download,
  Upload,
  Edit,
  Trash,
  Copy,
  Share,
  Lock,
  Eye,
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
  ShoppingCart,
  CreditCard,
  Truck,
  Package,
  Globe,
  Cloud,
  Database,
  Server,
  Wifi,
  Bluetooth,
  Battery,
  Camera,
  Image,
  Video,
  Music,
  Headphones,
  Mic,
  Volume2,
  Sun,
  Moon,
  Thermometer,
  Umbrella,
  Wind,
  Droplet,
  Flame,
  Leaf,
  Mountain,
  Compass,
  Map,
  Navigation,
  Target,
  Crosshair,
  Shield,
  Key,
  Fingerprint,
  Users,
  UserPlus,
  MessageCircle,
  Send,
  Inbox,
  Archive,
  Folder,
  File,
  FileText,
  Clipboard,
  PenTool,
  Brush,
  Palette,
  Layout,
  Grid,
  Layers,
  Box,
  Cpu,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Tv,
  Speaker,
  Printer,
  HardDrive,
  Code,
  Terminal,
  GitBranch,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Twitch,
  Slack,
  Chrome,
  Figma,
} from 'lucide-react';

// Map of icon names to components (24px for FeaturedIcon)
const iconMap = {
  Star: <Star size={24} />,
  Bell: <Bell size={24} />,
  Heart: <Heart size={24} />,
  Mail: <Mail size={24} />,
  User: <User size={24} />,
  Settings: <Settings size={24} />,
  Home: <Home size={24} />,
  Search: <Search size={24} />,
  Plus: <Plus size={24} />,
  Check: <Check size={24} />,
  X: <X size={24} />,
  AlertCircle: <AlertCircle size={24} />,
  Info: <Info size={24} />,
  CheckCircle: <CheckCircle size={24} />,
  XCircle: <XCircle size={24} />,
  ArrowRight: <ArrowRight size={24} />,
  Download: <Download size={24} />,
  Upload: <Upload size={24} />,
  Edit: <Edit size={24} />,
  Trash: <Trash size={24} />,
  Copy: <Copy size={24} />,
  Share: <Share size={24} />,
  Lock: <Lock size={24} />,
  Eye: <Eye size={24} />,
  Calendar: <Calendar size={24} />,
  Clock: <Clock size={24} />,
  MapPin: <MapPin size={24} />,
  Phone: <Phone size={24} />,
  Zap: <Zap size={24} />,
  Award: <Award size={24} />,
  Gift: <Gift size={24} />,
  Bookmark: <Bookmark size={24} />,
  Flag: <Flag size={24} />,
  Tag: <Tag size={24} />,
  ShoppingCart: <ShoppingCart size={24} />,
  CreditCard: <CreditCard size={24} />,
  Truck: <Truck size={24} />,
  Package: <Package size={24} />,
  Globe: <Globe size={24} />,
  Cloud: <Cloud size={24} />,
  Database: <Database size={24} />,
  Server: <Server size={24} />,
  Wifi: <Wifi size={24} />,
  Bluetooth: <Bluetooth size={24} />,
  Battery: <Battery size={24} />,
  Camera: <Camera size={24} />,
  Image: <Image size={24} />,
  Video: <Video size={24} />,
  Music: <Music size={24} />,
  Headphones: <Headphones size={24} />,
  Mic: <Mic size={24} />,
  Volume2: <Volume2 size={24} />,
  Sun: <Sun size={24} />,
  Moon: <Moon size={24} />,
  Thermometer: <Thermometer size={24} />,
  Umbrella: <Umbrella size={24} />,
  Wind: <Wind size={24} />,
  Droplet: <Droplet size={24} />,
  Flame: <Flame size={24} />,
  Leaf: <Leaf size={24} />,
  Mountain: <Mountain size={24} />,
  Compass: <Compass size={24} />,
  Map: <Map size={24} />,
  Navigation: <Navigation size={24} />,
  Target: <Target size={24} />,
  Crosshair: <Crosshair size={24} />,
  Shield: <Shield size={24} />,
  Key: <Key size={24} />,
  Fingerprint: <Fingerprint size={24} />,
  Users: <Users size={24} />,
  UserPlus: <UserPlus size={24} />,
  MessageCircle: <MessageCircle size={24} />,
  Send: <Send size={24} />,
  Inbox: <Inbox size={24} />,
  Archive: <Archive size={24} />,
  Folder: <Folder size={24} />,
  File: <File size={24} />,
  FileText: <FileText size={24} />,
  Clipboard: <Clipboard size={24} />,
  PenTool: <PenTool size={24} />,
  Brush: <Brush size={24} />,
  Palette: <Palette size={24} />,
  Layout: <Layout size={24} />,
  Grid: <Grid size={24} />,
  Layers: <Layers size={24} />,
  Box: <Box size={24} />,
  Cpu: <Cpu size={24} />,
  Monitor: <Monitor size={24} />,
  Smartphone: <Smartphone size={24} />,
  Tablet: <Tablet size={24} />,
  Watch: <Watch size={24} />,
  Tv: <Tv size={24} />,
  Speaker: <Speaker size={24} />,
  Printer: <Printer size={24} />,
  HardDrive: <HardDrive size={24} />,
  Code: <Code size={24} />,
  Terminal: <Terminal size={24} />,
  GitBranch: <GitBranch size={24} />,
  Github: <Github size={24} />,
  Linkedin: <Linkedin size={24} />,
  Twitter: <Twitter size={24} />,
  Facebook: <Facebook size={24} />,
  Instagram: <Instagram size={24} />,
  Youtube: <Youtube size={24} />,
  Twitch: <Twitch size={24} />,
  Slack: <Slack size={24} />,
  Chrome: <Chrome size={24} />,
  Figma: <Figma size={24} />,
};

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
