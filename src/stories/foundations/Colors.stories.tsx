import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Surface } from '../../components/foundation/Surface';

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
      boxShadow:
        '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
    }}
  >
    <div
      style={{
        width: '48px',
        height: '48px',
        borderRadius: 'var(--neo-radius-sm)',
        background: `var(${variable})`,
        boxShadow:
          'inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.1)',
      }}
    />
    <div style={{ flex: 1 }}>
      <div
        style={{
          fontWeight: 600,
          fontSize: '14px',
          color: 'var(--neo-text)',
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: 'var(--neo-font-family-mono)',
          fontSize: '12px',
          color: 'var(--neo-text-secondary)',
        }}
      >
        {variable}
      </div>
      {hex && (
        <div
          style={{
            fontFamily: 'var(--neo-font-family-mono)',
            fontSize: '11px',
            color: 'var(--neo-text-disabled)',
          }}
        >
          {hex}
        </div>
      )}
    </div>
    {description && (
      <div
        style={{
          fontSize: '12px',
          color: 'var(--neo-text-secondary)',
          maxWidth: '200px',
        }}
      >
        {description}
      </div>
    )}
  </div>
);

const ColorGroup: React.FC<{
  title: string;
  description?: string;
  colors: Array<{
    name: string;
    variable: string;
    hex?: string;
    description?: string;
  }>;
}> = ({ title, description, colors }) => (
  <div style={{ marginBottom: '48px' }}>
    <h3
      style={{
        fontSize: '20px',
        fontWeight: 600,
        marginBottom: '8px',
        color: 'var(--neo-text)',
      }}
    >
      {title}
    </h3>
    {description && (
      <p
        style={{
          fontSize: '14px',
          color: 'var(--neo-text-secondary)',
          marginBottom: '24px',
          maxWidth: '600px',
        }}
      >
        {description}
      </p>
    )}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {colors.map((color) => (
        <ColorSwatch key={color.variable} {...color} />
      ))}
    </div>
  </div>
);

const ColorsPage: React.FC = () => (
  <div style={{ maxWidth: '900px', padding: '40px' }}>
    <h1
      style={{
        fontSize: '36px',
        fontWeight: 700,
        marginBottom: '16px',
        color: 'var(--neo-text)',
        letterSpacing: '-0.02em',
      }}
    >
      Colors
    </h1>
    <p
      style={{
        fontSize: '18px',
        color: 'var(--neo-text-secondary)',
        marginBottom: '48px',
        lineHeight: 1.6,
        maxWidth: '700px',
      }}
    >
      The Vulcan Neo color system is designed for neomorphic interfaces. Colors
      are carefully chosen to work with soft shadows and provide excellent
      contrast for accessibility.
    </p>

    <ColorGroup
      title="Primary Colors"
      description="Primary colors express brand identity and are used for key actions and components."
      colors={[
        { name: 'Primary', variable: '--neo-color-primary', hex: '#6C5CE7' },
        {
          name: 'Primary Light',
          variable: '--neo-color-primary-light',
          hex: '#A29BFE',
        },
        {
          name: 'Primary Dark',
          variable: '--neo-color-primary-dark',
          hex: '#5849BE',
        },
        {
          name: 'On Primary',
          variable: '--neo-color-on-primary',
          hex: '#FFFFFF',
          description: 'Text on primary',
        },
        {
          name: 'Primary Container',
          variable: '--neo-color-primary-container',
          hex: '#E8E5FF',
        },
        {
          name: 'On Primary Container',
          variable: '--neo-color-on-primary-container',
          hex: '#1D1148',
        },
      ]}
    />

    <ColorGroup
      title="Secondary Colors"
      description="Secondary colors complement primary colors and are used for less prominent components."
      colors={[
        {
          name: 'Secondary',
          variable: '--neo-color-secondary',
          hex: '#00CEC9',
        },
        {
          name: 'Secondary Light',
          variable: '--neo-color-secondary-light',
          hex: '#55EFC4',
        },
        {
          name: 'Secondary Dark',
          variable: '--neo-color-secondary-dark',
          hex: '#00A8A3',
        },
        {
          name: 'On Secondary',
          variable: '--neo-color-on-secondary',
          hex: '#FFFFFF',
        },
        {
          name: 'Secondary Container',
          variable: '--neo-color-secondary-container',
          hex: '#D4FFFE',
        },
        {
          name: 'On Secondary Container',
          variable: '--neo-color-on-secondary-container',
          hex: '#00403E',
        },
      ]}
    />

    <ColorGroup
      title="Tertiary Colors"
      description="Tertiary colors provide additional accent options for contrast and visual interest."
      colors={[
        { name: 'Tertiary', variable: '--neo-color-tertiary', hex: '#FDCB6E' },
        {
          name: 'Tertiary Light',
          variable: '--neo-color-tertiary-light',
          hex: '#FFEAA7',
        },
        {
          name: 'Tertiary Dark',
          variable: '--neo-color-tertiary-dark',
          hex: '#E4B556',
        },
        {
          name: 'On Tertiary',
          variable: '--neo-color-on-tertiary',
          hex: '#2D3436',
        },
        {
          name: 'Tertiary Container',
          variable: '--neo-color-tertiary-container',
          hex: '#FFF8E1',
        },
        {
          name: 'On Tertiary Container',
          variable: '--neo-color-on-tertiary-container',
          hex: '#3E2D00',
        },
      ]}
    />

    <ColorGroup
      title="Semantic Colors"
      description="Semantic colors communicate status and feedback to users."
      colors={[
        {
          name: 'Success',
          variable: '--neo-color-success',
          hex: '#00B894',
          description: 'Positive actions',
        },
        {
          name: 'Success Container',
          variable: '--neo-color-success-container',
          hex: '#D4F9EF',
        },
        {
          name: 'Warning',
          variable: '--neo-color-warning',
          hex: '#FDCB6E',
          description: 'Caution states',
        },
        {
          name: 'Warning Container',
          variable: '--neo-color-warning-container',
          hex: '#FFF8E1',
        },
        {
          name: 'Error',
          variable: '--neo-color-error',
          hex: '#E17055',
          description: 'Error states',
        },
        {
          name: 'Error Container',
          variable: '--neo-color-error-container',
          hex: '#FFDDD6',
        },
        {
          name: 'Info',
          variable: '--neo-color-info',
          hex: '#74B9FF',
          description: 'Informational',
        },
        {
          name: 'Info Container',
          variable: '--neo-color-info-container',
          hex: '#E3F2FD',
        },
      ]}
    />

    <ColorGroup
      title="Surface Colors"
      description="Surface colors create the layered depth essential to neomorphic design."
      colors={[
        {
          name: 'Surface',
          variable: '--neo-color-surface',
          hex: '#E0E5EC',
          description: 'Base surface',
        },
        {
          name: 'Surface Dim',
          variable: '--neo-color-surface-dim',
          hex: '#D4D9E0',
        },
        {
          name: 'Surface Bright',
          variable: '--neo-color-surface-bright',
          hex: '#F0F3F8',
        },
        {
          name: 'Surface Container Lowest',
          variable: '--neo-color-surface-container-lowest',
          hex: '#FFFFFF',
        },
        {
          name: 'Surface Container Low',
          variable: '--neo-color-surface-container-low',
          hex: '#EEF1F6',
        },
        {
          name: 'Surface Container',
          variable: '--neo-color-surface-container',
          hex: '#E8ECEF',
        },
        {
          name: 'Surface Container High',
          variable: '--neo-color-surface-container-high',
          hex: '#E2E6EA',
        },
        {
          name: 'Surface Container Highest',
          variable: '--neo-color-surface-container-highest',
          hex: '#DCE0E5',
        },
      ]}
    />

    <ColorGroup
      title="Text Colors"
      description="Text colors ensure readability and meet WCAG 4.5:1 contrast requirements."
      colors={[
        {
          name: 'Text Primary',
          variable: '--neo-text-primary',
          hex: '#2D3436',
          description: 'Primary text',
        },
        {
          name: 'Text Secondary',
          variable: '--neo-text-secondary',
          hex: '#636E72',
          description: 'Secondary text',
        },
        {
          name: 'Text Disabled',
          variable: '--neo-text-disabled',
          hex: '#A0A8AD',
          description: 'Disabled text',
        },
        {
          name: 'On Surface',
          variable: '--neo-color-on-surface',
          description: 'Text on surface',
        },
        {
          name: 'On Surface Variant',
          variable: '--neo-color-on-surface-variant',
          description: 'Secondary text on surface',
        },
      ]}
    />

    <ColorGroup
      title="Outline Colors"
      description="Outline colors define boundaries and separators."
      colors={[
        {
          name: 'Outline',
          variable: '--neo-color-outline',
          hex: '#8D9CA8',
          description: 'Primary outline',
        },
        {
          name: 'Outline Variant',
          variable: '--neo-color-outline-variant',
          hex: '#C4CBD0',
          description: 'Subtle outline',
        },
      ]}
    />

    <ColorGroup
      title="Shadow Colors"
      description="Shadow colors create the signature neomorphic depth effect."
      colors={[
        {
          name: 'Shadow Light',
          variable: '--neo-shadow-light',
          description: 'Light shadow (top-left)',
        },
        {
          name: 'Shadow Dark',
          variable: '--neo-shadow-dark',
          description: 'Dark shadow (bottom-right)',
        },
      ]}
    />
  </div>
);

const meta: Meta = {
  title: 'foundation/Colors',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const LightTheme: Story = {
  render: () => (
    <Surface theme="light" style={{ minHeight: '100vh' }}>
      <ColorsPage />
    </Surface>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <Surface theme="dark" style={{ minHeight: '100vh' }}>
      <ColorsPage />
    </Surface>
  ),
};
