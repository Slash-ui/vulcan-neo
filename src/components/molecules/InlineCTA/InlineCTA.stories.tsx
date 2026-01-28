import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { InlineCTA } from './InlineCTA';
import { Surface } from '../foundation/Surface';
import { Button } from '../atoms/Button';

const meta: Meta<typeof InlineCTA> = {
  title: 'Molecules/InlineCTA',
  component: InlineCTA,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'highlight', 'gradient'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    dismissible: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Upgrade to Pro',
    description: 'Get access to all premium features and unlimited storage.',
    primaryAction: <Button variant="convex">Upgrade Now</Button>,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <InlineCTA
        variant="default"
        title="Default Variant"
        description="Standard neomorphic styling."
        primaryAction={<Button variant="convex" size="sm">Action</Button>}
      />
      <InlineCTA
        variant="highlight"
        title="Highlight Variant"
        description="Eye-catching accent color background."
        primaryAction={<Button variant="flat" size="sm">Action</Button>}
      />
      <InlineCTA
        variant="gradient"
        title="Gradient Variant"
        description="Beautiful gradient background."
        primaryAction={<Button variant="flat" size="sm">Action</Button>}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <InlineCTA
        size="sm"
        title="Small CTA"
        description="Compact size for inline usage."
        primaryAction={<Button variant="convex" size="sm">Action</Button>}
      />
      <InlineCTA
        size="md"
        title="Medium CTA"
        description="Default size for most use cases."
        primaryAction={<Button variant="convex" size="md">Action</Button>}
      />
      <InlineCTA
        size="lg"
        title="Large CTA"
        description="Prominent size for important calls to action."
        primaryAction={<Button variant="convex" size="lg">Action</Button>}
      />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => {
    const RocketIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    );

    return (
      <InlineCTA
        icon={<RocketIcon />}
        title="Launch Your Project"
        description="Get your project off the ground with our starter templates."
        primaryAction={<Button variant="convex">Get Started</Button>}
        secondaryAction={<Button variant="flat">Learn More</Button>}
      />
    );
  },
};

export const WithMultipleActions: Story = {
  render: () => (
    <InlineCTA
      title="Ready to get started?"
      description="Join thousands of teams already using our platform."
      primaryAction={<Button variant="convex">Start Free Trial</Button>}
      secondaryAction={<Button variant="flat">Book a Demo</Button>}
    />
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <Button variant="convex" onClick={() => setVisible(true)}>
          Show CTA Again
        </Button>
      );
    }

    return (
      <InlineCTA
        title="New feature available!"
        description="Check out the new dashboard analytics feature."
        primaryAction={<Button variant="convex" size="sm">Try it now</Button>}
        dismissible
        onDismiss={() => setVisible(false)}
      />
    );
  },
};

export const NewsletterCTA: Story = {
  render: () => {
    const MailIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    );

    return (
      <InlineCTA
        variant="highlight"
        icon={<MailIcon />}
        title="Subscribe to our newsletter"
        description="Get the latest updates and news delivered to your inbox."
        primaryAction={<Button variant="flat">Subscribe</Button>}
      />
    );
  },
};

export const UpgradeCTA: Story = {
  render: () => {
    const CrownIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
      </svg>
    );

    return (
      <InlineCTA
        variant="gradient"
        icon={<CrownIcon />}
        title="Upgrade to Premium"
        description="Unlock all features and remove limits on your account."
        primaryAction={<Button variant="flat">Upgrade for $9/mo</Button>}
        secondaryAction={<Button variant="flat">Compare Plans</Button>}
      />
    );
  },
};

export const DarkTheme: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <InlineCTA
        title="Get Started Today"
        description="Join our platform and start building amazing projects."
        primaryAction={<Button variant="convex">Sign Up</Button>}
      />
      <InlineCTA
        variant="highlight"
        title="Special Offer"
        description="50% off your first month with code WELCOME50."
        primaryAction={<Button variant="flat">Apply Code</Button>}
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
