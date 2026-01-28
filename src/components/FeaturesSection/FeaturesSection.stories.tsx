import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeaturesSection } from './FeaturesSection';
import { Surface } from '../Surface';

const meta: Meta<typeof FeaturesSection> = {
  title: 'Marketing/FeaturesSection',
  component: FeaturesSection,
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

const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const TrendingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const features = [
  {
    icon: <ZapIcon />,
    title: 'Lightning Fast',
    description:
      'Optimized for performance. Our components are built with speed in mind.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Secure by Default',
    description:
      'Security best practices built-in. No need to worry about vulnerabilities.',
  },
  {
    icon: <TrendingIcon />,
    title: 'Scalable',
    description:
      'From startup to enterprise, our platform scales with your needs.',
  },
  {
    icon: <CodeIcon />,
    title: 'Developer Friendly',
    description:
      'Clean APIs and comprehensive documentation for easy integration.',
  },
];

export const Default: Story = {
  args: {
    eyebrow: 'Features',
    title: 'Everything you need to succeed',
    description:
      'Our platform provides all the tools you need to build, deploy, and scale your applications.',
    features,
  },
};

export const TwoColumns: Story = {
  args: {
    eyebrow: 'Why Choose Us',
    title: 'Built for modern teams',
    features: features.slice(0, 4),
    columns: 2,
  },
};

export const FourColumns: Story = {
  args: {
    title: 'Core Features',
    features,
    columns: 4,
  },
};

export const ListLayout: Story = {
  args: {
    eyebrow: 'Platform',
    title: 'Powerful features for powerful teams',
    description: 'Everything you need to take your product from idea to launch.',
    features: [
      {
        icon: <ZapIcon />,
        title: 'Real-time Collaboration',
        description:
          'Work together in real-time with your team. See changes as they happen and never miss an update.',
        image: 'https://placehold.net/500x300?text=Collaboration',
      },
      {
        icon: <ShieldIcon />,
        title: 'Enterprise Security',
        description:
          'Bank-level encryption and security. Your data is safe with us.',
        image: 'https://placehold.net/500x300?text=Security',
      },
    ],
    layout: 'list',
  },
};

export const AlternatingLayout: Story = {
  args: {
    eyebrow: 'How It Works',
    title: 'Simple process, powerful results',
    features: [
      {
        icon: <ZapIcon />,
        title: 'Connect your tools',
        description:
          'Integrate with your existing workflow in minutes. We support 100+ integrations out of the box.',
        image: 'https://placehold.net/600x400?text=Step+1',
      },
      {
        icon: <TrendingIcon />,
        title: 'Analyze your data',
        description:
          'Get insights from your data with our powerful analytics engine. No data science degree required.',
        image: 'https://placehold.net/600x400?text=Step+2',
      },
      {
        icon: <CodeIcon />,
        title: 'Automate workflows',
        description:
          'Build automated workflows with our visual builder. Save hours of manual work every week.',
        image: 'https://placehold.net/600x400?text=Step+3',
      },
    ],
    layout: 'alternating',
  },
};

export const DarkTheme: Story = {
  args: {
    eyebrow: 'Features',
    title: 'Designed for developers',
    description: 'Build faster with our developer-first approach.',
    features,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark">
        <Story />
      </Surface>
    ),
  ],
};
