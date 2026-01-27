import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';
import { Surface } from '../Surface';

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', maxWidth: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    size: 'md',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    helperText: 'Maximum 500 characters',
  },
};

export const WithError: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    error: 'Message is required',
    defaultValue: '',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Textarea size="sm" placeholder="Small textarea" label="Small" />
      <Textarea size="md" placeholder="Medium textarea" label="Medium" />
      <Textarea size="lg" placeholder="Large textarea" label="Large" />
    </div>
  ),
};

export const ResizeOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Textarea resize="none" placeholder="Cannot resize" label="None" />
      <Textarea resize="vertical" placeholder="Vertical only" label="Vertical" />
      <Textarea resize="both" placeholder="Both directions" label="Both" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Cannot edit...',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Notes',
    defaultValue: 'This is some pre-filled content that demonstrates how the textarea looks with actual text content inside it.',
  },
};

export const DarkTheme: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', maxWidth: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};
