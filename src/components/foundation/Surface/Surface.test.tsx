import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Surface } from './Surface';

describe('Surface', () => {
  it('renders children correctly', () => {
    render(<Surface>Hello World</Surface>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies light theme by default', () => {
    render(<Surface data-testid="surface">Content</Surface>);
    const surface = screen.getByTestId('surface');
    expect(surface).toHaveAttribute('data-theme', 'light');
  });

  it('applies dark theme when specified', () => {
    render(<Surface theme="dark" data-testid="surface">Content</Surface>);
    const surface = screen.getByTestId('surface');
    expect(surface).toHaveAttribute('data-theme', 'dark');
  });

  it('applies fullHeight class when fullHeight is true', () => {
    render(<Surface fullHeight data-testid="surface">Content</Surface>);
    const surface = screen.getByTestId('surface');
    expect(surface.className).toContain('fullHeight');
  });

  it('applies custom className', () => {
    render(<Surface className="custom-class" data-testid="surface">Content</Surface>);
    const surface = screen.getByTestId('surface');
    expect(surface).toHaveClass('custom-class');
  });

  it('applies custom background color via style', () => {
    render(<Surface backgroundColor="#FF0000" data-testid="surface">Content</Surface>);
    const surface = screen.getByTestId('surface');
    expect(surface).toHaveStyle({ '--neo-bg': '#FF0000' });
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Surface ref={ref}>Content</Surface>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes through additional props', () => {
    render(<Surface data-testid="surface" aria-label="Main surface">Content</Surface>);
    const surface = screen.getByTestId('surface');
    expect(surface).toHaveAttribute('aria-label', 'Main surface');
  });
});
