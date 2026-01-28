import type { Meta, StoryObj } from '@storybook/react-vite';
import { MarketingHeader } from './MarketingHeader';
import { Surface } from '../Surface';

const meta: Meta<typeof MarketingHeader> = {
  title: 'Marketing/MarketingHeader',
  component: MarketingHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '400px' }}>
        <Story />
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

const navItems = [
  {
    label: 'Products',
    children: [
      { label: 'Analytics', href: '#' },
      { label: 'Automation', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
  {
    label: 'Solutions',
    children: [
      { label: 'Enterprise', href: '#' },
      { label: 'Startups', href: '#' },
      { label: 'Developers', href: '#' },
    ],
  },
  { label: 'Pricing', href: '#' },
  { label: 'Resources', href: '#' },
  { label: 'Company', href: '#' },
];

export const Default: Story = {
  args: {
    logo: <Logo />,
    navItems,
    ctaText: 'Get Started',
    secondaryCtaText: 'Sign In',
    onCtaClick: () => console.log('CTA clicked'),
    onSecondaryCtaClick: () => console.log('Secondary CTA clicked'),
  },
};

export const WithAnnouncement: Story = {
  args: {
    logo: <Logo />,
    navItems,
    ctaText: 'Get Started',
    secondaryCtaText: 'Sign In',
    announcement: (
      <span>
        🎉 Announcing our Series A funding!{' '}
        <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>
          Learn more →
        </a>
      </span>
    ),
  },
};

export const StickyHeader: Story = {
  args: {
    logo: <Logo />,
    navItems,
    ctaText: 'Get Started',
    secondaryCtaText: 'Sign In',
    sticky: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '200vh' }}>
        <Story />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Scroll down to see the sticky header</p>
        </div>
      </Surface>
    ),
  ],
};

export const SimpleNav: Story = {
  args: {
    logo: <Logo />,
    navItems: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    ctaText: 'Sign Up',
  },
};

export const DarkTheme: Story = {
  args: {
    logo: <Logo />,
    navItems,
    ctaText: 'Get Started',
    secondaryCtaText: 'Sign In',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ minHeight: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};
