import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppStoreButton } from './AppStoreButton';
import { Surface } from '../../foundation/Surface';

/**
 * A pre-styled button for linking to app stores. Displays the appropriate store
 * branding text ("Download on the App Store" or "GET IT ON Google Play").
 *
 * ## When to Use
 *
 * - **App download links**: Direct users to download your mobile app
 * - **Landing pages**: Showcase app availability on both platforms
 * - **Marketing materials**: Consistent store button styling
 *
 * ## Key Features
 *
 * - **Two store types**: Apple App Store and Google Play Store
 * - **Neomorphic design**: Supports `convex` and `flat` variants
 * - **Flexible icons**: Bring your own icon (Lucide, FontAwesome, SVG, etc.)
 * - **Auto text**: Store name and tagline are generated based on `store` prop
 *
 * ## Icon Recommendations
 *
 * The component does not include store icons by default. You can use:
 * - **Lucide React**: `Apple` icon for App Store
 * - **Simple Icons**: Brand icons for both stores
 * - **Custom SVG**: Official store brand assets
 *
 * > **Note**: When using official store logos, follow Apple's and Google's
 * > brand guidelines for app store badges.
 *
 * ## Anatomy
 *
 * ![AppStoreButton Anatomy](/docs/images/appstorebutton-anatomy.png)
 */
const meta: Meta<typeof AppStoreButton> = {
  title: 'Atoms/AppStoreButton',
  component: AppStoreButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Required
    store: {
      control: 'select',
      options: ['apple', 'google'],
      description: 'Target app store. Determines button text and styling.',
      table: { category: 'Required' },
    },

    // Appearance
    variant: {
      control: 'select',
      options: ['convex', 'flat'],
      description: 'Visual style: **convex** (raised) or **flat** (minimal)',
      table: { category: 'Appearance', defaultValue: { summary: 'convex' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    elevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
      description: 'Shadow intensity (only applies to convex variant)',
      table: { category: 'Appearance', defaultValue: { summary: 'mid' } },
    },

    // Icon
    icon: {
      control: false,
      description: 'Store icon (React node). Provide your own Apple or Google Play icon.',
      table: { category: 'Icon' },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Example icons (in production, use proper brand icons)
const AppleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const PlayStoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path fill="#EA4335" d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92z"/>
    <path fill="#FBBC04" d="M17.538 8.268L6.133 1.864l7.659 7.659 3.746-1.255z"/>
    <path fill="#4285F4" d="M17.538 15.732L6.133 22.136l7.659-7.659 3.746 1.255z"/>
    <path fill="#34A853" d="M21.324 10.94l-3.786-2.115-4.023 3.176 4.023 3.176 3.786-2.115a1.1 1.1 0 0 0 0-2.122z"/>
  </svg>
);

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default App Store button. Use the controls to explore all options.
 */
export const Default: Story = {
  args: {
    store: 'apple',
    icon: <AppleIcon />,
  },
};

// =============================================================================
// STORE TYPES
// =============================================================================

/**
 * The `store` prop determines the button text:
 * - **apple**: "Download on the App Store"
 * - **google**: "GET IT ON Google Play"
 */
export const BothStores: Story = {
  render: () => (
    <>
      <AppStoreButton store="apple" icon={<AppleIcon />} />
      <AppStoreButton store="google" icon={<PlayStoreIcon />} />
    </>
  ),
};

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * - **Convex** (default): Raised appearance with shadows
 * - **Flat**: No shadow, minimal style
 */
export const Variants: Story = {
  render: () => (
    <>
      <AppStoreButton store="apple" variant="convex" icon={<AppleIcon />} />
      <AppStoreButton store="apple" variant="flat" icon={<AppleIcon />} />
    </>
  ),
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Three sizes available for different contexts.
 */
export const Sizes: Story = {
  render: () => (
    <>
      <AppStoreButton store="apple" size="sm" icon={<AppleIcon />} />
      <AppStoreButton store="apple" size="md" icon={<AppleIcon />} />
      <AppStoreButton store="apple" size="lg" icon={<AppleIcon />} />
    </>
  ),
};

// =============================================================================
// ELEVATIONS
// =============================================================================

/**
 * Control shadow intensity for the convex variant.
 */
export const Elevations: Story = {
  render: () => (
    <>
      <AppStoreButton store="google" elevation="low" icon={<PlayStoreIcon />} />
      <AppStoreButton store="google" elevation="mid" icon={<PlayStoreIcon />} />
      <AppStoreButton store="google" elevation="high" icon={<PlayStoreIcon />} />
    </>
  ),
};

// =============================================================================
// STATES
// =============================================================================

/**
 * Use when the app is temporarily unavailable.
 */
export const Disabled: Story = {
  args: {
    store: 'apple',
    icon: <AppleIcon />,
    disabled: true,
  },
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Buttons adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  render: () => (
    <>
      <AppStoreButton store="apple" icon={<AppleIcon />} />
      <AppStoreButton store="google" icon={<PlayStoreIcon />} />
    </>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1.5rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
