import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingIndicator, Skeleton } from './LoadingIndicator';

describe('LoadingIndicator', () => {
  it('renders with status role', () => {
    render(<LoadingIndicator />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has default aria-label', () => {
    render(<LoadingIndicator />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('uses custom label for aria-label', () => {
    render(<LoadingIndicator label="Processing" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Processing');
  });

  it('displays label text when provided', () => {
    render(<LoadingIndicator label="Please wait" />);
    expect(screen.getByText('Please wait')).toBeInTheDocument();
  });

  it('renders spinner variant by default', () => {
    render(<LoadingIndicator />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders dots variant', () => {
    render(<LoadingIndicator variant="dots" />);
    const dotsContainer = document.querySelector('[class*="dots"]');
    expect(dotsContainer).toBeInTheDocument();
  });

  it('renders pulse variant', () => {
    render(<LoadingIndicator variant="pulse" />);
    expect(document.querySelector('[class*="pulse"]')).toBeInTheDocument();
  });

  it('renders skeleton variant', () => {
    render(<LoadingIndicator variant="skeleton" />);
    expect(document.querySelector('[class*="skeleton"]')).toBeInTheDocument();
  });

  it('applies custom skeleton dimensions', () => {
    render(<LoadingIndicator variant="skeleton" skeletonWidth="200px" skeletonHeight="50px" />);
    const skeleton = document.querySelector('[class*="skeleton"]');
    expect(skeleton).toHaveStyle({ width: '200px', height: '50px' });
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<LoadingIndicator size="sm" />);
    expect(screen.getByRole('status').className).toContain('sm');

    rerender(<LoadingIndicator size="md" />);
    expect(screen.getByRole('status').className).toContain('md');

    rerender(<LoadingIndicator size="lg" />);
    expect(screen.getByRole('status').className).toContain('lg');

    rerender(<LoadingIndicator size="xl" />);
    expect(screen.getByRole('status').className).toContain('xl');
  });

  it('renders nothing when loading is false and no children', () => {
    render(<LoadingIndicator loading={false} data-testid="loading" />);
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('renders children when loading is false', () => {
    render(
      <LoadingIndicator loading={false}>
        <div>Content loaded</div>
      </LoadingIndicator>
    );
    expect(screen.getByText('Content loaded')).toBeInTheDocument();
  });

  it('renders indicator instead of children when loading', () => {
    render(
      <LoadingIndicator loading={true}>
        <div>Content loaded</div>
      </LoadingIndicator>
    );
    expect(screen.queryByText('Content loaded')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<LoadingIndicator className="custom-class" />);
    expect(screen.getByRole('status')).toHaveClass('custom-class');
  });

  it('applies custom style', () => {
    render(<LoadingIndicator style={{ marginTop: '20px' }} />);
    expect(screen.getByRole('status')).toHaveStyle({ marginTop: '20px' });
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<LoadingIndicator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('Skeleton', () => {
  it('renders a skeleton element', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('applies custom width and height', () => {
    render(<Skeleton width="100px" height="20px" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveStyle({ width: '100px', height: '20px' });
  });

  it('renders as circle when circle prop is true', () => {
    render(<Skeleton circle height={40} data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({ borderRadius: '50%', width: '40px', height: '40px' });
  });

  it('applies custom border radius', () => {
    render(<Skeleton borderRadius="10px" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveStyle({ borderRadius: '10px' });
  });

  it('renders multiple lines when lines > 1', () => {
    render(<Skeleton lines={3} data-testid="skeleton" />);
    const skeletonLines = screen.getByTestId('skeleton');
    expect(skeletonLines.children.length).toBe(3);
  });

  it('makes last line 70% width when multiple lines', () => {
    render(<Skeleton lines={3} data-testid="skeleton" />);
    const lastLine = screen.getByTestId('skeleton').lastChild as HTMLElement;
    expect(lastLine).toHaveStyle({ width: '70%' });
  });

  it('applies custom className', () => {
    render(<Skeleton className="custom-skeleton" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('custom-skeleton');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
