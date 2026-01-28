import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RatingStars } from './RatingStars';

describe('RatingStars', () => {
  it('renders with radiogroup role', () => {
    render(<RatingStars />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('has aria-label for accessibility', () => {
    render(<RatingStars />);
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Rating');
  });

  it('renders 5 stars by default', () => {
    render(<RatingStars />);
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('renders custom number of stars', () => {
    render(<RatingStars max={10} />);
    expect(screen.getAllByRole('radio')).toHaveLength(10);
  });

  it('each star has correct aria-label', () => {
    render(<RatingStars />);
    expect(screen.getByLabelText('1 star')).toBeInTheDocument();
    expect(screen.getByLabelText('2 stars')).toBeInTheDocument();
    expect(screen.getByLabelText('5 stars')).toBeInTheDocument();
  });

  it('calls onChange when star is clicked', () => {
    const handleChange = vi.fn();
    render(<RatingStars onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('3 stars'));
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('supports uncontrolled mode with defaultValue', () => {
    render(<RatingStars defaultValue={3} />);
    const star3 = screen.getByLabelText('3 stars');
    expect(star3).toHaveAttribute('aria-checked', 'true');
  });

  it('supports controlled mode', () => {
    const { rerender } = render(<RatingStars value={2} />);
    expect(screen.getByLabelText('2 stars')).toHaveAttribute('aria-checked', 'true');

    rerender(<RatingStars value={4} />);
    expect(screen.getByLabelText('4 stars')).toHaveAttribute('aria-checked', 'true');
  });

  it('clears rating when same star is clicked', () => {
    const handleChange = vi.fn();
    render(<RatingStars value={3} onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('3 stars'));
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('does not call onChange when readOnly', () => {
    const handleChange = vi.fn();
    render(<RatingStars readOnly onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('3 stars'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<RatingStars disabled onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('3 stars'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('shows value when showValue is true', () => {
    render(<RatingStars value={3} showValue />);
    expect(screen.getByText('3 / 5')).toBeInTheDocument();
  });

  it('handles keyboard Enter to select', () => {
    const handleChange = vi.fn();
    render(<RatingStars onChange={handleChange} />);
    const star = screen.getByLabelText('3 stars');
    fireEvent.keyDown(star, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('handles keyboard Space to select', () => {
    const handleChange = vi.fn();
    render(<RatingStars onChange={handleChange} />);
    const star = screen.getByLabelText('3 stars');
    fireEvent.keyDown(star, { key: ' ' });
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('handles keyboard ArrowRight to increase', () => {
    const handleChange = vi.fn();
    render(<RatingStars value={2} onChange={handleChange} />);
    const star = screen.getByLabelText('2 stars');
    fireEvent.keyDown(star, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('handles keyboard ArrowLeft to decrease', () => {
    const handleChange = vi.fn();
    render(<RatingStars value={3} onChange={handleChange} />);
    const star = screen.getByLabelText('3 stars');
    fireEvent.keyDown(star, { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('clamps value when increasing with ArrowRight at max', () => {
    const handleChange = vi.fn();
    render(<RatingStars value={4} max={5} onChange={handleChange} />);
    const star = screen.getByLabelText('4 stars');
    fireEvent.keyDown(star, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith(5);
  });

  it('respects min (0) when decreasing with ArrowLeft', () => {
    const handleChange = vi.fn();
    render(<RatingStars value={0} onChange={handleChange} />);
    const star = screen.getByLabelText('1 star');
    fireEvent.keyDown(star, { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<RatingStars size="sm" />);
    expect(document.querySelector('[class*="stars"]')?.className).toContain('sm');

    rerender(<RatingStars size="md" />);
    expect(document.querySelector('[class*="stars"]')?.className).toContain('md');

    rerender(<RatingStars size="lg" />);
    expect(document.querySelector('[class*="stars"]')?.className).toContain('lg');
  });

  it('applies color classes correctly', () => {
    const { rerender } = render(<RatingStars color="default" value={1} />);
    expect(screen.getByLabelText('1 star').className).toContain('color-default');

    rerender(<RatingStars color="warning" value={1} />);
    expect(screen.getByLabelText('1 star').className).toContain('color-warning');

    rerender(<RatingStars color="primary" value={1} />);
    expect(screen.getByLabelText('1 star').className).toContain('color-primary');
  });

  it('applies disabled class', () => {
    render(<RatingStars disabled data-testid="rating" />);
    expect(screen.getByTestId('rating').className).toContain('disabled');
  });

  it('applies readOnly class', () => {
    render(<RatingStars readOnly data-testid="rating" />);
    expect(screen.getByTestId('rating').className).toContain('readOnly');
  });

  it('applies custom className', () => {
    render(<RatingStars className="custom-rating" data-testid="rating" />);
    expect(screen.getByTestId('rating')).toHaveClass('custom-rating');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<RatingStars ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
