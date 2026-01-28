import type { Meta, StoryObj } from '@storybook/react-vite';
import { Surface } from './Surface';

const meta: Meta<typeof Surface> = {
  title: 'Atoms/Surface',
  component: Surface,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
    },
    backgroundColor: {
      control: 'color',
    },
    fullHeight: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    theme: 'light',
    children: (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Light Surface</h2>
        <p>The foundational container for neomorphic components</p>
      </div>
    ),
  },
};

export const Dark: Story = {
  args: {
    theme: 'dark',
    children: (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Dark Surface</h2>
        <p>The foundational container for neomorphic components</p>
      </div>
    ),
  },
  globals: {
    backgrounds: {
      value: "neomorphic-dark"
    }
  },
};

export const CustomBackground: Story = {
  args: {
    backgroundColor: '#D4E4ED',
    children: (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Custom Background</h2>
        <p>Surface with a custom background color</p>
      </div>
    ),
  },
};

export const FullHeight: Story = {
  args: {
    theme: 'light',
    fullHeight: true,
    children: (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Full Height Surface</h2>
        <p>Takes up the full viewport height</p>
      </div>
    ),
  },
};
