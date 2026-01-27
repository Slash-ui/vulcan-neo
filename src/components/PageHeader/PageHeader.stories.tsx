import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';
import { Button } from '../Button';
import { FeaturedIcon } from '../FeaturedIcon';
import { Breadcrumbs, BreadcrumbItem } from '../Breadcrumbs';
import { Surface } from '../Surface';

const meta: Meta<typeof PageHeader> = {
  title: 'Organisms/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: 0, minWidth: '600px' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    bordered: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const Default: Story = {
  args: {
    title: 'Dashboard',
    description: 'Welcome back! Here\'s an overview of your account.',
  },
};

export const WithActions: Story = {
  args: {
    title: 'Team Members',
    description: 'Manage your team members and their account permissions.',
    actions: (
      <>
        <Button variant="flat">Export</Button>
        <Button>Add Member</Button>
      </>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Settings',
    description: 'Manage your account settings and preferences.',
    icon: (
      <FeaturedIcon size="lg" color="primary">
        <SettingsIcon />
      </FeaturedIcon>
    ),
    actions: <Button>Save Changes</Button>,
  },
};

export const WithBreadcrumb: Story = {
  args: {
    title: 'Project Settings',
    description: 'Configure your project settings and integrations.',
    breadcrumb: (
      <Breadcrumbs>
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Projects</BreadcrumbItem>
        <BreadcrumbItem>Settings</BreadcrumbItem>
      </Breadcrumbs>
    ),
    actions: <Button>Save</Button>,
  },
};

export const NoBorder: Story = {
  args: {
    title: 'Analytics',
    description: 'View your analytics and reports.',
    bordered: false,
  },
};

export const DarkTheme: Story = {
  args: {
    title: 'Dashboard',
    description: 'Welcome back! Here\'s an overview of your account.',
    actions: <Button>New Project</Button>,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: 0, minWidth: '600px' }}>
        <Story />
      </Surface>
    ),
  ],
};
