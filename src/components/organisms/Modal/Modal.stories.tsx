import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Modal } from './Modal';
import { Surface } from '../../foundation/Surface';
import { Button } from '../../atoms/Button';
import { InsetField } from '../../atoms/InsetField';

const meta: Meta<typeof Modal> = {
  title: 'Organisms/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem', minHeight: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    showCloseButton: {
      control: 'boolean',
    },
    closeOnOverlayClick: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
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
          Open Modal
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Modal Title"
          description="This is a description of the modal content."
          footer={
            <>
              <Button variant="flat" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="convex" onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p>This is the modal content. You can put any content here.</p>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [open, setOpen] = useState<string | null>(null);

    return (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <Button key={size} variant="convex" onClick={() => setOpen(size)}>
            {size.toUpperCase()} Modal
          </Button>
        ))}

        <Modal
          open={open !== null}
          onClose={() => setOpen(null)}
          title={`${open?.toUpperCase()} Modal`}
          size={open as 'sm' | 'md' | 'lg' | 'xl'}
          footer={
            <Button variant="convex" onClick={() => setOpen(null)}>
              Close
            </Button>
          }
        >
          <p>This is a {open} sized modal.</p>
        </Modal>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          Open Form Modal
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Create Account"
          description="Fill in the details below to create your account."
          footer={
            <>
              <Button variant="flat" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="convex" onClick={() => setOpen(false)}>
                Create Account
              </Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <InsetField label="Full Name" placeholder="Enter your name" />
            <InsetField label="Email" type="email" placeholder="Enter your email" />
            <InsetField label="Password" type="password" placeholder="Enter a password" />
          </div>
        </Modal>
      </>
    );
  },
};

export const WithoutCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirmation Required"
          showCloseButton={false}
          closeOnOverlayClick={false}
          closeOnEscape={false}
          footer={
            <>
              <Button variant="flat" onClick={() => setOpen(false)}>
                No, Cancel
              </Button>
              <Button variant="convex" onClick={() => setOpen(false)}>
                Yes, Proceed
              </Button>
            </>
          }
        >
          <p>Are you sure you want to proceed with this action? This cannot be undone.</p>
        </Modal>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          Open Modal with Long Content
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Terms of Service"
          footer={
            <>
              <Button variant="flat" onClick={() => setOpen(false)}>
                Decline
              </Button>
              <Button variant="convex" onClick={() => setOpen(false)}>
                Accept
              </Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </div>
        </Modal>
      </>
    );
  },
};

export const SimpleAlert: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          Show Alert
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="sm"
          title="Alert"
        >
          <p>Your changes have been saved successfully!</p>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="convex" onClick={() => setOpen(false)}>
              OK
            </Button>
          </div>
        </Modal>
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
          Open Dark Modal
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Dark Theme Modal"
          description="This modal appears on a dark themed surface."
          footer={
            <>
              <Button variant="flat" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="convex" onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p>The modal content adapts to the theme automatically.</p>
        </Modal>
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
