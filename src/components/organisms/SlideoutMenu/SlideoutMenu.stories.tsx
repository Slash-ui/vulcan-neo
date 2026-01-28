import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SlideoutMenu } from './SlideoutMenu';
import { Surface } from '../foundation/Surface';
import { Button } from '../atoms/Button';
import { InsetField } from '../atoms/InsetField';
import { Checkbox } from '../atoms/Checkbox';

const meta: Meta<typeof SlideoutMenu> = {
  title: 'Organisms/SlideoutMenu',
  component: SlideoutMenu,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem', minHeight: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
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
          Open Slideout
        </Button>
        <SlideoutMenu
          open={open}
          onClose={() => setOpen(false)}
          title="Panel Title"
          description="This is a slideout panel description."
          footer={
            <>
              <Button variant="flat" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="convex" onClick={() => setOpen(false)}>
                Save Changes
              </Button>
            </>
          }
        >
          <p>This is the slideout panel content. You can place any content here.</p>
        </SlideoutMenu>
      </>
    );
  },
};

export const LeftPosition: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          Open Left Slideout
        </Button>
        <SlideoutMenu
          open={open}
          onClose={() => setOpen(false)}
          position="left"
          title="Left Panel"
          footer={
            <Button variant="convex" onClick={() => setOpen(false)}>
              Close
            </Button>
          }
        >
          <p>This panel slides in from the left side.</p>
        </SlideoutMenu>
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
            {size.toUpperCase()} Panel
          </Button>
        ))}

        <SlideoutMenu
          open={open !== null}
          onClose={() => setOpen(null)}
          title={`${open?.toUpperCase()} Panel`}
          size={open as 'sm' | 'md' | 'lg' | 'xl'}
          footer={
            <Button variant="convex" onClick={() => setOpen(null)}>
              Close
            </Button>
          }
        >
          <p>This is a {open} sized slideout panel.</p>
        </SlideoutMenu>
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
          Edit Profile
        </Button>
        <SlideoutMenu
          open={open}
          onClose={() => setOpen(false)}
          title="Edit Profile"
          description="Make changes to your profile here."
          size="lg"
          footer={
            <>
              <Button variant="flat" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="convex" onClick={() => setOpen(false)}>
                Save Changes
              </Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <InsetField label="Full Name" placeholder="John Doe" />
            <InsetField label="Email" type="email" placeholder="john@example.com" />
            <InsetField label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
            <InsetField label="Bio" placeholder="Tell us about yourself..." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Checkbox label="Receive email notifications" />
              <Checkbox label="Make profile public" />
            </div>
          </div>
        </SlideoutMenu>
      </>
    );
  },
};

export const ShoppingCart: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const cartItems = [
      { name: 'Product One', price: 29.99, qty: 1 },
      { name: 'Product Two', price: 49.99, qty: 2 },
      { name: 'Product Three', price: 19.99, qty: 1 },
    ];

    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          View Cart (3)
        </Button>
        <SlideoutMenu
          open={open}
          onClose={() => setOpen(false)}
          title="Shopping Cart"
          description="3 items in your cart"
          footer={
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 600 }}>Total</span>
                <span style={{ fontWeight: 600 }}>${total.toFixed(2)}</span>
              </div>
              <Button variant="convex" style={{ width: '100%' }}>
                Checkout
              </Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cartItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  borderRadius: '8px',
                  background: 'var(--neo-bg)',
                  boxShadow: 'inset 2px 2px 4px var(--neo-shadow-dark), inset -2px -2px 4px var(--neo-shadow-light)',
                }}
              >
                <div>
                  <div style={{ fontWeight: 500 }}>{item.name}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--neo-text-secondary)' }}>
                    Qty: {item.qty}
                  </div>
                </div>
                <div style={{ fontWeight: 500 }}>${(item.price * item.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </SlideoutMenu>
      </>
    );
  },
};

export const NavigationMenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const menuItems = ['Dashboard', 'Analytics', 'Reports', 'Settings', 'Help Center'];

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          Open Menu
        </Button>
        <SlideoutMenu
          open={open}
          onClose={() => setOpen(false)}
          position="left"
          size="sm"
          title="Navigation"
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: 'var(--neo-font-family)',
                  fontSize: 'var(--neo-font-size-md)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'var(--neo-bg)';
                  e.currentTarget.style.boxShadow = '-3px -3px 6px var(--neo-shadow-light), 3px 3px 6px var(--neo-shadow-dark)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {item}
              </button>
            ))}
          </nav>
        </SlideoutMenu>
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
          Open Dark Slideout
        </Button>
        <SlideoutMenu
          open={open}
          onClose={() => setOpen(false)}
          title="Dark Theme Panel"
          description="This slideout adapts to the dark theme."
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
          <p>The slideout panel content with dark theme styling.</p>
        </SlideoutMenu>
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
