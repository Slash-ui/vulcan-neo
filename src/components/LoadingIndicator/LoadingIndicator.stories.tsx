import type { Meta, StoryObj } from '@storybook/react';
import { LoadingIndicator, Skeleton } from './LoadingIndicator';
import { Surface } from '../Surface';

const meta: Meta<typeof LoadingIndicator> = {
  title: 'Atoms/LoadingIndicator',
  component: LoadingIndicator,
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
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['spinner', 'dots', 'pulse', 'skeleton'],
    },
    loading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'spinner',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <LoadingIndicator variant="spinner" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Spinner</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingIndicator variant="dots" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Dots</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingIndicator variant="pulse" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Pulse</p>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end' }}>
      <div style={{ textAlign: 'center' }}>
        <LoadingIndicator size="sm" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingIndicator size="md" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingIndicator size="lg" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Large</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingIndicator size="xl" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Extra Large</p>
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem' }}>
      <LoadingIndicator label="Loading..." />
      <LoadingIndicator variant="dots" label="Please wait..." />
      <LoadingIndicator variant="pulse" label="Processing..." />
    </div>
  ),
};

export const SkeletonVariant: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <LoadingIndicator
        variant="skeleton"
        skeletonWidth="100%"
        skeletonHeight={20}
      />
      <div style={{ marginTop: '0.5rem' }}>
        <LoadingIndicator
          variant="skeleton"
          skeletonWidth="80%"
          skeletonHeight={16}
        />
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <LoadingIndicator
          variant="skeleton"
          skeletonWidth="60%"
          skeletonHeight={16}
        />
      </div>
    </div>
  ),
};

export const SkeletonComponent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: 400 }}>
      {/* Card skeleton */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '8px',
          background: 'var(--neo-bg)',
          boxShadow: '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <Skeleton circle height={48} />
          <div style={{ flex: 1 }}>
            <Skeleton width="60%" height={16} />
            <div style={{ marginTop: '0.5rem' }}>
              <Skeleton width="40%" height={12} />
            </div>
          </div>
        </div>
        <Skeleton lines={3} height={14} />
      </div>

      {/* List item skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Skeleton width={40} height={40} borderRadius={8} />
          <div style={{ flex: 1 }}>
            <Skeleton width="80%" height={14} />
            <div style={{ marginTop: '0.5rem' }}>
              <Skeleton width="50%" height={12} />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const FullPageLoader: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
      }}
    >
      <LoadingIndicator size="xl" label="Loading application..." />
    </div>
  ),
};

export const ButtonLoading: Story = {
  render: () => (
    <button
      disabled
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        background: 'var(--neo-bg)',
        border: 'none',
        borderRadius: '8px',
        fontFamily: 'var(--neo-font-family)',
        fontSize: 'var(--neo-font-size-md)',
        cursor: 'not-allowed',
        opacity: 0.7,
        boxShadow: '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
      }}
    >
      <LoadingIndicator size="sm" variant="spinner" />
      Processing...
    </button>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
      <LoadingIndicator variant="spinner" label="Spinner" />
      <LoadingIndicator variant="dots" label="Dots" />
      <LoadingIndicator variant="pulse" label="Pulse" />
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
