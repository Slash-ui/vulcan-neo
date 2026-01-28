import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="User" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop');
  });

  it('renders fallback when no src is provided', () => {
    render(<Avatar fallback="JD" data-testid="avatar" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders fallback on image error', () => {
    render(<Avatar src="invalid.jpg" fallback="JD" data-testid="avatar" />);
    const img = screen.getByTestId('avatar').querySelector('img');
    fireEvent.error(img!);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('applies convex variant by default', () => {
    render(<Avatar fallback="JD" data-testid="avatar" />);
    expect(screen.getByTestId('avatar').className).toContain('convex');
  });

  it('applies concave variant when specified', () => {
    render(<Avatar variant="concave" fallback="JD" data-testid="avatar" />);
    expect(screen.getByTestId('avatar').className).toContain('concave');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Avatar size="xs" fallback="JD" data-testid="avatar" />);
    expect(screen.getByTestId('avatar').className).toContain('xs');

    rerender(<Avatar size="sm" fallback="JD" data-testid="avatar" />);
    expect(screen.getByTestId('avatar').className).toContain('sm');

    rerender(<Avatar size="md" fallback="JD" data-testid="avatar" />);
    expect(screen.getByTestId('avatar').className).toContain('md');

    rerender(<Avatar size="lg" fallback="JD" data-testid="avatar" />);
    expect(screen.getByTestId('avatar').className).toContain('lg');

    rerender(<Avatar size="xl" fallback="JD" data-testid="avatar" />);
    expect(screen.getByTestId('avatar').className).toContain('xl');
  });

  it('renders status indicator', () => {
    render(<Avatar fallback="JD" status="online" data-testid="avatar" />);
    const status = document.querySelector('[class*="status"]');
    expect(status).toBeInTheDocument();
    expect(status?.className).toContain('status-online');
  });

  it('applies different status states', () => {
    const { rerender } = render(<Avatar fallback="JD" status="online" />);
    expect(document.querySelector('[class*="status-online"]')).toBeInTheDocument();

    rerender(<Avatar fallback="JD" status="offline" />);
    expect(document.querySelector('[class*="status-offline"]')).toBeInTheDocument();

    rerender(<Avatar fallback="JD" status="busy" />);
    expect(document.querySelector('[class*="status-busy"]')).toBeInTheDocument();

    rerender(<Avatar fallback="JD" status="away" />);
    expect(document.querySelector('[class*="status-away"]')).toBeInTheDocument();
  });

  it('applies status border by default', () => {
    render(<Avatar fallback="JD" status="online" />);
    expect(document.querySelector('[class*="statusBorder"]')).toBeInTheDocument();
  });

  it('removes status border when statusBorder is false', () => {
    render(<Avatar fallback="JD" status="online" statusBorder={false} />);
    expect(document.querySelector('[class*="statusBorder"]')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Avatar fallback="JD" className="custom-class" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Avatar ref={ref} fallback="JD" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
