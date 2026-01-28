import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentSection } from './ContentSection';
import { Surface } from '../../../foundation/Surface';
import { Card, CardBody } from '../../../molecules/Card';

const meta: Meta<typeof ContentSection> = {
  title: 'Templates/Marketing/ContentSection',
  component: ContentSection,
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

const sampleContent = (
  <>
    <p>
      Welcome to our comprehensive guide. This section will walk you through
      everything you need to know about getting started with our platform.
    </p>
    <h2 id="getting-started">Getting Started</h2>
    <p>
      To begin, you'll need to create an account. This process is quick and
      straightforward. Simply click the <strong>Sign Up</strong> button and
      follow the prompts.
    </p>
    <blockquote>
      <p>
        Pro tip: Use a strong, unique password for your account to ensure
        maximum security.
      </p>
    </blockquote>
    <h2 id="features">Key Features</h2>
    <p>Our platform offers a wide range of features designed to help you succeed:</p>
    <ul>
      <li>Intuitive dashboard with real-time analytics</li>
      <li>Customizable workflows and automation</li>
      <li>Seamless integrations with popular tools</li>
      <li>24/7 customer support</li>
    </ul>
    <h3 id="analytics">Analytics Dashboard</h3>
    <p>
      The analytics dashboard provides a comprehensive overview of your
      performance metrics. You can track key indicators, set goals, and monitor
      progress over time.
    </p>
    <pre>
      <code>{`const analytics = await fetchAnalytics();
console.log(analytics.visitors);`}</code>
    </pre>
    <h3 id="integrations">Integrations</h3>
    <p>
      Connect with your favorite tools including Slack, GitHub, Jira, and more.
      Our API makes it easy to build custom integrations as well.
    </p>
    <h2 id="pricing">Pricing</h2>
    <p>
      We offer flexible pricing plans to suit teams of all sizes. Visit our{' '}
      <a href="#">pricing page</a> for more details.
    </p>
    <hr />
    <p>
      Have questions? Reach out to our <a href="#">support team</a> anytime.
    </p>
  </>
);

const tocItems = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'features', label: 'Key Features' },
  { id: 'analytics', label: 'Analytics Dashboard', level: 2 },
  { id: 'integrations', label: 'Integrations', level: 2 },
  { id: 'pricing', label: 'Pricing' },
];

export const Default: Story = {
  args: {
    eyebrow: 'Documentation',
    title: 'Getting Started Guide',
    children: sampleContent,
  },
};

export const WideVariant: Story = {
  args: {
    title: 'Platform Overview',
    children: sampleContent,
    variant: 'wide',
  },
};

export const NarrowVariant: Story = {
  args: {
    title: 'Quick Start',
    children: sampleContent,
    variant: 'narrow',
  },
};

export const WithTableOfContents: Story = {
  args: {
    eyebrow: 'Guide',
    title: 'Complete Documentation',
    children: sampleContent,
    showToc: true,
    tocItems,
  },
};

export const WithSidebar: Story = {
  args: {
    title: 'Article Title',
    children: sampleContent,
    sidebar: (
      <Card elevation="mid">
        <CardBody>
          <h4 style={{ margin: '0 0 1rem' }}>Related Articles</h4>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '14px' }}>
            <li>
              <a href="#">Getting started with APIs</a>
            </li>
            <li>
              <a href="#">Authentication guide</a>
            </li>
            <li>
              <a href="#">Best practices</a>
            </li>
          </ul>
        </CardBody>
      </Card>
    ),
  },
};

export const WithLeftSidebar: Story = {
  args: {
    title: 'Documentation',
    children: sampleContent,
    sidebarPosition: 'left',
    sidebar: (
      <Card elevation="mid">
        <CardBody>
          <h4 style={{ margin: '0 0 1rem' }}>Navigation</h4>
          <nav style={{ fontSize: '14px' }}>
            <a href="#" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Introduction
            </a>
            <a href="#" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Quick Start
            </a>
            <a href="#" style={{ display: 'block', marginBottom: '0.5rem' }}>
              API Reference
            </a>
            <a href="#" style={{ display: 'block' }}>
              FAQ
            </a>
          </nav>
        </CardBody>
      </Card>
    ),
  },
};

export const BlogPost: Story = {
  args: {
    eyebrow: 'January 27, 2026 • 5 min read',
    title: 'The Future of Design Systems',
    children: (
      <>
        <img
          src="https://placehold.net/800x400?text=Featured+Image"
          alt="Featured"
          style={{ width: '100%', marginBottom: '2rem' }}
        />
        {sampleContent}
      </>
    ),
  },
};

export const DarkTheme: Story = {
  args: {
    eyebrow: 'Documentation',
    title: 'Getting Started',
    children: sampleContent,
    showToc: true,
    tocItems,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark">
        <Story />
      </Surface>
    ),
  ],
};
