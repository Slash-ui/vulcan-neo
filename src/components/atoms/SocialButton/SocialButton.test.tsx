import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SocialButton } from './SocialButton';

describe('SocialButton', () => {
  const Icon = () => <span data-testid="icon">G</span>;

  it('renders a button element', () => {
    render(<SocialButton icon={<Icon />}>Continue with Google</SocialButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders icon and children correctly', () => {
    render(<SocialButton icon={<Icon />}>Continue with Google</SocialButton>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Continue with Google')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<SocialButton icon={<Icon />} onClick={handleClick}>Click me</SocialButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies convex variant by default', () => {
    render(<SocialButton icon={<Icon />} data-testid="btn">Google</SocialButton>);
    expect(screen.getByTestId('btn').className).toContain('convex');
  });

  it('applies flat variant when specified', () => {
    render(<SocialButton variant="flat" icon={<Icon />} data-testid="btn">Google</SocialButton>);
    expect(screen.getByTestId('btn').className).toContain('flat');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<SocialButton size="sm" icon={<Icon />} data-testid="btn">Google</SocialButton>);
    expect(screen.getByTestId('btn').className).toContain('sm');

    rerender(<SocialButton size="md" icon={<Icon />} data-testid="btn">Google</SocialButton>);
    expect(screen.getByTestId('btn').className).toContain('md');

    rerender(<SocialButton size="lg" icon={<Icon />} data-testid="btn">Google</SocialButton>);
    expect(screen.getByTestId('btn').className).toContain('lg');
  });

  it('applies elevation classes correctly', () => {
    const { rerender } = render(<SocialButton elevation="low" icon={<Icon />} data-testid="btn">Google</SocialButton>);
    expect(screen.getByTestId('btn').className).toContain('elevation-low');

    rerender(<SocialButton elevation="high" icon={<Icon />} data-testid="btn">Google</SocialButton>);
    expect(screen.getByTestId('btn').className).toContain('elevation-high');
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<SocialButton fullWidth icon={<Icon />} data-testid="btn">Google</SocialButton>);
    expect(screen.getByTestId('btn').className).toContain('fullWidth');
  });

  it('is disabled when disabled prop is true', () => {
    render(<SocialButton disabled icon={<Icon />}>Google</SocialButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<SocialButton className="custom-class" icon={<Icon />} data-testid="btn">Google</SocialButton>);
    expect(screen.getByTestId('btn')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement>;
    render(<SocialButton ref={ref} icon={<Icon />}>Google</SocialButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
