import type { Meta, StoryObj } from '@storybook/react-vite';
import { InsetField } from './InsetField';
import { Surface } from '../../foundation/Surface';
import {
  Search,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  Percent,
  Hash,
  AtSign,
  Globe,
  Link,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Send,
  Edit,
  FileText,
  Folder,
  Image,
  Camera,
  Mic,
  Video,
  Music,
  Bookmark,
  Star,
  Heart,
  Tag,
  Filter,
  Settings,
  Sliders,
  Key,
  Shield,
  Fingerprint,
} from 'lucide-react';

// Map of icon names to components (18px for InsetField icons)
const iconMap = {
  none: null,
  Search: <Search size={18} />,
  Mail: <Mail size={18} />,
  Lock: <Lock size={18} />,
  User: <User size={18} />,
  Phone: <Phone size={18} />,
  MapPin: <MapPin size={18} />,
  Calendar: <Calendar size={18} />,
  Clock: <Clock size={18} />,
  CreditCard: <CreditCard size={18} />,
  DollarSign: <DollarSign size={18} />,
  Percent: <Percent size={18} />,
  Hash: <Hash size={18} />,
  AtSign: <AtSign size={18} />,
  Globe: <Globe size={18} />,
  Link: <Link size={18} />,
  Eye: <Eye size={18} />,
  EyeOff: <EyeOff size={18} />,
  Check: <Check size={18} />,
  X: <X size={18} />,
  AlertCircle: <AlertCircle size={18} />,
  Info: <Info size={18} />,
  HelpCircle: <HelpCircle size={18} />,
  ChevronDown: <ChevronDown size={18} />,
  ChevronRight: <ChevronRight size={18} />,
  ArrowRight: <ArrowRight size={18} />,
  Send: <Send size={18} />,
  Edit: <Edit size={18} />,
  FileText: <FileText size={18} />,
  Folder: <Folder size={18} />,
  Image: <Image size={18} />,
  Camera: <Camera size={18} />,
  Mic: <Mic size={18} />,
  Video: <Video size={18} />,
  Music: <Music size={18} />,
  Bookmark: <Bookmark size={18} />,
  Star: <Star size={18} />,
  Heart: <Heart size={18} />,
  Tag: <Tag size={18} />,
  Filter: <Filter size={18} />,
  Settings: <Settings size={18} />,
  Sliders: <Sliders size={18} />,
  Key: <Key size={18} />,
  Shield: <Shield size={18} />,
  Fingerprint: <Fingerprint size={18} />,
};

const meta: Meta<typeof InsetField> = {
  title: 'Atoms/InsetField',
  component: InsetField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', maxWidth: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    leftIcon: {
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
      description: 'Icon to display at the start of the input (select from Lucide icons)',
    },
    rightIcon: {
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
      description: 'Icon to display at the end of the input (select from Lucide icons)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    fullWidth: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'name@example.com',
    type: 'email',
    fullWidth: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
    fullWidth: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'name@example.com',
    defaultValue: 'invalid-email',
    error: 'Please enter a valid email address',
    fullWidth: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InsetField size="sm" placeholder="Small" fullWidth />
      <InsetField size="md" placeholder="Medium" fullWidth />
      <InsetField size="lg" placeholder="Large" fullWidth />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InsetField
        placeholder="Search..."
        leftIcon={<Search size={18} />}
        fullWidth
      />
      <InsetField
        placeholder="Email"
        type="email"
        leftIcon={<Mail size={18} />}
        fullWidth
      />
      <InsetField
        placeholder="Password"
        type="password"
        leftIcon={<Lock size={18} />}
        rightIcon={<Eye size={18} />}
        fullWidth
      />
    </div>
  ),
};

export const IconVariety: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InsetField
        label="Username"
        placeholder="Enter username"
        leftIcon={<User size={18} />}
        fullWidth
      />
      <InsetField
        label="Phone Number"
        placeholder="+1 (555) 000-0000"
        leftIcon={<Phone size={18} />}
        fullWidth
      />
      <InsetField
        label="Location"
        placeholder="City, Country"
        leftIcon={<MapPin size={18} />}
        fullWidth
      />
      <InsetField
        label="Website"
        placeholder="https://example.com"
        leftIcon={<Globe size={18} />}
        rightIcon={<ArrowRight size={18} />}
        fullWidth
      />
      <InsetField
        label="Amount"
        placeholder="0.00"
        leftIcon={<DollarSign size={18} />}
        fullWidth
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit',
    disabled: true,
    fullWidth: true,
  },
};

export const DarkTheme: Story = {
  args: {
    label: 'Dark Theme Input',
    placeholder: 'Enter text...',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', maxWidth: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};
