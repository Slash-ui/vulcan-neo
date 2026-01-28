import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  it('renders title', () => {
    render(<HeroSection title="Welcome to our Product" />);
    expect(screen.getByText('Welcome to our Product')).toBeInTheDocument();
  });

  it('renders eyebrow', () => {
    render(<HeroSection title="Title" eyebrow="New Feature" />);
    expect(screen.getByText('New Feature')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<HeroSection title="Title" description="This is a description" />);
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('renders primary CTA', () => {
    const handleClick = vi.fn();
    render(
      <HeroSection
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
      <HeroSection
        title="Title"
        secondaryCtaText="Learn More"
        onSecondaryCtaClick={handleClick}
      />
    );
    fireEvent.click(screen.getByText('Learn More'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders both CTAs', () => {
    render(
      <HeroSection
        title="Title"
        primaryCtaText="Primary"
        secondaryCtaText="Secondary"
      />
    );
    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  it('renders image in split variant', () => {
    render(
      <HeroSection
        title="Title"
        variant="split"
        image="https://example.com/image.jpg"
        imageAlt="Hero image"
      />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(img).toHaveAttribute('alt', 'Hero image');
  });

  it('does not render image in centered variant', () => {
    render(
      <HeroSection
        title="Title"
        variant="centered"
        image="https://example.com/image.jpg"
      />
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders additional content', () => {
    render(
      <HeroSection
        title="Title"
        additionalContent={<div data-testid="additional">Extra content</div>}
      />
    );
    expect(screen.getByTestId('additional')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <HeroSection title="Title" variant="centered" data-testid="hero" />
    );
    expect(screen.getByTestId('hero').className).toContain('centered');

    rerender(<HeroSection title="Title" variant="split" data-testid="hero" />);
    expect(screen.getByTestId('hero').className).toContain('split');

    rerender(<HeroSection title="Title" variant="image-background" data-testid="hero" />);
    expect(screen.getByTestId('hero').className).toContain('image-background');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(
      <HeroSection title="Title" size="sm" data-testid="hero" />
    );
    expect(screen.getByTestId('hero').className).toContain('size-sm');

    rerender(<HeroSection title="Title" size="md" data-testid="hero" />);
    expect(screen.getByTestId('hero').className).toContain('size-md');

    rerender(<HeroSection title="Title" size="lg" data-testid="hero" />);
    expect(screen.getByTestId('hero').className).toContain('size-lg');
  });

  it('applies background image style', () => {
    render(
      <HeroSection
        title="Title"
        backgroundImage="https://example.com/bg.jpg"
        data-testid="hero"
      />
    );
    const hero = screen.getByTestId('hero');
    expect(hero.style.backgroundImage).toContain('https://example.com/bg.jpg');
  });

  it('applies custom className', () => {
    render(<HeroSection title="Title" className="custom-hero" data-testid="hero" />);
    expect(screen.getByTestId('hero')).toHaveClass('custom-hero');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<HeroSection ref={ref} title="Title" />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
