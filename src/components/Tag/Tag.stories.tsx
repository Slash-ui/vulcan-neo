import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tag } from './Tag';
import { Surface } from '../Surface';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['convex', 'concave', 'flat'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error'],
    },
    removable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const HashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

export const Default: Story = {
  args: {
    children: 'Tag',
    variant: 'convex',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <>
      <Tag variant="convex">Convex</Tag>
      <Tag variant="concave">Concave</Tag>
      <Tag variant="flat">Flat</Tag>
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </>
  ),
};

export const Colors: Story = {
  render: () => (
    <>
      <Tag color="default">Default</Tag>
      <Tag color="primary">Primary</Tag>
      <Tag color="success">Success</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="error">Error</Tag>
    </>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <>
      <Tag leftIcon={<HashIcon />}>design</Tag>
      <Tag leftIcon={<HashIcon />} color="primary">react</Tag>
      <Tag leftIcon={<HashIcon />} color="success">typescript</Tag>
    </>
  ),
};

export const Removable: Story = {
  args: {
    children: 'Removable',
    removable: true,
    onRemove: () => console.log('Remove clicked'),
  },
};

const RemovableDemo = () => {
  const [tags, setTags] = useState(['React', 'TypeScript', 'CSS', 'Neomorphism']);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <>
      {tags.map((tag) => (
        <Tag
          key={tag}
          removable
          onRemove={() => removeTag(tag)}
          color="primary"
        >
          {tag}
        </Tag>
      ))}
      {tags.length === 0 && <span style={{ color: 'var(--neo-text-secondary)' }}>All tags removed</span>}
    </>
  );
};

export const RemovableInteractive: Story = {
  render: () => <RemovableDemo />,
};

export const TagCloud: Story = {
  render: () => (
    <>
      <Tag color="primary" variant="flat">JavaScript</Tag>
      <Tag color="success" variant="flat">Python</Tag>
      <Tag color="warning" variant="flat">Go</Tag>
      <Tag color="error" variant="flat">Rust</Tag>
      <Tag color="default" variant="flat">TypeScript</Tag>
      <Tag color="primary" variant="flat">React</Tag>
      <Tag color="success" variant="flat">Vue</Tag>
      <Tag color="warning" variant="flat">Angular</Tag>
    </>
  ),
};

export const DarkTheme: Story = {
  args: {
    children: 'Dark Theme',
    color: 'primary',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
