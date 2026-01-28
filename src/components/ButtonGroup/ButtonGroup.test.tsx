import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ButtonGroup, ButtonGroupItem } from './ButtonGroup';

describe('ButtonGroup', () => {
  it('renders children correctly', () => {
    render(
      <ButtonGroup>
        <ButtonGroupItem>One</ButtonGroupItem>
        <ButtonGroupItem>Two</ButtonGroupItem>
      </ButtonGroup>
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('has role="group"', () => {
    render(<ButtonGroup data-testid="group"><ButtonGroupItem>One</ButtonGroupItem></ButtonGroup>);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('applies convex variant by default', () => {
    render(<ButtonGroup data-testid="group"><ButtonGroupItem>One</ButtonGroupItem></ButtonGroup>);
    expect(screen.getByTestId('group').className).toContain('convex');
  });

  it('applies flat variant when specified', () => {
    render(<ButtonGroup variant="flat" data-testid="group"><ButtonGroupItem>One</ButtonGroupItem></ButtonGroup>);
    expect(screen.getByTestId('group').className).toContain('flat');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<ButtonGroup size="sm" data-testid="group"><ButtonGroupItem>One</ButtonGroupItem></ButtonGroup>);
    expect(screen.getByTestId('group').className).toContain('sm');

    rerender(<ButtonGroup size="lg" data-testid="group"><ButtonGroupItem>One</ButtonGroupItem></ButtonGroup>);
    expect(screen.getByTestId('group').className).toContain('lg');
  });

  it('applies elevation classes correctly', () => {
    const { rerender } = render(<ButtonGroup elevation="low" data-testid="group"><ButtonGroupItem>One</ButtonGroupItem></ButtonGroup>);
    expect(screen.getByTestId('group').className).toContain('elevation-low');

    rerender(<ButtonGroup elevation="high" data-testid="group"><ButtonGroupItem>One</ButtonGroupItem></ButtonGroup>);
    expect(screen.getByTestId('group').className).toContain('elevation-high');
  });

  it('applies horizontal orientation by default', () => {
    render(<ButtonGroup data-testid="group"><ButtonGroupItem>One</ButtonGroupItem></ButtonGroup>);
    expect(screen.getByTestId('group').className).toContain('horizontal');
  });

  it('applies vertical orientation when specified', () => {
    render(<ButtonGroup orientation="vertical" data-testid="group"><ButtonGroupItem>One</ButtonGroupItem></ButtonGroup>);
    expect(screen.getByTestId('group').className).toContain('vertical');
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<ButtonGroup fullWidth data-testid="group"><ButtonGroupItem>One</ButtonGroupItem></ButtonGroup>);
    expect(screen.getByTestId('group').className).toContain('fullWidth');
  });

  it('applies custom className', () => {
    render(<ButtonGroup className="custom-class" data-testid="group"><ButtonGroupItem>One</ButtonGroupItem></ButtonGroup>);
    expect(screen.getByTestId('group')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<ButtonGroup ref={ref}><ButtonGroupItem>One</ButtonGroupItem></ButtonGroup>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('ButtonGroupItem', () => {
  it('renders a button element', () => {
    render(<ButtonGroupItem>Click me</ButtonGroupItem>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<ButtonGroupItem onClick={handleClick}>Click me</ButtonGroupItem>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies selected class when selected', () => {
    render(<ButtonGroupItem selected data-testid="item">Selected</ButtonGroupItem>);
    expect(screen.getByTestId('item').className).toContain('selected');
  });

  it('is disabled when disabled prop is true', () => {
    render(<ButtonGroupItem disabled>Disabled</ButtonGroupItem>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<ButtonGroupItem className="custom-class" data-testid="item">Item</ButtonGroupItem>);
    expect(screen.getByTestId('item')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement>;
    render(<ButtonGroupItem ref={ref}>Item</ButtonGroupItem>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
