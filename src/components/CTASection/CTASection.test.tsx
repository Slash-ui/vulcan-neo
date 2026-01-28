import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CTASection } from './CTASection';

describe('CTASection', () => {
  it('renders title', () => {
    render(<CTASection title="Join Us Today" primaryCtaText="Get Started" />);
    expect(screen.getByText('Join Us Today')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <CTASection
        title="Title"
        primaryCtaText="CTA"
        description="Start your journey"
      />
    );
    expect(screen.getByText('Start your journey')).toBeInTheDocument();
  });

  it('renders primary CTA', () => {
    const handleClick = vi.fn();
    render(
      <CTASection
        title="Title"
        primaryCtaText="Get Started"
        onPrimaryCtaClick={handleClick}
      />
    );
    fireEvent.click(screen.getByText('Get Started'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders secondary CTA', () => {
    const handleClick = vi.fn();
    render(
      <CTASection
        title="Title"
        primaryCtaText="Primary"
        secondaryCtaText="Learn More"
        onSecondaryCtaClick={handleClick}
      />
    );
    fireEvent.click(screen.getByText('Learn More'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders image in split variant', () => {
    render(
      <CTASection
        title="Title"
        primaryCtaText="CTA"
        variant="split"
        image="https://example.com/image.jpg"
        imageAlt="CTA image"
      />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(img).toHaveAttribute('alt', 'CTA image');
  });

  it('does not render image in simple variant', () => {
    render(
      <CTASection
        title="Title"
        primaryCtaText="CTA"
        variant="simple"
        image="https://example.com/image.jpg"
      />
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <CTASection title="Title" primaryCtaText="CTA" variant="simple" data-testid="cta" />
    );
    expect(screen.getByTestId('cta').className).toContain('simple');

    rerender(
      <CTASection title="Title" primaryCtaText="CTA" variant="split" data-testid="cta" />
    );
    expect(screen.getByTestId('cta').className).toContain('split');

    rerender(
      <CTASection title="Title" primaryCtaText="CTA" variant="card" data-testid="cta" />
    );
    expect(screen.getByTestId('cta').className).toContain('card');

    rerender(
      <CTASection title="Title" primaryCtaText="CTA" variant="full-width" data-testid="cta" />
    );
    expect(screen.getByTestId('cta').className).toContain('full-width');
  });

  it('applies background classes correctly', () => {
    const { rerender } = render(
      <CTASection title="Title" primaryCtaText="CTA" background="default" data-testid="cta" />
    );
    expect(screen.getByTestId('cta').className).toContain('bg-default');

    rerender(
      <CTASection title="Title" primaryCtaText="CTA" background="primary" data-testid="cta" />
    );
    expect(screen.getByTestId('cta').className).toContain('bg-primary');

    rerender(
      <CTASection title="Title" primaryCtaText="CTA" background="gradient" data-testid="cta" />
    );
    expect(screen.getByTestId('cta').className).toContain('bg-gradient');
  });

  it('applies custom className', () => {
    render(
      <CTASection
        title="Title"
        primaryCtaText="CTA"
        className="custom-cta"
        data-testid="cta"
      />
    );
    expect(screen.getByTestId('cta')).toHaveClass('custom-cta');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<CTASection ref={ref} title="Title" primaryCtaText="CTA" />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
