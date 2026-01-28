import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BadgeGroup } from './BadgeGroup';

describe('BadgeGroup', () => {
  it('renders all children when no max is set', () => {
    render(
      <BadgeGroup>
        <span>Badge 1</span>
        <span>Badge 2</span>
        <span>Badge 3</span>
      </BadgeGroup>
    );
    expect(screen.getByText('Badge 1')).toBeInTheDocument();
    expect(screen.getByText('Badge 2')).toBeInTheDocument();
    expect(screen.getByText('Badge 3')).toBeInTheDocument();
  });

  it('limits displayed items when max is set', () => {
    render(
      <BadgeGroup max={2}>
        <span>Badge 1</span>
        <span>Badge 2</span>
        <span>Badge 3</span>
        <span>Badge 4</span>
      </BadgeGroup>
    );
    expect(screen.getByText('Badge 1')).toBeInTheDocument();
    expect(screen.getByText('Badge 2')).toBeInTheDocument();
    expect(screen.queryByText('Badge 3')).not.toBeInTheDocument();
    expect(screen.queryByText('Badge 4')).not.toBeInTheDocument();
  });

  it('shows overflow count when items exceed max', () => {
    render(
      <BadgeGroup max={2}>
        <span>Badge 1</span>
        <span>Badge 2</span>
        <span>Badge 3</span>
        <span>Badge 4</span>
      </BadgeGroup>
    );
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('does not show overflow when max equals or exceeds children count', () => {
    render(
      <BadgeGroup max={5}>
        <span>Badge 1</span>
        <span>Badge 2</span>
        <span>Badge 3</span>
      </BadgeGroup>
    );
    expect(screen.queryByText(/\+/)).not.toBeInTheDocument();
  });

  it('shows overflow on right by default', () => {
    render(
      <BadgeGroup max={1} data-testid="group">
        <span>Badge 1</span>
        <span>Badge 2</span>
      </BadgeGroup>
    );
    const group = screen.getByTestId('group');
    expect(group.className).toContain('right');
  });

  it('shows overflow on left when overflowDirection is left', () => {
    render(
      <BadgeGroup max={1} overflowDirection="left" data-testid="group">
        <span>Badge 1</span>
        <span>Badge 2</span>
      </BadgeGroup>
    );
    const group = screen.getByTestId('group');
    expect(group.className).toContain('left');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(
      <BadgeGroup size="sm" data-testid="group">
        <span>Badge</span>
      </BadgeGroup>
    );
    expect(screen.getByTestId('group').className).toContain('sm');

    rerender(
      <BadgeGroup size="md" data-testid="group">
        <span>Badge</span>
      </BadgeGroup>
    );
    expect(screen.getByTestId('group').className).toContain('md');

    rerender(
      <BadgeGroup size="lg" data-testid="group">
        <span>Badge</span>
      </BadgeGroup>
    );
    expect(screen.getByTestId('group').className).toContain('lg');
  });

  it('filters out non-valid elements', () => {
    render(
      <BadgeGroup max={2}>
        <span>Badge 1</span>
        {null}
        {undefined}
        <span>Badge 2</span>
        {false}
        <span>Badge 3</span>
      </BadgeGroup>
    );
    expect(screen.getByText('Badge 1')).toBeInTheDocument();
    expect(screen.getByText('Badge 2')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <BadgeGroup className="custom-group" data-testid="group">
        <span>Badge</span>
      </BadgeGroup>
    );
    expect(screen.getByTestId('group')).toHaveClass('custom-group');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <BadgeGroup ref={ref}>
        <span>Badge</span>
      </BadgeGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
