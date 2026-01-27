import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HeaderNavigation, HeaderNavItem, HeaderNavGroup } from './HeaderNavigation';
import { Surface } from '../Surface';
import { Button } from '../Button';
import { Avatar } from '../Avatar';

const meta: Meta<typeof HeaderNavigation> = {
  title: 'Organisms/HeaderNavigation',
  component: HeaderNavigation,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '400px' }}>
        <Story />
        <div style={{ padding: '2rem' }}>
          <p>Page content goes here...</p>
        </div>
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    sticky: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: 'var(--neo-accent-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
      }}
    >
      S
    </div>
    <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>Slash UI</span>
  </div>
);

const MobileNav = () => {
  const [active, setActive] = useState('home');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <HeaderNavItem active={active === 'home'} onClick={() => setActive('home')}>
        Home
      </HeaderNavItem>
      <HeaderNavItem active={active === 'products'} onClick={() => setActive('products')}>
        Products
      </HeaderNavItem>
      <HeaderNavItem active={active === 'pricing'} onClick={() => setActive('pricing')}>
        Pricing
      </HeaderNavItem>
      <HeaderNavItem active={active === 'about'} onClick={() => setActive('about')}>
        About
      </HeaderNavItem>
    </div>
  );
};

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('home');

    return (
      <HeaderNavigation
        logo={<Logo />}
        navigation={
          <HeaderNavGroup gap="md">
            <HeaderNavItem active={active === 'home'} onClick={() => setActive('home')}>
              Home
            </HeaderNavItem>
            <HeaderNavItem active={active === 'products'} onClick={() => setActive('products')}>
              Products
            </HeaderNavItem>
            <HeaderNavItem active={active === 'pricing'} onClick={() => setActive('pricing')}>
              Pricing
            </HeaderNavItem>
            <HeaderNavItem active={active === 'about'} onClick={() => setActive('about')}>
              About
            </HeaderNavItem>
          </HeaderNavGroup>
        }
        actions={
          <>
            <Button variant="flat" size="sm">
              Log in
            </Button>
            <Button variant="convex" size="sm">
              Sign up
            </Button>
          </>
        }
        mobileMenu={<MobileNav />}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <HeaderNavigation
        size="sm"
        logo={<Logo />}
        navigation={
          <HeaderNavGroup>
            <HeaderNavItem active>Home</HeaderNavItem>
            <HeaderNavItem>Products</HeaderNavItem>
          </HeaderNavGroup>
        }
        showMobileMenu={false}
      />
      <HeaderNavigation
        size="md"
        logo={<Logo />}
        navigation={
          <HeaderNavGroup>
            <HeaderNavItem active>Home</HeaderNavItem>
            <HeaderNavItem>Products</HeaderNavItem>
          </HeaderNavGroup>
        }
        showMobileMenu={false}
      />
      <HeaderNavigation
        size="lg"
        logo={<Logo />}
        navigation={
          <HeaderNavGroup>
            <HeaderNavItem active>Home</HeaderNavItem>
            <HeaderNavItem>Products</HeaderNavItem>
          </HeaderNavGroup>
        }
        showMobileMenu={false}
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const WithUserAvatar: Story = {
  render: () => {
    const [active, setActive] = useState('dashboard');

    return (
      <HeaderNavigation
        logo={<Logo />}
        navigation={
          <HeaderNavGroup gap="md">
            <HeaderNavItem active={active === 'dashboard'} onClick={() => setActive('dashboard')}>
              Dashboard
            </HeaderNavItem>
            <HeaderNavItem active={active === 'projects'} onClick={() => setActive('projects')}>
              Projects
            </HeaderNavItem>
            <HeaderNavItem active={active === 'team'} onClick={() => setActive('team')}>
              Team
            </HeaderNavItem>
            <HeaderNavItem active={active === 'reports'} onClick={() => setActive('reports')}>
              Reports
            </HeaderNavItem>
          </HeaderNavGroup>
        }
        actions={
          <Avatar
            name="John Doe"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
            size="sm"
          />
        }
        mobileMenu={<MobileNav />}
      />
    );
  },
};

export const SimpleHeader: Story = {
  render: () => (
    <HeaderNavigation
      logo={<Logo />}
      actions={
        <Button variant="convex" size="sm">
          Get Started
        </Button>
      }
      showMobileMenu={false}
    />
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <HeaderNavigation
      logo={<Logo />}
      navigation={
        <HeaderNavGroup gap="md">
          <HeaderNavItem active>Home</HeaderNavItem>
          <HeaderNavItem>Products</HeaderNavItem>
          <HeaderNavItem disabled>Enterprise (Coming Soon)</HeaderNavItem>
          <HeaderNavItem>About</HeaderNavItem>
        </HeaderNavGroup>
      }
      showMobileMenu={false}
    />
  ),
};

export const DarkTheme: Story = {
  render: () => {
    const [active, setActive] = useState('home');

    return (
      <HeaderNavigation
        logo={<Logo />}
        navigation={
          <HeaderNavGroup gap="md">
            <HeaderNavItem active={active === 'home'} onClick={() => setActive('home')}>
              Home
            </HeaderNavItem>
            <HeaderNavItem active={active === 'products'} onClick={() => setActive('products')}>
              Products
            </HeaderNavItem>
            <HeaderNavItem active={active === 'pricing'} onClick={() => setActive('pricing')}>
              Pricing
            </HeaderNavItem>
            <HeaderNavItem active={active === 'about'} onClick={() => setActive('about')}>
              About
            </HeaderNavItem>
          </HeaderNavGroup>
        }
        actions={
          <>
            <Button variant="flat" size="sm">
              Log in
            </Button>
            <Button variant="convex" size="sm">
              Sign up
            </Button>
          </>
        }
        mobileMenu={<MobileNav />}
      />
    );
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ minHeight: '400px' }}>
        <Story />
        <div style={{ padding: '2rem' }}>
          <p>Page content goes here...</p>
        </div>
      </Surface>
    ),
  ],
};
