import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { CommandMenu } from './CommandMenu';

// Mock scrollIntoView as jsdom doesn't support it
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

afterAll(() => {
  vi.restoreAllMocks();
});

const defaultItems = [
  { id: '1', label: 'Copy', shortcut: '⌘C' },
  { id: '2', label: 'Paste', shortcut: '⌘V' },
  { id: '3', label: 'Delete', description: 'Remove item' },
];

describe('CommandMenu', () => {
  it('renders when open', () => {
    render(<CommandMenu open={true} onClose={vi.fn()} items={defaultItems} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<CommandMenu open={false} onClose={vi.fn()} items={defaultItems} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders items', () => {
    render(<CommandMenu open={true} onClose={vi.fn()} items={defaultItems} />);
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByText('Paste')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders item descriptions', () => {
    render(<CommandMenu open={true} onClose={vi.fn()} items={defaultItems} />);
    expect(screen.getByText('Remove item')).toBeInTheDocument();
  });

  it('renders item shortcuts', () => {
    render(<CommandMenu open={true} onClose={vi.fn()} items={defaultItems} />);
    expect(screen.getByText('⌘C')).toBeInTheDocument();
    expect(screen.getByText('⌘V')).toBeInTheDocument();
  });

  it('renders item icons', () => {
    const items = [
      { id: '1', label: 'Settings', icon: <span data-testid="icon">⚙️</span> },
    ];
    render(<CommandMenu open={true} onClose={vi.fn()} items={items} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders search input with placeholder', () => {
    render(<CommandMenu open={true} onClose={vi.fn()} items={defaultItems} />);
    expect(screen.getByPlaceholderText('Type a command or search...')).toBeInTheDocument();
  });

  it('renders custom placeholder', () => {
    render(
      <CommandMenu
        open={true}
        onClose={vi.fn()}
        items={defaultItems}
        placeholder="Search actions..."
      />
    );
    expect(screen.getByPlaceholderText('Search actions...')).toBeInTheDocument();
  });

  it('filters items based on search', async () => {
    render(<CommandMenu open={true} onClose={vi.fn()} items={defaultItems} />);
    const input = screen.getByLabelText('Search commands');
    fireEvent.change(input, { target: { value: 'copy' } });

    await waitFor(() => {
      expect(screen.getByText('Copy')).toBeInTheDocument();
      expect(screen.queryByText('Paste')).not.toBeInTheDocument();
      expect(screen.queryByText('Delete')).not.toBeInTheDocument();
    });
  });

  it('shows empty message when no results', async () => {
    render(<CommandMenu open={true} onClose={vi.fn()} items={defaultItems} />);
    const input = screen.getByLabelText('Search commands');
    fireEvent.change(input, { target: { value: 'xyz' } });

    await waitFor(() => {
      expect(screen.getByText('No results found.')).toBeInTheDocument();
    });
  });

  it('shows custom empty message', async () => {
    render(
      <CommandMenu
        open={true}
        onClose={vi.fn()}
        items={defaultItems}
        emptyMessage="Nothing here"
      />
    );
    const input = screen.getByLabelText('Search commands');
    fireEvent.change(input, { target: { value: 'xyz' } });

    await waitFor(() => {
      expect(screen.getByText('Nothing here')).toBeInTheDocument();
    });
  });

  it('calls onSelect when item clicked', () => {
    const handleSelect = vi.fn();
    render(
      <CommandMenu
        open={true}
        onClose={vi.fn()}
        items={defaultItems}
        onSelect={handleSelect}
      />
    );
    fireEvent.click(screen.getByText('Copy'));
    expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({ id: '1', label: 'Copy' }));
  });

  it('calls item onSelect when clicked', () => {
    const itemOnSelect = vi.fn();
    const items = [{ id: '1', label: 'Action', onSelect: itemOnSelect }];
    render(<CommandMenu open={true} onClose={vi.fn()} items={items} />);
    fireEvent.click(screen.getByText('Action'));
    expect(itemOnSelect).toHaveBeenCalled();
  });

  it('calls onClose when item selected', () => {
    const handleClose = vi.fn();
    render(<CommandMenu open={true} onClose={handleClose} items={defaultItems} />);
    fireEvent.click(screen.getByText('Copy'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('does not select disabled items', () => {
    const handleSelect = vi.fn();
    const items = [{ id: '1', label: 'Disabled', disabled: true }];
    render(
      <CommandMenu
        open={true}
        onClose={vi.fn()}
        items={items}
        onSelect={handleSelect}
      />
    );
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleSelect).not.toHaveBeenCalled();
  });

  it('navigates with arrow keys', () => {
    render(<CommandMenu open={true} onClose={vi.fn()} items={defaultItems} />);
    const input = screen.getByLabelText('Search commands');

    // First item is selected by default
    expect(screen.getByText('Copy').closest('button')).toHaveAttribute('aria-selected', 'true');

    // Arrow down
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(screen.getByText('Paste').closest('button')).toHaveAttribute('aria-selected', 'true');

    // Arrow up
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(screen.getByText('Copy').closest('button')).toHaveAttribute('aria-selected', 'true');
  });

  it('selects item on Enter', () => {
    const handleSelect = vi.fn();
    render(
      <CommandMenu
        open={true}
        onClose={vi.fn()}
        items={defaultItems}
        onSelect={handleSelect}
      />
    );
    const input = screen.getByLabelText('Search commands');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }));
  });

  it('calls onClose when Escape pressed', () => {
    const handleClose = vi.fn();
    render(<CommandMenu open={true} onClose={handleClose} items={defaultItems} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('calls onClose when overlay clicked', () => {
    const handleClose = vi.fn();
    render(<CommandMenu open={true} onClose={handleClose} items={defaultItems} />);
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog.parentElement!);
    expect(handleClose).toHaveBeenCalled();
  });

  it('groups items by group property', () => {
    const items = [
      { id: '1', label: 'Copy', group: 'Edit' },
      { id: '2', label: 'Paste', group: 'Edit' },
      { id: '3', label: 'Save', group: 'File' },
    ];
    render(<CommandMenu open={true} onClose={vi.fn()} items={items} />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('File')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <CommandMenu
        open={true}
        onClose={vi.fn()}
        items={defaultItems}
        className="custom-menu"
      />
    );
    expect(screen.getByRole('dialog')).toHaveClass('custom-menu');
  });
});
