import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';
import { Surface } from '../../foundation/Surface';

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'pills', 'enclosed'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabList>
        <Tab value="tab1">Overview</Tab>
        <Tab value="tab2">Settings</Tab>
        <Tab value="tab3">Billing</Tab>
      </TabList>
      <TabPanel value="tab1">
        <p style={{ margin: 0, color: 'var(--neo-text)' }}>Overview content goes here.</p>
      </TabPanel>
      <TabPanel value="tab2">
        <p style={{ margin: 0, color: 'var(--neo-text)' }}>Settings content goes here.</p>
      </TabPanel>
      <TabPanel value="tab3">
        <p style={{ margin: 0, color: 'var(--neo-text)' }}>Billing content goes here.</p>
      </TabPanel>
    </Tabs>
  ),
};

export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="tab1" variant="pills">
      <TabList>
        <Tab value="tab1">All</Tab>
        <Tab value="tab2">Active</Tab>
        <Tab value="tab3">Completed</Tab>
      </TabList>
      <TabPanel value="tab1">All items shown.</TabPanel>
      <TabPanel value="tab2">Active items shown.</TabPanel>
      <TabPanel value="tab3">Completed items shown.</TabPanel>
    </Tabs>
  ),
};

export const Enclosed: Story = {
  render: () => (
    <Tabs defaultValue="tab1" variant="enclosed">
      <TabList>
        <Tab value="tab1">Details</Tab>
        <Tab value="tab2">Comments</Tab>
        <Tab value="tab3">History</Tab>
      </TabList>
      <TabPanel value="tab1">Details content.</TabPanel>
      <TabPanel value="tab2">Comments content.</TabPanel>
      <TabPanel value="tab3">History content.</TabPanel>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => {
    const HomeIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    );
    const SettingsIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    );
    const UserIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );

    return (
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1" icon={<HomeIcon />}>Home</Tab>
          <Tab value="tab2" icon={<SettingsIcon />}>Settings</Tab>
          <Tab value="tab3" icon={<UserIcon />}>Profile</Tab>
        </TabList>
        <TabPanel value="tab1">Home content.</TabPanel>
        <TabPanel value="tab2">Settings content.</TabPanel>
        <TabPanel value="tab3">Profile content.</TabPanel>
      </Tabs>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Tabs defaultValue="tab1" size="sm">
        <TabList>
          <Tab value="tab1">Small</Tab>
          <Tab value="tab2">Tabs</Tab>
        </TabList>
      </Tabs>
      <Tabs defaultValue="tab1" size="md">
        <TabList>
          <Tab value="tab1">Medium</Tab>
          <Tab value="tab2">Tabs</Tab>
        </TabList>
      </Tabs>
      <Tabs defaultValue="tab1" size="lg">
        <TabList>
          <Tab value="tab1">Large</Tab>
          <Tab value="tab2">Tabs</Tab>
        </TabList>
      </Tabs>
    </div>
  ),
};

const ControlledDemo = () => {
  const [value, setValue] = useState('tab1');
  return (
    <Tabs value={value} onChange={setValue}>
      <TabList>
        <Tab value="tab1">First</Tab>
        <Tab value="tab2">Second</Tab>
        <Tab value="tab3">Third</Tab>
      </TabList>
      <TabPanel value="tab1">First panel (controlled)</TabPanel>
      <TabPanel value="tab2">Second panel (controlled)</TabPanel>
      <TabPanel value="tab3">Third panel (controlled)</TabPanel>
    </Tabs>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

export const DarkTheme: Story = {
  render: () => (
    <Tabs defaultValue="tab1" variant="pills">
      <TabList>
        <Tab value="tab1">Overview</Tab>
        <Tab value="tab2">Analytics</Tab>
        <Tab value="tab3">Reports</Tab>
      </TabList>
      <TabPanel value="tab1">Overview content.</TabPanel>
      <TabPanel value="tab2">Analytics content.</TabPanel>
      <TabPanel value="tab3">Reports content.</TabPanel>
    </Tabs>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
