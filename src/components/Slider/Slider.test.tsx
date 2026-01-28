import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders a slider element', () => {
    render(<Slider />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Slider label="Volume" />);
    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  it('shows value when showValue is true', () => {
    render(<Slider value={75} showValue />);
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  it('uses custom formatValue function', () => {
    render(<Slider value={50} showValue formatValue={(v) => `${v}%`} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('sets aria attributes correctly', () => {
    render(<Slider min={0} max={100} value={50} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });

  it('handles keyboard navigation - ArrowRight', () => {
    const handleChange = vi.fn();
    render(<Slider value={50} step={10} onChange={handleChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith(60);
  });

  it('handles keyboard navigation - ArrowLeft', () => {
    const handleChange = vi.fn();
    render(<Slider value={50} step={10} onChange={handleChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenCalledWith(40);
  });

  it('handles keyboard navigation - Home', () => {
    const handleChange = vi.fn();
    render(<Slider value={50} min={0} onChange={handleChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'Home' });
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('handles keyboard navigation - End', () => {
    const handleChange = vi.fn();
    render(<Slider value={50} max={100} onChange={handleChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'End' });
    expect(handleChange).toHaveBeenCalledWith(100);
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Slider size="sm" data-testid="slider" />);
    expect(document.querySelector('[class*="slider"]')?.className).toContain('sm');

    rerender(<Slider size="md" data-testid="slider" />);
    expect(document.querySelector('[class*="slider"]')?.className).toContain('md');

    rerender(<Slider size="lg" data-testid="slider" />);
    expect(document.querySelector('[class*="slider"]')?.className).toContain('lg');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Slider disabled />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-disabled', 'true');
    expect(slider).toHaveAttribute('tabIndex', '-1');
  });

  it('supports uncontrolled mode with defaultValue', () => {
    render(<Slider defaultValue={30} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '30');
  });

  it('applies custom className', () => {
    render(<Slider className="custom-class" data-testid="slider" />);
    expect(screen.getByTestId('slider')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Slider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
