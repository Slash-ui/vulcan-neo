import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Carousel } from './Carousel';

const slides = [
  <div key="1">Slide 1</div>,
  <div key="2">Slide 2</div>,
  <div key="3">Slide 3</div>,
];

describe('Carousel', () => {
  it('renders with region role', () => {
    render(<Carousel>{slides}</Carousel>);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('has carousel aria-roledescription', () => {
    render(<Carousel>{slides}</Carousel>);
    expect(screen.getByRole('region')).toHaveAttribute('aria-roledescription', 'carousel');
  });

  it('renders all slides', () => {
    render(<Carousel>{slides}</Carousel>);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('renders slides with correct aria-label', () => {
    render(<Carousel>{slides}</Carousel>);
    expect(screen.getByLabelText('Slide 1 of 3')).toBeInTheDocument();
    expect(screen.getByLabelText('Slide 2 of 3')).toBeInTheDocument();
    expect(screen.getByLabelText('Slide 3 of 3')).toBeInTheDocument();
  });

  it('shows navigation arrows by default', () => {
    render(<Carousel>{slides}</Carousel>);
    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
  });

  it('hides navigation arrows when showArrows is false', () => {
    render(<Carousel showArrows={false}>{slides}</Carousel>);
    expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument();
  });

  it('shows pagination dots by default', () => {
    render(<Carousel>{slides}</Carousel>);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('hides pagination dots when showDots is false', () => {
    render(<Carousel showDots={false}>{slides}</Carousel>);
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  });

  it('navigates to next slide when next button clicked', () => {
    const handleChange = vi.fn();
    render(<Carousel onChange={handleChange}>{slides}</Carousel>);
    fireEvent.click(screen.getByLabelText('Next slide'));
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('navigates to previous slide when prev button clicked', () => {
    const handleChange = vi.fn();
    render(<Carousel initialIndex={1} onChange={handleChange}>{slides}</Carousel>);
    fireEvent.click(screen.getByLabelText('Previous slide'));
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('navigates to specific slide when dot clicked', () => {
    const handleChange = vi.fn();
    render(<Carousel onChange={handleChange}>{slides}</Carousel>);
    fireEvent.click(screen.getByLabelText('Go to slide 3'));
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('disables prev button on first slide', () => {
    render(<Carousel>{slides}</Carousel>);
    expect(screen.getByLabelText('Previous slide')).toBeDisabled();
  });

  it('disables next button on last slide', () => {
    render(<Carousel initialIndex={2}>{slides}</Carousel>);
    expect(screen.getByLabelText('Next slide')).toBeDisabled();
  });

  it('enables navigation in loop mode', () => {
    render(<Carousel loop>{slides}</Carousel>);
    expect(screen.getByLabelText('Previous slide')).not.toBeDisabled();
  });

  it('loops to last slide when prev clicked at first slide in loop mode', () => {
    const handleChange = vi.fn();
    render(<Carousel loop onChange={handleChange}>{slides}</Carousel>);
    fireEvent.click(screen.getByLabelText('Previous slide'));
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('loops to first slide when next clicked at last slide in loop mode', () => {
    const handleChange = vi.fn();
    render(<Carousel loop initialIndex={2} onChange={handleChange}>{slides}</Carousel>);
    fireEvent.click(screen.getByLabelText('Next slide'));
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('handles keyboard ArrowRight navigation', () => {
    const handleChange = vi.fn();
    render(<Carousel onChange={handleChange}>{slides}</Carousel>);
    const carousel = screen.getByRole('region');
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('handles keyboard ArrowLeft navigation', () => {
    const handleChange = vi.fn();
    render(<Carousel initialIndex={1} onChange={handleChange}>{slides}</Carousel>);
    const carousel = screen.getByRole('region');
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('marks current dot as selected', () => {
    render(<Carousel initialIndex={1}>{slides}</Carousel>);
    const dots = screen.getAllByRole('tab');
    expect(dots[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Carousel size="sm">{slides}</Carousel>);
    expect(screen.getByRole('region').className).toContain('sm');

    rerender(<Carousel size="md">{slides}</Carousel>);
    expect(screen.getByRole('region').className).toContain('md');

    rerender(<Carousel size="lg">{slides}</Carousel>);
    expect(screen.getByRole('region').className).toContain('lg');
  });

  it('starts at initialIndex', () => {
    render(<Carousel initialIndex={2}>{slides}</Carousel>);
    const dots = screen.getAllByRole('tab');
    expect(dots[2]).toHaveAttribute('aria-selected', 'true');
  });

  it('applies custom className', () => {
    render(<Carousel className="custom-carousel">{slides}</Carousel>);
    expect(screen.getByRole('region')).toHaveClass('custom-carousel');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Carousel ref={ref}>{slides}</Carousel>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
