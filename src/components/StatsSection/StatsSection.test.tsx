import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatsSection } from './StatsSection';

const defaultStats = [
  { value: '10K+', label: 'Users' },
  { value: '$5M', label: 'Revenue' },
  { value: '99%', label: 'Uptime' },
];

describe('StatsSection', () => {
  it('renders all stats', () => {
    render(<StatsSection stats={defaultStats} />);
    expect(screen.getByText('10K+')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('$5M')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('99%')).toBeInTheDocument();
    expect(screen.getByText('Uptime')).toBeInTheDocument();
  });

  it('renders stat descriptions', () => {
    const stats = [
      { value: '10K+', label: 'Users', description: 'Active monthly users' },
    ];
    render(<StatsSection stats={stats} />);
    expect(screen.getByText('Active monthly users')).toBeInTheDocument();
  });

  it('renders eyebrow', () => {
    render(<StatsSection stats={defaultStats} eyebrow="Our Numbers" />);
    expect(screen.getByText('Our Numbers')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<StatsSection stats={defaultStats} title="Company Stats" />);
    expect(screen.getByText('Company Stats')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <StatsSection stats={defaultStats} description="We're proud of our achievements" />
    );
    expect(screen.getByText("We're proud of our achievements")).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <StatsSection stats={defaultStats} variant="simple" data-testid="stats" />
    );
    expect(screen.getByTestId('stats').className).toContain('simple');

    rerender(
      <StatsSection stats={defaultStats} variant="cards" data-testid="stats" />
    );
    expect(screen.getByTestId('stats').className).toContain('cards');

    rerender(
      <StatsSection stats={defaultStats} variant="inline" data-testid="stats" />
    );
    expect(screen.getByTestId('stats').className).toContain('inline');
  });

  it('applies background classes correctly', () => {
    const { rerender } = render(
      <StatsSection stats={defaultStats} background="default" data-testid="stats" />
    );
    expect(screen.getByTestId('stats').className).toContain('bg-default');

    rerender(
      <StatsSection stats={defaultStats} background="primary" data-testid="stats" />
    );
    expect(screen.getByTestId('stats').className).toContain('bg-primary');

    rerender(
      <StatsSection stats={defaultStats} background="gradient" data-testid="stats" />
    );
    expect(screen.getByTestId('stats').className).toContain('bg-gradient');
  });

  it('applies custom className', () => {
    render(
      <StatsSection stats={defaultStats} className="custom-stats" data-testid="stats" />
    );
    expect(screen.getByTestId('stats')).toHaveClass('custom-stats');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<StatsSection ref={ref} stats={defaultStats} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
