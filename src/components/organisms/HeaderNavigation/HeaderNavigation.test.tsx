import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeaderNavigation, HeaderNavItem, HeaderNavGroup } from './HeaderNavigation';

describe('HeaderNavigation', () => {
  it('renders logo when provided', () => {
    render(<HeaderNavigation logo={<span data-testid="logo">Logo</span>} />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('renders navigation content', () => {
    render(<HeaderNavigation navigation={<nav>Nav Items</nav>} />);
    expect(screen.getByText('Nav Items')).toBeInTheDocument();
  });

  it('renders actions content', () => {
    render(<HeaderNavigation actions={<button>Sign In</button>} />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('shows mobile menu button when mobileMenu provided', () => {
    render(<HeaderNavigation mobileMenu={<div>Mobile content</div>} />);
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', () => {
    render(<HeaderNavigation mobileMenu={<div>Mobile content</div>} />);

    // Initially closed
    expect(screen.queryByText('Mobile content')).not.toBeInTheDocument();

    // Open menu
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByText('Mobile content')).toBeInTheDocument();
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();

    // Close menu
    fireEvent.click(screen.getByLabelText('Close menu'));
    expect(screen.queryByText('Mobile content')).not.toBeInTheDocument();
  });

  it('hides mobile menu button when showMobileMenu is false', () => {
    render(
      <HeaderNavigation
        showMobileMenu={false}
        mobileMenu={<div>Mobile content</div>}
      />
    );
    expect(screen.queryByLabelText('Open menu')).not.toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<HeaderNavigation size="sm" data-testid="header" />);
    expect(screen.getByTestId('header').className).toContain('sm');

    rerender(<HeaderNavigation size="md" data-testid="header" />);
    expect(screen.getByTestId('header').className).toContain('md');

    rerender(<HeaderNavigation size="lg" data-testid="header" />);
    expect(screen.getByTestId('header').className).toContain('lg');
  });

  it('applies sticky class when sticky is true', () => {
    render(<HeaderNavigation sticky data-testid="header" />);
    expect(screen.getByTestId('header').className).toContain('sticky');
  });

  it('applies custom className', () => {
    render(<HeaderNavigation className="custom-header" data-testid="header" />);
    expect(screen.getByTestId('header')).toHaveClass('custom-header');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<HeaderNavigation ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('HEADER');
  });
});

describe('HeaderNavItem', () => {
  it('renders children', () => {
    render(<HeaderNavItem>Home</HeaderNavItem>);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders as link when href provided', () => {
    render(<HeaderNavItem href="/about">About</HeaderNavItem>);
    const link = screen.getByText('About');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/about');
  });

  it('renders as button when no href', () => {
    render(<HeaderNavItem>Contact</HeaderNavItem>);
    expect(screen.getByText('Contact').tagName).toBe('BUTTON');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<HeaderNavItem onClick={handleClick}>Click Me</HeaderNavItem>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies active class and aria-current', () => {
    render(<HeaderNavItem active>Active Item</HeaderNavItem>);
    const item = screen.getByText('Active Item');
    expect(item.className).toContain('active');
    expect(item).toHaveAttribute('aria-current', 'page');
  });

  it('applies disabled class and attribute', () => {
    render(<HeaderNavItem disabled>Disabled Item</HeaderNavItem>);
    const item = screen.getByText('Disabled Item');
    expect(item.className).toContain('disabled');
    expect(item).toBeDisabled();
  });

  it('renders as button when disabled even with href', () => {
    render(<HeaderNavItem href="/test" disabled>Disabled Link</HeaderNavItem>);
    expect(screen.getByText('Disabled Link').tagName).toBe('BUTTON');
  });

  it('applies custom className', () => {
    render(<HeaderNavItem className="custom-item">Item</HeaderNavItem>);
    expect(screen.getByText('Item')).toHaveClass('custom-item');
  });
});

describe('HeaderNavGroup', () => {
  it('renders children', () => {
    render(
      <HeaderNavGroup>
        <HeaderNavItem>Item 1</HeaderNavItem>
        <HeaderNavItem>Item 2</HeaderNavItem>
      </HeaderNavGroup>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies gap classes correctly', () => {
    const { rerender } = render(
      <HeaderNavGroup gap="sm" data-testid="group">
        <HeaderNavItem>Item</HeaderNavItem>
      </HeaderNavGroup>
    );
    expect(screen.getByTestId('group').className).toContain('gap-sm');

    rerender(
      <HeaderNavGroup gap="md" data-testid="group">
        <HeaderNavItem>Item</HeaderNavItem>
      </HeaderNavGroup>
    );
    expect(screen.getByTestId('group').className).toContain('gap-md');

    rerender(
      <HeaderNavGroup gap="lg" data-testid="group">
        <HeaderNavItem>Item</HeaderNavItem>
      </HeaderNavGroup>
    );
    expect(screen.getByTestId('group').className).toContain('gap-lg');
  });

  it('applies custom className', () => {
    render(
      <HeaderNavGroup className="custom-group" data-testid="group">
        <HeaderNavItem>Item</HeaderNavItem>
      </HeaderNavGroup>
    );
    expect(screen.getByTestId('group')).toHaveClass('custom-group');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <HeaderNavGroup ref={ref}>
        <HeaderNavItem>Item</HeaderNavItem>
      </HeaderNavGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
