import type { Meta, StoryObj } from '@storybook/react';
import { LogoCloudSection } from './LogoCloudSection';
import { Surface } from '../Surface';

const meta: Meta<typeof LogoCloudSection> = {
  title: 'Marketing/LogoCloudSection',
  component: LogoCloudSection,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light">
        <Story />
      </Surface>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample logos using placeholder images
const sampleLogos = [
  { logo: 'https://placehold.net/120x40?text=Company+A', name: 'Company A' },
  { logo: 'https://placehold.net/120x40?text=Company+B', name: 'Company B' },
  { logo: 'https://placehold.net/120x40?text=Company+C', name: 'Company C' },
  { logo: 'https://placehold.net/120x40?text=Company+D', name: 'Company D' },
  { logo: 'https://placehold.net/120x40?text=Company+E', name: 'Company E' },
  { logo: 'https://placehold.net/120x40?text=Company+F', name: 'Company F' },
];

// SVG icon example
const SvgIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
    <text x="20" y="25" textAnchor="middle" fontSize="12" fill="currentColor">
      Logo
    </text>
  </svg>
);

const logosWithIcons = [
  { logo: <SvgIcon />, name: 'Brand 1' },
  { logo: <SvgIcon />, name: 'Brand 2' },
  { logo: <SvgIcon />, name: 'Brand 3' },
  { logo: <SvgIcon />, name: 'Brand 4' },
  { logo: <SvgIcon />, name: 'Brand 5' },
];

export const Default: Story = {
  args: {
    title: 'Trusted by leading companies',
    logos: sampleLogos,
  },
};

export const WithEyebrow: Story = {
  args: {
    eyebrow: 'Our Partners',
    title: 'Trusted by teams worldwide',
    logos: sampleLogos,
  },
};

export const GridLayout: Story = {
  args: {
    title: 'Our Customers',
    logos: sampleLogos,
    variant: 'grid',
  },
};

export const MarqueeLayout: Story = {
  args: {
    title: 'Trusted by industry leaders',
    logos: [...sampleLogos, ...sampleLogos.slice(0, 3)],
    variant: 'marquee',
  },
};

export const WithLinks: Story = {
  args: {
    title: 'Featured Partners',
    logos: sampleLogos.map((logo, i) => ({
      ...logo,
      href: `https://example.com/partner-${i + 1}`,
    })),
    variant: 'grid',
  },
};

export const ColoredLogos: Story = {
  args: {
    title: 'Our Partners',
    logos: sampleLogos,
    grayscale: false,
  },
};

export const WithReactIcons: Story = {
  args: {
    eyebrow: 'Integrations',
    title: 'Works with your favorite tools',
    logos: logosWithIcons,
    grayscale: false,
  },
};

export const MinimalNoHeader: Story = {
  args: {
    logos: sampleLogos.slice(0, 5),
  },
};

export const DarkTheme: Story = {
  args: {
    title: 'Trusted by industry leaders',
    logos: sampleLogos,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark">
        <Story />
      </Surface>
    ),
  ],
};
