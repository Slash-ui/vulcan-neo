import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './RadioGroup';
import { Surface } from '../Surface';

const meta: Meta<typeof RadioGroup> = {
  title: 'Molecules/RadioGroup',
  component: RadioGroup,
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
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup label="Select an option" defaultValue="option1">
      <RadioGroupItem value="option1" label="Option 1" />
      <RadioGroupItem value="option2" label="Option 2" />
      <RadioGroupItem value="option3" label="Option 3" />
    </RadioGroup>
  ),
};

const ControlledDemo = () => {
  const [value, setValue] = useState('starter');
  return (
    <RadioGroup label="Select plan" value={value} onChange={setValue}>
      <RadioGroupItem value="starter" label="Starter" description="Best for small teams" />
      <RadioGroupItem value="pro" label="Professional" description="Best for growing teams" />
      <RadioGroupItem value="enterprise" label="Enterprise" description="Best for large organizations" />
    </RadioGroup>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup label="Notification preferences" defaultValue="all">
      <RadioGroupItem
        value="all"
        label="All notifications"
        description="Receive all notifications via email"
      />
      <RadioGroupItem
        value="important"
        label="Important only"
        description="Only receive critical notifications"
      />
      <RadioGroupItem
        value="none"
        label="No notifications"
        description="Turn off all email notifications"
      />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup label="Select size" orientation="horizontal" defaultValue="md">
      <RadioGroupItem value="sm" label="Small" />
      <RadioGroupItem value="md" label="Medium" />
      <RadioGroupItem value="lg" label="Large" />
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <RadioGroup label="Small" size="sm" defaultValue="a">
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
      <RadioGroup label="Medium" size="md" defaultValue="a">
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
      <RadioGroup label="Large" size="lg" defaultValue="a">
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup label="Disabled group" disabled defaultValue="option1">
      <RadioGroupItem value="option1" label="Option 1" />
      <RadioGroupItem value="option2" label="Option 2" />
      <RadioGroupItem value="option3" label="Option 3" />
    </RadioGroup>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <RadioGroup label="Select theme" defaultValue="dark">
      <RadioGroupItem value="light" label="Light" description="Use light theme" />
      <RadioGroupItem value="dark" label="Dark" description="Use dark theme" />
      <RadioGroupItem value="system" label="System" description="Match system preference" />
    </RadioGroup>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
