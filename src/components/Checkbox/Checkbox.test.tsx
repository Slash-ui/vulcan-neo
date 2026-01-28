import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders a checkbox input', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('toggles on click', () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  it('is checked when checked prop is true', () => {
    render(<Checkbox checked onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('is unchecked when checked prop is false', () => {
    render(<Checkbox checked={false} onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Checkbox size="sm" data-testid="checkbox" />);
    const checkboxWrapper = screen.getByTestId('checkbox').closest('[class*="checkbox"]');
    expect(checkboxWrapper?.className).toContain('sm');

    rerender(<Checkbox size="md" data-testid="checkbox" />);
    const checkboxWrapper2 = screen.getByTestId('checkbox').closest('[class*="checkbox"]');
    expect(checkboxWrapper2?.className).toContain('md');

    rerender(<Checkbox size="lg" data-testid="checkbox" />);
    const checkboxWrapper3 = screen.getByTestId('checkbox').closest('[class*="checkbox"]');
    expect(checkboxWrapper3?.className).toContain('lg');
  });

  it('positions label on the right by default', () => {
    render(<Checkbox label="Label" data-testid="checkbox" />);
    const container = screen.getByTestId('checkbox').closest('label');
    expect(container?.className).toContain('right');
  });

  it('positions label on the left when specified', () => {
    render(<Checkbox label="Label" labelPosition="left" data-testid="checkbox" />);
    const container = screen.getByTestId('checkbox').closest('label');
    expect(container?.className).toContain('left');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('sets indeterminate state', () => {
    render(<Checkbox indeterminate data-testid="checkbox" />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('applies custom className', () => {
    render(<Checkbox className="custom-class" data-testid="checkbox" />);
    const container = screen.getByTestId('checkbox').closest('label');
    expect(container).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement>;
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('uses provided id', () => {
    render(<Checkbox id="my-checkbox" label="Check me" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'my-checkbox');
  });

  it('clicking label toggles checkbox', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Toggle Me" onChange={handleChange} />);
    fireEvent.click(screen.getByText('Toggle Me'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('passes through additional props', () => {
    render(<Checkbox aria-label="Custom label" name="agreement" value="accepted" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Custom label');
    expect(checkbox).toHaveAttribute('name', 'agreement');
    expect(checkbox).toHaveAttribute('value', 'accepted');
  });

  it('ref callback receives indeterminate state', () => {
    const ref = vi.fn();
    render(<Checkbox ref={ref} indeterminate />);
    expect(ref).toHaveBeenCalled();
  });
});
