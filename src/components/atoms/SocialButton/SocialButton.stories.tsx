import type { Meta, StoryObj } from '@storybook/react-vite';
import { SocialButton } from './SocialButton';
import { Surface } from '../../foundation/Surface';
import { iconMapLg, createIconArgType } from '../../../../.storybook/icons';

/**
 * A button styled for social login and OAuth authentication flows.
 * Displays a provider icon alongside the action text.
 *
 * ## When to Use
 *
 * - **Social login**: "Continue with Google", "Sign in with Apple"
 * - **OAuth flows**: Third-party authentication buttons
 * - **Account linking**: Connect social accounts to a profile
 * - **Sharing**: Share to social platforms
 *
 * ## Key Features
 *
 * - **Neomorphic design**: Supports `convex` and `flat` variants
 * - **Provider icons**: Bring your own brand icons (Google, Apple, etc.)
 * - **Consistent styling**: Maintains visual harmony with other buttons
 * - **Full-width option**: Ideal for login forms
 *
 * ## Best Practices
 *
 * - Use official brand icons when available
 * - Follow provider brand guidelines for icon colors
 * - Keep button text consistent (e.g., "Continue with [Provider]")
 */
const meta: Meta<typeof SocialButton> = {
  title: 'Atoms/SocialButton',
  component: SocialButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Content
    children: {
      control: 'text',
      description: 'Button text',
      table: { category: 'Content' },
    },
    icon: {
      ...createIconArgType(iconMapLg, 'Provider icon'),
      table: { category: 'Content' },
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
      description: 'Shadow intensity',
      table: { category: 'Appearance', defaultValue: { summary: 'mid' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expand to fill container width',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
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

// Sample brand icons for social providers
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default social button. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    icon: 'User' as unknown as React.ReactNode,
    children: 'Continue with Account',
    variant: 'convex',
    size: 'md',
    elevation: 'mid',
  },
};

// =============================================================================
// SOCIAL PROVIDERS
// =============================================================================

/**
 * Common social login providers with their brand icons.
 */
export const SocialProviders: Story = {
  render: () => (
    <>
      <SocialButton icon={<GoogleIcon />}>Continue with Google</SocialButton>
      <SocialButton icon={<AppleIcon />}>Continue with Apple</SocialButton>
      <SocialButton icon={<FacebookIcon />}>Continue with Facebook</SocialButton>
      <SocialButton icon={<TwitterIcon />}>Continue with X</SocialButton>
    </>
  ),
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Three sizes for different contexts.
 */
export const Sizes: Story = {
  render: () => (
    <>
      <SocialButton size="sm" icon={<GoogleIcon />}>Small</SocialButton>
      <SocialButton size="md" icon={<GoogleIcon />}>Medium</SocialButton>
      <SocialButton size="lg" icon={<GoogleIcon />}>Large</SocialButton>
    </>
  ),
};

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * - **Convex** (default): Raised appearance with shadows
 * - **Flat**: No shadows, minimal style
 */
export const Variants: Story = {
  render: () => (
    <>
      <SocialButton variant="convex" icon={<GoogleIcon />}>Convex</SocialButton>
      <SocialButton variant="flat" icon={<GoogleIcon />}>Flat</SocialButton>
    </>
  ),
};

// =============================================================================
// FULL WIDTH
// =============================================================================

/**
 * Full-width button for login forms.
 */
export const FullWidth: Story = {
  args: {
    icon: 'User' as unknown as React.ReactNode,
    children: 'Continue with Account',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', width: '320px' }}>
        <Story />
      </Surface>
    ),
  ],
};

// =============================================================================
// STATES
// =============================================================================

/**
 * Disabled state prevents interaction.
 */
export const Disabled: Story = {
  args: {
    icon: 'User' as unknown as React.ReactNode,
    children: 'Continue with Account',
    disabled: true,
  },
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Social buttons adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    icon: 'User' as unknown as React.ReactNode,
    children: 'Continue with Account',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

/**
 * Social providers on dark background.
 */
export const DarkThemeSocialProviders: Story = {
  render: () => (
    <>
      <SocialButton icon={<GoogleIcon />}>Continue with Google</SocialButton>
      <SocialButton icon={<AppleIcon />}>Continue with Apple</SocialButton>
      <SocialButton icon={<FacebookIcon />}>Continue with Facebook</SocialButton>
      <SocialButton icon={<TwitterIcon />}>Continue with X</SocialButton>
    </>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Story />
      </Surface>
    ),
  ],
};
