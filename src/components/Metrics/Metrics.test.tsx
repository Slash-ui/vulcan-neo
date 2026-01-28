import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Metrics, MetricCard } from './Metrics';

const defaultItems = [
  { id: 1, label: 'Revenue', value: '$12,345' },
  { id: 2, label: 'Users', value: '1,234' },
];

describe('Metrics', () => {
  it('renders all metric items', () => {
    render(<Metrics items={defaultItems} />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$12,345')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('applies column classes correctly', () => {
    const { rerender } = render(<Metrics items={defaultItems} columns={2} data-testid="metrics" />);
    expect(screen.getByTestId('metrics').className).toContain('cols-2');

    rerender(<Metrics items={defaultItems} columns={3} data-testid="metrics" />);
    expect(screen.getByTestId('metrics').className).toContain('cols-3');

    rerender(<Metrics items={defaultItems} columns={4} data-testid="metrics" />);
    expect(screen.getByTestId('metrics').className).toContain('cols-4');
  });

  it('applies custom className', () => {
    render(<Metrics items={defaultItems} className="custom-metrics" data-testid="metrics" />);
    expect(screen.getByTestId('metrics')).toHaveClass('custom-metrics');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Metrics ref={ref} items={defaultItems} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('MetricCard', () => {
  it('renders label', () => {
    render(<MetricCard label="Revenue" value="$12,345" />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });

  it('renders value', () => {
    render(<MetricCard label="Revenue" value="$12,345" />);
    expect(screen.getByText('$12,345')).toBeInTheDocument();
  });

  it('renders change indicator', () => {
    render(<MetricCard label="Revenue" value="$12,345" change="+12%" />);
    expect(screen.getByText('+12%')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<MetricCard label="Revenue" value="$12,345" description="Monthly revenue" />);
    expect(screen.getByText('Monthly revenue')).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(<MetricCard label="Revenue" value="$12,345" icon={<span data-testid="icon">💰</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies trend classes', () => {
    const { rerender } = render(
      <MetricCard label="Revenue" value="$12,345" change="+12%" trend="up" />
    );
    // The trend class is on the span that contains both the icon and the change text
    const changeSpan = screen.getByText('+12%').closest('[class*="change"]');
    expect(changeSpan?.className).toContain('up');

    rerender(<MetricCard label="Revenue" value="$12,345" change="-5%" trend="down" />);
    const changeSpan2 = screen.getByText('-5%').closest('[class*="change"]');
    expect(changeSpan2?.className).toContain('down');
  });

  it('shows trend icons', () => {
    const { rerender } = render(
      <MetricCard label="Revenue" value="$12,345" change="+12%" trend="up" />
    );
    expect(document.querySelector('svg')).toBeInTheDocument();

    rerender(<MetricCard label="Revenue" value="$12,345" change="-5%" trend="down" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<MetricCard label="Revenue" value="$12,345" size="sm" data-testid="card" />);
    expect(screen.getByTestId('card').className).toContain('sm');

    rerender(<MetricCard label="Revenue" value="$12,345" size="md" data-testid="card" />);
    expect(screen.getByTestId('card').className).toContain('md');

    rerender(<MetricCard label="Revenue" value="$12,345" size="lg" data-testid="card" />);
    expect(screen.getByTestId('card').className).toContain('lg');
  });

  it('applies custom className', () => {
    render(<MetricCard label="Revenue" value="$12,345" className="custom-card" data-testid="card" />);
    expect(screen.getByTestId('card')).toHaveClass('custom-card');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<MetricCard ref={ref} label="Revenue" value="$12,345" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
