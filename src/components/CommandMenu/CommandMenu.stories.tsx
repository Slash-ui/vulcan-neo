import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CommandMenu, CommandItem } from './CommandMenu';
import { Surface } from '../Surface';
import { Button } from '../Button';

const meta: Meta<typeof CommandMenu> = {
  title: 'Organisms/CommandMenu',
  component: CommandMenu,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem', minHeight: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const sampleItems: CommandItem[] = [
  {
    id: 'home',
    label: 'Go to Home',
    description: 'Navigate to the home page',
    icon: <HomeIcon />,
    shortcut: '⌘H',
    group: 'Navigation',
  },
  {
    id: 'search',
    label: 'Search',
    description: 'Search for anything',
    icon: <SearchIcon />,
    shortcut: '⌘K',
    group: 'Navigation',
  },
  {
    id: 'new-file',
    label: 'New File',
    description: 'Create a new file',
    icon: <FileIcon />,
    shortcut: '⌘N',
    group: 'Actions',
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Open application settings',
    icon: <SettingsIcon />,
    shortcut: '⌘,',
    group: 'Actions',
  },
  {
    id: 'profile',
    label: 'View Profile',
    description: 'View your user profile',
    icon: <UserIcon />,
    group: 'Account',
  },
  {
    id: 'logout',
    label: 'Log Out',
    description: 'Sign out of your account',
    icon: <UserIcon />,
    group: 'Account',
  },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          Open Command Menu (⌘K)
        </Button>
        <CommandMenu
          open={open}
          onClose={() => setOpen(false)}
          items={sampleItems}
          onSelect={(item) => console.log('Selected:', item)}
        />
      </>
    );
  },
};

export const WithKeyboardShortcut: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    // Handle keyboard shortcut
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
          event.preventDefault();
          setOpen(true);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem' }}>Press <kbd>⌘K</kbd> or <kbd>Ctrl+K</kbd> to open</p>
          <Button variant="convex" onClick={() => setOpen(true)}>
            Or Click Here
          </Button>
        </div>
        <CommandMenu
          open={open}
          onClose={() => setOpen(false)}
          items={sampleItems}
        />
      </>
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const items: CommandItem[] = [
      { id: '1', label: 'Available Action', icon: <FileIcon /> },
      { id: '2', label: 'Disabled Action', icon: <SettingsIcon />, disabled: true },
      { id: '3', label: 'Another Available', icon: <HomeIcon /> },
      { id: '4', label: 'Also Disabled', icon: <UserIcon />, disabled: true },
    ];

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          Open Menu
        </Button>
        <CommandMenu
          open={open}
          onClose={() => setOpen(false)}
          items={items}
        />
      </>
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          Open Empty Menu
        </Button>
        <CommandMenu
          open={open}
          onClose={() => setOpen(false)}
          items={[]}
          emptyMessage="No commands available"
        />
      </>
    );
  },
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          Open Menu
        </Button>
        <CommandMenu
          open={open}
          onClose={() => setOpen(false)}
          items={sampleItems}
          placeholder="What would you like to do?"
        />
      </>
    );
  },
};

export const ManyItems: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const manyItems: CommandItem[] = Array.from({ length: 20 }).map((_, i) => ({
      id: `item-${i}`,
      label: `Command ${i + 1}`,
      description: `This is command number ${i + 1}`,
      icon: <FileIcon />,
      group: i < 7 ? 'Group A' : i < 14 ? 'Group B' : 'Group C',
    }));

    return (
      <>
        <Button variant="convex" onClick={() => setOpen(true)}>
          Open Large Menu
        </Button>
        <CommandMenu
          open={open}
          onClose={() => setOpen(false)}
          items={manyItems}
        />
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
          Open Dark Command Menu
        </Button>
        <CommandMenu
          open={open}
          onClose={() => setOpen(false)}
          items={sampleItems}
        />
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
