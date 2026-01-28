import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SidebarNavigation, SidebarNavGroup, SidebarNavItem } from './SidebarNavigation';
import { Surface } from '../Surface';
import { Badge } from '../Badge';

const meta: Meta<typeof SidebarNavigation> = {
  title: 'Organisms/SidebarNavigation',
  component: SidebarNavigation,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ height: '600px', display: 'flex' }}>
        <Story />
        <div style={{ flex: 1, padding: '2rem' }}>
          <p>Main content area</p>
        </div>
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    collapsed: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const InboxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('dashboard');

    return (
      <SidebarNavigation header={<Logo />}>
        <SidebarNavGroup label="Menu">
          <SidebarNavItem
            icon={<HomeIcon />}
            active={active === 'dashboard'}
            onClick={() => setActive('dashboard')}
          >
            Dashboard
          </SidebarNavItem>
          <SidebarNavItem
            icon={<UsersIcon />}
            active={active === 'users'}
            onClick={() => setActive('users')}
          >
            Users
          </SidebarNavItem>
          <SidebarNavItem
            icon={<FolderIcon />}
            active={active === 'projects'}
            onClick={() => setActive('projects')}
          >
            Projects
          </SidebarNavItem>
          <SidebarNavItem
            icon={<ChartIcon />}
            active={active === 'analytics'}
            onClick={() => setActive('analytics')}
          >
            Analytics
          </SidebarNavItem>
        </SidebarNavGroup>
        <SidebarNavGroup label="Other">
          <SidebarNavItem
            icon={<InboxIcon />}
            active={active === 'inbox'}
            onClick={() => setActive('inbox')}
            badge={<Badge size="sm" variant="convex">3</Badge>}
          >
            Inbox
          </SidebarNavItem>
          <SidebarNavItem
            icon={<SettingsIcon />}
            active={active === 'settings'}
            onClick={() => setActive('settings')}
          >
            Settings
          </SidebarNavItem>
        </SidebarNavGroup>
      </SidebarNavigation>
    );
  },
};

export const Collapsed: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(true);
    const [active, setActive] = useState('dashboard');

    return (
      <SidebarNavigation
        collapsed={collapsed}
        header={
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
            }}
          >
            {collapsed ? '→' : '←'}
          </button>
        }
      >
        <SidebarNavGroup>
          <SidebarNavItem
            icon={<HomeIcon />}
            active={active === 'dashboard'}
            onClick={() => setActive('dashboard')}
          >
            Dashboard
          </SidebarNavItem>
          <SidebarNavItem
            icon={<UsersIcon />}
            active={active === 'users'}
            onClick={() => setActive('users')}
          >
            Users
          </SidebarNavItem>
          <SidebarNavItem
            icon={<FolderIcon />}
            active={active === 'projects'}
            onClick={() => setActive('projects')}
          >
            Projects
          </SidebarNavItem>
        </SidebarNavGroup>
      </SidebarNavigation>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', height: '400px' }}>
      <SidebarNavigation size="sm">
        <SidebarNavGroup label="Small">
          <SidebarNavItem icon={<HomeIcon />} active>Dashboard</SidebarNavItem>
          <SidebarNavItem icon={<UsersIcon />}>Users</SidebarNavItem>
        </SidebarNavGroup>
      </SidebarNavigation>
      <SidebarNavigation size="md">
        <SidebarNavGroup label="Medium">
          <SidebarNavItem icon={<HomeIcon />} active>Dashboard</SidebarNavItem>
          <SidebarNavItem icon={<UsersIcon />}>Users</SidebarNavItem>
        </SidebarNavGroup>
      </SidebarNavigation>
      <SidebarNavigation size="lg">
        <SidebarNavGroup label="Large">
          <SidebarNavItem icon={<HomeIcon />} active>Dashboard</SidebarNavItem>
          <SidebarNavItem icon={<UsersIcon />}>Users</SidebarNavItem>
        </SidebarNavGroup>
      </SidebarNavigation>
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ height: '500px', display: 'flex' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const WithDisabledItems: Story = {
  render: () => (
    <SidebarNavigation>
      <SidebarNavGroup label="Menu">
        <SidebarNavItem icon={<HomeIcon />} active>Dashboard</SidebarNavItem>
        <SidebarNavItem icon={<UsersIcon />}>Users</SidebarNavItem>
        <SidebarNavItem icon={<ChartIcon />} disabled>Analytics (Coming Soon)</SidebarNavItem>
        <SidebarNavItem icon={<SettingsIcon />}>Settings</SidebarNavItem>
      </SidebarNavGroup>
    </SidebarNavigation>
  ),
};

export const DarkTheme: Story = {
  render: () => {
    const [active, setActive] = useState('dashboard');

    return (
      <SidebarNavigation header={<Logo />}>
        <SidebarNavGroup label="Menu">
          <SidebarNavItem
            icon={<HomeIcon />}
            active={active === 'dashboard'}
            onClick={() => setActive('dashboard')}
          >
            Dashboard
          </SidebarNavItem>
          <SidebarNavItem
            icon={<UsersIcon />}
            active={active === 'users'}
            onClick={() => setActive('users')}
          >
            Users
          </SidebarNavItem>
          <SidebarNavItem
            icon={<FolderIcon />}
            active={active === 'projects'}
            onClick={() => setActive('projects')}
          >
            Projects
          </SidebarNavItem>
        </SidebarNavGroup>
      </SidebarNavigation>
    );
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ height: '600px', display: 'flex' }}>
        <Story />
        <div style={{ flex: 1, padding: '2rem' }}>
          <p>Main content area</p>
        </div>
      </Surface>
    ),
  ],
};
