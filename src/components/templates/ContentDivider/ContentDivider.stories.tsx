import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentDivider } from './ContentDivider';
import { Surface } from '../foundation/Surface';

const meta: Meta<typeof ContentDivider> = {
  title: 'Atoms/ContentDivider',
  component: ContentDivider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'groove'],
    },
    labelPosition: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--neo-text-secondary)' }}>Solid</p>
        <ContentDivider variant="solid" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--neo-text-secondary)' }}>Dashed</p>
        <ContentDivider variant="dashed" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--neo-text-secondary)' }}>Groove</p>
        <ContentDivider variant="groove" />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: 'OR',
  },
};

export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <ContentDivider label="Start" labelPosition="start" />
      <ContentDivider label="Center" labelPosition="center" />
      <ContentDivider label="End" labelPosition="end" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '100px' }}>
      <span style={{ color: 'var(--neo-text)' }}>Item 1</span>
      <ContentDivider orientation="vertical" />
      <span style={{ color: 'var(--neo-text)' }}>Item 2</span>
      <ContentDivider orientation="vertical" variant="dashed" />
      <span style={{ color: 'var(--neo-text)' }}>Item 3</span>
    </div>
  ),
};

export const InContent: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <p style={{ margin: '0 0 16px', color: 'var(--neo-text)' }}>
        This is some content above the divider. It provides context and information.
      </p>
      <ContentDivider label="Continue reading" />
      <p style={{ margin: '16px 0 0', color: 'var(--neo-text)' }}>
        This is additional content below the divider. More details follow here.
      </p>
    </div>
  ),
};

export const DarkTheme: Story = {
  args: {
    label: 'Section',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
