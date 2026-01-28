import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Notification } from './Notification';

describe('Notification', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders notification with alert role', () => {
    render(<Notification>Message</Notification>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders children as message', () => {
    render(<Notification>Test message</Notification>);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Notification title="Success">Message</Notification>);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('renders default icon based on variant', () => {
    render(<Notification variant="info">Message</Notification>);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders custom icon when provided', () => {
    render(<Notification icon={<span data-testid="custom-icon">✓</span>}>Message</Notification>);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('shows dismiss button', () => {
    render(<Notification>Message</Notification>);
    expect(screen.getByLabelText('Dismiss notification')).toBeInTheDocument();
  });

  it('calls onClose when dismiss button clicked', async () => {
    vi.useRealTimers();
    const handleClose = vi.fn();
    render(<Notification onClose={handleClose}>Message</Notification>);
    fireEvent.click(screen.getByLabelText('Dismiss notification'));
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });
  });

  it('auto-dismisses after duration', () => {
    const handleClose = vi.fn();
    render(<Notification duration={3000} onClose={handleClose}>Message</Notification>);

    expect(screen.getByRole('alert')).toBeInTheDocument();

    // Advance past the duration
    vi.advanceTimersByTime(3000);
    // Advance past the animation delay
    vi.advanceTimersByTime(200);

    expect(handleClose).toHaveBeenCalled();
  });

  it('does not auto-dismiss when duration is 0', () => {
    const handleClose = vi.fn();
    render(<Notification duration={0} onClose={handleClose}>Message</Notification>);

    vi.advanceTimersByTime(10000);

    expect(handleClose).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders nothing when open is false', () => {
    render(<Notification open={false}>Message</Notification>);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(<Notification action={<button>Retry</button>}>Message</Notification>);
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Notification variant="info">Message</Notification>);
    expect(screen.getByRole('alert').className).toContain('info');

    rerender(<Notification variant="success">Message</Notification>);
    expect(screen.getByRole('alert').className).toContain('success');

    rerender(<Notification variant="warning">Message</Notification>);
    expect(screen.getByRole('alert').className).toContain('warning');

    rerender(<Notification variant="error">Message</Notification>);
    expect(screen.getByRole('alert').className).toContain('error');
  });

  it('applies position classes correctly', () => {
    const { rerender } = render(<Notification position="top-right">Message</Notification>);
    expect(screen.getByRole('alert').className).toContain('top-right');

    rerender(<Notification position="bottom-left">Message</Notification>);
    expect(screen.getByRole('alert').className).toContain('bottom-left');

    rerender(<Notification position="top-center">Message</Notification>);
    expect(screen.getByRole('alert').className).toContain('top-center');
  });

  it('applies custom className', () => {
    render(<Notification className="custom-notification">Message</Notification>);
    expect(screen.getByRole('alert')).toHaveClass('custom-notification');
  });

  it('renders in portal to document.body by default', () => {
    render(<Notification>Message</Notification>);
    const alert = screen.getByRole('alert');
    expect(alert.closest('body')).toBe(document.body);
  });

  it('renders in custom container when provided', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    render(<Notification container={container}>Message</Notification>);
    expect(container.querySelector('[role="alert"]')).toBeInTheDocument();

    document.body.removeChild(container);
  });
});
