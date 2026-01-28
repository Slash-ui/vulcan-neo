import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SlideoutMenu } from './SlideoutMenu';

describe('SlideoutMenu', () => {
  it('renders children when open', () => {
    render(
      <SlideoutMenu open={true} onClose={vi.fn()}>
        <div>Slideout content</div>
      </SlideoutMenu>
    );
    expect(screen.getByText('Slideout content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <SlideoutMenu open={false} onClose={vi.fn()}>
        <div>Slideout content</div>
      </SlideoutMenu>
    );
    expect(screen.queryByText('Slideout content')).not.toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <SlideoutMenu open={true} onClose={vi.fn()} title="Panel Title">
        Content
      </SlideoutMenu>
    );
    expect(screen.getByText('Panel Title')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <SlideoutMenu open={true} onClose={vi.fn()} title="Title" description="Panel description">
        Content
      </SlideoutMenu>
    );
    expect(screen.getByText('Panel description')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <SlideoutMenu open={true} onClose={vi.fn()} footer={<button>Save</button>}>
        Content
      </SlideoutMenu>
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('shows close button by default', () => {
    render(
      <SlideoutMenu open={true} onClose={vi.fn()} title="Title">
        Content
      </SlideoutMenu>
    );
    expect(screen.getByLabelText('Close panel')).toBeInTheDocument();
  });

  it('hides close button when showCloseButton is false', () => {
    render(
      <SlideoutMenu open={true} onClose={vi.fn()} title="Title" showCloseButton={false}>
        Content
      </SlideoutMenu>
    );
    expect(screen.queryByLabelText('Close panel')).not.toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const handleClose = vi.fn();
    render(
      <SlideoutMenu open={true} onClose={handleClose} title="Title">
        Content
      </SlideoutMenu>
    );
    fireEvent.click(screen.getByLabelText('Close panel'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('calls onClose when overlay clicked by default', () => {
    const handleClose = vi.fn();
    render(
      <SlideoutMenu open={true} onClose={handleClose}>
        Content
      </SlideoutMenu>
    );
    // Click on overlay (the parent of the dialog)
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog.parentElement!);
    expect(handleClose).toHaveBeenCalled();
  });

  it('does not call onClose when overlay clicked if closeOnOverlayClick is false', () => {
    const handleClose = vi.fn();
    render(
      <SlideoutMenu open={true} onClose={handleClose} closeOnOverlayClick={false}>
        Content
      </SlideoutMenu>
    );
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog.parentElement!);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape pressed', () => {
    const handleClose = vi.fn();
    render(
      <SlideoutMenu open={true} onClose={handleClose}>
        Content
      </SlideoutMenu>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('does not call onClose when Escape pressed if closeOnEscape is false', () => {
    const handleClose = vi.fn();
    render(
      <SlideoutMenu open={true} onClose={handleClose} closeOnEscape={false}>
        Content
      </SlideoutMenu>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('applies position classes correctly', () => {
    const { rerender } = render(
      <SlideoutMenu open={true} onClose={vi.fn()} position="right">
        Content
      </SlideoutMenu>
    );
    expect(screen.getByRole('dialog').className).toContain('right');

    rerender(
      <SlideoutMenu open={true} onClose={vi.fn()} position="left">
        Content
      </SlideoutMenu>
    );
    expect(screen.getByRole('dialog').className).toContain('left');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(
      <SlideoutMenu open={true} onClose={vi.fn()} size="sm">
        Content
      </SlideoutMenu>
    );
    expect(screen.getByRole('dialog').className).toContain('sm');

    rerender(
      <SlideoutMenu open={true} onClose={vi.fn()} size="md">
        Content
      </SlideoutMenu>
    );
    expect(screen.getByRole('dialog').className).toContain('md');

    rerender(
      <SlideoutMenu open={true} onClose={vi.fn()} size="lg">
        Content
      </SlideoutMenu>
    );
    expect(screen.getByRole('dialog').className).toContain('lg');

    rerender(
      <SlideoutMenu open={true} onClose={vi.fn()} size="full">
        Content
      </SlideoutMenu>
    );
    expect(screen.getByRole('dialog').className).toContain('full');
  });

  it('applies custom className', () => {
    render(
      <SlideoutMenu open={true} onClose={vi.fn()} className="custom-slideout">
        Content
      </SlideoutMenu>
    );
    expect(screen.getByRole('dialog')).toHaveClass('custom-slideout');
  });

  it('has correct aria attributes', () => {
    render(
      <SlideoutMenu open={true} onClose={vi.fn()} title="Panel Title">
        Content
      </SlideoutMenu>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'slideout-title');
  });
});
