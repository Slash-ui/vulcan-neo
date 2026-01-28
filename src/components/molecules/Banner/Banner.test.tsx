import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Banner } from './Banner';

describe('Banner', () => {
  it('renders children content', () => {
    render(<Banner>Announcement message</Banner>);
    expect(screen.getByText('Announcement message')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(
      <Banner icon={<span data-testid="icon">🎉</span>}>Content</Banner>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders CTA button when ctaText provided', () => {
    const handleClick = vi.fn();
    render(
      <Banner ctaText="Learn More" onCtaClick={handleClick}>
        Content
      </Banner>
    );
    fireEvent.click(screen.getByText('Learn More'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders CTA as link when ctaHref provided', () => {
    render(
      <Banner ctaText="Learn More" ctaHref="https://example.com">
        Content
      </Banner>
    );
    const link = screen.getByText('Learn More').closest('a');
    expect(link).toHaveAttribute('href', 'https://example.com');
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

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Banner variant="info">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('info');

    rerender(<Banner variant="success">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('success');

    rerender(<Banner variant="warning">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('warning');

    rerender(<Banner variant="error">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('error');

    rerender(<Banner variant="primary">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('primary');

    rerender(<Banner variant="gradient">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('gradient');
  });

  it('applies position classes correctly', () => {
    const { rerender } = render(<Banner position="top">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('position-top');

    rerender(<Banner position="bottom">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('position-bottom');

    rerender(<Banner position="inline">Content</Banner>);
    expect(screen.getByRole('banner').className).toContain('position-inline');
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
});
