import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InlineCTA } from './InlineCTA';

describe('InlineCTA', () => {
  it('renders title', () => {
    render(<InlineCTA title="Upgrade Now" />);
    expect(screen.getByText('Upgrade Now')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<InlineCTA title="Title" description="Get premium features" />);
    expect(screen.getByText('Get premium features')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<InlineCTA title="Title" icon={<span data-testid="icon">🚀</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders primary action', () => {
    render(<InlineCTA title="Title" primaryAction={<button>Upgrade</button>} />);
    expect(screen.getByText('Upgrade')).toBeInTheDocument();
  });

  it('renders secondary action', () => {
    render(<InlineCTA title="Title" secondaryAction={<button>Learn More</button>} />);
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('renders both actions', () => {
    render(
      <InlineCTA
        title="Title"
        primaryAction={<button>Primary</button>}
        secondaryAction={<button>Secondary</button>}
      />
    );
    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  it('shows dismiss button when dismissible', () => {
    render(<InlineCTA title="Title" dismissible />);
    expect(screen.getByLabelText('Dismiss')).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button clicked', () => {
    const handleDismiss = vi.fn();
    render(<InlineCTA title="Title" dismissible onDismiss={handleDismiss} />);
    fireEvent.click(screen.getByLabelText('Dismiss'));
    expect(handleDismiss).toHaveBeenCalled();
  });

  it('does not show dismiss button by default', () => {
    render(<InlineCTA title="Title" />);
    expect(screen.queryByLabelText('Dismiss')).not.toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<InlineCTA title="Title" variant="default" data-testid="cta" />);
    expect(screen.getByTestId('cta').className).toContain('default');

    rerender(<InlineCTA title="Title" variant="highlight" data-testid="cta" />);
    expect(screen.getByTestId('cta').className).toContain('highlight');

    rerender(<InlineCTA title="Title" variant="gradient" data-testid="cta" />);
    expect(screen.getByTestId('cta').className).toContain('gradient');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<InlineCTA title="Title" size="sm" data-testid="cta" />);
    expect(screen.getByTestId('cta').className).toContain('sm');

    rerender(<InlineCTA title="Title" size="md" data-testid="cta" />);
    expect(screen.getByTestId('cta').className).toContain('md');

    rerender(<InlineCTA title="Title" size="lg" data-testid="cta" />);
    expect(screen.getByTestId('cta').className).toContain('lg');
  });

  it('applies custom className', () => {
    render(<InlineCTA title="Title" className="custom-cta" data-testid="cta" />);
    expect(screen.getByTestId('cta')).toHaveClass('custom-cta');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<InlineCTA ref={ref} title="Title" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
