import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders a progressbar element', () => {
    render(<ProgressBar />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets aria-valuenow to current value', () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
  });

  it('sets aria-valuemax to max value', () => {
    render(<ProgressBar max={200} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '200');
  });

  it('calculates percentage correctly', () => {
    render(<ProgressBar value={25} max={100} data-testid="progress" />);
    const fill = document.querySelector('[class*="fill"]');
    expect(fill).toHaveStyle({ width: '25%' });
  });

  it('clamps percentage to 0-100 range', () => {
    const { rerender } = render(<ProgressBar value={150} max={100} />);
    let fill = document.querySelector('[class*="fill"]');
    expect(fill).toHaveStyle({ width: '100%' });

    rerender(<ProgressBar value={-50} max={100} />);
    fill = document.querySelector('[class*="fill"]');
    expect(fill).toHaveStyle({ width: '0%' });
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<ProgressBar size="sm" data-testid="progress" />);
    expect(document.querySelector('[class*="track"]')?.className).toContain('sm');

    rerender(<ProgressBar size="md" data-testid="progress" />);
    expect(document.querySelector('[class*="track"]')?.className).toContain('md');

    rerender(<ProgressBar size="lg" data-testid="progress" />);
    expect(document.querySelector('[class*="track"]')?.className).toContain('lg');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<ProgressBar variant="default" />);
    expect(document.querySelector('[class*="fill"]')?.className).toContain('default');

    rerender(<ProgressBar variant="gradient" />);
    expect(document.querySelector('[class*="fill"]')?.className).toContain('gradient');

    rerender(<ProgressBar variant="glow" />);
    expect(document.querySelector('[class*="fill"]')?.className).toContain('glow');
  });

  it('shows label when showLabel is true', () => {
    render(<ProgressBar value={75} showLabel />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('uses custom formatLabel function', () => {
    render(
      <ProgressBar
        value={50}
        max={100}
        showLabel
        formatLabel={(v, m) => `${v} of ${m}`}
      />
    );
    expect(screen.getByText('50 of 100')).toBeInTheDocument();
  });

  it('applies aria-label', () => {
    render(<ProgressBar aria-label="Loading progress" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Loading progress');
  });

  it('applies custom className', () => {
    render(<ProgressBar className="custom-class" data-testid="progress" />);
    expect(screen.getByTestId('progress')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<ProgressBar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
