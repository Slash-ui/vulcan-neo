import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies convex variant by default', () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('convex');
  });

  it('applies flat variant when specified', () => {
    render(<Card variant="flat" data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('flat');
  });

  it('applies concave variant when specified', () => {
    render(<Card variant="concave" data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('concave');
  });

  it('applies elevation classes correctly', () => {
    const { rerender } = render(<Card elevation="low" data-testid="card">Content</Card>);
    expect(screen.getByTestId('card').className).toContain('elevation-low');

    rerender(<Card elevation="mid" data-testid="card">Content</Card>);
    expect(screen.getByTestId('card').className).toContain('elevation-mid');

    rerender(<Card elevation="high" data-testid="card">Content</Card>);
    expect(screen.getByTestId('card').className).toContain('elevation-high');
  });

  it('applies padded class by default', () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('padded');
  });

  it('removes padded class when padded is false', () => {
    render(<Card padded={false} data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).not.toContain('padded');
  });

  it('applies custom className', () => {
    render(<Card className="custom-class" data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(<CardHeader>Header Content</CardHeader>);
    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CardHeader className="custom-header" data-testid="header">Header</CardHeader>);
    expect(screen.getByTestId('header')).toHaveClass('custom-header');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<CardHeader ref={ref}>Header</CardHeader>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardBody', () => {
  it('renders children correctly', () => {
    render(<CardBody>Body Content</CardBody>);
    expect(screen.getByText('Body Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CardBody className="custom-body" data-testid="body">Body</CardBody>);
    expect(screen.getByTestId('body')).toHaveClass('custom-body');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<CardBody ref={ref}>Body</CardBody>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardFooter', () => {
  it('renders children correctly', () => {
    render(<CardFooter>Footer Content</CardFooter>);
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CardFooter className="custom-footer" data-testid="footer">Footer</CardFooter>);
    expect(screen.getByTestId('footer')).toHaveClass('custom-footer');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<CardFooter ref={ref}>Footer</CardFooter>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('Card composition', () => {
  it('renders with all sub-components', () => {
    render(
      <Card>
        <CardHeader>Title</CardHeader>
        <CardBody>Content goes here</CardBody>
        <CardFooter>Actions</CardFooter>
      </Card>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content goes here')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
});
