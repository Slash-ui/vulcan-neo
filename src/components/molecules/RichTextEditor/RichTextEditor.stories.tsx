import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RichTextEditor } from './RichTextEditor';
import { Surface } from '../../foundation/Surface';

const meta: Meta<typeof RichTextEditor> = {
  title: 'Molecules/RichTextEditor',
  component: RichTextEditor,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showToolbar: {
      control: 'boolean',
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
    label: 'Description',
    placeholder: 'Start typing your content...',
    helperText: 'Use the toolbar to format your text',
  },
};

export const WithDefaultContent: Story = {
  args: {
    label: 'Article Content',
    defaultValue: `
      <h2>Welcome to the Rich Text Editor</h2>
      <p>This is a <strong>neomorphic</strong> rich text editor built with <em>TipTap</em>.</p>
      <p>You can:</p>
      <ul>
        <li>Format text with <strong>bold</strong>, <em>italic</em>, and <u>underline</u></li>
        <li>Create headings (H1, H2, H3)</li>
        <li>Add bullet and numbered lists</li>
        <li>Align text left, center, or right</li>
        <li>Add blockquotes and code blocks</li>
      </ul>
      <blockquote>
        <p>"The best way to predict the future is to create it." - Peter Drucker</p>
      </blockquote>
    `,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <RichTextEditor
        size="sm"
        label="Small Editor"
        placeholder="Small size..."
      />
      <RichTextEditor
        size="md"
        label="Medium Editor"
        placeholder="Medium size (default)..."
      />
      <RichTextEditor
        size="lg"
        label="Large Editor"
        placeholder="Large size..."
      />
    </div>
  ),
};

export const WithoutToolbar: Story = {
  args: {
    label: 'Simple Text',
    placeholder: 'Type here without formatting options...',
    showToolbar: false,
  },
};

export const WithError: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required...',
    error: 'Content is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Editor',
    defaultValue: '<p>This content cannot be edited.</p>',
    disabled: true,
  },
};

const ControlledExample = () => {
  const [content, setContent] = useState('<p>Edit this content...</p>');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <RichTextEditor
        label="Controlled Editor"
        value={content}
        onChange={setContent}
        helperText="Changes are synced with the preview below"
      />
      <div
        style={{
          padding: '1rem',
          background: 'var(--neo-bg)',
          borderRadius: 'var(--neo-radius-sm)',
          boxShadow: 'inset 2px 2px 4px var(--neo-shadow-dark), inset -2px -2px 4px var(--neo-shadow-light)',
        }}
      >
        <strong>HTML Output:</strong>
        <pre style={{ margin: '0.5rem 0', fontSize: '12px', overflow: 'auto' }}>
          {content}
        </pre>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const DarkTheme: Story = {
  args: {
    label: 'Dark Theme Editor',
    placeholder: 'Start typing...',
    defaultValue: '<p>Rich text editing in dark mode.</p>',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const BlogPost: Story = {
  args: {
    label: 'Blog Post',
    size: 'lg',
    defaultValue: `
      <h1>Getting Started with Neomorphism</h1>
      <p>Neomorphism (or Neumorphism) is a design trend that combines elements of <strong>skeuomorphism</strong> and <strong>flat design</strong> to create soft, extruded plastic-like interfaces.</p>
      <h2>Key Principles</h2>
      <ol>
        <li><strong>Soft shadows</strong> - Use light and dark shadows to create depth</li>
        <li><strong>Monochromatic colors</strong> - Keep the color palette simple</li>
        <li><strong>Subtle contrasts</strong> - Avoid harsh contrasts</li>
      </ol>
      <h2>Code Example</h2>
      <pre><code>.neomorphic {
  box-shadow:
    -4px -4px 8px rgba(255,255,255,0.5),
    4px 4px 8px rgba(0,0,0,0.1);
}</code></pre>
      <p>Try experimenting with different shadow values to achieve the perfect effect!</p>
    `,
    helperText: 'Write your blog post content here',
  },
};
