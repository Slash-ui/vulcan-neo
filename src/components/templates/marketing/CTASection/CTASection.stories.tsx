import type { Meta, StoryObj } from '@storybook/react-vite';
import { CTASection } from './CTASection';
import { Surface } from '../../../foundation/Surface';

const meta: Meta<typeof CTASection> = {
  title: 'Marketing/CTASection',
  component: CTASection,
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
    title: 'Ready to get started?',
    description: 'Join thousands of teams already using our platform.',
    primaryCtaText: 'Start Free Trial',
    secondaryCtaText: 'Learn More',
  },
};

export const SplitVariant: Story = {
  args: {
    variant: 'split',
    title: 'Transform your workflow today',
    description:
      'Stop wasting time on manual tasks. Automate your workflow and focus on what matters.',
    primaryCtaText: 'Get Started',
    secondaryCtaText: 'Watch Demo',
    image: 'https://placehold.net/500x350?text=CTA+Image',
  },
};

export const CardVariant: Story = {
  args: {
    variant: 'card',
    title: 'Start your free trial',
    description: 'No credit card required. Cancel anytime.',
    primaryCtaText: 'Try for Free',
  },
};

export const FullWidthVariant: Story = {
  args: {
    variant: 'full-width',
    title: 'Need help getting started?',
    description: 'Our team is here to help you succeed.',
    primaryCtaText: 'Contact Sales',
    secondaryCtaText: 'View Docs',
  },
};

export const PrimaryBackground: Story = {
  args: {
    title: 'Ready to scale your business?',
    description: 'Get started with our enterprise plan today.',
    primaryCtaText: 'Contact Sales',
    secondaryCtaText: 'See Pricing',
    background: 'primary',
  },
};

export const GradientBackground: Story = {
  args: {
    title: 'Join the revolution',
    description: 'Be part of the future of productivity.',
    primaryCtaText: 'Get Early Access',
    background: 'gradient',
  },
};

export const CardWithPrimaryBg: Story = {
  args: {
    variant: 'card',
    title: 'Upgrade your plan',
    description: 'Unlock all features and take your business to the next level.',
    primaryCtaText: 'Upgrade Now',
    secondaryCtaText: 'Compare Plans',
    background: 'primary',
  },
};

export const DarkTheme: Story = {
  args: {
    variant: 'card',
    title: 'Start building today',
    description: 'Everything you need to launch your next project.',
    primaryCtaText: 'Get Started',
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
