import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders a radio input', () => {
    render(<Radio />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Radio label="Option A" />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('handles change events', () => {
    const handleChange = vi.fn();
    render(<Radio onChange={handleChange} />);
    const radio = screen.getByRole('radio');
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalled();
  });

  it('is checked when checked prop is true', () => {
    render(<Radio checked onChange={() => {}} />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('is unchecked when checked prop is false', () => {
    render(<Radio checked={false} onChange={() => {}} />);
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Radio size="sm" data-testid="radio" />);
    const radioWrapper = screen.getByTestId('radio').closest('[class*="radio"]');
    expect(radioWrapper?.className).toContain('sm');

    rerender(<Radio size="md" data-testid="radio" />);
    const radioWrapper2 = screen.getByTestId('radio').closest('[class*="radio"]');
    expect(radioWrapper2?.className).toContain('md');

    rerender(<Radio size="lg" data-testid="radio" />);
    const radioWrapper3 = screen.getByTestId('radio').closest('[class*="radio"]');
    expect(radioWrapper3?.className).toContain('lg');
  });

  it('positions label on the right by default', () => {
    render(<Radio label="Label" data-testid="radio" />);
    const container = screen.getByTestId('radio').closest('label');
    expect(container?.className).toContain('right');
  });

  it('positions label on the left when specified', () => {
    render(<Radio label="Label" labelPosition="left" data-testid="radio" />);
    const container = screen.getByTestId('radio').closest('label');
    expect(container?.className).toContain('left');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Radio disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Radio className="custom-class" data-testid="radio" />);
    const container = screen.getByTestId('radio').closest('label');
    expect(container).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement>;
    render(<Radio ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('uses provided id', () => {
    render(<Radio id="my-radio" label="Option" />);
    expect(screen.getByRole('radio')).toHaveAttribute('id', 'my-radio');
  });

  it('clicking label selects radio', () => {
    const handleChange = vi.fn();
    render(<Radio label="Click me" onChange={handleChange} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('passes through additional props', () => {
    render(<Radio name="options" value="a" />);
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('name', 'options');
    expect(radio).toHaveAttribute('value', 'a');
  });
});
