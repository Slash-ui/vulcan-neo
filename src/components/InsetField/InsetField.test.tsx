import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InsetField } from './InsetField';

describe('InsetField', () => {
  it('renders an input element', () => {
    render(<InsetField />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<InsetField label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders helper text when provided', () => {
    render(<InsetField helperText="Enter your email address" />);
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('renders error message and replaces helper text', () => {
    render(<InsetField helperText="Helper" error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
  });

  it('sets aria-invalid when error is present', () => {
    render(<InsetField error="Error message" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby when helper or error text is present', () => {
    render(<InsetField helperText="Help text" id="test-input" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-helper');
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<InsetField onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<InsetField size="sm" data-testid="input" />);
    const container = screen.getByTestId('input').closest('[class*="inputWrapper"]');
    expect(container?.className).toContain('sm');

    rerender(<InsetField size="md" data-testid="input" />);
    const container2 = screen.getByTestId('input').closest('[class*="inputWrapper"]');
    expect(container2?.className).toContain('md');

    rerender(<InsetField size="lg" data-testid="input" />);
    const container3 = screen.getByTestId('input').closest('[class*="inputWrapper"]');
    expect(container3?.className).toContain('lg');
  });

  it('renders left icon when provided', () => {
    render(<InsetField leftIcon={<span data-testid="left-icon">@</span>} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon when provided', () => {
    render(<InsetField rightIcon={<span data-testid="right-icon">✓</span>} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<InsetField disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<InsetField fullWidth data-testid="input" />);
    const container = screen.getByTestId('input').closest('[class*="container"]');
    expect(container?.className).toContain('fullWidth');
  });

  it('applies custom className', () => {
    render(<InsetField className="custom-class" data-testid="input" />);
    const container = screen.getByTestId('input').closest('[class*="container"]');
    expect(container).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement>;
    render(<InsetField ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('passes through additional input props', () => {
    render(<InsetField placeholder="Enter value" type="email" maxLength={50} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter value');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('maxLength', '50');
  });

  it('uses provided id', () => {
    render(<InsetField id="my-custom-id" label="Label" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'my-custom-id');
  });
});
