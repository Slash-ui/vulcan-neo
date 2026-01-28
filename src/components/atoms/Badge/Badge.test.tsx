import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies convex variant by default', () => {
    render(<Badge data-testid="badge">Badge</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('convex');
  });

  it('applies concave variant when specified', () => {
    render(<Badge variant="concave" data-testid="badge">Badge</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('concave');
  });

  it('applies flat variant when specified', () => {
    render(<Badge variant="flat" data-testid="badge">Badge</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('flat');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Badge size="sm" data-testid="badge">Badge</Badge>);
    expect(screen.getByTestId('badge').className).toContain('sm');

    rerender(<Badge size="md" data-testid="badge">Badge</Badge>);
    expect(screen.getByTestId('badge').className).toContain('md');

    rerender(<Badge size="lg" data-testid="badge">Badge</Badge>);
    expect(screen.getByTestId('badge').className).toContain('lg');
  });

  it('applies color classes correctly', () => {
    const { rerender } = render(<Badge color="default" data-testid="badge">Badge</Badge>);
    expect(screen.getByTestId('badge').className).toContain('color-default');

    rerender(<Badge color="primary" data-testid="badge">Badge</Badge>);
    expect(screen.getByTestId('badge').className).toContain('color-primary');

    rerender(<Badge color="success" data-testid="badge">Badge</Badge>);
    expect(screen.getByTestId('badge').className).toContain('color-success');

    rerender(<Badge color="warning" data-testid="badge">Badge</Badge>);
    expect(screen.getByTestId('badge').className).toContain('color-warning');

    rerender(<Badge color="error" data-testid="badge">Badge</Badge>);
    expect(screen.getByTestId('badge').className).toContain('color-error');
  });

  it('renders as dot when dot prop is true', () => {
    render(<Badge dot data-testid="badge" />);
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('dot');
    expect(badge).toBeEmptyDOMElement();
  });

  it('renders left icon when provided', () => {
    render(<Badge leftIcon={<span data-testid="left-icon">★</span>}>Badge</Badge>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon when provided', () => {
    render(<Badge rightIcon={<span data-testid="right-icon">×</span>}>Badge</Badge>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('renders both icons when provided', () => {
    render(
      <Badge
        leftIcon={<span data-testid="left-icon">★</span>}
        rightIcon={<span data-testid="right-icon">×</span>}
      >
        Badge
      </Badge>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class" data-testid="badge">Badge</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement>;
    render(<Badge ref={ref}>Badge</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('passes through additional props', () => {
    render(<Badge data-testid="badge" aria-label="Status badge">Badge</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('aria-label', 'Status badge');
  });

  it('renders without children', () => {
    render(<Badge data-testid="badge" />);
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });
});
