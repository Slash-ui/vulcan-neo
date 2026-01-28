import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders trigger element', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows tooltip on mouse enter after delay', async () => {
    vi.useRealTimers();
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByText('Hover me').parentElement!);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('hides tooltip on mouse leave', async () => {
    vi.useRealTimers();
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    );
    const trigger = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(trigger);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    fireEvent.mouseLeave(trigger);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('shows tooltip on focus', async () => {
    vi.useRealTimers();
    render(
      <Tooltip content="Tooltip text">
        <button>Focus me</button>
      </Tooltip>
    );
    fireEvent.focus(screen.getByText('Focus me').parentElement!);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('hides tooltip on blur', async () => {
    vi.useRealTimers();
    render(
      <Tooltip content="Tooltip text">
        <button>Focus me</button>
      </Tooltip>
    );
    const trigger = screen.getByText('Focus me').parentElement!;
    fireEvent.focus(trigger);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    fireEvent.blur(trigger);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('does not show tooltip when disabled', async () => {
    vi.useRealTimers();
    render(
      <Tooltip content="Tooltip text" disabled delay={0}>
        <button>Hover me</button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByText('Hover me').parentElement!);
    await new Promise(r => setTimeout(r, 100));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('applies placement class', async () => {
    vi.useRealTimers();
    render(
      <Tooltip content="Tooltip text" placement="bottom" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByText('Hover me').parentElement!);
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip.className).toContain('bottom');
    });
  });

  it('applies custom className', () => {
    render(
      <Tooltip content="Tooltip text" className="custom-class" data-testid="tooltip-container">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByTestId('tooltip-container')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <Tooltip ref={ref} content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
