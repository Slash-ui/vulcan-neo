import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MarketingHeader } from './MarketingHeader';

describe('MarketingHeader', () => {
  it('renders logo', () => {
    render(<MarketingHeader logo={<span data-testid="logo">Logo</span>} />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    const navItems = [
      { label: 'Products', href: '/products' },
      { label: 'Pricing', href: '/pricing' },
    ];
    render(<MarketingHeader logo="Logo" navItems={navItems} />);
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  it('renders primary CTA button', () => {
    const handleClick = vi.fn();
    render(
      <MarketingHeader logo="Logo" ctaText="Get Started" onCtaClick={handleClick} />
    );
    fireEvent.click(screen.getByText('Get Started'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders secondary CTA button', () => {
    const handleClick = vi.fn();
    render(
      <MarketingHeader
        logo="Logo"
        secondaryCtaText="Sign In"
        onSecondaryCtaClick={handleClick}
      />
    );
    fireEvent.click(screen.getByText('Sign In'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders announcement banner', () => {
    render(<MarketingHeader logo="Logo" announcement="New feature available!" />);
    expect(screen.getByText('New feature available!')).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    const navItems = [{ label: 'Products', href: '/products' }];
    render(<MarketingHeader logo="Logo" navItems={navItems} />);

    // Open menu
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();

    // Close menu
    fireEvent.click(screen.getByLabelText('Close menu'));
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('shows dropdown for nested nav items', () => {
    const navItems = [
      {
        label: 'Products',
        children: [
          { label: 'Product A', href: '/product-a' },
          { label: 'Product B', href: '/product-b' },
        ],
      },
    ];
    render(<MarketingHeader logo="Logo" navItems={navItems} />);

    // Initially dropdown is closed
    expect(screen.queryByText('Product A')).not.toBeInTheDocument();

    // Open dropdown
    fireEvent.click(screen.getByText('Products'));
    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();

    // Close dropdown
    fireEvent.click(screen.getByText('Products'));
    expect(screen.queryByText('Product A')).not.toBeInTheDocument();
  });

  it('calls nav item onClick', () => {
    const handleClick = vi.fn();
    const navItems = [{ label: 'Contact', onClick: handleClick }];
    render(<MarketingHeader logo="Logo" navItems={navItems} />);
    fireEvent.click(screen.getByText('Contact'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies sticky class when sticky is true', () => {
    render(<MarketingHeader logo="Logo" sticky data-testid="header" />);
    expect(screen.getByTestId('header').className).toContain('sticky');
  });

  it('applies transparent class when transparent is true', () => {
    render(<MarketingHeader logo="Logo" transparent data-testid="header" />);
    expect(screen.getByTestId('header').className).toContain('transparent');
  });

  it('applies custom className', () => {
    render(<MarketingHeader logo="Logo" className="custom-header" data-testid="header" />);
    expect(screen.getByTestId('header')).toHaveClass('custom-header');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<MarketingHeader ref={ref} logo="Logo" />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
