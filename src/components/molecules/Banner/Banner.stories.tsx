import type { Meta, StoryObj } from '@storybook/react-vite';
import { iconMapXl, createIconArgType } from '../../../../.storybook/icons';
import { Banner } from './Banner';
import { Button } from '../../atoms/Button';
import { InsetField } from '../../atoms/InsetField';
import { Surface } from '../../foundation/Surface';

/**
 * Banners display important messages that require user attention. Use them for
 * announcements, promotions, alerts, or system-wide notifications.
 *
 * ## When to Use
 *
 * - **Announcements**: New features, updates, or important news
 * - **Promotions**: Sales, offers, or marketing messages
 * - **Alerts**: Warnings, errors, or status updates
 * - **System messages**: Maintenance notices, cookie consent, etc.
 *
 * ## Key Features
 *
 * - **Neomorphic design**: Supports `convex`, `flat`, and `concave` variants
 * - **Color-matched shadows**: Shadows automatically match the banner's color theme
 * - **Auto-styled buttons**: Action buttons inherit the banner's color and shadow
 * - **Flexible layout**: Icon | Content | Actions (all optional)
 * - **Sticky positioning**: Can be fixed to top or bottom of viewport
 * - **Dismissible**: Optional close button with callback
 *
 * ## Anatomy
 *
 * ![Banner Anatomy](/docs/images/banner-anatomy.png)
 *
 * ## Related Components
 *
 * - **FeaturedIcon**: Used internally for the icon container
 * - **Button**: Recommended for action buttons
 * - **IconButton**: Used for the dismiss button
 * - **InsetField**: Can be used in `beforeActions` for inline inputs
 */
const meta: Meta<typeof Banner> = {
  title: 'Molecules/Banner',
  component: Banner,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '120px', padding: '1.5rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Content
    title: {
      control: 'text',
      description: 'Main heading text',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Supporting text below the title',
      table: { category: 'Content' },
    },
    children: {
      control: 'text',
      description: 'Custom content (alternative to title/description)',
      table: { category: 'Content' },
    },

    // Appearance
    variant: {
      control: 'select',
      options: ['convex', 'flat', 'concave'],
      description: 'Visual style: **convex** (raised), **flat** (minimal), or **concave** (pressed)',
      table: { category: 'Appearance', defaultValue: { summary: 'convex' } },
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary', 'primary-light', 'primary-dark',
        'secondary', 'secondary-light', 'secondary-dark',
        'tertiary', 'tertiary-light', 'tertiary-dark',
        'success', 'warning', 'error', 'info',
      ],
      description: 'Color theme. Buttons and shadows auto-match when not `default`.',
      table: { category: 'Appearance', defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Affects padding, typography, and icon size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center'],
      description: 'Text alignment in the content section',
      table: { category: 'Appearance', defaultValue: { summary: 'center' } },
    },

    // Icon
    icon: {
      ...createIconArgType(iconMapXl, 'Icon element (any React node)'),
      table: { category: 'Icon' },
    },
    iconVariant: {
      control: 'select',
      options: ['convex', 'flat', 'concave'],
      description: 'Icon container style (independent from banner variant)',
      table: { category: 'Icon', defaultValue: { summary: 'flat' } },
    },
    iconShape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'Shape of the icon container',
      table: { category: 'Icon', defaultValue: { summary: 'rounded' } },
    },
    iconElevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
      description: 'Shadow intensity of the icon',
      table: { category: 'Icon', defaultValue: { summary: 'low' } },
    },
    iconSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Icon container size. Auto-derived from banner size if not set.',
      table: { category: 'Icon' },
    },

    // Actions
    primaryAction: {
      control: false,
      description: 'Primary action button (auto-inherits banner color)',
      table: { category: 'Actions' },
    },
    secondaryAction: {
      control: false,
      description: 'Secondary action button (auto-inherits banner color)',
      table: { category: 'Actions' },
    },
    beforeActions: {
      control: false,
      description: 'Content before buttons (e.g., input field)',
      table: { category: 'Actions' },
    },

    // Behavior
    dismissible: {
      control: 'boolean',
      description: 'Show close button',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Called when dismiss button is clicked',
      table: { category: 'Behavior' },
    },
    sticky: {
      control: 'boolean',
      description: 'Fix banner to viewport edge',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    position: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'Edge position when sticky',
      table: { category: 'Behavior', defaultValue: { summary: 'top' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * The default banner with an icon, title, description, and dismiss button.
 * Use the controls below to explore all available options.
 */
export const Default: Story = {
  args: {
    title: 'Welcome to our platform',
    description: 'Discover all the new features we have in store for you.',
    icon: iconMapXl.Info,
    dismissible: true,
  },
};

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * The banner supports three visual styles that follow neomorphic design principles:
 *
 * - **Convex** (default): Appears raised with outer shadows
 * - **Flat**: No shadows, minimal appearance
 * - **Concave**: Appears pressed with inner shadows
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Banner
        variant="convex"
        color="primary"
        title="Convex"
        description="Raised appearance with outer shadow"
        icon={iconMapXl.Info}
      />
      <Banner
        variant="flat"
        color="primary"
        title="Flat"
        description="No shadow, minimal style"
        icon={iconMapXl.Info}
      />
      <Banner
        variant="concave"
        color="primary"
        title="Concave"
        description="Pressed appearance with inner shadow"
        icon={iconMapXl.Info}
      />
    </div>
  ),
};

// =============================================================================
// COLORS
// =============================================================================

/**
 * Banners support multiple color themes. When a color is set:
 * - Shadows automatically match the color
 * - Action buttons inherit the color and shadow style
 *
 * Use semantic colors (`success`, `warning`, `error`, `info`) for status messages.
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Banner
        color="primary"
        title="Primary"
        description="Main brand color for important messages"
        icon={iconMapXl.Zap}
        dismissible
      />
      <Banner
        color="secondary"
        title="Secondary"
        description="Alternative brand color"
        icon={iconMapXl.Bell}
        dismissible
      />
      <Banner
        color="tertiary"
        title="Tertiary"
        description="Accent color for highlights"
        icon={iconMapXl.Gift}
        dismissible
      />
    </div>
  ),
};

/**
 * Use these colors to communicate status or feedback:
 * - **Success**: Completed actions, positive feedback
 * - **Warning**: Caution, requires attention
 * - **Error**: Problems, failures, critical issues
 * - **Info**: Neutral information, tips
 */
export const StatusColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Banner
        color="success"
        title="Success"
        description="Operation completed successfully"
        icon={iconMapXl.CheckCircle}
        dismissible
      />
      <Banner
        color="warning"
        title="Warning"
        description="Please review before continuing"
        icon={iconMapXl.AlertCircle}
        dismissible
      />
      <Banner
        color="error"
        title="Error"
        description="Something went wrong"
        icon={iconMapXl.XCircle}
        dismissible
      />
      <Banner
        color="info"
        title="Info"
        description="Here's some useful information"
        icon={iconMapXl.Info}
        dismissible
      />
    </div>
  ),
};

// =============================================================================
// WITH ACTIONS
// =============================================================================

/**
 * Add `primaryAction` and `secondaryAction` for user interactions.
 * Buttons automatically inherit the banner's color and shadow style.
 */
export const WithActions: Story = {
  args: {
    color: 'primary',
    title: 'New feature available!',
    description: 'Check out our latest release with exciting updates.',
    icon: iconMapXl.Zap,
    primaryAction: <Button variant="convex" size="sm" label="Try it now" />,
    secondaryAction: <Button variant="flat" size="sm" label="Learn more" />,
    dismissible: true,
  },
};

/**
 * Use `beforeActions` to add custom content like input fields.
 * Great for newsletter signups or quick searches.
 */
export const WithInputField: Story = {
  args: {
    color: 'default',
    textAlign: 'left',
    title: 'Subscribe to our newsletter',
    description: 'Get the latest updates delivered to your inbox.',
    icon: iconMapXl.Mail,
    beforeActions: (
      <InsetField
        placeholder="Enter your email"
        size="sm"
        style={{ width: '200px' }}
      />
    ),
    primaryAction: <Button variant="convex" size="sm" label="Subscribe" />,
    dismissible: true,
  },
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Three sizes are available. The icon container size automatically scales:
 * - **sm**: Compact, for subtle notifications
 * - **md** (default): Standard size for most use cases
 * - **lg**: Prominent, for important announcements
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Banner
        color="primary"
        size="sm"
        title="Small"
        description="Compact size for subtle notifications"
        icon={iconMapXl.Info}
      />
      <Banner
        color="primary"
        size="md"
        title="Medium"
        description="Default size for most use cases"
        icon={iconMapXl.Info}
      />
      <Banner
        color="primary"
        size="lg"
        title="Large"
        description="Prominent size for important announcements"
        icon={iconMapXl.Info}
      />
    </div>
  ),
};

// =============================================================================
// ICON CUSTOMIZATION
// =============================================================================

/**
 * The icon container uses the **FeaturedIcon** component internally.
 * Customize it independently from the banner:
 *
 * - `iconVariant`: convex, flat (default), or concave
 * - `iconShape`: circle, square, or rounded (default)
 * - `iconElevation`: low (default), mid, or high
 */
export const IconVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Banner
        color="primary"
        iconVariant="convex"
        title="Convex Icon"
        description="Raised icon with outer shadow"
        icon={iconMapXl.Star}
      />
      <Banner
        color="primary"
        iconVariant="flat"
        title="Flat Icon"
        description="No shadow on icon (default)"
        icon={iconMapXl.Star}
      />
      <Banner
        color="primary"
        iconVariant="concave"
        title="Concave Icon"
        description="Pressed icon with inner shadow"
        icon={iconMapXl.Star}
      />
    </div>
  ),
};

/**
 * Choose from three icon container shapes.
 */
export const IconShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Banner
        color="secondary"
        iconShape="rounded"
        iconVariant="convex"
        title="Rounded (default)"
        icon={iconMapXl.Bell}
      />
      <Banner
        color="secondary"
        iconShape="circle"
        iconVariant="convex"
        title="Circle"
        icon={iconMapXl.Bell}
      />
      <Banner
        color="secondary"
        iconShape="square"
        iconVariant="convex"
        title="Square"
        icon={iconMapXl.Bell}
      />
    </div>
  ),
};

// =============================================================================
// STICKY POSITIONING
// =============================================================================

/**
 * Set `sticky={true}` to fix the banner to the viewport edge.
 * Use `position` to choose top or bottom.
 *
 * > **Note**: Only one sticky banner should be shown at a time.
 */
export const StickyTop: Story = {
  args: {
    color: 'primary',
    sticky: true,
    position: 'top',
    title: 'Sticky top banner',
    description: 'This banner is fixed to the top of the viewport.',
    icon: iconMapXl.Zap,
    primaryAction: <Button variant="flat" size="sm" label="Learn more" />,
    dismissible: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '400px' }}>
        <Story />
        <div style={{ padding: '80px 20px' }}>
          <p>Scroll to see the sticky banner stay at the top.</p>
          <p style={{ marginTop: '300px' }}>More content below...</p>
        </div>
      </Surface>
    ),
  ],
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Banner adapts to dark theme when placed inside a dark Surface.
 */
export const DarkTheme: Story = {
  args: {
    color: 'primary',
    title: 'Join us for our virtual conference!',
    description: 'March 15th, 2024 - Register now for early bird pricing.',
    icon: iconMapXl.Zap,
    primaryAction: <Button variant="flat" size="sm" label="Register now" />,
    dismissible: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ minHeight: '200px', padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

// =============================================================================
// COMPLETE EXAMPLE
// =============================================================================

/**
 * A real-world example combining icon, content, input, and actions.
 */
export const CompleteExample: Story = {
  args: {
    color: 'tertiary',
    textAlign: 'left',
    title: 'Limited time offer!',
    description: 'Sign up now and get 3 months free.',
    icon: iconMapXl.Gift,
    iconVariant: 'convex',
    beforeActions: (
      <InsetField
        placeholder="Email address"
        size="sm"
        style={{ width: '180px' }}
      />
    ),
    primaryAction: <Button variant="convex" size="sm" label="Sign up" />,
    secondaryAction: <Button variant="flat" size="sm" label="No thanks" />,
    dismissible: true,
  },
};

// =============================================================================
// PLAYGROUND
// =============================================================================

/**
 * Experiment with all available props using the controls panel.
 */
export const Playground: Story = {
  args: {
    title: 'Customize this banner',
    description: 'Use the controls to explore all options.',
    icon: iconMapXl.Settings,
    primaryAction: <Button variant="convex" size="sm" label="Action" />,
    dismissible: true,
  },
};
