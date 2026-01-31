import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Surface } from '../../components/foundation/Surface';

/**
 * The Vulcan Neo color system designed for neomorphic interfaces.
 * Colors are carefully chosen to work with soft shadows and provide
 * excellent contrast for accessibility.
 *
 * ## When to Use
 *
 * - **Primary Colors**: Brand identity for key actions and components
 * - **Secondary Colors**: Complement primary for less prominent elements
 * - **Semantic Colors**: Status feedback (success, warning, error, info)
 * - **Surface Colors**: Layered depth essential to neomorphic design
 * - **Text Colors**: Readable text meeting WCAG 4.5:1 contrast
 *
 * ## Key Features
 *
 * - **CSS Custom Properties**: All colors available as variables
 * - **Light & Dark Themes**: Automatic adaptation to theme context
 * - **Semantic Naming**: Intuitive variable names for easy adoption
 * - **WCAG Compliant**: Text colors meet 4.5:1 contrast requirements
 *
 * ## Best Practices
 *
 * - Use semantic colors for status indicators
 * - Pair text colors with appropriate surface colors
 * - Use container variants for subtle backgrounds
 */

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

const ColorSwatch: React.FC<{
  name: string;
  variable: string;
  hex?: string;
  description?: string;
}> = ({ name, variable, hex, description }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '12px 16px',
      background: 'var(--neo-bg)',
      borderRadius: 'var(--neo-radius-sm)',
      boxShadow: '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
    }}
  >
    <div
      style={{
        width: '48px',
        height: '48px',
        borderRadius: 'var(--neo-radius-sm)',
        background: `var(${variable})`,
        boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.1)',
      }}
    />
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--neo-text)' }}>{name}</div>
      <div style={{ fontFamily: 'var(--neo-font-family-mono)', fontSize: '12px', color: 'var(--neo-text-secondary)' }}>
        {variable}
      </div>
      {hex && (
        <div style={{ fontFamily: 'var(--neo-font-family-mono)', fontSize: '11px', color: 'var(--neo-text-disabled)' }}>
          {hex}
        </div>
      )}
    </div>
    {description && (
      <div style={{ fontSize: '12px', color: 'var(--neo-text-secondary)', maxWidth: '200px' }}>{description}</div>
    )}
  </div>
);

// =============================================================================
// META
// =============================================================================

const meta: Meta = {
  title: 'Foundation/Colors',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

export default meta;
type Story = StoryObj;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Primary brand colors overview.
 */
export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ColorSwatch name="Primary" variable="--neo-color-primary" hex="#6C5CE7" />
      <ColorSwatch name="Secondary" variable="--neo-color-secondary" hex="#00CEC9" />
      <ColorSwatch name="Tertiary" variable="--neo-color-tertiary" hex="#FDCB6E" />
    </div>
  ),
};

// =============================================================================
// PRIMARY COLORS
// =============================================================================

/**
 * Primary colors express brand identity and are used for key actions.
 */
export const PrimaryColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ColorSwatch name="Primary" variable="--neo-color-primary" hex="#6C5CE7" />
      <ColorSwatch name="Primary Light" variable="--neo-color-primary-light" hex="#A29BFE" />
      <ColorSwatch name="Primary Dark" variable="--neo-color-primary-dark" hex="#5849BE" />
      <ColorSwatch name="On Primary" variable="--neo-color-on-primary" hex="#FFFFFF" description="Text on primary" />
      <ColorSwatch name="Primary Container" variable="--neo-color-primary-container" hex="#E8E5FF" />
    </div>
  ),
};

/**
 * Primary color.
 */
export const ColorPrimary: Story = {
  tags: ['!dev'],
  render: () => <ColorSwatch name="Primary" variable="--neo-color-primary" hex="#6C5CE7" />,
};

/**
 * Primary light color.
 */
export const ColorPrimaryLight: Story = {
  tags: ['!dev'],
  render: () => <ColorSwatch name="Primary Light" variable="--neo-color-primary-light" hex="#A29BFE" />,
};

/**
 * Primary dark color.
 */
export const ColorPrimaryDark: Story = {
  tags: ['!dev'],
  render: () => <ColorSwatch name="Primary Dark" variable="--neo-color-primary-dark" hex="#5849BE" />,
};

// =============================================================================
// SECONDARY COLORS
// =============================================================================

/**
 * Secondary colors complement primary and are used for less prominent elements.
 */
export const SecondaryColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ColorSwatch name="Secondary" variable="--neo-color-secondary" hex="#00CEC9" />
      <ColorSwatch name="Secondary Light" variable="--neo-color-secondary-light" hex="#55EFC4" />
      <ColorSwatch name="Secondary Dark" variable="--neo-color-secondary-dark" hex="#00A8A3" />
      <ColorSwatch name="On Secondary" variable="--neo-color-on-secondary" hex="#FFFFFF" />
      <ColorSwatch name="Secondary Container" variable="--neo-color-secondary-container" hex="#D4FFFE" />
    </div>
  ),
};

/**
 * Secondary color.
 */
export const ColorSecondary: Story = {
  tags: ['!dev'],
  render: () => <ColorSwatch name="Secondary" variable="--neo-color-secondary" hex="#00CEC9" />,
};

// =============================================================================
// TERTIARY COLORS
// =============================================================================

/**
 * Tertiary colors provide additional accent options for visual interest.
 */
export const TertiaryColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ColorSwatch name="Tertiary" variable="--neo-color-tertiary" hex="#FDCB6E" />
      <ColorSwatch name="Tertiary Light" variable="--neo-color-tertiary-light" hex="#FFEAA7" />
      <ColorSwatch name="Tertiary Dark" variable="--neo-color-tertiary-dark" hex="#E4B556" />
      <ColorSwatch name="On Tertiary" variable="--neo-color-on-tertiary" hex="#2D3436" />
      <ColorSwatch name="Tertiary Container" variable="--neo-color-tertiary-container" hex="#FFF8E1" />
    </div>
  ),
};

/**
 * Tertiary color.
 */
export const ColorTertiary: Story = {
  tags: ['!dev'],
  render: () => <ColorSwatch name="Tertiary" variable="--neo-color-tertiary" hex="#FDCB6E" />,
};

// =============================================================================
// SEMANTIC COLORS
// =============================================================================

/**
 * Semantic colors communicate status and feedback to users.
 */
export const SemanticColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ColorSwatch name="Success" variable="--neo-color-success" hex="#00B894" description="Positive actions" />
      <ColorSwatch name="Warning" variable="--neo-color-warning" hex="#FDCB6E" description="Caution states" />
      <ColorSwatch name="Error" variable="--neo-color-error" hex="#E17055" description="Error states" />
      <ColorSwatch name="Info" variable="--neo-color-info" hex="#74B9FF" description="Informational" />
    </div>
  ),
};

/**
 * Success color.
 */
export const ColorSuccess: Story = {
  tags: ['!dev'],
  render: () => <ColorSwatch name="Success" variable="--neo-color-success" hex="#00B894" />,
};

/**
 * Warning color.
 */
export const ColorWarning: Story = {
  tags: ['!dev'],
  render: () => <ColorSwatch name="Warning" variable="--neo-color-warning" hex="#FDCB6E" />,
};

/**
 * Error color.
 */
export const ColorError: Story = {
  tags: ['!dev'],
  render: () => <ColorSwatch name="Error" variable="--neo-color-error" hex="#E17055" />,
};

/**
 * Info color.
 */
export const ColorInfo: Story = {
  tags: ['!dev'],
  render: () => <ColorSwatch name="Info" variable="--neo-color-info" hex="#74B9FF" />,
};

// =============================================================================
// SURFACE COLORS
// =============================================================================

/**
 * Surface colors create the layered depth essential to neomorphic design.
 */
export const SurfaceColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ColorSwatch name="Surface" variable="--neo-color-surface" hex="#E0E5EC" description="Base surface" />
      <ColorSwatch name="Surface Dim" variable="--neo-color-surface-dim" hex="#D4D9E0" />
      <ColorSwatch name="Surface Bright" variable="--neo-color-surface-bright" hex="#F0F3F8" />
      <ColorSwatch name="Surface Container" variable="--neo-color-surface-container" hex="#E8ECEF" />
    </div>
  ),
};

/**
 * Surface color.
 */
export const ColorSurface: Story = {
  tags: ['!dev'],
  render: () => <ColorSwatch name="Surface" variable="--neo-color-surface" hex="#E0E5EC" />,
};

// =============================================================================
// TEXT COLORS
// =============================================================================

/**
 * Text colors ensure readability and meet WCAG 4.5:1 contrast requirements.
 */
export const TextColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ColorSwatch name="Text Primary" variable="--neo-text-primary" hex="#2D3436" description="Main text" />
      <ColorSwatch name="Text Secondary" variable="--neo-text-secondary" hex="#636E72" description="Subdued text" />
      <ColorSwatch name="Text Disabled" variable="--neo-text-disabled" hex="#A0A8AD" description="Inactive text" />
    </div>
  ),
};

/**
 * Text primary color.
 */
export const ColorTextPrimary: Story = {
  tags: ['!dev'],
  render: () => <ColorSwatch name="Text Primary" variable="--neo-text-primary" hex="#2D3436" />,
};

/**
 * Text secondary color.
 */
export const ColorTextSecondary: Story = {
  tags: ['!dev'],
  render: () => <ColorSwatch name="Text Secondary" variable="--neo-text-secondary" hex="#636E72" />,
};

// =============================================================================
// SHADOW COLORS
// =============================================================================

/**
 * Shadow colors create the signature neomorphic depth effect.
 */
export const ShadowColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ColorSwatch name="Shadow Light" variable="--neo-shadow-light" description="Light shadow (top-left)" />
      <ColorSwatch name="Shadow Dark" variable="--neo-shadow-dark" description="Dark shadow (bottom-right)" />
    </div>
  ),
};

/**
 * Shadow light color.
 */
export const ColorShadowLight: Story = {
  tags: ['!dev'],
  render: () => <ColorSwatch name="Shadow Light" variable="--neo-shadow-light" description="Top-left highlight" />,
};

/**
 * Shadow dark color.
 */
export const ColorShadowDark: Story = {
  tags: ['!dev'],
  render: () => <ColorSwatch name="Shadow Dark" variable="--neo-shadow-dark" description="Bottom-right shadow" />,
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Colors adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ColorSwatch name="Primary" variable="--neo-color-primary" hex="#6C5CE7" />
      <ColorSwatch name="Secondary" variable="--neo-color-secondary" hex="#00CEC9" />
      <ColorSwatch name="Tertiary" variable="--neo-color-tertiary" hex="#FDCB6E" />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

/**
 * Semantic colors on dark background.
 */
export const DarkThemeSemanticColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ColorSwatch name="Success" variable="--neo-color-success" hex="#00B894" />
      <ColorSwatch name="Warning" variable="--neo-color-warning" hex="#FDCB6E" />
      <ColorSwatch name="Error" variable="--neo-color-error" hex="#E17055" />
      <ColorSwatch name="Info" variable="--neo-color-info" hex="#74B9FF" />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
