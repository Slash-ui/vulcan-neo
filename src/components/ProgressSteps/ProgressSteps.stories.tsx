import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ProgressSteps, Step } from './ProgressSteps';
import { Surface } from '../Surface';
import { Button } from '../Button';

const meta: Meta<typeof ProgressSteps> = {
  title: 'Molecules/ProgressSteps',
  component: ProgressSteps,
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
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    clickable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicSteps: Step[] = [
  { id: 1, label: 'Account' },
  { id: 2, label: 'Details' },
  { id: 3, label: 'Confirm' },
  { id: 4, label: 'Complete' },
];

const detailedSteps: Step[] = [
  { id: 1, label: 'Account Setup', description: 'Create your account' },
  { id: 2, label: 'Personal Details', description: 'Add your information' },
  { id: 3, label: 'Review', description: 'Confirm your details' },
  { id: 4, label: 'Complete', description: 'All done!' },
];

export const Default: Story = {
  args: {
    steps: basicSteps,
    currentStep: 1,
  },
};

export const Interactive: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div>
        <ProgressSteps steps={basicSteps} currentStep={currentStep} />
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'center' }}>
          <Button
            variant="flat"
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            variant="convex"
            onClick={() => setCurrentStep((s) => Math.min(basicSteps.length - 1, s + 1))}
            disabled={currentStep === basicSteps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
};

export const WithDescriptions: Story = {
  render: () => (
    <ProgressSteps steps={detailedSteps} currentStep={2} />
  ),
};

export const Vertical: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);

    return (
      <div style={{ display: 'flex', gap: '3rem' }}>
        <ProgressSteps
          steps={detailedSteps}
          currentStep={currentStep}
          orientation="vertical"
        />
        <div>
          <h3 style={{ margin: '0 0 1rem' }}>{detailedSteps[currentStep].label}</h3>
          <p style={{ color: 'var(--neo-text-secondary)', marginBottom: '1rem' }}>
            {detailedSteps[currentStep].description}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              variant="flat"
              size="sm"
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              variant="convex"
              size="sm"
              onClick={() => setCurrentStep((s) => Math.min(detailedSteps.length - 1, s + 1))}
              disabled={currentStep === detailedSteps.length - 1}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--neo-text-secondary)' }}>Small</p>
        <ProgressSteps steps={basicSteps} currentStep={1} size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--neo-text-secondary)' }}>Medium</p>
        <ProgressSteps steps={basicSteps} currentStep={1} size="md" />
      </div>
      <div>
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--neo-text-secondary)' }}>Large</p>
        <ProgressSteps steps={basicSteps} currentStep={1} size="lg" />
      </div>
    </div>
  ),
};

export const Clickable: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);

    return (
      <ProgressSteps
        steps={basicSteps}
        currentStep={currentStep}
        clickable
        onStepClick={setCurrentStep}
      />
    );
  },
};

export const CustomIcons: Story = {
  render: () => {
    const UserIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );

    const CreditCardIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    );

    const CheckCircleIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    );

    const stepsWithIcons: Step[] = [
      { id: 1, label: 'Account', icon: <UserIcon /> },
      { id: 2, label: 'Payment', icon: <CreditCardIcon /> },
      { id: 3, label: 'Complete', icon: <CheckCircleIcon /> },
    ];

    return (
      <ProgressSteps
        steps={stepsWithIcons}
        currentStep={1}
        showCheckIcon={false}
      />
    );
  },
};

export const AllCompleted: Story = {
  args: {
    steps: basicSteps,
    currentStep: basicSteps.length,
  },
};

export const FirstStep: Story = {
  args: {
    steps: detailedSteps,
    currentStep: 0,
  },
};

export const DarkTheme: Story = {
  render: () => (
    <ProgressSteps steps={detailedSteps} currentStep={2} />
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
