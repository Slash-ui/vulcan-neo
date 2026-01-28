import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Alert } from './Alert';
import { Surface } from '../foundation/Surface';
import { Button } from '../atoms/Button';

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Alert',
  component: Alert,
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
      options: ['info', 'success', 'warning', 'error'],
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
    title: 'Information',
    children: 'This is an informational alert message.',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" title="Information">
        This is an informational message.
      </Alert>
      <Alert variant="success" title="Success">
        Your changes have been saved successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please review your input before continuing.
      </Alert>
      <Alert variant="error" title="Error">
        There was an error processing your request.
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    return visible ? (
      <Alert
        variant="success"
        title="Profile Updated"
        dismissible
        onDismiss={() => setVisible(false)}
      >
        Your profile has been updated successfully.
      </Alert>
    ) : (
      <Button variant="convex" onClick={() => setVisible(true)}>
        Show Alert
      </Button>
    );
  },
};

export const WithAction: Story = {
  render: () => (
    <Alert
      variant="info"
      title="New version available"
      action={<Button size="sm" variant="convex">Update</Button>}
    >
      A new version of the application is available.
    </Alert>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info">
        This is a simple info message without a title.
      </Alert>
      <Alert variant="success">
        Operation completed successfully!
      </Alert>
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" title="Info: Check your email for verification" />
      <Alert variant="warning" title="Warning: You have unsaved changes" />
    </div>
  ),
};

export const CustomIcon: Story = {
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
      <Alert
        variant="success"
        title="Launch Successful!"
        icon={<RocketIcon />}
      >
        Your application has been deployed to production.
      </Alert>
    );
  },
};

export const LongContent: Story = {
  render: () => (
    <Alert variant="warning" title="System Maintenance" dismissible>
      We will be performing scheduled maintenance on our servers this weekend from
      Saturday 10:00 PM to Sunday 2:00 AM EST. During this time, the service may be
      unavailable or experience intermittent issues. We apologize for any inconvenience
      this may cause. Please save your work before the maintenance window begins.
    </Alert>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" title="Information">
        This is an informational message in dark mode.
      </Alert>
      <Alert variant="success" title="Success">
        Your changes have been saved successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please review your input before continuing.
      </Alert>
      <Alert variant="error" title="Error">
        There was an error processing your request.
      </Alert>
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
