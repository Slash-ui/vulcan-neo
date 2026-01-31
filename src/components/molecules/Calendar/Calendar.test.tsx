import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  it('renders month and year', () => {
    render(<Calendar value={new Date(2024, 0, 15)} />);
    // Month and year are now in separate buttons
    expect(screen.getByRole('button', { name: 'January' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2024' })).toBeInTheDocument();
  });

  it('renders day names', () => {
    render(<Calendar />);
    // Default day names are 3-letter uppercase (SUN, MON, etc.)
    expect(screen.getByText('SUN')).toBeInTheDocument();
    expect(screen.getByText('MON')).toBeInTheDocument();
    expect(screen.getByText('TUE')).toBeInTheDocument();
    expect(screen.getByText('WED')).toBeInTheDocument();
    expect(screen.getByText('THU')).toBeInTheDocument();
    expect(screen.getByText('FRI')).toBeInTheDocument();
    expect(screen.getByText('SAT')).toBeInTheDocument();
  });

  it('renders custom day names', () => {
    render(<Calendar dayNames={['S', 'M', 'T', 'W', 'T', 'F', 'S']} />);
    expect(screen.getAllByText('S').length).toBeGreaterThan(0);
    expect(screen.getAllByText('T').length).toBeGreaterThan(0);
  });

  it('renders custom month names', () => {
    render(
      <Calendar
        value={new Date(2024, 0, 15)}
        monthNames={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
      />
    );
    // Month is in a button, year in another button
    expect(screen.getByRole('button', { name: 'Jan' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2024' })).toBeInTheDocument();
  });

  it('calls onChange when date clicked', () => {
    const handleChange = vi.fn();
    render(<Calendar value={new Date(2024, 0, 15)} onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText(/jan.*20.*2024/i));
    expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
    expect(handleChange.mock.calls[0][0].getDate()).toBe(20);
  });

  it('navigates to previous month', () => {
    render(<Calendar value={new Date(2024, 0, 15)} />);
    fireEvent.click(screen.getByLabelText('Previous month'));
    expect(screen.getByRole('button', { name: 'December' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2023' })).toBeInTheDocument();
  });

  it('navigates to next month', () => {
    render(<Calendar value={new Date(2024, 0, 15)} />);
    fireEvent.click(screen.getByLabelText('Next month'));
    expect(screen.getByRole('button', { name: 'February' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2024' })).toBeInTheDocument();
  });

  it('marks selected date', () => {
    render(<Calendar value={new Date(2024, 0, 15)} />);
    // Day number is "15" with padding, so the text is "15"
    const selectedDay = screen.getByLabelText(/jan.*15.*2024/i);
    expect(selectedDay).toHaveAttribute('aria-selected', 'true');
    expect(selectedDay.className).toContain('selected');
  });

  it('marks today', () => {
    const today = new Date();
    render(<Calendar value={null} />);
    const todayButton = screen.getByLabelText(today.toDateString());
    expect(todayButton.className).toContain('today');
  });

  it('disables dates before minDate', () => {
    const minDate = new Date(2024, 0, 15);
    render(<Calendar value={new Date(2024, 0, 20)} minDate={minDate} />);
    // Get the button by aria-label
    const day10 = screen.getByLabelText(/jan.*10.*2024/i);
    expect(day10).toBeDisabled();
    expect(day10.className).toContain('disabled');
  });

  it('disables dates after maxDate', () => {
    const maxDate = new Date(2024, 0, 15);
    render(<Calendar value={new Date(2024, 0, 10)} maxDate={maxDate} />);
    const day20 = screen.getByLabelText(/jan.*20.*2024/i);
    expect(day20).toBeDisabled();
    expect(day20.className).toContain('disabled');
  });

  it('disables specific dates', () => {
    const disabledDates = [new Date(2024, 0, 15)];
    render(<Calendar value={new Date(2024, 0, 10)} disabledDates={disabledDates} />);
    const day15 = screen.getByLabelText(/jan.*15.*2024/i);
    expect(day15).toBeDisabled();
  });

  it('does not call onChange for disabled dates', () => {
    const handleChange = vi.fn();
    const disabledDates = [new Date(2024, 0, 15)];
    render(
      <Calendar
        value={new Date(2024, 0, 10)}
        onChange={handleChange}
        disabledDates={disabledDates}
      />
    );
    // Click on the disabled date button
    fireEvent.click(screen.getByLabelText(/jan.*15.*2024/i));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('supports firstDayOfWeek as Monday', () => {
    render(<Calendar firstDayOfWeek={1} />);
    // Default day names are 3-letter uppercase
    const weekdays = screen.getAllByText(/^(SUN|MON|TUE|WED|THU|FRI|SAT)$/);
    expect(weekdays[0]).toHaveTextContent('MON');
    expect(weekdays[6]).toHaveTextContent('SUN');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Calendar size="sm" data-testid="calendar" />);
    expect(screen.getByTestId('calendar').className).toContain('sm');

    rerender(<Calendar size="md" data-testid="calendar" />);
    expect(screen.getByTestId('calendar').className).toContain('md');

    rerender(<Calendar size="lg" data-testid="calendar" />);
    expect(screen.getByTestId('calendar').className).toContain('lg');
  });

  it('applies custom className', () => {
    render(<Calendar className="custom-calendar" data-testid="calendar" />);
    expect(screen.getByTestId('calendar')).toHaveClass('custom-calendar');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Calendar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
