import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SidebarNavigation, SidebarNavGroup, SidebarNavItem } from './SidebarNavigation';

describe('SidebarNavigation', () => {
  it('renders children', () => {
    render(
      <SidebarNavigation>
        <SidebarNavItem>Dashboard</SidebarNavItem>
      </SidebarNavigation>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders header when provided', () => {
    render(
      <SidebarNavigation header={<div data-testid="header">Logo</div>}>
        <SidebarNavItem>Item</SidebarNavItem>
      </SidebarNavigation>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <SidebarNavigation footer={<div data-testid="footer">User</div>}>
        <SidebarNavItem>Item</SidebarNavItem>
      </SidebarNavigation>
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(
      <SidebarNavigation size="sm" data-testid="sidebar">
        <SidebarNavItem>Item</SidebarNavItem>
      </SidebarNavigation>
    );
    expect(screen.getByTestId('sidebar').className).toContain('sm');

    rerender(
      <SidebarNavigation size="md" data-testid="sidebar">
        <SidebarNavItem>Item</SidebarNavItem>
      </SidebarNavigation>
    );
    expect(screen.getByTestId('sidebar').className).toContain('md');

    rerender(
      <SidebarNavigation size="lg" data-testid="sidebar">
        <SidebarNavItem>Item</SidebarNavItem>
      </SidebarNavigation>
    );
    expect(screen.getByTestId('sidebar').className).toContain('lg');
  });

  it('applies collapsed class when collapsed', () => {
    render(
      <SidebarNavigation collapsed data-testid="sidebar">
        <SidebarNavItem>Item</SidebarNavItem>
      </SidebarNavigation>
    );
    expect(screen.getByTestId('sidebar').className).toContain('collapsed');
  });

  it('applies custom className', () => {
    render(
      <SidebarNavigation className="custom-sidebar" data-testid="sidebar">
        <SidebarNavItem>Item</SidebarNavItem>
      </SidebarNavigation>
    );
    expect(screen.getByTestId('sidebar')).toHaveClass('custom-sidebar');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(
      <SidebarNavigation ref={ref}>
        <SidebarNavItem>Item</SidebarNavItem>
      </SidebarNavigation>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('ASIDE');
  });
});

describe('SidebarNavGroup', () => {
  it('renders children', () => {
    render(
      <SidebarNavigation>
        <SidebarNavGroup>
          <SidebarNavItem>Item 1</SidebarNavItem>
          <SidebarNavItem>Item 2</SidebarNavItem>
        </SidebarNavGroup>
      </SidebarNavigation>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(
      <SidebarNavigation>
        <SidebarNavGroup label="Main Menu">
          <SidebarNavItem>Item</SidebarNavItem>
        </SidebarNavGroup>
      </SidebarNavigation>
    );
    expect(screen.getByText('Main Menu')).toBeInTheDocument();
  });

  it('hides label when sidebar is collapsed', () => {
    render(
      <SidebarNavigation collapsed>
        <SidebarNavGroup label="Main Menu">
          <SidebarNavItem>Item</SidebarNavItem>
        </SidebarNavGroup>
      </SidebarNavigation>
    );
    expect(screen.queryByText('Main Menu')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <SidebarNavigation>
        <SidebarNavGroup className="custom-group" data-testid="group">
          <SidebarNavItem>Item</SidebarNavItem>
        </SidebarNavGroup>
      </SidebarNavigation>
    );
    expect(screen.getByTestId('group')).toHaveClass('custom-group');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <SidebarNavigation>
        <SidebarNavGroup ref={ref}>
          <SidebarNavItem>Item</SidebarNavItem>
        </SidebarNavGroup>
      </SidebarNavigation>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('SidebarNavItem', () => {
  it('renders children', () => {
    render(
      <SidebarNavigation>
        <SidebarNavItem>Dashboard</SidebarNavItem>
      </SidebarNavigation>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <SidebarNavigation>
        <SidebarNavItem icon={<span data-testid="icon">📊</span>}>
          Dashboard
        </SidebarNavItem>
      </SidebarNavigation>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(
      <SidebarNavigation>
        <SidebarNavItem badge={<span data-testid="badge">5</span>}>
          Messages
        </SidebarNavItem>
      </SidebarNavigation>
    );
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });

  it('hides label and badge when sidebar is collapsed', () => {
    render(
      <SidebarNavigation collapsed>
        <SidebarNavItem
          icon={<span data-testid="icon">📊</span>}
          badge={<span data-testid="badge">5</span>}
        >
          Dashboard
        </SidebarNavItem>
      </SidebarNavigation>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByTestId('badge')).not.toBeInTheDocument();
  });

  it('renders as link when href provided', () => {
    render(
      <SidebarNavigation>
        <SidebarNavItem href="/dashboard">Dashboard</SidebarNavItem>
      </SidebarNavigation>
    );
    const link = screen.getByText('Dashboard').closest('a');
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  it('renders as button when no href', () => {
    render(
      <SidebarNavigation>
        <SidebarNavItem>Dashboard</SidebarNavItem>
      </SidebarNavigation>
    );
    expect(screen.getByText('Dashboard').closest('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <SidebarNavigation>
        <SidebarNavItem onClick={handleClick}>Dashboard</SidebarNavItem>
      </SidebarNavigation>
    );
    fireEvent.click(screen.getByText('Dashboard'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies active class and aria-current', () => {
    render(
      <SidebarNavigation>
        <SidebarNavItem active>Active Item</SidebarNavItem>
      </SidebarNavigation>
    );
    const item = screen.getByText('Active Item').closest('button');
    expect(item?.className).toContain('active');
    expect(item).toHaveAttribute('aria-current', 'page');
  });

  it('applies disabled class and attribute', () => {
    render(
      <SidebarNavigation>
        <SidebarNavItem disabled>Disabled Item</SidebarNavItem>
      </SidebarNavigation>
    );
    const item = screen.getByText('Disabled Item').closest('button');
    expect(item?.className).toContain('disabled');
    expect(item).toBeDisabled();
  });

  it('renders as button when disabled even with href', () => {
    render(
      <SidebarNavigation>
        <SidebarNavItem href="/test" disabled>
          Disabled Link
        </SidebarNavItem>
      </SidebarNavigation>
    );
    expect(screen.getByText('Disabled Link').closest('button')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <SidebarNavigation>
        <SidebarNavItem className="custom-item">Item</SidebarNavItem>
      </SidebarNavigation>
    );
    expect(screen.getByText('Item').closest('button')).toHaveClass('custom-item');
  });
});
