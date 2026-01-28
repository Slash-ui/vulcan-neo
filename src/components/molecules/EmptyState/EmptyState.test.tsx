import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders with default title', () => {
    render(<EmptyState />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(<EmptyState title="No results found" />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<EmptyState description="Try adjusting your search criteria" />);
    expect(screen.getByText('Try adjusting your search criteria')).toBeInTheDocument();
  });

  it('renders default icon', () => {
    render(<EmptyState />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders custom icon', () => {
    render(<EmptyState icon={<span data-testid="custom-icon">🔍</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders action button when provided', () => {
    render(<EmptyState action={<button>Create new</button>} />);
    expect(screen.getByText('Create new')).toBeInTheDocument();
  });

  it('renders secondary action when provided', () => {
    render(<EmptyState secondaryAction={<button>Learn more</button>} />);
    expect(screen.getByText('Learn more')).toBeInTheDocument();
  });

  it('renders both actions together', () => {
    render(
      <EmptyState
        action={<button>Primary</button>}
        secondaryAction={<button>Secondary</button>}
      />
    );
    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  it('renders children as custom content', () => {
    render(
      <EmptyState>
        <p>Custom content here</p>
      </EmptyState>
    );
    expect(screen.getByText('Custom content here')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<EmptyState size="sm" data-testid="empty" />);
    expect(screen.getByTestId('empty').className).toContain('sm');

    rerender(<EmptyState size="md" data-testid="empty" />);
    expect(screen.getByTestId('empty').className).toContain('md');

    rerender(<EmptyState size="lg" data-testid="empty" />);
    expect(screen.getByTestId('empty').className).toContain('lg');
  });

  it('renders title and description together', () => {
    render(
      <EmptyState
        title="Nothing here"
        description="This space is empty"
      />
    );
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
    expect(screen.getByText('This space is empty')).toBeInTheDocument();
  });

  it('does not render actions container when no actions provided', () => {
    render(<EmptyState data-testid="empty" />);
    const emptyState = screen.getByTestId('empty');
    expect(emptyState.querySelector('[class*="actions"]')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<EmptyState className="custom-class" data-testid="empty" />);
    expect(screen.getByTestId('empty')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<EmptyState ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
