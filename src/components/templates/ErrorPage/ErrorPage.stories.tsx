import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorPage } from './ErrorPage';
import { Surface } from '../Surface';

const meta: Meta<typeof ErrorPage> = {
  title: 'Templates/ErrorPage',
  component: ErrorPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['simple', 'split', 'illustration', 'minimal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    errorCode: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    showSearch: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    errorCode: '404',
    title: 'Page not found',
    description: "Sorry, the page you're looking for doesn't exist or has been moved.",
    primaryActionText: 'Go home',
    secondaryActionText: 'Go back',
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '100vh' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const WithSearch: Story = {
  args: {
    errorCode: '404',
    title: 'Page not found',
    description: "We couldn't find the page you're looking for. Try searching for it below.",
    showSearch: true,
    searchPlaceholder: 'Search for pages...',
    primaryActionText: 'Go home',
    secondaryActionText: 'Go back',
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '100vh' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const WithQuickLinks: Story = {
  args: {
    errorCode: '404',
    title: 'Page not found',
    description: "Sorry, the page you're looking for doesn't exist.",
    primaryActionText: 'Go home',
    secondaryActionText: 'Go back',
    quickLinks: [
      {
        title: 'Documentation',
        description: 'Learn how to use our components',
        href: '/docs',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        ),
      },
      {
        title: 'Blog',
        description: 'Read our latest articles',
        href: '/blog',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        ),
      },
      {
        title: 'Support',
        description: 'Get help from our team',
        href: '/support',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        ),
      },
    ],
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '100vh' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const SplitLayout: Story = {
  args: {
    variant: 'split',
    errorCode: '404',
    title: 'Page not found',
    description:
      "Sorry, the page you're looking for doesn't exist. Here are some helpful links instead.",
    primaryActionText: 'Take me home',
    secondaryActionText: 'Go back',
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '100vh' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const IllustrationLayout: Story = {
  args: {
    variant: 'illustration',
    errorCode: '404',
    title: 'Oops! Page not found',
    description: "We can't seem to find the page you're looking for.",
    primaryActionText: 'Back to home',
    secondaryActionText: 'Go back',
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '100vh' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const MinimalLayout: Story = {
  args: {
    variant: 'minimal',
    errorCode: '404',
    title: 'This page could not be found.',
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '100vh' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const ServerError: Story = {
  args: {
    errorCode: '500',
    title: 'Internal server error',
    description:
      'Sorry, something went wrong on our end. Please try again later or contact support if the problem persists.',
    primaryActionText: 'Try again',
    secondaryActionText: 'Go home',
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '100vh' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const Forbidden: Story = {
  args: {
    errorCode: '403',
    title: 'Access denied',
    description: "You don't have permission to access this page. Please contact your administrator.",
    primaryActionText: 'Go home',
    secondaryActionText: 'Contact support',
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '100vh' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    errorCode: '404',
    title: 'Page not found',
    description: "Sorry, the page you're looking for doesn't exist or has been moved.",
    primaryActionText: 'Go home',
    secondaryActionText: 'Go back',
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '100vh' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    errorCode: '404',
    title: 'Page not found',
    description: "Sorry, the page you're looking for doesn't exist.",
    primaryActionText: 'Go home',
    secondaryActionText: 'Go back',
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '100vh' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const CustomIllustration: Story = {
  args: {
    variant: 'illustration',
    errorCode: '404',
    title: 'Lost in space',
    description: "Houston, we have a problem. The page you're looking for has drifted away.",
    primaryActionText: 'Return to Earth',
    secondaryActionText: 'Go back',
    illustration: (
      <div
        style={{
          width: 300,
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg viewBox="0 0 200 200" width="200" height="200">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="var(--neo-accent-primary)"
            strokeWidth="2"
            strokeDasharray="10 5"
          />
          <circle cx="100" cy="100" r="40" fill="var(--neo-accent-primary)" opacity="0.2" />
          <circle cx="100" cy="100" r="20" fill="var(--neo-accent-primary)" opacity="0.4" />
          <circle cx="100" cy="100" r="8" fill="var(--neo-accent-primary)" />
          <circle cx="60" cy="60" r="4" fill="var(--neo-accent-secondary)" />
          <circle cx="140" cy="70" r="3" fill="var(--neo-accent-secondary)" />
          <circle cx="150" cy="130" r="5" fill="var(--neo-accent-secondary)" />
          <circle cx="50" cy="140" r="3" fill="var(--neo-accent-secondary)" />
        </svg>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '100vh' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const DarkTheme: Story = {
  args: {
    variant: 'illustration',
    errorCode: '404',
    title: 'Page not found',
    description: "Sorry, the page you're looking for doesn't exist or has been moved.",
    primaryActionText: 'Go home',
    secondaryActionText: 'Go back',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ minHeight: '100vh' }}>
        <Story />
      </Surface>
    ),
  ],
};
