import type { Meta, StoryObj } from '@storybook/react-vite';
import { InsetField } from './InsetField';
import { Surface } from '../../foundation/Surface';
import {
  iconMapMd,
  createIconArgType,
  Search,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Globe,
  DollarSign,
  Eye,
  ArrowRight,
} from '../../../../.storybook/icons';

/**
 * A text input field with a concave (inset) neomorphic appearance.
 * The pressed-in look creates visual contrast with raised buttons.
 *
 * ## When to Use
 *
 * - **Forms**: User input for login, registration, and data entry
 * - **Search**: Search bars and filter inputs
 * - **Settings**: Configuration fields and preferences
 * - **Inline editing**: Edit values directly in context
 *
 * ## Key Features
 *
 * - **Neomorphic design**: Concave (pressed) appearance
 * - **Labels and helpers**: Built-in label and helper text support
 * - **Error states**: Visual error indication with message
 * - **Icons**: Left and right icon slots for context
 *
 * ## Best Practices
 *
 * - Always provide a label for accessibility (visible or `aria-label`)
 * - Use helper text for format hints or requirements
 * - Use left icons for input type indicators (email, phone)
 * - Use right icons for actions (show password, clear)
 */
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
    // Content
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when empty',
      table: { category: 'Content' },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
      table: { category: 'Content' },
    },
    leftIcon: {
      ...createIconArgType(iconMapMd, 'Icon at the start of the input'),
      table: { category: 'Content' },
    },
    rightIcon: {
      ...createIconArgType(iconMapMd, 'Icon at the end of the input'),
      table: { category: 'Content' },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expand to fill container width',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    error: {
      control: 'text',
      description: 'Error message (also sets error styling)',
      table: { category: 'State' },
    },

    // HTML Input
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'HTML input type',
      table: { category: 'HTML Input', defaultValue: { summary: 'text' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default input field. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    fullWidth: true,
  },
};

// =============================================================================
// WITH LABEL & HELPER
// =============================================================================

/**
 * Input with a visible label above the field.
 */
export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'name@example.com',
    type: 'email',
    fullWidth: true,
  },
};

/**
 * Helper text provides additional context or format hints.
 */
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
    fullWidth: true,
  },
};

/**
 * Error state with validation message.
 */
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

// =============================================================================
// SIZES
// =============================================================================

/**
 * Three sizes for different contexts and densities.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InsetField size="sm" placeholder="Small" fullWidth />
      <InsetField size="md" placeholder="Medium" fullWidth />
      <InsetField size="lg" placeholder="Large" fullWidth />
    </div>
  ),
};

/**
 * Small input for compact layouts.
 */
export const SizeSmall: Story = {
  tags: ['!dev'],
  args: {
    size: 'sm',
    placeholder: 'Small input',
    fullWidth: true,
  },
};

/**
 * Medium input (default size).
 */
export const SizeMedium: Story = {
  tags: ['!dev'],
  args: {
    size: 'md',
    placeholder: 'Medium input',
    fullWidth: true,
  },
};

/**
 * Large input for emphasis.
 */
export const SizeLarge: Story = {
  tags: ['!dev'],
  args: {
    size: 'lg',
    placeholder: 'Large input',
    fullWidth: true,
  },
};

// =============================================================================
// WITH ICONS
// =============================================================================

/**
 * Icons can be placed on the left, right, or both sides.
 */
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

/**
 * Input with left icon.
 */
export const WithLeftIcon: Story = {
  tags: ['!dev'],
  args: {
    placeholder: 'Search...',
    leftIcon: <Search size={18} />,
    fullWidth: true,
  },
};

/**
 * Input with both left and right icons.
 */
export const WithBothIcons: Story = {
  tags: ['!dev'],
  args: {
    placeholder: 'Password',
    type: 'password',
    leftIcon: <Lock size={18} />,
    rightIcon: <Eye size={18} />,
    fullWidth: true,
  },
};

/**
 * Common input patterns with icons for different data types.
 */
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

// =============================================================================
// STATES
// =============================================================================

/**
 * Disabled state prevents interaction.
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit',
    disabled: true,
    fullWidth: true,
  },
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Input fields adapt to dark theme automatically.
 */
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
