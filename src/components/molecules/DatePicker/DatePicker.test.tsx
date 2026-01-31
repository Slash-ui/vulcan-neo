import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('renders placeholder when no value', () => {
    render(<DatePicker />);
    expect(screen.getByText('Select a date')).toBeInTheDocument();
  });

  it('renders custom placeholder', () => {
    render(<DatePicker placeholder="Choose date" />);
    expect(screen.getByText('Choose date')).toBeInTheDocument();
  });

  it('renders formatted date when value provided', () => {
    render(<DatePicker value={new Date(2024, 0, 15)} />);
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
  });

  it('renders custom formatted date', () => {
    const testDate = new Date(2024, 0, 15);
    // Use local date string format to avoid timezone issues
    const formatDate = (date: Date) =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    render(<DatePicker value={testDate} formatDate={formatDate} />);
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<DatePicker label="Select date" />);
    expect(screen.getByText('Select date')).toBeInTheDocument();
  });

  it('opens calendar on click', () => {
    render(<DatePicker />);
    fireEvent.click(screen.getByRole('button', { name: /select a date/i }));
    expect(screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/)).toBeInTheDocument();
  });

  it('opens calendar on Enter key', () => {
    render(<DatePicker />);
    const trigger = screen.getByRole('button', { name: /select a date/i });
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/)).toBeInTheDocument();
  });

  it('opens calendar on Space key', () => {
    render(<DatePicker />);
    const trigger = screen.getByRole('button', { name: /select a date/i });
    fireEvent.keyDown(trigger, { key: ' ' });
    expect(screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/)).toBeInTheDocument();
  });

  it('calls onChange when date selected', () => {
    const handleChange = vi.fn();
    render(<DatePicker value={new Date(2024, 0, 15)} onChange={handleChange} />);

    // Open calendar
    fireEvent.click(screen.getByRole('button', { name: /jan 15, 2024/i }));

    // Select a date
    fireEvent.click(screen.getByText('20'));

    expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it('closes calendar after selection', () => {
    render(<DatePicker value={new Date(2024, 0, 15)} onChange={vi.fn()} />);

    // Open calendar
    fireEvent.click(screen.getByRole('button', { name: /jan 15, 2024/i }));
    // Month name is in a separate button now
    expect(screen.getByRole('button', { name: /january/i })).toBeInTheDocument();

    // Select a date
    fireEvent.click(screen.getByText('20'));

    // Calendar should be closed - month button should not be visible
    expect(screen.queryByRole('button', { name: /january/i })).not.toBeInTheDocument();
  });

  it('shows clear button when value and clearable', () => {
    render(<DatePicker value={new Date(2024, 0, 15)} clearable />);
    expect(screen.getByLabelText('Clear date')).toBeInTheDocument();
  });

  it('hides clear button when not clearable', () => {
    render(<DatePicker value={new Date(2024, 0, 15)} clearable={false} />);
    expect(screen.queryByLabelText('Clear date')).not.toBeInTheDocument();
  });

  it('calls onChange with null when cleared', () => {
    const handleChange = vi.fn();
    render(<DatePicker value={new Date(2024, 0, 15)} onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('Clear date'));
    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it('renders error message', () => {
    render(<DatePicker error errorMessage="Date is required" />);
    expect(screen.getByText('Date is required')).toBeInTheDocument();
  });

  it('applies error class', () => {
    render(<DatePicker error data-testid="picker" />);
    const wrapper = screen.getByTestId('picker').parentElement;
    expect(wrapper?.className).toContain('error');
  });

  it('is disabled when disabled prop is true', () => {
    render(<DatePicker disabled />);
    const trigger = screen.getByRole('button', { name: /select a date/i });
    expect(trigger).toHaveAttribute('tabindex', '-1');
  });

  it('does not open when disabled', () => {
    render(<DatePicker disabled />);
    const trigger = screen.getByRole('button', { name: /select a date/i });
    fireEvent.click(trigger);
    expect(screen.queryByText(/January|February|March/)).not.toBeInTheDocument();
  });

  it('hides clear button when disabled', () => {
    render(<DatePicker value={new Date(2024, 0, 15)} disabled />);
    expect(screen.queryByLabelText('Clear date')).not.toBeInTheDocument();
  });

  it('closes on Escape key', () => {
    render(<DatePicker />);
    fireEvent.click(screen.getByRole('button', { name: /select a date/i }));
    // Calendar is open - check for month button
    expect(screen.getByRole('button', { name: /January|February|March|April|May|June|July|August|September|October|November|December/i })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    // Calendar is closed - month button should not be visible
    expect(screen.queryByRole('button', { name: /January|February|March|April|May|June|July|August|September|October|November|December/i })).not.toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<DatePicker size="sm" />);
    // Button's parent is the container with size classes
    let wrapper = screen.getByRole('button', { name: /select a date/i }).parentElement;
    expect(wrapper?.className).toContain('sm');

    rerender(<DatePicker size="md" />);
    wrapper = screen.getByRole('button', { name: /select a date/i }).parentElement;
    expect(wrapper?.className).toContain('md');

    rerender(<DatePicker size="lg" />);
    wrapper = screen.getByRole('button', { name: /select a date/i }).parentElement;
    expect(wrapper?.className).toContain('lg');
  });

  it('applies custom className', () => {
    render(<DatePicker className="custom-picker" />);
    const wrapper = screen.getByRole('button', { name: /select a date/i }).parentElement;
    expect(wrapper?.className).toContain('custom-picker');
  });

  it('has correct aria attributes', () => {
    render(<DatePicker />);
    const trigger = screen.getByRole('button', { name: /select a date/i });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});
