import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from './SectionHeader';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { Surface } from '../foundation/Surface';

const meta: Meta<typeof SectionHeader> = {
  title: 'Molecules/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Section Title',
    description: 'This is a brief description of what this section contains.',
  },
};

export const WithActions: Story = {
  args: {
    title: 'Team Members',
    description: 'Manage your team and their permissions.',
    actions: (
      <>
        <Button variant="flat" size="sm">Export</Button>
        <Button size="sm">Add Member</Button>
      </>
    ),
  },
};

export const WithBadge: Story = {
  args: {
    title: 'Notifications',
    supportingContent: <Badge color="primary" size="sm">New</Badge>,
    description: 'Review your recent notifications.',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SectionHeader size="sm" title="Small Section" description="Small size header" />
      <SectionHeader size="md" title="Medium Section" description="Medium size header" />
      <SectionHeader size="lg" title="Large Section" description="Large size header" />
    </div>
  ),
};

export const TitleOnly: Story = {
  args: {
    title: 'Quick Actions',
  },
};

export const DarkTheme: Story = {
  args: {
    title: 'Section Title',
    description: 'This is a brief description of what this section contains.',
    actions: <Button size="sm">Action</Button>,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
