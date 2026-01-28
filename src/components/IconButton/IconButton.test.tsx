import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders a button element', () => {
    render(<IconButton aria-label="Close">×</IconButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<IconButton aria-label="Star"><span data-testid="icon">★</span></IconButton>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<IconButton aria-label="Click me" onClick={handleClick}>×</IconButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies convex variant by default', () => {
    render(<IconButton aria-label="Test" data-testid="btn">×</IconButton>);
    expect(screen.getByTestId('btn').className).toContain('convex');
  });

  it('applies flat variant when specified', () => {
    render(<IconButton variant="flat" aria-label="Test" data-testid="btn">×</IconButton>);
    expect(screen.getByTestId('btn').className).toContain('flat');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<IconButton size="sm" aria-label="Test" data-testid="btn">×</IconButton>);
    expect(screen.getByTestId('btn').className).toContain('sm');

    rerender(<IconButton size="md" aria-label="Test" data-testid="btn">×</IconButton>);
    expect(screen.getByTestId('btn').className).toContain('md');

    rerender(<IconButton size="lg" aria-label="Test" data-testid="btn">×</IconButton>);
    expect(screen.getByTestId('btn').className).toContain('lg');
  });

  it('applies elevation classes correctly', () => {
    const { rerender } = render(<IconButton elevation="low" aria-label="Test" data-testid="btn">×</IconButton>);
    expect(screen.getByTestId('btn').className).toContain('elevation-low');

    rerender(<IconButton elevation="high" aria-label="Test" data-testid="btn">×</IconButton>);
    expect(screen.getByTestId('btn').className).toContain('elevation-high');
  });

  it('applies shape classes correctly', () => {
    const { rerender } = render(<IconButton shape="circle" aria-label="Test" data-testid="btn">×</IconButton>);
    expect(screen.getByTestId('btn').className).toContain('circle');

    rerender(<IconButton shape="square" aria-label="Test" data-testid="btn">×</IconButton>);
    expect(screen.getByTestId('btn').className).toContain('square');
  });

  it('is disabled when disabled prop is true', () => {
    render(<IconButton disabled aria-label="Disabled">×</IconButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<IconButton className="custom-class" aria-label="Test" data-testid="btn">×</IconButton>);
    expect(screen.getByTestId('btn')).toHaveClass('custom-class');
  });

  it('has required aria-label', () => {
    render(<IconButton aria-label="Close button">×</IconButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close button');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement>;
    render(<IconButton ref={ref} aria-label="Test">×</IconButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
