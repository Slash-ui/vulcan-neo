import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './Select';

const defaultOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

describe('Select', () => {
  it('renders with placeholder', () => {
    render(<Select options={defaultOptions} />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders custom placeholder', () => {
    render(<Select options={defaultOptions} placeholder="Choose a fruit" />);
    expect(screen.getByText('Choose a fruit')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Select options={defaultOptions} label="Fruit" />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    render(<Select options={defaultOptions} />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('displays all options when open', () => {
    render(<Select options={defaultOptions} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });

  it('selects an option when clicked', () => {
    const handleChange = vi.fn();
    render(<Select options={defaultOptions} onChange={handleChange} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Banana'));
    expect(handleChange).toHaveBeenCalledWith('banana');
  });

  it('closes dropdown after selection', () => {
    render(<Select options={defaultOptions} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Banana'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('displays selected value', () => {
    render(<Select options={defaultOptions} value="cherry" />);
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });

  it('supports uncontrolled mode with defaultValue', () => {
    render(<Select options={defaultOptions} defaultValue="banana" />);
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('handles keyboard Enter to open', () => {
    render(<Select options={defaultOptions} />);
    const trigger = screen.getByRole('button');
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('handles keyboard Space to open', () => {
    render(<Select options={defaultOptions} />);
    const trigger = screen.getByRole('button');
    fireEvent.keyDown(trigger, { key: ' ' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('handles keyboard Escape to close', () => {
    render(<Select options={defaultOptions} />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('handles keyboard ArrowDown to open', () => {
    render(<Select options={defaultOptions} />);
    const trigger = screen.getByRole('button');
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Select options={defaultOptions} disabled />);
    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
  });

  it('does not open when disabled', () => {
    render(<Select options={defaultOptions} disabled />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Select options={defaultOptions} error="Please select an option" />);
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<Select options={defaultOptions} helperText="Choose your favorite" />);
    expect(screen.getByText('Choose your favorite')).toBeInTheDocument();
  });

  it('prioritizes error over helper text', () => {
    render(<Select options={defaultOptions} error="Error" helperText="Helper" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Select options={defaultOptions} size="sm" data-testid="select" />);
    const trigger = screen.getByRole('button');
    expect(trigger.className).toContain('sm');

    rerender(<Select options={defaultOptions} size="md" data-testid="select" />);
    expect(screen.getByRole('button').className).toContain('md');

    rerender(<Select options={defaultOptions} size="lg" data-testid="select" />);
    expect(screen.getByRole('button').className).toContain('lg');
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<Select options={defaultOptions} fullWidth data-testid="select" />);
    expect(screen.getByTestId('select').className).toContain('fullWidth');
  });

  it('has aria-haspopup attribute', () => {
    render(<Select options={defaultOptions} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('has aria-expanded attribute', () => {
    render(<Select options={defaultOptions} />);
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('marks selected option with aria-selected', () => {
    render(<Select options={defaultOptions} value="banana" />);
    fireEvent.click(screen.getByRole('button'));
    const option = screen.getByRole('option', { name: 'Banana' });
    expect(option).toHaveAttribute('aria-selected', 'true');
  });

  it('handles disabled options', () => {
    const options = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana', disabled: true },
    ];
    const handleChange = vi.fn();
    render(<Select options={options} onChange={handleChange} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Banana'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Select options={defaultOptions} className="custom-class" data-testid="select" />);
    expect(screen.getByTestId('select')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Select ref={ref} options={defaultOptions} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
