import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ButtonGroup, ButtonGroupItem } from './ButtonGroup';
import { Surface } from '../foundation/Surface';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['convex', 'flat'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    elevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupItem selected>Day</ButtonGroupItem>
      <ButtonGroupItem>Week</ButtonGroupItem>
      <ButtonGroupItem>Month</ButtonGroupItem>
    </ButtonGroup>
  ),
};

const InteractiveDemo = () => {
  const [selected, setSelected] = useState(0);
  return (
    <ButtonGroup>
      {['Day', 'Week', 'Month', 'Year'].map((label, index) => (
        <ButtonGroupItem
          key={label}
          selected={selected === index}
          onClick={() => setSelected(index)}
        >
          {label}
        </ButtonGroupItem>
      ))}
    </ButtonGroup>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
};

export const Sizes: Story = {
  render: () => (
    <>
      <ButtonGroup size="sm">
        <ButtonGroupItem selected>Small</ButtonGroupItem>
        <ButtonGroupItem>Option</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup size="md">
        <ButtonGroupItem selected>Medium</ButtonGroupItem>
        <ButtonGroupItem>Option</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup size="lg">
        <ButtonGroupItem selected>Large</ButtonGroupItem>
        <ButtonGroupItem>Option</ButtonGroupItem>
      </ButtonGroup>
    </>
  ),
};

export const Elevations: Story = {
  render: () => (
    <>
      <ButtonGroup elevation="low">
        <ButtonGroupItem selected>Low</ButtonGroupItem>
        <ButtonGroupItem>Option</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup elevation="mid">
        <ButtonGroupItem selected>Mid</ButtonGroupItem>
        <ButtonGroupItem>Option</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup elevation="high">
        <ButtonGroupItem selected>High</ButtonGroupItem>
        <ButtonGroupItem>Option</ButtonGroupItem>
      </ButtonGroup>
    </>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <ButtonGroupItem selected>Option 1</ButtonGroupItem>
      <ButtonGroupItem>Option 2</ButtonGroupItem>
      <ButtonGroupItem>Option 3</ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupItem selected>Active</ButtonGroupItem>
      <ButtonGroupItem>Normal</ButtonGroupItem>
      <ButtonGroupItem disabled>Disabled</ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <ButtonGroup fullWidth>
      <ButtonGroupItem selected>Left</ButtonGroupItem>
      <ButtonGroupItem>Center</ButtonGroupItem>
      <ButtonGroupItem>Right</ButtonGroupItem>
    </ButtonGroup>
  ),
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', width: '400px' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupItem selected>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      </ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupItem selected>Day</ButtonGroupItem>
      <ButtonGroupItem>Week</ButtonGroupItem>
      <ButtonGroupItem>Month</ButtonGroupItem>
    </ButtonGroup>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
