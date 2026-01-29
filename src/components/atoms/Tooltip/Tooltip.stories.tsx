import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Surface } from '../../foundation/Surface';

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '6rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: {
      control: { type: 'number', min: 0, max: 1000 },
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: false,
      table: {
        type: { summary: 'ReactElement' },
      },
    },
    content: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button label="Hover me" />,
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
      <Tooltip content="Top tooltip" placement="top">
        <Button label="Top" />
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button label="Bottom" />
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left">
        <Button label="Left" />
      </Tooltip>
      <Tooltip content="Right tooltip" placement="right">
        <Button label="Right" />
      </Tooltip>
    </div>
  ),
};

export const WithIconButton: Story = {
  args: {
    content: 'More information',
    placement: 'right',
    children: <IconButton aria-label="Info"><InfoIcon /></IconButton>,
  },
};

export const LongContent: Story = {
  args: {
    content: 'This is a longer tooltip with more detailed information that might span multiple lines.',
    children: <Button label="Hover for details" />,
  },
};

export const CustomDelay: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip content="Instant (0ms)" delay={0}>
        <Button label="Instant" />
      </Tooltip>
      <Tooltip content="Normal (200ms)" delay={200}>
        <Button label="Normal" />
      </Tooltip>
      <Tooltip content="Slow (500ms)" delay={500}>
        <Button label="Slow" />
      </Tooltip>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    content: 'You should not see this',
    disabled: true,
    children: <Button label="Disabled tooltip" />,
  },
};

export const WithRichContent: Story = {
  args: {
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <strong>Keyboard shortcut</strong>
        <span style={{ opacity: 0.8 }}>Ctrl + S</span>
      </div>
    ),
    children: <Button label="Save" />,
  },
};

export const DarkTheme: Story = {
  args: {
    content: 'Dark theme tooltip',
    children: <Button label="Hover me" />,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '6rem', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
};
