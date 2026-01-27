import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { Surface } from '../Surface';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
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
    indeterminate: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    size: 'md',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked',
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium" />
      <Checkbox size="lg" label="Large" />
    </>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <>
      <Checkbox labelPosition="left" label="Label on left" />
      <Checkbox labelPosition="right" label="Label on right" />
    </>
  ),
};

export const WithoutLabel: Story = {
  render: () => (
    <>
      <Checkbox size="sm" aria-label="Small checkbox" />
      <Checkbox size="md" aria-label="Medium checkbox" />
      <Checkbox size="lg" aria-label="Large checkbox" />
    </>
  ),
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
};

export const States: Story = {
  render: () => (
    <>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
    </>
  ),
};

export const Disabled: Story = {
  render: () => (
    <>
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Checkbox label="Option 1" name="group" defaultChecked />
      <Checkbox label="Option 2" name="group" />
      <Checkbox label="Option 3" name="group" />
      <Checkbox label="Option 4" name="group" disabled />
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
    label: 'Dark theme checkbox',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
