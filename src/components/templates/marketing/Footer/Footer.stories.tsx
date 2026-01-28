import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';
import { Surface } from '../../../foundation/Surface';

const meta: Meta<typeof Footer> = {
  title: 'Marketing/Footer',
  component: Footer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '400px' }}>
        <div style={{ paddingTop: '200px' }}>
          <Story />
        </div>
      </Surface>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Logo = () => (
  <div style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--neo-primary)' }}>
    Slash UI
  </div>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const linkGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Community', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
];

const socialLinks = [
  { icon: <TwitterIcon />, href: '#', label: 'Twitter' },
  { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
  { icon: <GitHubIcon />, href: '#', label: 'GitHub' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

export const Default: Story = {
  args: {
    logo: <Logo />,
    description: 'Building the future of design systems with Neomorphism.',
    linkGroups,
    socialLinks,
    copyright: '© 2026 Slash UI. All rights reserved.',
    legalLinks,
  },
};

export const SimpleVariant: Story = {
  args: {
    variant: 'simple',
    logo: <Logo />,
    linkGroups: [
      {
        title: 'Links',
        links: [
          { label: 'Home', href: '#' },
          { label: 'About', href: '#' },
          { label: 'Features', href: '#' },
          { label: 'Pricing', href: '#' },
          { label: 'Contact', href: '#' },
        ],
      },
    ],
    socialLinks,
    copyright: '© 2026 Slash UI. All rights reserved.',
  },
};

export const CenteredVariant: Story = {
  args: {
    variant: 'centered',
    logo: <Logo />,
    description: 'Design systems made beautiful.',
    linkGroups: linkGroups.slice(0, 3),
    socialLinks,
    copyright: '© 2026 Slash UI. All rights reserved.',
    legalLinks,
  },
};

export const MinimalFooter: Story = {
  args: {
    logo: <Logo />,
    socialLinks,
    copyright: '© 2026 Slash UI',
  },
};

export const WithCustomBottomContent: Story = {
  args: {
    logo: <Logo />,
    description: 'Building better products together.',
    linkGroups: linkGroups.slice(0, 2),
    socialLinks,
    bottomContent: (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <p style={{ margin: 0, color: 'var(--neo-text-tertiary)', fontSize: '14px' }}>
          Made with ❤️ by the Slash UI team
        </p>
      </div>
    ),
  },
};

export const DarkTheme: Story = {
  args: {
    logo: <Logo />,
    description: 'Building the future of design systems.',
    linkGroups,
    socialLinks,
    copyright: '© 2026 Slash UI. All rights reserved.',
    legalLinks,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ minHeight: '400px' }}>
        <div style={{ paddingTop: '200px' }}>
          <Story />
        </div>
      </Surface>
    ),
  ],
};
