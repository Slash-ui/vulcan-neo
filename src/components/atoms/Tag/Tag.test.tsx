import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders children correctly', () => {
    render(<Tag>React</Tag>);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('applies convex variant by default', () => {
    render(<Tag data-testid="tag">Tag</Tag>);
    expect(screen.getByTestId('tag').className).toContain('convex');
  });

  it('applies concave variant when specified', () => {
    render(<Tag variant="concave" data-testid="tag">Tag</Tag>);
    expect(screen.getByTestId('tag').className).toContain('concave');
  });

  it('applies flat variant when specified', () => {
    render(<Tag variant="flat" data-testid="tag">Tag</Tag>);
    expect(screen.getByTestId('tag').className).toContain('flat');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Tag size="sm" data-testid="tag">Tag</Tag>);
    expect(screen.getByTestId('tag').className).toContain('sm');

    rerender(<Tag size="md" data-testid="tag">Tag</Tag>);
    expect(screen.getByTestId('tag').className).toContain('md');

    rerender(<Tag size="lg" data-testid="tag">Tag</Tag>);
    expect(screen.getByTestId('tag').className).toContain('lg');
  });

  it('applies color classes correctly', () => {
    const { rerender } = render(<Tag color="default" data-testid="tag">Tag</Tag>);
    expect(screen.getByTestId('tag').className).toContain('color-default');

    rerender(<Tag color="primary" data-testid="tag">Tag</Tag>);
    expect(screen.getByTestId('tag').className).toContain('color-primary');

    rerender(<Tag color="success" data-testid="tag">Tag</Tag>);
    expect(screen.getByTestId('tag').className).toContain('color-success');

    rerender(<Tag color="warning" data-testid="tag">Tag</Tag>);
    expect(screen.getByTestId('tag').className).toContain('color-warning');

    rerender(<Tag color="error" data-testid="tag">Tag</Tag>);
    expect(screen.getByTestId('tag').className).toContain('color-error');
  });

  it('renders left icon when provided', () => {
    render(<Tag leftIcon={<span data-testid="left-icon">★</span>}>Tag</Tag>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon when provided and not removable', () => {
    render(<Tag rightIcon={<span data-testid="right-icon">→</span>}>Tag</Tag>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('shows close button when removable', () => {
    render(<Tag removable>Tag</Tag>);
    expect(screen.getByLabelText('Remove tag')).toBeInTheDocument();
  });

  it('calls onRemove when close button is clicked', () => {
    const handleRemove = vi.fn();
    render(<Tag removable onRemove={handleRemove}>Tag</Tag>);
    fireEvent.click(screen.getByLabelText('Remove tag'));
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it('does not show right icon when removable', () => {
    render(<Tag removable rightIcon={<span data-testid="right-icon">→</span>}>Tag</Tag>);
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Tag className="custom-class" data-testid="tag">Tag</Tag>);
    expect(screen.getByTestId('tag')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement>;
    render(<Tag ref={ref}>Tag</Tag>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
