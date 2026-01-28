import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  it('renders month and year', () => {
    render(<Calendar value={new Date(2024, 0, 15)} />);
    expect(screen.getByText('January 2024')).toBeInTheDocument();
  });

  it('renders day names', () => {
    render(<Calendar />);
    expect(screen.getByText('Su')).toBeInTheDocument();
    expect(screen.getByText('Mo')).toBeInTheDocument();
    expect(screen.getByText('Tu')).toBeInTheDocument();
    expect(screen.getByText('We')).toBeInTheDocument();
    expect(screen.getByText('Th')).toBeInTheDocument();
    expect(screen.getByText('Fr')).toBeInTheDocument();
    expect(screen.getByText('Sa')).toBeInTheDocument();
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
    expect(screen.getByText('Jan 2024')).toBeInTheDocument();
  });

  it('calls onChange when date clicked', () => {
    const handleChange = vi.fn();
    render(<Calendar value={new Date(2024, 0, 15)} onChange={handleChange} />);
    fireEvent.click(screen.getByText('20'));
    expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
    expect(handleChange.mock.calls[0][0].getDate()).toBe(20);
  });

  it('navigates to previous month', () => {
    render(<Calendar value={new Date(2024, 0, 15)} />);
    fireEvent.click(screen.getByLabelText('Previous month'));
    expect(screen.getByText('December 2023')).toBeInTheDocument();
  });

  it('navigates to next month', () => {
    render(<Calendar value={new Date(2024, 0, 15)} />);
    fireEvent.click(screen.getByLabelText('Next month'));
    expect(screen.getByText('February 2024')).toBeInTheDocument();
  });

  it('marks selected date', () => {
    render(<Calendar value={new Date(2024, 0, 15)} />);
    const selectedDay = screen.getByText('15');
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
    const day10 = screen.getByText('10');
    expect(day10).toBeDisabled();
    expect(day10.className).toContain('disabled');
  });

  it('disables dates after maxDate', () => {
    const maxDate = new Date(2024, 0, 15);
    render(<Calendar value={new Date(2024, 0, 10)} maxDate={maxDate} />);
    const day20 = screen.getByText('20');
    expect(day20).toBeDisabled();
    expect(day20.className).toContain('disabled');
  });

  it('disables specific dates', () => {
    const disabledDates = [new Date(2024, 0, 15)];
    render(<Calendar value={new Date(2024, 0, 10)} disabledDates={disabledDates} />);
    const day15 = screen.getByText('15');
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
    fireEvent.click(screen.getByText('15'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('supports firstDayOfWeek as Monday', () => {
    render(<Calendar firstDayOfWeek={1} />);
    const weekdays = screen.getAllByText(/^(Su|Mo|Tu|We|Th|Fr|Sa)$/);
    expect(weekdays[0]).toHaveTextContent('Mo');
    expect(weekdays[6]).toHaveTextContent('Su');
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
