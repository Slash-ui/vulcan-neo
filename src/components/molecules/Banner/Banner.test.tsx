import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Banner } from './Banner';

describe('Banner', () => {
  it('renders children content', () => {
    render(<Banner>Announcement message</Banner>);
    expect(screen.getByText('Announcement message')).toBeInTheDocument();
  });

  it('renders title and description', () => {
    render(<Banner title="Test Title" description="Test description" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(
      <Banner icon={<span data-testid="icon">🎉</span>}>Content</Banner>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders primaryAction and secondaryAction when provided', () => {
    render(
      <Banner
        primaryAction={<button>Primary</button>}
        secondaryAction={<button>Secondary</button>}
      >
        Content
      </Banner>
    );
    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  it('renders beforeActions when provided', () => {
    render(
      <Banner beforeActions={<input data-testid="input" />}>Content</Banner>
    );
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('shows dismiss button when dismissible', () => {
    render(<Banner dismissible>Content</Banner>);
    expect(screen.getByLabelText('Dismiss banner')).toBeInTheDocument();
  });

  it('calls onDismiss and hides when dismiss clicked', () => {
    const handleDismiss = vi.fn();
    render(
      <Banner dismissible onDismiss={handleDismiss}>
        Content
      </Banner>
    );
    fireEvent.click(screen.getByLabelText('Dismiss banner'));
    expect(handleDismiss).toHaveBeenCalled();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('does not show dismiss button by default', () => {
    render(<Banner>Content</Banner>);
    expect(screen.queryByLabelText('Dismiss banner')).not.toBeInTheDocument();
  });

  it('applies color classes correctly', () => {
    const { rerender } = render(<Banner color="default">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('color-default');

    rerender(<Banner color="primary">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('color-primary');

    rerender(<Banner color="success">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('color-success');

    rerender(<Banner color="error">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('color-error');

    rerender(<Banner color="warning">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('color-warning');

    rerender(<Banner color="info">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('color-info');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Banner size="sm">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('sm');

    rerender(<Banner size="md">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('md');

    rerender(<Banner size="lg">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('lg');
  });

  it('applies sticky and position classes when sticky', () => {
    const { rerender } = render(<Banner sticky position="top">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('sticky');
    expect(screen.getByRole('banner').className).toContain('position-top');

    rerender(<Banner sticky position="bottom">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('sticky');
    expect(screen.getByRole('banner').className).toContain('position-bottom');
  });

  it('does not apply position class when not sticky', () => {
    render(<Banner position="top">Content</Banner>);
    expect(screen.getByRole('banner').className).not.toContain('position-top');
    expect(screen.getByRole('banner').className).not.toContain('sticky');
  });

  it('applies text alignment classes correctly', () => {
    const { rerender } = render(<Banner textAlign="center">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('text-center');

    rerender(<Banner textAlign="left">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('text-left');
  });

  it('applies custom className', () => {
    render(<Banner className="custom-banner">Content</Banner>);
    expect(screen.getByRole('banner')).toHaveClass('custom-banner');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Banner ref={ref}>Content</Banner>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('uses default values for variant, color, size, and textAlign', () => {
    render(<Banner>Content</Banner>);
    const banner = screen.getByRole('banner');
    expect(banner.className).toContain('convex');
    expect(banner.className).toContain('color-default');
    expect(banner.className).toContain('md');
    expect(banner.className).toContain('text-center');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Banner variant="convex">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('convex');

    rerender(<Banner variant="flat">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('flat');

    rerender(<Banner variant="concave">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('concave');
  });
});
