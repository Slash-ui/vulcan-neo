import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AppStoreButton } from './AppStoreButton';

describe('AppStoreButton', () => {
  const Icon = () => <span data-testid="icon">🍎</span>;

  it('renders a button element', () => {
    render(<AppStoreButton store="apple" icon={<Icon />} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders Apple store text correctly', () => {
    render(<AppStoreButton store="apple" icon={<Icon />} />);
    expect(screen.getByText('Download on the')).toBeInTheDocument();
    expect(screen.getByText('App Store')).toBeInTheDocument();
  });

  it('renders Google store text correctly', () => {
    render(<AppStoreButton store="google" icon={<Icon />} />);
    expect(screen.getByText('GET IT ON')).toBeInTheDocument();
    expect(screen.getByText('Google Play')).toBeInTheDocument();
  });

  it('renders icon correctly', () => {
    render(<AppStoreButton store="apple" icon={<Icon />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<AppStoreButton store="apple" icon={<Icon />} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies convex variant by default', () => {
    render(<AppStoreButton store="apple" icon={<Icon />} data-testid="btn" />);
    expect(screen.getByTestId('btn').className).toContain('convex');
  });

  it('applies flat variant when specified', () => {
    render(<AppStoreButton store="apple" variant="flat" icon={<Icon />} data-testid="btn" />);
    expect(screen.getByTestId('btn').className).toContain('flat');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<AppStoreButton store="apple" size="sm" icon={<Icon />} data-testid="btn" />);
    expect(screen.getByTestId('btn').className).toContain('sm');

    rerender(<AppStoreButton store="apple" size="md" icon={<Icon />} data-testid="btn" />);
    expect(screen.getByTestId('btn').className).toContain('md');

    rerender(<AppStoreButton store="apple" size="lg" icon={<Icon />} data-testid="btn" />);
    expect(screen.getByTestId('btn').className).toContain('lg');
  });

  it('applies elevation classes correctly', () => {
    const { rerender } = render(<AppStoreButton store="apple" elevation="low" icon={<Icon />} data-testid="btn" />);
    expect(screen.getByTestId('btn').className).toContain('elevation-low');

    rerender(<AppStoreButton store="apple" elevation="high" icon={<Icon />} data-testid="btn" />);
    expect(screen.getByTestId('btn').className).toContain('elevation-high');
  });

  it('is disabled when disabled prop is true', () => {
    render(<AppStoreButton store="apple" disabled icon={<Icon />} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<AppStoreButton store="apple" className="custom-class" icon={<Icon />} data-testid="btn" />);
    expect(screen.getByTestId('btn')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement>;
    render(<AppStoreButton ref={ref} store="apple" icon={<Icon />} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
