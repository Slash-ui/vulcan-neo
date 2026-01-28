import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionHeader } from './SectionHeader';

describe('SectionHeader', () => {
  it('renders title as h2', () => {
    render(<SectionHeader title="Section Title" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Section Title');
  });

  it('renders description when provided', () => {
    render(<SectionHeader title="Title" description="Section description text" />);
    expect(screen.getByText('Section description text')).toBeInTheDocument();
  });

  it('renders actions when provided', () => {
    render(
      <SectionHeader title="Title" actions={<button>View All</button>} />
    );
    expect(screen.getByText('View All')).toBeInTheDocument();
  });

  it('renders supporting content when provided', () => {
    render(
      <SectionHeader
        title="Title"
        supportingContent={<span data-testid="badge">New</span>}
      />
    );
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<SectionHeader title="Title" size="sm" data-testid="header" />);
    expect(screen.getByTestId('header').className).toContain('sm');

    rerender(<SectionHeader title="Title" size="md" data-testid="header" />);
    expect(screen.getByTestId('header').className).toContain('md');

    rerender(<SectionHeader title="Title" size="lg" data-testid="header" />);
    expect(screen.getByTestId('header').className).toContain('lg');
  });

  it('applies custom className', () => {
    render(<SectionHeader title="Title" className="custom-section" data-testid="header" />);
    expect(screen.getByTestId('header')).toHaveClass('custom-section');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<SectionHeader ref={ref} title="Title" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders all elements together', () => {
    render(
      <SectionHeader
        title="Recent Activity"
        description="Your recent actions"
        actions={<button>Clear</button>}
        supportingContent={<span>5 items</span>}
      />
    );
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Your recent actions')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByText('5 items')).toBeInTheDocument();
  });
});
