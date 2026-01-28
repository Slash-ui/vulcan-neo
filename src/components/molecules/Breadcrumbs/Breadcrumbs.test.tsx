import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';

describe('Breadcrumbs', () => {
  it('renders navigation with correct aria-label', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  it('renders all breadcrumb items', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
        <BreadcrumbItem>Category</BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('renders default separator between items', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(screen.getByText('/')).toBeInTheDocument();
  });

  it('renders custom separator', () => {
    render(
      <Breadcrumbs separator=">">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('marks last item as current automatically', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(screen.getByText('Products')).toHaveAttribute('aria-current', 'page');
  });

  it('respects explicit current prop', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem current>Products</BreadcrumbItem>
        <BreadcrumbItem>Category</BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(screen.getByText('Products')).toHaveAttribute('aria-current', 'page');
  });

  it('renders link for non-current items with href', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
      </Breadcrumbs>
    );
    const link = screen.getByText('Home').closest('a');
    expect(link).toHaveAttribute('href', '/home');
  });

  it('does not render link for current item even with href', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products" current>Products</BreadcrumbItem>
      </Breadcrumbs>
    );
    const productsElement = screen.getByText('Products');
    expect(productsElement.tagName).not.toBe('A');
  });

  it('shows ellipsis when items exceed maxItems', () => {
    render(
      <Breadcrumbs maxItems={3}>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Category</BreadcrumbItem>
        <BreadcrumbItem>Subcategory</BreadcrumbItem>
        <BreadcrumbItem>Product</BreadcrumbItem>
        <BreadcrumbItem>Details</BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('hides separator from screen readers', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
      </Breadcrumbs>
    );
    const separator = screen.getByText('/');
    expect(separator.closest('li')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom className to Breadcrumbs', () => {
    render(
      <Breadcrumbs className="custom-breadcrumbs">
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(screen.getByRole('navigation')).toHaveClass('custom-breadcrumbs');
  });

  it('applies custom className to BreadcrumbItem', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem className="custom-item" data-testid="item">Home</BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(screen.getByTestId('item')).toHaveClass('custom-item');
  });

  it('forwards ref to Breadcrumbs', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(
      <Breadcrumbs ref={ref}>
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('forwards ref to BreadcrumbItem', () => {
    const ref = { current: null } as React.RefObject<HTMLLIElement>;
    render(
      <Breadcrumbs>
        <BreadcrumbItem ref={ref}>Home</BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });
});

describe('BreadcrumbItem', () => {
  it('renders children', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem>Test Item</BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('applies current class when current', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem current data-testid="item">Home</BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(screen.getByTestId('item').className).toContain('current');
  });
});
