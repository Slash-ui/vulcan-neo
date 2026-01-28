import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(<Modal open={false} onClose={() => {}}>Content</Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    render(<Modal open onClose={() => {}}>Content</Modal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<Modal open onClose={() => {}}>Modal content</Modal>);
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Modal open onClose={() => {}} title="Modal Title">Content</Modal>);
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<Modal open onClose={() => {}} description="Modal description">Content</Modal>);
    expect(screen.getByText('Modal description')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(<Modal open onClose={() => {}} footer={<button>Save</button>}>Content</Modal>);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('shows close button by default', () => {
    render(<Modal open onClose={() => {}}>Content</Modal>);
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  it('hides close button when showCloseButton is false', () => {
    render(<Modal open onClose={() => {}} showCloseButton={false}>Content</Modal>);
    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<Modal open onClose={handleClose}>Content</Modal>);
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key', () => {
    const handleClose = vi.fn();
    render(<Modal open onClose={handleClose}>Content</Modal>);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closeOnEscape is false', () => {
    const handleClose = vi.fn();
    render(<Modal open onClose={handleClose} closeOnEscape={false}>Content</Modal>);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose on overlay click', () => {
    const handleClose = vi.fn();
    render(<Modal open onClose={handleClose}>Content</Modal>);
    const overlay = document.querySelector('[class*="overlay"]');
    fireEvent.click(overlay!);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on overlay click when closeOnOverlayClick is false', () => {
    const handleClose = vi.fn();
    render(<Modal open onClose={handleClose} closeOnOverlayClick={false}>Content</Modal>);
    const overlay = document.querySelector('[class*="overlay"]');
    fireEvent.click(overlay!);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Modal open onClose={() => {}} size="sm">Content</Modal>);
    expect(screen.getByRole('dialog').className).toContain('sm');

    rerender(<Modal open onClose={() => {}} size="md">Content</Modal>);
    expect(screen.getByRole('dialog').className).toContain('md');

    rerender(<Modal open onClose={() => {}} size="lg">Content</Modal>);
    expect(screen.getByRole('dialog').className).toContain('lg');

    rerender(<Modal open onClose={() => {}} size="xl">Content</Modal>);
    expect(screen.getByRole('dialog').className).toContain('xl');

    rerender(<Modal open onClose={() => {}} size="full">Content</Modal>);
    expect(screen.getByRole('dialog').className).toContain('full');
  });

  it('has aria-modal attribute', () => {
    render(<Modal open onClose={() => {}}>Content</Modal>);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('applies custom className', () => {
    render(<Modal open onClose={() => {}} className="custom-class">Content</Modal>);
    expect(screen.getByRole('dialog')).toHaveClass('custom-class');
  });
});
