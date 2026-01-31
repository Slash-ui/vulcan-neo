import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Rocket, Bell, Shield, Zap } from 'lucide-react';
import { Alert } from './Alert';
import { Surface } from '../../foundation/Surface';
import { Button } from '../../atoms/Button';
import { iconMapLg, createIconArgType } from '../../../../.storybook/icons';

/**
 * A contextual feedback component for displaying important messages to users.
 * Supports multiple severity levels with appropriate visual styling.
 *
 * ## When to Use
 *
 * - **System status**: Inform users about system state or maintenance
 * - **Form feedback**: Success, error, or validation messages
 * - **Notifications**: Important updates that need attention
 * - **Warnings**: Caution users about potential issues
 *
 * ## Key Features
 *
 * - **Four variants**: Info, success, warning, and error states
 * - **Dismissible**: Optional close button with callback
 * - **Custom icons**: Replace default icons for specific contexts
 * - **Action buttons**: Add interactive elements for user response
 * - **Raise animation**: Smooth neomorphic show/hide transitions
 *
 * ## Best Practices
 *
 * - Use appropriate variant for message severity
 * - Keep messages concise and actionable
 * - Use `dismissible` for non-critical alerts
 * - Add action buttons for alerts requiring user response
 */
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
    // Content
    title: {
      control: 'text',
      description: 'Alert title (optional)',
      table: { category: 'Content' },
    },
    children: {
      control: 'text',
      description: 'Alert message content',
      table: { category: 'Content' },
    },
    icon: {
      ...createIconArgType(iconMapLg, 'Custom icon to display'),
      table: { category: 'Content' },
    },
    action: {
      control: false,
      description: 'Action element (e.g., Button) displayed on the right',
      table: { category: 'Content' },
    },

    // Appearance
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert severity level',
      table: { category: 'Appearance', defaultValue: { summary: 'info' } },
    },
    animation: {
      control: 'select',
      options: ['none', 'raise'],
      description: 'Animation style for show/hide transitions',
      table: { category: 'Appearance', defaultValue: { summary: 'none' } },
    },

    // State
    visible: {
      control: 'boolean',
      description: 'Controls visibility (used with animation)',
      table: { category: 'State', defaultValue: { summary: 'true' } },
    },
    dismissible: {
      control: 'boolean',
      description: 'Show close button',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },

    // Events
    onDismiss: {
      action: 'dismissed',
      description: 'Callback when dismiss button is clicked',
      table: { category: 'Events' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default info alert with title and message. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    title: 'Information',
    children: 'This is an informational alert message.',
  },
};

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * Four severity levels for different message types.
 */
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

// =============================================================================
// DISMISSIBLE
// =============================================================================

/**
 * Alerts with close button for user dismissal.
 */
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
      <Button variant="convex" onClick={() => setVisible(true)} label="Show Alert" />
    );
  },
};

// =============================================================================
// WITH ACTION
// =============================================================================

/**
 * Action buttons allow users to respond directly from the alert.
 */
export const WithAction: Story = {
  render: () => (
    <Alert
      variant="info"
      title="New version available"
      action={<Button size="sm" variant="convex" label="Update" />}
    >
      A new version of the application is available.
    </Alert>
  ),
};

// =============================================================================
// CONTENT VARIATIONS
// =============================================================================

/**
 * Alerts without titles for simpler messages.
 */
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

/**
 * Title-only alerts for brief notifications.
 */
export const TitleOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" title="Info: Check your email for verification" />
      <Alert variant="warning" title="Warning: You have unsaved changes" />
    </div>
  ),
};

/**
 * Longer content wraps naturally within the alert.
 */
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

// =============================================================================
// CUSTOM ICONS
// =============================================================================

/**
 * Replace default icons for context-specific alerts.
 */
export const CustomIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert
        variant="success"
        title="Launch Successful!"
        icon={<Rocket size={20} />}
      >
        Your application has been deployed to production.
      </Alert>
      <Alert
        variant="info"
        title="New Notification"
        icon={<Bell size={20} />}
      >
        You have 3 unread messages.
      </Alert>
      <Alert
        variant="warning"
        title="Security Alert"
        icon={<Shield size={20} />}
      >
        Please enable two-factor authentication.
      </Alert>
      <Alert
        variant="error"
        title="Connection Lost"
        icon={<Zap size={20} />}
      >
        Unable to establish connection to the server.
      </Alert>
    </div>
  ),
};

// =============================================================================
// ANIMATIONS
// =============================================================================

/**
 * Raise animation creates a neomorphic show/hide effect.
 */
export const RaiseAnimation: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Button
          variant="convex"
          onClick={() => setVisible(!visible)}
          label={visible ? 'Flatten Alert' : 'Raise Alert'}
        />
        <Alert
          variant="success"
          title="Animated Alert"
          animation="raise"
          visible={visible}
        >
          This alert smoothly raises from the surface when shown and flattens when hidden.
        </Alert>
      </div>
    );
  },
};

/**
 * Combine animation with dismissible for smooth dismiss transitions.
 */
export const AnimatedDismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {!visible && (
          <Button
            variant="convex"
            onClick={() => setVisible(true)}
            label="Show Alert"
          />
        )}
        <Alert
          variant="warning"
          title="Dismissible with Animation"
          animation="raise"
          visible={visible}
          dismissible
          onDismiss={() => setVisible(false)}
        >
          Click the X button to see the flatten animation.
        </Alert>
      </div>
    );
  },
};

/**
 * All variants with raise animation applied.
 */
export const AnimationVariants: Story = {
  render: () => {
    const [visibleStates, setVisibleStates] = useState({
      info: true,
      success: true,
      warning: true,
      error: true,
    });

    const toggleAll = () => {
      const allVisible = Object.values(visibleStates).every(Boolean);
      setVisibleStates({
        info: !allVisible,
        success: !allVisible,
        warning: !allVisible,
        error: !allVisible,
      });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Button
          variant="convex"
          onClick={toggleAll}
          label={Object.values(visibleStates).every(Boolean) ? 'Flatten All' : 'Raise All'}
        />
        <Alert variant="info" title="Information" animation="raise" visible={visibleStates.info}>
          Animated info alert.
        </Alert>
        <Alert variant="success" title="Success" animation="raise" visible={visibleStates.success}>
          Animated success alert.
        </Alert>
        <Alert variant="warning" title="Warning" animation="raise" visible={visibleStates.warning}>
          Animated warning alert.
        </Alert>
        <Alert variant="error" title="Error" animation="raise" visible={visibleStates.error}>
          Animated error alert.
        </Alert>
      </div>
    );
  },
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Alerts adapt to dark theme automatically.
 */
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
