import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders label correctly', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders as a button element', () => {
    render(<Button label="Click me" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies convex variant by default', () => {
    render(<Button label="Click me" data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button.className).toContain('convex');
  });

  it('applies flat variant when specified', () => {
    render(<Button variant="flat" label="Click me" data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button.className).toContain('flat');
  });

  it('applies fab variant when specified', () => {
    render(<Button variant="fab" label="Click me" data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button.className).toContain('fab');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="sm" label="Click me" data-testid="button" />);
    expect(screen.getByTestId('button').className).toContain('sm');

    rerender(<Button size="md" label="Click me" data-testid="button" />);
    expect(screen.getByTestId('button').className).toContain('md');

    rerender(<Button size="lg" label="Click me" data-testid="button" />);
    expect(screen.getByTestId('button').className).toContain('lg');
  });

  it('applies elevation classes correctly', () => {
    const { rerender } = render(<Button elevation="low" label="Click me" data-testid="button" />);
    expect(screen.getByTestId('button').className).toContain('elevation-low');

    rerender(<Button elevation="mid" label="Click me" data-testid="button" />);
    expect(screen.getByTestId('button').className).toContain('elevation-mid');

    rerender(<Button elevation="high" label="Click me" data-testid="button" />);
    expect(screen.getByTestId('button').className).toContain('elevation-high');
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<Button fullWidth label="Click me" data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button.className).toContain('fullWidth');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled label="Click me" />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when loading prop is true', () => {
    render(<Button loading label="Click me" />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows spinner when loading', () => {
    render(<Button loading label="Click me" data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button.className).toContain('loading');
  });

  it('renders left icon when provided', () => {
    render(<Button leftIcon={<span data-testid="left-icon">←</span>} label="Click me" />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon when provided', () => {
    render(<Button rightIcon={<span data-testid="right-icon">→</span>} label="Click me" />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('does not render icons when loading', () => {
    render(
      <Button
        loading
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
        label="Click me"
      />
    );
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class" label="Click me" data-testid="button" />);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement>;
    render(<Button ref={ref} label="Click me" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('passes through additional props', () => {
    render(<Button type="submit" aria-label="Submit form" label="Click me" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('aria-label', 'Submit form');
  });

  it('renders without label (icon-only button)', () => {
    render(<Button leftIcon={<span data-testid="icon">★</span>} data-testid="button" />);
    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
