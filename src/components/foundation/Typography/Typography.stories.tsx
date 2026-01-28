import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Foundation/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'button',
        'caption',
        'overline',
      ],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'disabled',
        'error',
        'success',
        'warning',
        'info',
        'inherit',
      ],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify', 'inherit'],
    },
    component: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'label'],
    },
    noWrap: {
      control: 'boolean',
    },
    gutterBottom: {
      control: 'boolean',
    },
    inline: {
      control: 'boolean',
    },
    children: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'body1',
    children: 'Typography Component',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="h1">h1. Heading</Typography>
      <Typography variant="h2">h2. Heading</Typography>
      <Typography variant="h3">h3. Heading</Typography>
      <Typography variant="h4">h4. Heading</Typography>
      <Typography variant="h5">h5. Heading</Typography>
      <Typography variant="h6">h6. Heading</Typography>
      <Typography variant="subtitle1">
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Typography>
      <Typography variant="subtitle2">
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Typography>
      <Typography variant="body1">
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur.
      </Typography>
      <Typography variant="body2">
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur.
      </Typography>
      <Typography variant="button">button text</Typography>
      <Typography variant="caption">caption text</Typography>
      <Typography variant="overline">overline text</Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography variant="body1" color="primary">
        Primary color - main text color
      </Typography>
      <Typography variant="body1" color="secondary">
        Secondary color - secondary text color
      </Typography>
      <Typography variant="body1" color="disabled">
        Disabled color - disabled text color
      </Typography>
      <Typography variant="body1" color="error">
        Error color - error states
      </Typography>
      <Typography variant="body1" color="success">
        Success color - success states
      </Typography>
      <Typography variant="body1" color="warning">
        Warning color - warning states
      </Typography>
      <Typography variant="body1" color="info">
        Info color - informational states
      </Typography>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="body1" align="left">
        Left aligned text
      </Typography>
      <Typography variant="body1" align="center">
        Center aligned text
      </Typography>
      <Typography variant="body1" align="right">
        Right aligned text
      </Typography>
      <Typography variant="body1" align="justify">
        Justified text - Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
      </Typography>
    </div>
  ),
};

export const NoWrap: Story = {
  render: () => (
    <div style={{ width: '250px', border: '1px dashed var(--neo-color-outline)' }}>
      <Typography variant="body1" noWrap>
        This is a very long text that will be truncated with an ellipsis when it overflows
      </Typography>
    </div>
  ),
};

export const GutterBottom: Story = {
  render: () => (
    <div>
      <Typography variant="h4" gutterBottom>
        Heading with Gutter Bottom
      </Typography>
      <Typography variant="body1">
        This paragraph follows the heading with proper spacing applied by gutterBottom.
      </Typography>
    </div>
  ),
};

export const CustomComponent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography variant="h4" component="div">
        h4 rendered as a div
      </Typography>
      <Typography variant="body1" component="span">
        body1 rendered as a span (inline)
      </Typography>
      <Typography variant="subtitle1" component="label">
        subtitle1 rendered as a label
      </Typography>
    </div>
  ),
};

export const ArticleExample: Story = {
  render: () => (
    <article style={{ maxWidth: '600px' }}>
      <Typography variant="overline" color="info" gutterBottom>
        Featured Article
      </Typography>
      <Typography variant="h3" gutterBottom>
        The Future of Design Systems
      </Typography>
      <Typography variant="subtitle1" color="secondary" gutterBottom>
        Exploring how modern design systems are evolving to meet the needs of
        complex applications and diverse teams.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Typography>
      <Typography variant="caption" color="secondary">
        Published on January 28, 2026 · 5 min read
      </Typography>
    </article>
  ),
};

export const CardExample: Story = {
  render: () => (
    <div
      style={{
        padding: '24px',
        background: 'var(--neo-bg)',
        borderRadius: 'var(--neo-radius-md)',
        boxShadow:
          '-6px -6px 12px var(--neo-shadow-light), 6px 6px 12px var(--neo-shadow-dark)',
        maxWidth: '400px',
      }}
    >
      <Typography variant="overline" color="info" gutterBottom>
        New Feature
      </Typography>
      <Typography variant="h6" gutterBottom>
        Dark Mode Support
      </Typography>
      <Typography variant="body2" color="secondary" gutterBottom>
        We've added full dark mode support to all components. Toggle between
        light and dark themes seamlessly.
      </Typography>
      <Typography variant="button" color="info">
        Learn more →
      </Typography>
    </div>
  ),
};

export const CodeUsageExamples: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <Typography variant="h4" gutterBottom>
        Code Examples
      </Typography>
      <Typography variant="body1" color="secondary" gutterBottom>
        Examples showing how to use the Typography component in your code.
      </Typography>

      <div
        style={{
          marginTop: '24px',
          background: 'var(--neo-bg)',
          borderRadius: 'var(--neo-radius-sm)',
          boxShadow:
            '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '16px' }}>
          <Typography variant="subtitle2" gutterBottom>
            Basic Usage
          </Typography>
          <Typography variant="h3" gutterBottom>
            Welcome to Our Platform
          </Typography>
          <Typography variant="body1" color="secondary">
            This demonstrates the Typography component in action.
          </Typography>
        </div>
        <pre
          style={{
            margin: 0,
            padding: '16px',
            background: '#1e1e1e',
            color: '#d4d4d4',
            fontSize: '13px',
            fontFamily: 'var(--neo-font-family-mono)',
            lineHeight: 1.6,
            overflow: 'auto',
          }}
        >
          <code>{`import { Typography } from '@slashui/vulcan-neo';

<Typography variant="h3" gutterBottom>
  Welcome to Our Platform
</Typography>
<Typography variant="body1" color="secondary">
  This demonstrates the Typography component.
</Typography>`}</code>
        </pre>
      </div>

      <div
        style={{
          marginTop: '24px',
          background: 'var(--neo-bg)',
          borderRadius: 'var(--neo-radius-sm)',
          boxShadow:
            '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '16px' }}>
          <Typography variant="subtitle2" gutterBottom>
            Custom Component
          </Typography>
          <Typography variant="body2" color="secondary" gutterBottom>
            Render typography as a different HTML element
          </Typography>
        </div>
        <pre
          style={{
            margin: 0,
            padding: '16px',
            background: '#1e1e1e',
            color: '#d4d4d4',
            fontSize: '13px',
            fontFamily: 'var(--neo-font-family-mono)',
            lineHeight: 1.6,
            overflow: 'auto',
          }}
        >
          <code>{`// Render h4 styles as a div
<Typography variant="h4" component="div">
  Heading styled div
</Typography>

// Render body1 as a span (inline)
<Typography variant="body1" component="span">
  Inline body text
</Typography>`}</code>
        </pre>
      </div>

      <div
        style={{
          marginTop: '24px',
          background: 'var(--neo-bg)',
          borderRadius: 'var(--neo-radius-sm)',
          boxShadow:
            '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '16px' }}>
          <Typography variant="subtitle2" gutterBottom>
            Truncated Text
          </Typography>
          <div
            style={{
              width: '200px',
              border: '1px dashed var(--neo-color-outline)',
              padding: '8px',
            }}
          >
            <Typography variant="body2" noWrap>
              This text will be truncated with ellipsis
            </Typography>
          </div>
        </div>
        <pre
          style={{
            margin: 0,
            padding: '16px',
            background: '#1e1e1e',
            color: '#d4d4d4',
            fontSize: '13px',
            fontFamily: 'var(--neo-font-family-mono)',
            lineHeight: 1.6,
            overflow: 'auto',
          }}
        >
          <code>{`// Truncate text with ellipsis
<Typography variant="body2" noWrap>
  This text will be truncated with ellipsis
</Typography>`}</code>
        </pre>
      </div>
    </div>
  ),
};
