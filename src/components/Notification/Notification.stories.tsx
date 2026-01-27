import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Notification } from './Notification';
import { Surface } from '../Surface';
import { Button } from '../Button';

const meta: Meta<typeof Notification> = {
  title: 'Molecules/Notification',
  component: Notification,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem', minHeight: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
    },
    duration: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          Show Notification
        </Button>
        <Notification
          open={open}
          onClose={() => setOpen(false)}
          title="Notification Title"
          variant="info"
        >
          This is a notification message.
        </Notification>
      </>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [variant, setVariant] = useState<'info' | 'success' | 'warning' | 'error' | null>(null);

    return (
      <>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant="convex" onClick={() => setVariant('info')}>
            Info
          </Button>
          <Button variant="convex" onClick={() => setVariant('success')}>
            Success
          </Button>
          <Button variant="convex" onClick={() => setVariant('warning')}>
            Warning
          </Button>
          <Button variant="convex" onClick={() => setVariant('error')}>
            Error
          </Button>
        </div>

        {variant && (
          <Notification
            open={true}
            onClose={() => setVariant(null)}
            variant={variant}
            title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Notification`}
          >
            This is a {variant} notification message.
          </Notification>
        )}
      </>
    );
  },
};

export const Positions: Story = {
  render: () => {
    const [position, setPosition] = useState<string | null>(null);

    const positions = [
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ] as const;

    return (
      <>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {positions.map((pos) => (
            <Button key={pos} variant="convex" size="sm" onClick={() => setPosition(pos)}>
              {pos}
            </Button>
          ))}
        </div>

        {position && (
          <Notification
            open={true}
            onClose={() => setPosition(null)}
            position={position as any}
            title="Position Test"
          >
            This notification appears at {position}.
          </Notification>
        )}
      </>
    );
  },
};

export const AutoDismiss: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <div>
          <Button variant="convex" onClick={() => setOpen(true)}>
            Show Auto-Dismiss (3s)
          </Button>
          <p style={{ marginTop: '1rem', color: 'var(--neo-text-secondary)' }}>
            The notification will automatically close after 3 seconds.
          </p>
        </div>
        <Notification
          open={open}
          onClose={() => setOpen(false)}
          duration={3000}
          variant="success"
          title="Auto Dismiss"
        >
          This notification will close in 3 seconds.
        </Notification>
      </>
    );
  },
};

export const Persistent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          Show Persistent Notification
        </Button>
        <Notification
          open={open}
          onClose={() => setOpen(false)}
          duration={0}
          variant="warning"
          title="Action Required"
        >
          This notification won&apos;t auto-dismiss. Click X to close.
        </Notification>
      </>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          Show Notification
        </Button>
        <Notification
          open={open}
          onClose={() => setOpen(false)}
          variant="info"
          title="New Update Available"
          action={
            <Button size="sm" variant="convex" onClick={() => setOpen(false)}>
              Update
            </Button>
          }
          duration={0}
        >
          A new version is ready to install.
        </Notification>
      </>
    );
  },
};

export const MultipleNotifications: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<Array<{ id: number; variant: 'info' | 'success' | 'warning' | 'error' }>>([]);
    let nextId = 0;

    const addNotification = (variant: 'info' | 'success' | 'warning' | 'error') => {
      setNotifications((prev) => [...prev, { id: nextId++, variant }]);
    };

    const removeNotification = (id: number) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
      <>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="convex" onClick={() => addNotification('info')}>
            Add Info
          </Button>
          <Button variant="convex" onClick={() => addNotification('success')}>
            Add Success
          </Button>
          <Button variant="convex" onClick={() => addNotification('error')}>
            Add Error
          </Button>
        </div>

        {notifications.map((n, index) => (
          <Notification
            key={n.id}
            open={true}
            onClose={() => removeNotification(n.id)}
            variant={n.variant}
            title={`Notification ${n.id}`}
            style={{ marginTop: index * 80 }}
          >
            This is notification #{n.id}.
          </Notification>
        ))}
      </>
    );
  },
};

export const DarkTheme: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          Show Dark Notification
        </Button>
        <Notification
          open={open}
          onClose={() => setOpen(false)}
          variant="success"
          title="Dark Theme"
        >
          This notification adapts to dark theme.
        </Notification>
      </>
    );
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem', minHeight: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};
