import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LogoCloudSection } from './LogoCloudSection';

const defaultLogos = [
  { logo: <span data-testid="logo-1">Logo1</span>, name: 'Company A' },
  { logo: <span data-testid="logo-2">Logo2</span>, name: 'Company B' },
  { logo: <span data-testid="logo-3">Logo3</span>, name: 'Company C' },
];

describe('LogoCloudSection', () => {
  it('renders all logos', () => {
    render(<LogoCloudSection logos={defaultLogos} />);
    expect(screen.getByTestId('logo-1')).toBeInTheDocument();
    expect(screen.getByTestId('logo-2')).toBeInTheDocument();
    expect(screen.getByTestId('logo-3')).toBeInTheDocument();
  });

  it('renders eyebrow', () => {
    render(<LogoCloudSection logos={defaultLogos} eyebrow="Trusted By" />);
    expect(screen.getByText('Trusted By')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<LogoCloudSection logos={defaultLogos} title="Our Partners" />);
    expect(screen.getByText('Our Partners')).toBeInTheDocument();
  });

  it('renders logo as image when string URL provided', () => {
    const logos = [{ logo: 'https://example.com/logo.png', name: 'Company' }];
    render(<LogoCloudSection logos={logos} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/logo.png');
    expect(img).toHaveAttribute('alt', 'Company');
  });

  it('renders logo as link when href provided', () => {
    const logos = [
      {
        logo: <span>Logo</span>,
        name: 'Company',
        href: 'https://example.com',
      },
    ];
    render(<LogoCloudSection logos={logos} />);
    // Get the link element (the outer one with href)
    const link = screen.getByRole('link', { name: 'Company' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <LogoCloudSection logos={defaultLogos} variant="simple" data-testid="logos" />
    );
    expect(screen.getByTestId('logos').className).toContain('simple');

    rerender(
      <LogoCloudSection logos={defaultLogos} variant="grid" data-testid="logos" />
    );
    expect(screen.getByTestId('logos').className).toContain('grid');

    rerender(
      <LogoCloudSection logos={defaultLogos} variant="marquee" data-testid="logos" />
    );
    expect(screen.getByTestId('logos').className).toContain('marquee');
  });

  it('applies grayscale class by default', () => {
    render(<LogoCloudSection logos={defaultLogos} data-testid="logos" />);
    expect(screen.getByTestId('logos').className).toContain('grayscale');
  });

  it('removes grayscale class when grayscale is false', () => {
    render(<LogoCloudSection logos={defaultLogos} grayscale={false} data-testid="logos" />);
    expect(screen.getByTestId('logos').className).not.toContain('grayscale');
  });

  it('duplicates logos in marquee variant', () => {
    render(
      <LogoCloudSection
        logos={[{ logo: <span>SingleLogo</span>, name: 'Test' }]}
        variant="marquee"
      />
    );
    const logos = screen.getAllByText('SingleLogo');
    expect(logos.length).toBe(2); // Original + duplicate for infinite scroll
  });

  it('applies custom className', () => {
    render(
      <LogoCloudSection
        logos={defaultLogos}
        className="custom-logos"
        data-testid="logos"
      />
    );
    expect(screen.getByTestId('logos')).toHaveClass('custom-logos');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<LogoCloudSection ref={ref} logos={defaultLogos} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
