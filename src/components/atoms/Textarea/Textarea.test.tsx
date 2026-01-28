import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Textarea label="Description" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('renders helper text when provided', () => {
    render(<Textarea helperText="Enter a description" />);
    expect(screen.getByText('Enter a description')).toBeInTheDocument();
  });

  it('renders error message and hides helper text', () => {
    render(<Textarea helperText="Helper" error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
  });

  it('sets aria-invalid when error is present', () => {
    render(<Textarea error="Error message" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'test content' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Textarea size="sm" data-testid="textarea" />);
    expect(screen.getByTestId('textarea').className).toContain('sm');

    rerender(<Textarea size="md" data-testid="textarea" />);
    expect(screen.getByTestId('textarea').className).toContain('md');

    rerender(<Textarea size="lg" data-testid="textarea" />);
    expect(screen.getByTestId('textarea').className).toContain('lg');
  });

  it('applies resize classes correctly', () => {
    const { rerender } = render(<Textarea resize="none" data-testid="textarea" />);
    expect(screen.getByTestId('textarea').className).toContain('resize-none');

    rerender(<Textarea resize="vertical" data-testid="textarea" />);
    expect(screen.getByTestId('textarea').className).toContain('resize-vertical');

    rerender(<Textarea resize="horizontal" data-testid="textarea" />);
    expect(screen.getByTestId('textarea').className).toContain('resize-horizontal');

    rerender(<Textarea resize="both" data-testid="textarea" />);
    expect(screen.getByTestId('textarea').className).toContain('resize-both');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-class" data-testid="textarea" />);
    const container = screen.getByTestId('textarea').closest('[class*="container"]');
    expect(container).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLTextAreaElement>;
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('passes through additional textarea props', () => {
    render(<Textarea placeholder="Enter text" rows={5} maxLength={500} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Enter text');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('maxLength', '500');
  });

  it('uses provided id', () => {
    render(<Textarea id="my-textarea" label="Label" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-textarea');
  });
});
