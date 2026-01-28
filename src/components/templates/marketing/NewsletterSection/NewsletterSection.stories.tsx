import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewsletterSection } from './NewsletterSection';
import { Surface } from '../Surface';

const meta: Meta<typeof NewsletterSection> = {
  title: 'Marketing/NewsletterSection',
  component: NewsletterSection,
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
    title: 'Stay up to date',
    description: 'Get the latest news and updates delivered to your inbox.',
    onSubmit: (email) => console.log('Subscribed:', email),
  },
};

export const WithPrivacyText: Story = {
  args: {
    title: 'Subscribe to our newsletter',
    description: 'Weekly insights and tips for modern developers.',
    privacyText: (
      <>
        We care about your data. Read our{' '}
        <a href="#">Privacy Policy</a>.
      </>
    ),
    onSubmit: (email) => console.log('Subscribed:', email),
  },
};

export const CardVariant: Story = {
  args: {
    variant: 'card',
    title: 'Join our mailing list',
    description: 'Be the first to know about new features and releases.',
    buttonText: 'Join Now',
    onSubmit: (email) => console.log('Subscribed:', email),
  },
};

export const SplitVariant: Story = {
  args: {
    variant: 'split',
    title: 'Get our weekly digest',
    description:
      'Curated content from industry experts delivered to your inbox every Friday.',
    buttonText: 'Sign Up',
    image: 'https://placehold.net/500x350?text=Newsletter',
    onSubmit: (email) => console.log('Subscribed:', email),
  },
};

export const PrimaryBackground: Story = {
  args: {
    title: 'Never miss an update',
    description: 'Subscribe to get product updates and company news.',
    background: 'primary',
    onSubmit: (email) => console.log('Subscribed:', email),
  },
};

export const GradientBackground: Story = {
  args: {
    title: 'Join 10,000+ subscribers',
    description: 'The best way to stay informed about our product.',
    background: 'gradient',
    onSubmit: (email) => console.log('Subscribed:', email),
  },
};

export const CardOnPrimary: Story = {
  args: {
    variant: 'card',
    title: 'Stay in the loop',
    description: 'Get notified about important updates.',
    background: 'primary',
    privacyText: 'No spam. Unsubscribe at any time.',
    onSubmit: (email) => console.log('Subscribed:', email),
  },
};

export const DarkTheme: Story = {
  args: {
    variant: 'card',
    title: 'Subscribe to updates',
    description: 'Get the latest news delivered to your inbox.',
    onSubmit: (email) => console.log('Subscribed:', email),
  },
  decorators: [
    (Story) => (
      <Surface theme="dark">
        <Story />
      </Surface>
    ),
  ],
};
