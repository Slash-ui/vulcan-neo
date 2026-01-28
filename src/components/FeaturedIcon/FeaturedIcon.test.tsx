import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FeaturedIcon } from './FeaturedIcon';

describe('FeaturedIcon', () => {
  it('renders children correctly', () => {
    render(<FeaturedIcon><span data-testid="icon">★</span></FeaturedIcon>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies convex variant by default', () => {
    render(<FeaturedIcon data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon').className).toContain('convex');
  });

  it('applies concave variant when specified', () => {
    render(<FeaturedIcon variant="concave" data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon').className).toContain('concave');
  });

  it('applies flat variant when specified', () => {
    render(<FeaturedIcon variant="flat" data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon').className).toContain('flat');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<FeaturedIcon size="sm" data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon').className).toContain('sm');

    rerender(<FeaturedIcon size="md" data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon').className).toContain('md');

    rerender(<FeaturedIcon size="lg" data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon').className).toContain('lg');

    rerender(<FeaturedIcon size="xl" data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon').className).toContain('xl');
  });

  it('applies elevation classes correctly', () => {
    const { rerender } = render(<FeaturedIcon elevation="low" data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon').className).toContain('elevation-low');

    rerender(<FeaturedIcon elevation="mid" data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon').className).toContain('elevation-mid');

    rerender(<FeaturedIcon elevation="high" data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon').className).toContain('elevation-high');
  });

  it('applies color classes correctly', () => {
    const { rerender } = render(<FeaturedIcon color="default" data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon').className).toContain('color-default');

    rerender(<FeaturedIcon color="primary" data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon').className).toContain('color-primary');

    rerender(<FeaturedIcon color="success" data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon').className).toContain('color-success');
  });

  it('applies shape classes correctly', () => {
    const { rerender } = render(<FeaturedIcon shape="circle" data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon').className).toContain('circle');

    rerender(<FeaturedIcon shape="square" data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon').className).toContain('square');
  });

  it('applies custom className', () => {
    render(<FeaturedIcon className="custom-class" data-testid="icon">★</FeaturedIcon>);
    expect(screen.getByTestId('icon')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<FeaturedIcon ref={ref}>★</FeaturedIcon>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
