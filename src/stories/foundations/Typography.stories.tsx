import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Surface } from '../../components/foundation/Surface';

interface TypeScaleProps {
  name: string;
  sizeVar: string;
  lineHeightVar: string;
  weight: string;
  weightValue: string;
  letterSpacing?: string;
  sample?: string;
  fontFamily?: string;
  size: string;
}

const TypeScale: React.FC<TypeScaleProps> = ({
  name,
  sizeVar,
  lineHeightVar,
  weight,
  weightValue,
  letterSpacing = '0',
  sample = 'The quick brown fox jumps over the lazy dog',
  fontFamily = 'var(--neo-font-family)',
  size,
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '160px 1fr',
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
        <div>Size: {size}</div>
        <div>Weight: {weightValue}</div>
        {letterSpacing !== '0' && <div>Tracking: {letterSpacing}</div>}
      </div>
    </div>
    <div
      style={{
        fontSize: `var(${sizeVar})`,
        lineHeight: `var(${lineHeightVar})`,
        fontWeight: weight,
        letterSpacing,
        color: 'var(--neo-text)',
        fontFamily,
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
          maxWidth: '700px',
          lineHeight: 1.6,
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
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      marginBottom: '56px',
    }}
  >
    {[
      { name: 'Regular', var: '--neo-font-weight-regular', value: '400', use: 'Body text' },
      { name: 'Medium', var: '--neo-font-weight-medium', value: '500', use: 'Labels, titles' },
      { name: 'Semibold', var: '--neo-font-weight-semibold', value: '600', use: 'Headlines' },
      { name: 'Bold', var: '--neo-font-weight-bold', value: '700', use: 'Display text' },
      { name: 'Extrabold', var: '--neo-font-weight-extrabold', value: '800', use: 'Hero headlines' },
      { name: 'Black', var: '--neo-font-weight-black', value: '900', use: 'Maximum emphasis' },
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
            marginBottom: '4px',
          }}
        >
          {weight.value}
        </div>
        <div
          style={{
            fontSize: '11px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          {weight.use}
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
          name: 'Inter (Primary)',
          var: '--neo-font-family',
          sample: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
          description: 'Tall x-height, open apertures, excellent legibility at all sizes',
        },
        {
          name: 'Poppins (Display)',
          var: '--neo-font-family-display',
          sample: 'Headlines & Hero Text',
          description: 'Geometric with friendly personality, high contrast for headlines',
        },
        {
          name: 'JetBrains Mono',
          var: '--neo-font-family-mono',
          sample: 'const code = "example"; // 0123456789 iIlL1 oO0',
          description: 'Clear distinction between similar characters (i, l, 1, 0, O)',
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
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
                }}
              >
                {font.var}
              </div>
            </div>
          </div>
          <div
            style={{
              fontFamily: `var(${font.var})`,
              fontSize: '20px',
              color: 'var(--neo-text)',
              marginBottom: '12px',
            }}
          >
            {font.sample}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--neo-text-secondary)',
            }}
          >
            {font.description}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TypeScaleVisual: React.FC = () => (
  <div style={{ marginBottom: '56px' }}>
    <h3
      style={{
        fontSize: '20px',
        fontWeight: 600,
        marginBottom: '16px',
        color: 'var(--neo-text)',
      }}
    >
      Type Scale (1.25x Major Third)
    </h3>
    <p
      style={{
        fontSize: '14px',
        color: 'var(--neo-text-secondary)',
        marginBottom: '24px',
        lineHeight: 1.6,
      }}
    >
      Our scale uses a 1.25x ratio (Major Third) for clear visual hierarchy. Base size is 16px.
    </p>
    <div
      style={{
        padding: '24px',
        background: 'var(--neo-bg)',
        borderRadius: 'var(--neo-radius-sm)',
        boxShadow: 'inset 4px 4px 8px var(--neo-shadow-dark), inset -4px -4px 8px var(--neo-shadow-light)',
      }}
    >
      {[
        { size: '76px', name: 'Display XL' },
        { size: '61px', name: 'Display LG' },
        { size: '49px', name: 'Display MD' },
        { size: '39px', name: 'Display SM' },
        { size: '31px', name: 'Headline LG' },
        { size: '25px', name: 'Headline MD' },
        { size: '20px', name: 'Headline SM / Title LG' },
        { size: '16px', name: 'Body MD / Title MD (Base)' },
        { size: '14px', name: 'Body SM / Label LG' },
        { size: '12px', name: 'Label MD / Caption' },
        { size: '11px', name: 'Label SM / Overline' },
      ].map((item, index) => (
        <div
          key={item.size}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '8px 0',
            borderBottom: index < 10 ? '1px solid var(--neo-color-outline-variant)' : 'none',
          }}
        >
          <div
            style={{
              width: '80px',
              fontFamily: 'var(--neo-font-family-mono)',
              fontSize: '11px',
              color: 'var(--neo-text-secondary)',
            }}
          >
            {item.size}
          </div>
          <div
            style={{
              fontSize: item.size,
              fontWeight: parseInt(item.size) >= 31 ? 700 : parseInt(item.size) >= 20 ? 600 : 400,
              color: 'var(--neo-text)',
              lineHeight: 1.2,
            }}
          >
            Aa
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--neo-text-secondary)',
            }}
          >
            {item.name}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AccessibilityGuidelines: React.FC = () => (
  <div style={{ marginBottom: '56px' }}>
    <h3
      style={{
        fontSize: '20px',
        fontWeight: 600,
        marginBottom: '16px',
        color: 'var(--neo-text)',
      }}
    >
      Accessibility Guidelines
    </h3>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
      }}
    >
      <div
        style={{
          padding: '24px',
          background: 'var(--neo-bg)',
          borderRadius: 'var(--neo-radius-sm)',
          boxShadow: '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--neo-color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
            }}
          >
            ✓
          </div>
          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--neo-text)' }}>
            Contrast Ratios
          </div>
        </div>
        <ul
          style={{
            fontSize: '13px',
            color: 'var(--neo-text-secondary)',
            lineHeight: 1.8,
            margin: 0,
            paddingLeft: '16px',
          }}
        >
          <li>Primary text: <strong>8.2:1</strong> (WCAG AAA)</li>
          <li>Secondary text: <strong>4.8:1</strong> (WCAG AA)</li>
          <li>Minimum body text: <strong>16px</strong></li>
          <li>Line height: <strong>1.5x - 1.75x</strong> font size</li>
        </ul>
      </div>

      <div
        style={{
          padding: '24px',
          background: 'var(--neo-bg)',
          borderRadius: 'var(--neo-radius-sm)',
          boxShadow: '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--neo-color-error)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
            }}
          >
            ✕
          </div>
          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--neo-text)' }}>
            Avoid
          </div>
        </div>
        <ul
          style={{
            fontSize: '13px',
            color: 'var(--neo-text-secondary)',
            lineHeight: 1.8,
            margin: 0,
            paddingLeft: '16px',
          }}
        >
          <li>Neomorphic shadows on small body text</li>
          <li>Light font weights below 16px</li>
          <li>Low contrast text on soft backgrounds</li>
          <li>Text smaller than 11px for UI labels</li>
        </ul>
      </div>

      <div
        style={{
          padding: '24px',
          background: 'var(--neo-bg)',
          borderRadius: 'var(--neo-radius-sm)',
          boxShadow: '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
          gridColumn: 'span 2',
        }}
      >
        <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--neo-text)', marginBottom: '16px' }}>
          Font Selection Rationale
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div>
            <div style={{ fontWeight: 500, fontSize: '13px', color: 'var(--neo-text)', marginBottom: '8px' }}>
              Tall x-height
            </div>
            <p style={{ fontSize: '12px', color: 'var(--neo-text-secondary)', margin: 0, lineHeight: 1.6 }}>
              Inter and Poppins have tall x-heights, making lowercase letters more visible against soft neomorphic backgrounds.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 500, fontSize: '13px', color: 'var(--neo-text)', marginBottom: '8px' }}>
              Open Apertures
            </div>
            <p style={{ fontSize: '12px', color: 'var(--neo-text-secondary)', margin: 0, lineHeight: 1.6 }}>
              Letters like 'c', 'e', and 's' have open counters, improving character recognition at small sizes.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 500, fontSize: '13px', color: 'var(--neo-text)', marginBottom: '8px' }}>
              Geometric Construction
            </div>
            <p style={{ fontSize: '12px', color: 'var(--neo-text-secondary)', margin: 0, lineHeight: 1.6 }}>
              Clean geometric lines complement the minimalist neomorphic aesthetic without visual noise.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FontPairings: React.FC = () => (
  <div style={{ marginBottom: '56px' }}>
    <h3
      style={{
        fontSize: '20px',
        fontWeight: 600,
        marginBottom: '16px',
        color: 'var(--neo-text)',
      }}
    >
      Recommended Font Pairings
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[
        {
          name: 'Modern & Clean (Default)',
          heading: 'Poppins',
          body: 'Inter',
          description: 'Geometric display with highly legible body text',
        },
        {
          name: 'Accessible & Soft',
          heading: 'Montserrat',
          body: 'Open Sans',
          description: 'Friendly headers with comfortable reading experience',
        },
        {
          name: 'Standard Tech',
          heading: 'Helvetica Neue',
          body: 'System Fonts',
          description: 'Professional look with optimal performance',
        },
      ].map((pairing) => (
        <div
          key={pairing.name}
          style={{
            padding: '24px',
            background: 'var(--neo-bg)',
            borderRadius: 'var(--neo-radius-sm)',
            boxShadow: '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--neo-text)', marginBottom: '4px' }}>
                {pairing.name}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--neo-text-secondary)' }}>
                {pairing.description}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: 'var(--neo-radius-sm)',
                  background: 'var(--neo-color-primary)',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 500,
                }}
              >
                {pairing.heading}
              </span>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: 'var(--neo-radius-sm)',
                  background: 'var(--neo-color-surface-container-high)',
                  color: 'var(--neo-text)',
                  fontSize: '11px',
                  fontWeight: 500,
                }}
              >
                {pairing.body}
              </span>
            </div>
          </div>
          <div
            style={{
              padding: '16px',
              background: 'var(--neo-color-surface-container)',
              borderRadius: 'var(--neo-radius-xs)',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '8px',
                color: 'var(--neo-text)',
              }}
            >
              Welcome to Our Platform
            </div>
            <p style={{ fontSize: '16px', color: 'var(--neo-text-secondary)', margin: 0, lineHeight: 1.625 }}>
              This is body text demonstrating the pairing. Good typography creates visual hierarchy and improves readability across all screen sizes.
            </p>
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
        fontFamily: 'var(--neo-font-family-display)',
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
        lineHeight: 1.75,
        maxWidth: '700px',
      }}
    >
      In neomorphic design, typography must do the heavy lifting for usability since the UI
      relies on shadows rather than borders. Our type system uses Humanist/Geometric sans-serifs
      with tall x-heights and open apertures for maximum legibility against soft backgrounds.
    </p>

    <FontFamilyDemo />

    <TypeScaleVisual />

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
    <p
      style={{
        fontSize: '14px',
        color: 'var(--neo-text-secondary)',
        marginBottom: '24px',
        lineHeight: 1.6,
      }}
    >
      Use bold weights (700-900) for headlines to anchor text against soft UI elements.
      Regular weight (400) is reserved for body text.
    </p>
    <FontWeightDemo />

    <AccessibilityGuidelines />

    <FontPairings />

    <TypeScaleGroup
      title="Display"
      description="Reserved for large, short text like marketing headlines. Use Poppins font family with bold weight (700) for maximum contrast against soft backgrounds. Never apply neomorphic shadows to display text."
      scales={[
        {
          name: 'Display XL',
          sizeVar: '--neo-font-display-xl',
          lineHeightVar: '--neo-line-height-display-xl',
          weight: '700',
          weightValue: 'Bold (700)',
          letterSpacing: '-0.02em',
          fontFamily: 'var(--neo-font-family-display)',
          sample: 'Display XL',
          size: '76px',
        },
        {
          name: 'Display Large',
          sizeVar: '--neo-font-display-lg',
          lineHeightVar: '--neo-line-height-display-lg',
          weight: '700',
          weightValue: 'Bold (700)',
          letterSpacing: '-0.02em',
          fontFamily: 'var(--neo-font-family-display)',
          sample: 'Display Large',
          size: '61px',
        },
        {
          name: 'Display Medium',
          sizeVar: '--neo-font-display-md',
          lineHeightVar: '--neo-line-height-display-md',
          weight: '700',
          weightValue: 'Bold (700)',
          letterSpacing: '-0.02em',
          fontFamily: 'var(--neo-font-family-display)',
          sample: 'Display Medium',
          size: '49px',
        },
        {
          name: 'Display Small',
          sizeVar: '--neo-font-display-sm',
          lineHeightVar: '--neo-line-height-display-sm',
          weight: '700',
          weightValue: 'Bold (700)',
          letterSpacing: '-0.02em',
          fontFamily: 'var(--neo-font-family-display)',
          sample: 'Display Small',
          size: '39px',
        },
      ]}
    />

    <TypeScaleGroup
      title="Headline"
      description="For short, high-emphasis text on smaller screens. Semibold weight (600) provides clear hierarchy without overwhelming the soft UI aesthetic."
      scales={[
        {
          name: 'Headline Large',
          sizeVar: '--neo-font-headline-lg',
          lineHeightVar: '--neo-line-height-headline-lg',
          weight: '600',
          weightValue: 'Semibold (600)',
          letterSpacing: '-0.015em',
          sample: 'Headline Large',
          size: '31px',
        },
        {
          name: 'Headline Medium',
          sizeVar: '--neo-font-headline-md',
          lineHeightVar: '--neo-line-height-headline-md',
          weight: '600',
          weightValue: 'Semibold (600)',
          letterSpacing: '-0.015em',
          sample: 'Headline Medium',
          size: '25px',
        },
        {
          name: 'Headline Small',
          sizeVar: '--neo-font-headline-sm',
          lineHeightVar: '--neo-line-height-headline-sm',
          weight: '600',
          weightValue: 'Semibold (600)',
          letterSpacing: '-0.015em',
          sample: 'Headline Small',
          size: '20px',
        },
      ]}
    />

    <TypeScaleGroup
      title="Title"
      description="For section titles and medium-emphasis text. Medium weight (500) balances visibility with reading comfort."
      scales={[
        {
          name: 'Title Large',
          sizeVar: '--neo-font-title-lg',
          lineHeightVar: '--neo-line-height-title-lg',
          weight: '500',
          weightValue: 'Medium (500)',
          sample: 'Title Large',
          size: '20px',
        },
        {
          name: 'Title Medium',
          sizeVar: '--neo-font-title-md',
          lineHeightVar: '--neo-line-height-title-md',
          weight: '500',
          weightValue: 'Medium (500)',
          sample: 'Title Medium',
          size: '16px',
        },
        {
          name: 'Title Small',
          sizeVar: '--neo-font-title-sm',
          lineHeightVar: '--neo-line-height-title-sm',
          weight: '500',
          weightValue: 'Medium (500)',
          sample: 'Title Small',
          size: '14px',
        },
      ]}
    />

    <TypeScaleGroup
      title="Body"
      description="For longer passages of text. Minimum 16px ensures accessibility. Line height of 1.5x-1.75x improves scanning against soft backgrounds. Keep text flat and high-contrast—never apply neomorphic effects."
      scales={[
        {
          name: 'Body Large',
          sizeVar: '--neo-font-body-lg',
          lineHeightVar: '--neo-line-height-body-lg',
          weight: '400',
          weightValue: 'Regular (400)',
          letterSpacing: '0.01em',
          size: '18px',
        },
        {
          name: 'Body Medium',
          sizeVar: '--neo-font-body-md',
          lineHeightVar: '--neo-line-height-body-md',
          weight: '400',
          weightValue: 'Regular (400)',
          letterSpacing: '0.01em',
          size: '16px (Base)',
        },
        {
          name: 'Body Small',
          sizeVar: '--neo-font-body-sm',
          lineHeightVar: '--neo-line-height-body-sm',
          weight: '400',
          weightValue: 'Regular (400)',
          letterSpacing: '0.01em',
          size: '14px',
        },
      ]}
    />

    <TypeScaleGroup
      title="Label"
      description="For UI elements like buttons, form inputs, and navigation. Looser letter-spacing (0.02em) improves character recognition at small sizes. For ALL CAPS labels, use 0.08em tracking."
      scales={[
        {
          name: 'Label Large',
          sizeVar: '--neo-font-label-lg',
          lineHeightVar: '--neo-line-height-label-lg',
          weight: '500',
          weightValue: 'Medium (500)',
          letterSpacing: '0.02em',
          sample: 'Label Large - Button Text',
          size: '14px',
        },
        {
          name: 'Label Medium',
          sizeVar: '--neo-font-label-md',
          lineHeightVar: '--neo-line-height-label-md',
          weight: '500',
          weightValue: 'Medium (500)',
          letterSpacing: '0.02em',
          sample: 'Label Medium - Form labels',
          size: '12px',
        },
        {
          name: 'Label Small',
          sizeVar: '--neo-font-label-sm',
          lineHeightVar: '--neo-line-height-label-sm',
          weight: '500',
          weightValue: 'Medium (500)',
          letterSpacing: '0.02em',
          sample: 'Label Small - Minimum UI text',
          size: '11px',
        },
      ]}
    />

    <TypeScaleGroup
      title="Overline & Caption"
      description="Supporting text styles. Overline uses wide tracking (0.1em) for all-caps identification text. Caption provides context without competing with primary content."
      scales={[
        {
          name: 'Overline',
          sizeVar: '--neo-font-overline',
          lineHeightVar: '--neo-line-height-caption',
          weight: '600',
          weightValue: 'Semibold (600)',
          letterSpacing: '0.1em',
          sample: 'OVERLINE TEXT',
          size: '11px',
        },
        {
          name: 'Caption',
          sizeVar: '--neo-font-caption',
          lineHeightVar: '--neo-line-height-caption',
          weight: '400',
          weightValue: 'Regular (400)',
          sample: 'Caption text for supporting information',
          size: '12px',
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
