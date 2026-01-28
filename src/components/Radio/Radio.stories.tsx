import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';
import { Surface } from '../Surface';

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
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
    label: 'Radio option',
    size: 'md',
  },
};

export const Checked: Story = {
  args: {
    label: 'Selected',
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <Radio size="sm" label="Small" name="sizes" />
      <Radio size="md" label="Medium" name="sizes" />
      <Radio size="lg" label="Large" name="sizes" />
    </>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <>
      <Radio labelPosition="left" label="Label on left" name="position" />
      <Radio labelPosition="right" label="Label on right" name="position" />
    </>
  ),
};

export const WithoutLabel: Story = {
  render: () => (
    <>
      <Radio size="sm" name="nolabel" aria-label="Small radio" />
      <Radio size="md" name="nolabel" aria-label="Medium radio" />
      <Radio size="lg" name="nolabel" aria-label="Large radio" />
    </>
  ),
};

export const Disabled: Story = {
  render: () => (
    <>
      <Radio label="Disabled unselected" disabled name="disabled" />
      <Radio label="Disabled selected" disabled defaultChecked name="disabled2" />
    </>
  ),
};

export const RadioGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Radio label="Option 1" name="group" defaultChecked />
      <Radio label="Option 2" name="group" />
      <Radio label="Option 3" name="group" />
      <Radio label="Option 4 (disabled)" name="group" disabled />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const DarkTheme: Story = {
  args: {
    label: 'Dark theme radio',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
