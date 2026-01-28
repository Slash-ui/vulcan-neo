import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CareersSection } from './CareersSection';

const defaultPositions = [
  { title: 'Software Engineer', department: 'Engineering', location: 'San Francisco', type: 'Full-time' as const },
  { title: 'Product Designer', department: 'Design', location: 'New York', type: 'Remote' as const },
  { title: 'Marketing Manager', department: 'Marketing', location: 'London', type: 'Part-time' as const },
];

describe('CareersSection', () => {
  it('renders title', () => {
    render(<CareersSection title="Join Our Team" positions={defaultPositions} />);
    expect(screen.getByText('Join Our Team')).toBeInTheDocument();
  });

  it('renders eyebrow', () => {
    render(
      <CareersSection title="Title" positions={defaultPositions} eyebrow="Careers" />
    );
    expect(screen.getByText('Careers')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <CareersSection
        title="Title"
        positions={defaultPositions}
        description="We're looking for talented people"
      />
    );
    expect(screen.getByText("We're looking for talented people")).toBeInTheDocument();
  });

  it('renders all positions', () => {
    render(<CareersSection title="Title" positions={defaultPositions} />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Product Designer')).toBeInTheDocument();
    expect(screen.getByText('Marketing Manager')).toBeInTheDocument();
  });

  it('renders position departments', () => {
    render(<CareersSection title="Title" positions={defaultPositions} />);
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
  });

  it('renders position locations', () => {
    render(<CareersSection title="Title" positions={defaultPositions} />);
    expect(screen.getByText('San Francisco')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
  });

  it('renders position types as badges', () => {
    render(<CareersSection title="Title" positions={defaultPositions} />);
    expect(screen.getByText('Full-time')).toBeInTheDocument();
    expect(screen.getByText('Remote')).toBeInTheDocument();
    expect(screen.getByText('Part-time')).toBeInTheDocument();
  });

  it('renders apply button when href provided', () => {
    const positions = [
      { ...defaultPositions[0], href: 'https://apply.example.com' },
    ];
    render(<CareersSection title="Title" positions={positions} />);
    expect(screen.getByText('Apply')).toBeInTheDocument();
  });

  it('shows empty message when no positions', () => {
    render(<CareersSection title="Title" positions={[]} />);
    expect(screen.getByText('No open positions at the moment. Check back soon!')).toBeInTheDocument();
  });

  it('shows custom empty message', () => {
    render(
      <CareersSection
        title="Title"
        positions={[]}
        emptyMessage="No jobs available right now"
      />
    );
    expect(screen.getByText('No jobs available right now')).toBeInTheDocument();
  });

  it('renders view all link', () => {
    render(
      <CareersSection
        title="Title"
        positions={defaultPositions}
        viewAllText="View All Jobs"
        viewAllHref="/careers"
      />
    );
    const link = screen.getByText('View All Jobs');
    expect(link).toHaveAttribute('href', '/careers');
  });

  it('renders position description in cards variant', () => {
    const positions = [
      { ...defaultPositions[0], description: 'Build amazing software' },
    ];
    render(<CareersSection title="Title" positions={positions} variant="cards" />);
    expect(screen.getByText('Build amazing software')).toBeInTheDocument();
  });

  it('groups positions by department in grouped variant', () => {
    render(
      <CareersSection title="Title" positions={defaultPositions} variant="grouped" />
    );
    // Department titles should appear as group headers
    const engineeringHeaders = screen.getAllByText('Engineering');
    expect(engineeringHeaders.length).toBeGreaterThanOrEqual(1);
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <CareersSection title="Title" positions={defaultPositions} variant="list" data-testid="careers" />
    );
    expect(screen.getByTestId('careers').className).toContain('list');

    rerender(
      <CareersSection title="Title" positions={defaultPositions} variant="cards" data-testid="careers" />
    );
    expect(screen.getByTestId('careers').className).toContain('cards');

    rerender(
      <CareersSection title="Title" positions={defaultPositions} variant="grouped" data-testid="careers" />
    );
    expect(screen.getByTestId('careers').className).toContain('grouped');
  });

  it('applies custom className', () => {
    render(
      <CareersSection
        title="Title"
        positions={defaultPositions}
        className="custom-careers"
        data-testid="careers"
      />
    );
    expect(screen.getByTestId('careers')).toHaveClass('custom-careers');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<CareersSection ref={ref} title="Title" positions={defaultPositions} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
