import type { Meta, StoryObj } from '@storybook/react-vite';
import { PricingSection } from './PricingSection';
import { Surface } from '../../foundation/Surface';

const meta: Meta<typeof PricingSection> = {
  title: 'Marketing/PricingSection',
  component: PricingSection,
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

const basicPlans = [
  {
    name: 'Starter',
    description: 'Perfect for individuals',
    price: 0,
    period: 'month',
    features: [
      '5 projects',
      '10GB storage',
      'Basic analytics',
      'Email support',
    ],
    ctaText: 'Get Started',
  },
  {
    name: 'Pro',
    description: 'Best for small teams',
    price: 29,
    period: 'month',
    yearlyPrice: 24,
    features: [
      'Unlimited projects',
      '100GB storage',
      'Advanced analytics',
      'Priority support',
      'Team collaboration',
    ],
    ctaText: 'Start Free Trial',
    popular: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    price: 'Custom',
    features: [
      'Everything in Pro',
      'Unlimited storage',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'SAML SSO',
    ],
    ctaText: 'Contact Sales',
  },
];

export const Default: Story = {
  args: {
    eyebrow: 'Pricing',
    title: 'Simple, transparent pricing',
    description: 'Choose the plan that works best for you and your team.',
    plans: basicPlans,
  },
};

export const WithBillingToggle: Story = {
  args: {
    eyebrow: 'Pricing',
    title: 'Choose your plan',
    description: 'Get 20% off when you pay annually.',
    plans: basicPlans,
    showBillingToggle: true,
  },
};

export const TwoPlans: Story = {
  args: {
    title: 'Start building for free',
    description: 'Upgrade anytime as your needs grow.',
    plans: [
      {
        name: 'Free',
        price: 0,
        period: 'forever',
        features: [
          '3 projects',
          '5GB storage',
          'Community support',
        ],
        ctaText: 'Sign Up Free',
      },
      {
        name: 'Premium',
        price: 49,
        period: 'month',
        features: [
          'Unlimited projects',
          'Unlimited storage',
          'Priority support',
          'Advanced features',
        ],
        ctaText: 'Go Premium',
        popular: true,
        badge: 'Best Value',
      },
    ],
  },
};

export const WithFeatureComparison: Story = {
  args: {
    title: 'Compare Plans',
    plans: [
      {
        name: 'Basic',
        price: 9,
        period: 'month',
        features: [
          { text: 'Core features', included: true },
          { text: 'Email support', included: true },
          { text: 'API access', included: false },
          { text: 'Custom domain', included: false },
        ],
        ctaText: 'Choose Basic',
      },
      {
        name: 'Business',
        price: 29,
        period: 'month',
        features: [
          { text: 'Core features', included: true },
          { text: 'Email support', included: true },
          { text: 'API access', included: true },
          { text: 'Custom domain', included: true },
        ],
        ctaText: 'Choose Business',
        popular: true,
      },
    ],
  },
};

export const DarkTheme: Story = {
  args: {
    eyebrow: 'Pricing',
    title: 'Simple pricing for everyone',
    plans: basicPlans,
    showBillingToggle: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark">
        <Story />
      </Surface>
    ),
  ],
};
