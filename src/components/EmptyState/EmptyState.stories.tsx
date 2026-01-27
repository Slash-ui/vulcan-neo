import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Surface } from '../Surface';
import { Button } from '../Button';

const meta: Meta<typeof EmptyState> = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No items found',
    description: 'There are no items to display at the moment.',
  },
};

export const WithAction: Story = {
  render: () => (
    <EmptyState
      title="No projects yet"
      description="Get started by creating your first project."
      action={<Button variant="convex">Create Project</Button>}
    />
  ),
};

export const WithMultipleActions: Story = {
  render: () => (
    <EmptyState
      title="No notifications"
      description="You're all caught up! Check back later for updates."
      action={<Button variant="convex">Refresh</Button>}
      secondaryAction={<Button variant="flat">Settings</Button>}
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <EmptyState
        size="sm"
        title="Small empty state"
        description="This is the small variant."
      />
      <EmptyState
        size="md"
        title="Medium empty state"
        description="This is the medium variant."
      />
      <EmptyState
        size="lg"
        title="Large empty state"
        description="This is the large variant."
      />
    </div>
  ),
};

export const CustomIcons: Story = {
  render: () => {
    const SearchIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    );

    const InboxIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </svg>
    );

    const CartIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <EmptyState
          icon={<SearchIcon />}
          title="No search results"
          description="Try adjusting your search or filters to find what you're looking for."
          action={<Button variant="convex">Clear Filters</Button>}
        />
        <EmptyState
          icon={<InboxIcon />}
          title="Inbox zero!"
          description="You have no messages at the moment."
        />
        <EmptyState
          icon={<CartIcon />}
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet."
          action={<Button variant="convex">Browse Products</Button>}
        />
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: () => {
    const ErrorIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );

    return (
      <EmptyState
        icon={<ErrorIcon />}
        title="Something went wrong"
        description="We encountered an error while loading your data. Please try again."
        action={<Button variant="convex">Retry</Button>}
        secondaryAction={<Button variant="flat">Contact Support</Button>}
      />
    );
  },
};

export const UploadState: Story = {
  render: () => {
    const UploadIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    );

    return (
      <EmptyState
        icon={<UploadIcon />}
        title="Drop files here"
        description="Or click to browse files from your computer. Supports PNG, JPG, and PDF."
      >
        <p style={{ fontSize: '0.75rem', color: 'var(--neo-text-disabled)', marginTop: '0.5rem' }}>
          Maximum file size: 10MB
        </p>
      </EmptyState>
    );
  },
};

export const Illustration: Story = {
  render: () => (
    <EmptyState
      icon={
        <img
          src="https://placehold.net/120x120?text=🎨"
          alt="Empty illustration"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      }
      title="Create your first design"
      description="Start from scratch or choose from our templates to get started quickly."
      action={<Button variant="convex">Create New</Button>}
      secondaryAction={<Button variant="flat">Browse Templates</Button>}
    />
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <EmptyState
      title="No data available"
      description="There's nothing to show here at the moment."
      action={<Button variant="convex">Refresh</Button>}
    />
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
