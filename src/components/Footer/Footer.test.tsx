import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders logo when provided', () => {
    render(<Footer logo={<span data-testid="logo">Logo</span>} />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<Footer description="Company description" />);
    expect(screen.getByText('Company description')).toBeInTheDocument();
  });

  it('renders link groups', () => {
    const linkGroups = [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '/features' },
          { label: 'Pricing', href: '/pricing' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Careers', href: '/careers' },
        ],
      },
    ];
    render(<Footer linkGroups={linkGroups} />);

    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Careers')).toBeInTheDocument();
  });

  it('renders social links', () => {
    const socialLinks = [
      { icon: <span data-testid="twitter-icon">T</span>, href: 'https://twitter.com', label: 'Twitter' },
      { icon: <span data-testid="github-icon">G</span>, href: 'https://github.com', label: 'GitHub' },
    ];
    render(<Footer socialLinks={socialLinks} />);

    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toHaveAttribute('href', 'https://twitter.com');
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', 'https://github.com');
  });

  it('renders copyright text', () => {
    render(<Footer copyright="© 2024 Company Inc." />);
    expect(screen.getByText('© 2024 Company Inc.')).toBeInTheDocument();
  });

  it('renders legal links', () => {
    const legalLinks = [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ];
    render(<Footer legalLinks={legalLinks} />);

    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });

  it('renders custom bottom content', () => {
    render(<Footer bottomContent={<div data-testid="custom-bottom">Custom content</div>} />);
    expect(screen.getByTestId('custom-bottom')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Footer variant="default" data-testid="footer" />);
    expect(screen.getByTestId('footer').className).toContain('default');

    rerender(<Footer variant="simple" data-testid="footer" />);
    expect(screen.getByTestId('footer').className).toContain('simple');

    rerender(<Footer variant="centered" data-testid="footer" />);
    expect(screen.getByTestId('footer').className).toContain('centered');
  });

  it('renders simple variant layout', () => {
    const linkGroups = [
      {
        title: 'Links',
        links: [
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
        ],
      },
    ];
    render(
      <Footer
        variant="simple"
        logo={<span>Logo</span>}
        linkGroups={linkGroups}
      />
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Footer className="custom-footer" data-testid="footer" />);
    expect(screen.getByTestId('footer')).toHaveClass('custom-footer');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<Footer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('FOOTER');
  });
});
