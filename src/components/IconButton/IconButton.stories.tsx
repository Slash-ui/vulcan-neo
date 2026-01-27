import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Surface } from '../Surface';

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['convex', 'flat'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    elevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const Default: Story = {
  args: {
    children: <CloseIcon />,
    'aria-label': 'Close',
    variant: 'convex',
    size: 'md',
    elevation: 'mid',
  },
};

export const Variants: Story = {
  render: () => (
    <>
      <IconButton variant="convex" aria-label="Close"><CloseIcon /></IconButton>
      <IconButton variant="flat" aria-label="Menu"><MenuIcon /></IconButton>
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <IconButton size="sm" aria-label="Close"><CloseIcon /></IconButton>
      <IconButton size="md" aria-label="Close"><CloseIcon /></IconButton>
      <IconButton size="lg" aria-label="Close"><CloseIcon /></IconButton>
    </>
  ),
};

export const Elevations: Story = {
  render: () => (
    <>
      <IconButton elevation="low" aria-label="Settings"><SettingsIcon /></IconButton>
      <IconButton elevation="mid" aria-label="Settings"><SettingsIcon /></IconButton>
      <IconButton elevation="high" aria-label="Settings"><SettingsIcon /></IconButton>
    </>
  ),
};

export const Shapes: Story = {
  render: () => (
    <>
      <IconButton shape="circle" aria-label="Add"><PlusIcon /></IconButton>
      <IconButton shape="square" aria-label="Add"><PlusIcon /></IconButton>
    </>
  ),
};

export const Disabled: Story = {
  args: {
    children: <CloseIcon />,
    'aria-label': 'Close',
    disabled: true,
  },
};

export const DarkTheme: Story = {
  args: {
    children: <CloseIcon />,
    'aria-label': 'Close',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1.5rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
