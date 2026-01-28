import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders children correctly', () => {
    render(<Alert>Alert message</Alert>);
    expect(screen.getByText('Alert message')).toBeInTheDocument();
  });

  it('has role="alert"', () => {
    render(<Alert>Message</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Alert title="Warning">Message</Alert>);
    expect(screen.getByText('Warning')).toBeInTheDocument();
  });

  it('applies info variant by default', () => {
    render(<Alert data-testid="alert">Message</Alert>);
    expect(screen.getByTestId('alert').className).toContain('info');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Alert variant="info" data-testid="alert">Message</Alert>);
    expect(screen.getByTestId('alert').className).toContain('info');

    rerender(<Alert variant="success" data-testid="alert">Message</Alert>);
    expect(screen.getByTestId('alert').className).toContain('success');

    rerender(<Alert variant="warning" data-testid="alert">Message</Alert>);
    expect(screen.getByTestId('alert').className).toContain('warning');

    rerender(<Alert variant="error" data-testid="alert">Message</Alert>);
    expect(screen.getByTestId('alert').className).toContain('error');
  });

  it('renders default icon for each variant', () => {
    render(<Alert variant="info">Message</Alert>);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders custom icon when provided', () => {
    render(<Alert icon={<span data-testid="custom-icon">!</span>}>Message</Alert>);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('shows dismiss button when dismissible', () => {
    render(<Alert dismissible>Message</Alert>);
    expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', () => {
    const handleDismiss = vi.fn();
    render(<Alert dismissible onDismiss={handleDismiss}>Message</Alert>);
    fireEvent.click(screen.getByLabelText('Dismiss alert'));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders action when provided', () => {
    render(<Alert action={<button>Retry</button>}>Message</Alert>);
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Alert className="custom-class" data-testid="alert">Message</Alert>);
    expect(screen.getByTestId('alert')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Alert ref={ref}>Message</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders both title and children', () => {
    render(<Alert title="Title">Message content</Alert>);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Message content')).toBeInTheDocument();
  });
});
