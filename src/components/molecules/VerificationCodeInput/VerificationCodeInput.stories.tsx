import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { VerificationCodeInput } from './VerificationCodeInput';
import { Surface } from '../foundation/Surface';

const meta: Meta<typeof VerificationCodeInput> = {
  title: 'Molecules/VerificationCodeInput',
  component: VerificationCodeInput,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    length: {
      control: { type: 'number', min: 4, max: 8 },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    autoFocus: {
      control: 'boolean',
    },
    masked: {
      control: 'boolean',
    },
    error: {
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
    length: 6,
    size: 'md',
    autoFocus: false,
  },
};

const InteractiveDemo = () => {
  const [code, setCode] = useState('');
  const [completed, setCompleted] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <VerificationCodeInput
        onChange={setCode}
        onComplete={(finalCode) => {
          setCompleted(true);
          console.log('Code entered:', finalCode);
        }}
        autoFocus={false}
      />
      <div style={{ fontFamily: 'var(--neo-font-family)', color: 'var(--neo-text-secondary)' }}>
        Current value: {code || '(empty)'}
        {completed && <span style={{ color: 'var(--neo-accent-success)', marginLeft: '1rem' }}>Complete!</span>}
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
};

export const Lengths: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <VerificationCodeInput length={4} autoFocus={false} />
      <VerificationCodeInput length={6} autoFocus={false} />
      <VerificationCodeInput length={8} autoFocus={false} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <VerificationCodeInput size="sm" autoFocus={false} />
      <VerificationCodeInput size="md" autoFocus={false} />
      <VerificationCodeInput size="lg" autoFocus={false} />
    </div>
  ),
};

export const Masked: Story = {
  args: {
    masked: true,
    autoFocus: false,
  },
};

export const WithError: Story = {
  args: {
    error: true,
    autoFocus: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '123456',
  },
};

export const PreFilled: Story = {
  args: {
    value: '123456',
    autoFocus: false,
  },
};

export const FourDigit: Story = {
  args: {
    length: 4,
    autoFocus: false,
  },
};

export const DarkTheme: Story = {
  args: {
    autoFocus: false,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
