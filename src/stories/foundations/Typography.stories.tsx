import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Surface } from '../../components/Surface';

interface TypeScaleProps {
  name: string;
  sizeVar: string;
  lineHeightVar: string;
  weight?: string;
  letterSpacing?: string;
  sample?: string;
}

const TypeScale: React.FC<TypeScaleProps> = ({
  name,
  sizeVar,
  lineHeightVar,
  weight = 'var(--neo-font-weight-regular)',
  letterSpacing = '0',
  sample = 'The quick brown fox jumps over the lazy dog',
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '140px 1fr',
      gap: '24px',
      padding: '24px',
      background: 'var(--neo-bg)',
      borderRadius: 'var(--neo-radius-sm)',
      boxShadow:
        '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
      marginBottom: '16px',
    }}
  >
    <div>
      <div
        style={{
          fontWeight: 600,
          fontSize: '14px',
          color: 'var(--neo-text)',
          marginBottom: '8px',
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: 'var(--neo-font-family-mono)',
          fontSize: '11px',
          color: 'var(--neo-text-secondary)',
          lineHeight: 1.6,
        }}
      >
        <div>Size: {sizeVar}</div>
        <div>Line: {lineHeightVar}</div>
        <div>Weight: {weight.replace('var(--neo-font-weight-', '').replace(')', '')}</div>
        {letterSpacing !== '0' && <div>Tracking: {letterSpacing}</div>}
      </div>
    </div>
    <div
      style={{
        fontSize: `var(${sizeVar})`,
        lineHeight: `var(${lineHeightVar})`,
        fontWeight: weight.startsWith('var(') ? `var(${weight.slice(4, -1)})` : weight,
        letterSpacing,
        color: 'var(--neo-text)',
        fontFamily: 'var(--neo-font-family)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {sample}
    </div>
  </div>
);

const TypeScaleGroup: React.FC<{
  title: string;
  description?: string;
  scales: TypeScaleProps[];
}> = ({ title, description, scales }) => (
  <div style={{ marginBottom: '56px' }}>
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
    {scales.map((scale) => (
      <TypeScale key={scale.name} {...scale} />
    ))}
  </div>
);

const FontWeightDemo: React.FC = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      marginBottom: '56px',
    }}
  >
    {[
      { name: 'Regular', var: '--neo-font-weight-regular', value: '400' },
      { name: 'Medium', var: '--neo-font-weight-medium', value: '500' },
      { name: 'Semibold', var: '--neo-font-weight-semibold', value: '600' },
      { name: 'Bold', var: '--neo-font-weight-bold', value: '700' },
    ].map((weight) => (
      <div
        key={weight.name}
        style={{
          padding: '24px',
          background: 'var(--neo-bg)',
          borderRadius: 'var(--neo-radius-sm)',
          boxShadow:
            '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '32px',
            fontWeight: weight.value,
            color: 'var(--neo-text)',
            marginBottom: '12px',
          }}
        >
          Aa
        </div>
        <div
          style={{
            fontWeight: 600,
            fontSize: '14px',
            color: 'var(--neo-text)',
          }}
        >
          {weight.name}
        </div>
        <div
          style={{
            fontFamily: 'var(--neo-font-family-mono)',
            fontSize: '11px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          {weight.value}
        </div>
      </div>
    ))}
  </div>
);

const FontFamilyDemo: React.FC = () => (
  <div style={{ marginBottom: '56px' }}>
    <h3
      style={{
        fontSize: '20px',
        fontWeight: 600,
        marginBottom: '24px',
        color: 'var(--neo-text)',
      }}
    >
      Font Families
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[
        {
          name: 'Sans Serif (Default)',
          var: '--neo-font-family',
          sample: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        },
        {
          name: 'Display',
          var: '--neo-font-family-display',
          sample: 'Headlines & Titles',
        },
        {
          name: 'Monospace',
          var: '--neo-font-family-mono',
          sample: 'const code = "example"; // 0123456789',
        },
      ].map((font) => (
        <div
          key={font.name}
          style={{
            padding: '24px',
            background: 'var(--neo-bg)',
            borderRadius: 'var(--neo-radius-sm)',
            boxShadow:
              '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--neo-text)',
              marginBottom: '4px',
            }}
          >
            {font.name}
          </div>
          <div
            style={{
              fontFamily: 'var(--neo-font-family-mono)',
              fontSize: '11px',
              color: 'var(--neo-text-secondary)',
              marginBottom: '12px',
            }}
          >
            {font.var}
          </div>
          <div
            style={{
              fontFamily: `var(${font.var})`,
              fontSize: '18px',
              color: 'var(--neo-text)',
            }}
          >
            {font.sample}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TypographyPage: React.FC = () => (
  <div style={{ maxWidth: '1000px', padding: '40px' }}>
    <h1
      style={{
        fontSize: '36px',
        fontWeight: 700,
        marginBottom: '16px',
        color: 'var(--neo-text)',
        letterSpacing: '-0.02em',
      }}
    >
      Typography
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
      The Vulcan Neo type system is based on a hierarchical scale that ensures
      readability and visual harmony. Following Material Design 3 patterns, it
      includes Display, Headline, Title, Body, and Label scales.
    </p>

    <FontFamilyDemo />

    <h3
      style={{
        fontSize: '20px',
        fontWeight: 600,
        marginBottom: '24px',
        color: 'var(--neo-text)',
      }}
    >
      Font Weights
    </h3>
    <FontWeightDemo />

    <TypeScaleGroup
      title="Display"
      description="Display styles are reserved for large, short text like headlines on marketing pages. They should not be used for body text."
      scales={[
        {
          name: 'Display XL',
          sizeVar: '--neo-font-display-xl',
          lineHeightVar: '--neo-line-height-display-xl',
          weight: 'var(--neo-font-weight-bold)',
          letterSpacing: 'var(--neo-letter-spacing-display)',
          sample: 'Display XL',
        },
        {
          name: 'Display Large',
          sizeVar: '--neo-font-display-lg',
          lineHeightVar: '--neo-line-height-display-lg',
          weight: 'var(--neo-font-weight-bold)',
          letterSpacing: 'var(--neo-letter-spacing-display)',
          sample: 'Display Large',
        },
        {
          name: 'Display Medium',
          sizeVar: '--neo-font-display-md',
          lineHeightVar: '--neo-line-height-display-md',
          weight: 'var(--neo-font-weight-bold)',
          letterSpacing: 'var(--neo-letter-spacing-display)',
          sample: 'Display Medium',
        },
        {
          name: 'Display Small',
          sizeVar: '--neo-font-display-sm',
          lineHeightVar: '--neo-line-height-display-sm',
          weight: 'var(--neo-font-weight-semibold)',
          letterSpacing: 'var(--neo-letter-spacing-display)',
          sample: 'Display Small',
        },
      ]}
    />

    <TypeScaleGroup
      title="Headline"
      description="Headlines are best suited for short, high-emphasis text on smaller screens. They're good for marking primary passages or important regions of content."
      scales={[
        {
          name: 'Headline Large',
          sizeVar: '--neo-font-headline-lg',
          lineHeightVar: '--neo-line-height-headline-lg',
          weight: 'var(--neo-font-weight-semibold)',
          letterSpacing: 'var(--neo-letter-spacing-headline)',
          sample: 'Headline Large',
        },
        {
          name: 'Headline Medium',
          sizeVar: '--neo-font-headline-md',
          lineHeightVar: '--neo-line-height-headline-md',
          weight: 'var(--neo-font-weight-semibold)',
          letterSpacing: 'var(--neo-letter-spacing-headline)',
          sample: 'Headline Medium',
        },
        {
          name: 'Headline Small',
          sizeVar: '--neo-font-headline-sm',
          lineHeightVar: '--neo-line-height-headline-sm',
          weight: 'var(--neo-font-weight-semibold)',
          letterSpacing: 'var(--neo-letter-spacing-headline)',
          sample: 'Headline Small',
        },
      ]}
    />

    <TypeScaleGroup
      title="Title"
      description="Titles are smaller than headlines and should be used for medium-emphasis text that remains relatively short."
      scales={[
        {
          name: 'Title Large',
          sizeVar: '--neo-font-title-lg',
          lineHeightVar: '--neo-line-height-title-lg',
          weight: 'var(--neo-font-weight-semibold)',
          sample: 'Title Large',
        },
        {
          name: 'Title Medium',
          sizeVar: '--neo-font-title-md',
          lineHeightVar: '--neo-line-height-title-md',
          weight: 'var(--neo-font-weight-medium)',
          sample: 'Title Medium',
        },
        {
          name: 'Title Small',
          sizeVar: '--neo-font-title-sm',
          lineHeightVar: '--neo-line-height-title-sm',
          weight: 'var(--neo-font-weight-medium)',
          sample: 'Title Small',
        },
      ]}
    />

    <TypeScaleGroup
      title="Body"
      description="Body styles are used for longer passages of text in your app. Use them for primary reading content."
      scales={[
        {
          name: 'Body Large',
          sizeVar: '--neo-font-body-lg',
          lineHeightVar: '--neo-line-height-body-lg',
          weight: 'var(--neo-font-weight-regular)',
          letterSpacing: 'var(--neo-letter-spacing-body)',
        },
        {
          name: 'Body Medium',
          sizeVar: '--neo-font-body-md',
          lineHeightVar: '--neo-line-height-body-md',
          weight: 'var(--neo-font-weight-regular)',
          letterSpacing: 'var(--neo-letter-spacing-body)',
        },
        {
          name: 'Body Small',
          sizeVar: '--neo-font-body-sm',
          lineHeightVar: '--neo-line-height-body-sm',
          weight: 'var(--neo-font-weight-regular)',
          letterSpacing: 'var(--neo-letter-spacing-body)',
        },
      ]}
    />

    <TypeScaleGroup
      title="Label"
      description="Label styles are smaller, utilitarian styles used for areas of the UI like buttons, form inputs, and navigation."
      scales={[
        {
          name: 'Label Large',
          sizeVar: '--neo-font-label-lg',
          lineHeightVar: '--neo-line-height-label-lg',
          weight: 'var(--neo-font-weight-medium)',
          letterSpacing: 'var(--neo-letter-spacing-label)',
          sample: 'Label Large - Button Text',
        },
        {
          name: 'Label Medium',
          sizeVar: '--neo-font-label-md',
          lineHeightVar: '--neo-line-height-label-md',
          weight: 'var(--neo-font-weight-medium)',
          letterSpacing: 'var(--neo-letter-spacing-label)',
          sample: 'Label Medium - Form labels',
        },
        {
          name: 'Label Small',
          sizeVar: '--neo-font-label-sm',
          lineHeightVar: '--neo-line-height-label-sm',
          weight: 'var(--neo-font-weight-medium)',
          letterSpacing: 'var(--neo-letter-spacing-label)',
          sample: 'Label Small - Captions',
        },
      ]}
    />
  </div>
);

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const LightTheme: Story = {
  render: () => (
    <Surface theme="light" style={{ minHeight: '100vh' }}>
      <TypographyPage />
    </Surface>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <Surface theme="dark" style={{ minHeight: '100vh' }}>
      <TypographyPage />
    </Surface>
  ),
};
