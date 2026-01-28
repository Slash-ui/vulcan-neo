import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProgressSteps } from './ProgressSteps';

const defaultSteps = [
  { id: 1, label: 'Step 1' },
  { id: 2, label: 'Step 2' },
  { id: 3, label: 'Step 3' },
];

describe('ProgressSteps', () => {
  it('renders all steps', () => {
    render(<ProgressSteps steps={defaultSteps} currentStep={0} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('renders step numbers', () => {
    render(<ProgressSteps steps={defaultSteps} currentStep={0} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders step descriptions when provided', () => {
    const steps = [
      { id: 1, label: 'Step 1', description: 'First step description' },
      { id: 2, label: 'Step 2', description: 'Second step description' },
    ];
    render(<ProgressSteps steps={steps} currentStep={0} />);
    expect(screen.getByText('First step description')).toBeInTheDocument();
    expect(screen.getByText('Second step description')).toBeInTheDocument();
  });

  it('renders custom icons when provided', () => {
    const steps = [
      { id: 1, label: 'Step 1', icon: <span data-testid="custom-icon">★</span> },
    ];
    render(<ProgressSteps steps={steps} currentStep={0} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('marks current step with aria-current', () => {
    render(<ProgressSteps steps={defaultSteps} currentStep={1} />);
    const step2Button = screen.getByText('Step 2').closest('button');
    expect(step2Button).toHaveAttribute('aria-current', 'step');
  });

  it('applies completed status to previous steps', () => {
    render(<ProgressSteps steps={defaultSteps} currentStep={2} data-testid="steps" />);
    const container = screen.getByTestId('steps');
    const steps = container.querySelectorAll('[class*="step_"]');
    expect(steps[0]?.className).toContain('completed');
    expect(steps[1]?.className).toContain('completed');
  });

  it('applies current status to current step', () => {
    render(<ProgressSteps steps={defaultSteps} currentStep={1} data-testid="steps" />);
    const container = screen.getByTestId('steps');
    const steps = container.querySelectorAll('[class*="step_"]');
    expect(steps[1]?.className).toContain('current');
  });

  it('applies upcoming status to future steps', () => {
    render(<ProgressSteps steps={defaultSteps} currentStep={0} data-testid="steps" />);
    const container = screen.getByTestId('steps');
    const steps = container.querySelectorAll('[class*="step_"]');
    expect(steps[1]?.className).toContain('upcoming');
    expect(steps[2]?.className).toContain('upcoming');
  });

  it('shows check icon for completed steps by default', () => {
    render(<ProgressSteps steps={defaultSteps} currentStep={2} />);
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('does not show check icon when showCheckIcon is false', () => {
    render(<ProgressSteps steps={defaultSteps} currentStep={2} showCheckIcon={false} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('steps are not clickable by default', () => {
    render(<ProgressSteps steps={defaultSteps} currentStep={0} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('steps are clickable when clickable prop is true', () => {
    const handleStepClick = vi.fn();
    render(<ProgressSteps steps={defaultSteps} currentStep={0} clickable onStepClick={handleStepClick} />);
    fireEvent.click(screen.getByText('Step 2'));
    expect(handleStepClick).toHaveBeenCalledWith(1);
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<ProgressSteps steps={defaultSteps} currentStep={0} size="sm" data-testid="steps" />);
    expect(screen.getByTestId('steps').className).toContain('sm');

    rerender(<ProgressSteps steps={defaultSteps} currentStep={0} size="md" data-testid="steps" />);
    expect(screen.getByTestId('steps').className).toContain('md');

    rerender(<ProgressSteps steps={defaultSteps} currentStep={0} size="lg" data-testid="steps" />);
    expect(screen.getByTestId('steps').className).toContain('lg');
  });

  it('applies orientation classes correctly', () => {
    const { rerender } = render(
      <ProgressSteps steps={defaultSteps} currentStep={0} orientation="horizontal" data-testid="steps" />
    );
    expect(screen.getByTestId('steps').className).toContain('horizontal');

    rerender(<ProgressSteps steps={defaultSteps} currentStep={0} orientation="vertical" data-testid="steps" />);
    expect(screen.getByTestId('steps').className).toContain('vertical');
  });

  it('applies custom className', () => {
    render(<ProgressSteps steps={defaultSteps} currentStep={0} className="custom-steps" data-testid="steps" />);
    expect(screen.getByTestId('steps')).toHaveClass('custom-steps');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<ProgressSteps ref={ref} steps={defaultSteps} currentStep={0} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
