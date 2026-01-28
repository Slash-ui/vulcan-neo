import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders a checkbox input with switch role', () => {
    render(<Switch />);
    const input = screen.getByRole('switch');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'checkbox');
  });

  it('renders label when provided', () => {
    render(<Switch label="Dark Mode" />);
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  it('toggles on click', () => {
    const handleChange = vi.fn();
    render(<Switch onChange={handleChange} />);
    const input = screen.getByRole('switch');
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalled();
  });

  it('is checked when checked prop is true', () => {
    render(<Switch checked onChange={() => {}} />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('is unchecked when checked prop is false', () => {
    render(<Switch checked={false} onChange={() => {}} />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Switch size="sm" data-testid="switch" />);
    const switchElement = screen.getByTestId('switch').closest('[class*="switch"]');
    expect(switchElement?.className).toContain('sm');

    rerender(<Switch size="md" data-testid="switch" />);
    const switchElement2 = screen.getByTestId('switch').closest('[class*="switch"]');
    expect(switchElement2?.className).toContain('md');

    rerender(<Switch size="lg" data-testid="switch" />);
    const switchElement3 = screen.getByTestId('switch').closest('[class*="switch"]');
    expect(switchElement3?.className).toContain('lg');
  });

  it('positions label on the right by default', () => {
    render(<Switch label="Label" data-testid="switch" />);
    const container = screen.getByTestId('switch').closest('label');
    expect(container?.className).toContain('right');
  });

  it('positions label on the left when specified', () => {
    render(<Switch label="Label" labelPosition="left" data-testid="switch" />);
    const container = screen.getByTestId('switch').closest('label');
    expect(container?.className).toContain('left');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Switch className="custom-class" data-testid="switch" />);
    const container = screen.getByTestId('switch').closest('label');
    expect(container).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement>;
    render(<Switch ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('uses provided id', () => {
    render(<Switch id="my-switch" label="Toggle" />);
    const input = screen.getByRole('switch');
    expect(input).toHaveAttribute('id', 'my-switch');
  });

  it('clicking label toggles switch', () => {
    const handleChange = vi.fn();
    render(<Switch label="Toggle Me" onChange={handleChange} />);
    fireEvent.click(screen.getByText('Toggle Me'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('passes through additional props', () => {
    render(<Switch aria-label="Custom label" name="theme-toggle" />);
    const input = screen.getByRole('switch');
    expect(input).toHaveAttribute('aria-label', 'Custom label');
    expect(input).toHaveAttribute('name', 'theme-toggle');
  });
});
