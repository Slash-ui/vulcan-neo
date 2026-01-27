import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from './Banner';
import { Surface } from '../Surface';

const meta: Meta<typeof Banner> = {
  title: 'Marketing/Banner',
  component: Banner,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '200px', paddingTop: '60px' }}>
        <Story />
      </Surface>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="10" cy="10" r="8" />
    <line x1="10" y1="9" x2="10" y2="14" />
    <circle cx="10" cy="6" r="0.5" fill="currentColor" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 2L11.5 7L16 8L11.5 9L10 14L8.5 9L4 8L8.5 7L10 2Z" />
    <path d="M15 12L15.5 14L17 14.5L15.5 15L15 17L14.5 15L13 14.5L14.5 14L15 12Z" />
  </svg>
);

export const Default: Story = {
  args: {
    children: 'This is an announcement banner with important information.',
  },
};

export const WithCTA: Story = {
  args: {
    children: 'New feature available! Check out our latest release.',
    ctaText: 'Learn more',
    ctaHref: '#',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <InfoIcon />,
    children: 'Your subscription will renew in 3 days.',
    ctaText: 'Manage billing',
    onCtaClick: () => console.log('Manage billing clicked'),
  },
};

export const Dismissible: Story = {
  args: {
    children: 'Welcome to our platform! Get started with our quick tour.',
    ctaText: 'Start tour',
    dismissible: true,
    onDismiss: () => console.log('Banner dismissed'),
  },
};

export const SuccessVariant: Story = {
  args: {
    variant: 'success',
    children: 'Your changes have been saved successfully!',
    dismissible: true,
  },
};

export const WarningVariant: Story = {
  args: {
    variant: 'warning',
    children: 'Your trial expires in 5 days. Upgrade now to keep your data.',
    ctaText: 'Upgrade',
  },
};

export const ErrorVariant: Story = {
  args: {
    variant: 'error',
    children: 'There was an error processing your request. Please try again.',
    ctaText: 'Retry',
    dismissible: true,
  },
};

export const PrimaryVariant: Story = {
  args: {
    variant: 'primary',
    icon: <SparkleIcon />,
    children: "We're excited to announce our new feature launch!",
    ctaText: 'Explore now',
    ctaHref: '#',
  },
};

export const GradientVariant: Story = {
  args: {
    variant: 'gradient',
    icon: <SparkleIcon />,
    children: 'Get 50% off your first year with code LAUNCH50',
    ctaText: 'Claim offer',
    ctaHref: '#',
  },
};

export const TopPosition: Story = {
  args: {
    position: 'top',
    variant: 'primary',
    children: 'This banner is fixed to the top of the viewport.',
    dismissible: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '400px' }}>
        <Story />
        <div style={{ padding: '80px 20px' }}>
          <p>Scroll to see the fixed banner.</p>
        </div>
      </Surface>
    ),
  ],
};

export const DarkTheme: Story = {
  args: {
    variant: 'gradient',
    icon: <SparkleIcon />,
    children: 'Join us for our virtual conference on March 15th!',
    ctaText: 'Register now',
    dismissible: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ minHeight: '200px', paddingTop: '60px' }}>
        <Story />
      </Surface>
    ),
  ],
};
