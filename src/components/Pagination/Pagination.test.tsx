import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders pagination nav', () => {
    render(<Pagination page={1} totalPages={5} onChange={() => {}} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('has aria-label for accessibility', () => {
    render(<Pagination page={1} totalPages={5} onChange={() => {}} />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Pagination');
  });

  it('renders page buttons', () => {
    render(<Pagination page={1} totalPages={5} onChange={() => {}} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('marks current page with aria-current', () => {
    render(<Pagination page={3} totalPages={5} onChange={() => {}} />);
    expect(screen.getByText('3').closest('button')).toHaveAttribute('aria-current', 'page');
  });

  it('calls onChange when page button clicked', () => {
    const handleChange = vi.fn();
    render(<Pagination page={1} totalPages={5} onChange={handleChange} />);
    fireEvent.click(screen.getByText('3'));
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('does not call onChange when current page clicked', () => {
    const handleChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onChange={handleChange} />);
    fireEvent.click(screen.getByText('3'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('shows prev/next buttons by default', () => {
    render(<Pagination page={2} totalPages={5} onChange={() => {}} />);
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
  });

  it('hides prev/next buttons when showPrevNext is false', () => {
    render(<Pagination page={2} totalPages={5} onChange={() => {}} showPrevNext={false} />);
    expect(screen.queryByLabelText('Go to previous page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Go to next page')).not.toBeInTheDocument();
  });

  it('calls onChange on prev button click', () => {
    const handleChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('Go to previous page'));
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('calls onChange on next button click', () => {
    const handleChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('Go to next page'));
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('disables prev button on first page', () => {
    render(<Pagination page={1} totalPages={5} onChange={() => {}} />);
    expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination page={5} totalPages={5} onChange={() => {}} />);
    expect(screen.getByLabelText('Go to next page')).toBeDisabled();
  });

  it('shows first/last buttons by default', () => {
    render(<Pagination page={3} totalPages={5} onChange={() => {}} />);
    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument();
  });

  it('hides first/last buttons when showFirstLast is false', () => {
    render(<Pagination page={3} totalPages={5} onChange={() => {}} showFirstLast={false} />);
    expect(screen.queryByLabelText('Go to first page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Go to last page')).not.toBeInTheDocument();
  });

  it('calls onChange on first button click', () => {
    const handleChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('Go to first page'));
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('calls onChange on last button click', () => {
    const handleChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('Go to last page'));
    expect(handleChange).toHaveBeenCalledWith(5);
  });

  it('disables first button on first page', () => {
    render(<Pagination page={1} totalPages={5} onChange={() => {}} />);
    expect(screen.getByLabelText('Go to first page')).toBeDisabled();
  });

  it('disables last button on last page', () => {
    render(<Pagination page={5} totalPages={5} onChange={() => {}} />);
    expect(screen.getByLabelText('Go to last page')).toBeDisabled();
  });

  it('shows ellipsis for many pages', () => {
    render(<Pagination page={5} totalPages={10} onChange={() => {}} />);
    const dots = screen.getAllByText('...');
    expect(dots.length).toBeGreaterThan(0);
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Pagination page={1} totalPages={5} onChange={() => {}} size="sm" />);
    expect(screen.getByRole('navigation').className).toContain('sm');

    rerender(<Pagination page={1} totalPages={5} onChange={() => {}} size="md" />);
    expect(screen.getByRole('navigation').className).toContain('md');

    rerender(<Pagination page={1} totalPages={5} onChange={() => {}} size="lg" />);
    expect(screen.getByRole('navigation').className).toContain('lg');
  });

  it('applies disabled class when disabled', () => {
    render(<Pagination page={1} totalPages={5} onChange={() => {}} disabled />);
    expect(screen.getByRole('navigation').className).toContain('disabled');
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Pagination page={1} totalPages={5} onChange={handleChange} disabled />);
    fireEvent.click(screen.getByText('3'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Pagination page={1} totalPages={5} onChange={() => {}} className="custom-class" />);
    expect(screen.getByRole('navigation')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<Pagination ref={ref} page={1} totalPages={5} onChange={() => {}} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('renders all pages when totalPages is small', () => {
    render(<Pagination page={1} totalPages={3} onChange={() => {}} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });
});
