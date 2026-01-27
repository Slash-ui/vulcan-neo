import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './HeroSection';
import { Surface } from '../Surface';
import { Badge } from '../Badge';

const meta: Meta<typeof HeroSection> = {
  title: 'Marketing/HeroSection',
  component: HeroSection,
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

export const Default: Story = {
  args: {
    title: 'Build beautiful apps faster than ever',
    description:
      'A modern design system built with Neomorphism principles. Create stunning interfaces with minimal effort.',
    primaryCtaText: 'Get Started',
    secondaryCtaText: 'Learn More',
    onPrimaryCtaClick: () => console.log('Primary CTA clicked'),
  },
};

export const WithEyebrow: Story = {
  args: {
    eyebrow: <Badge color="primary">New Release</Badge>,
    title: 'Introducing Slash UI 2.0',
    description:
      'The next generation of our design system is here. Faster, more accessible, and more beautiful than ever.',
    primaryCtaText: 'Start Free Trial',
    secondaryCtaText: 'View Demo',
  },
};

export const SplitVariant: Story = {
  args: {
    variant: 'split',
    eyebrow: 'For Developers',
    title: 'Ship products faster with our component library',
    description:
      'Stop wasting time building UI from scratch. Use our pre-built components to ship faster.',
    primaryCtaText: 'Get Started',
    secondaryCtaText: 'Documentation',
    image: 'https://placehold.net/600x400?text=Product+Screenshot',
    imageAlt: 'Product screenshot',
  },
};

export const ImageBackground: Story = {
  args: {
    variant: 'image-background',
    title: 'Transform your business with AI',
    description:
      'Leverage the power of artificial intelligence to automate workflows and drive growth.',
    primaryCtaText: 'Request Demo',
    secondaryCtaText: 'Watch Video',
    backgroundImage: 'https://placehold.net/1920x1080?text=Background',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    eyebrow: 'Enterprise Ready',
    title: 'Scale your infrastructure with confidence',
    description:
      'Our platform handles millions of requests per second with 99.99% uptime.',
    primaryCtaText: 'Talk to Sales',
    secondaryCtaText: 'See Pricing',
  },
};

export const WithAdditionalContent: Story = {
  args: {
    title: 'Trusted by industry leaders',
    description: 'Join thousands of companies already using our platform.',
    primaryCtaText: 'Start Free',
    additionalContent: (
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.5,
        }}
      >
        <img src="https://placehold.net/120x40?text=Logo+1" alt="Company 1" />
        <img src="https://placehold.net/120x40?text=Logo+2" alt="Company 2" />
        <img src="https://placehold.net/120x40?text=Logo+3" alt="Company 3" />
        <img src="https://placehold.net/120x40?text=Logo+4" alt="Company 4" />
      </div>
    ),
  },
};

export const DarkTheme: Story = {
  args: {
    eyebrow: <Badge color="primary">Beta</Badge>,
    title: 'Experience the future of design',
    description:
      'Dark mode support built-in. Beautiful interfaces in any lighting condition.',
    primaryCtaText: 'Try it Now',
    secondaryCtaText: 'Learn More',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark">
        <Story />
      </Surface>
    ),
  ],
};
