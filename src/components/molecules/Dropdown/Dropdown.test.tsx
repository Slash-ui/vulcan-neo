import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dropdown } from './Dropdown';

const defaultItems = [
  { id: 'edit', label: 'Edit' },
  { id: 'duplicate', label: 'Duplicate' },
  { id: 'delete', label: 'Delete', danger: true },
];

describe('Dropdown', () => {
  it('renders trigger element', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={defaultItems} />);
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('opens menu on trigger click', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={defaultItems} />);
    fireEvent.click(screen.getByText('Menu'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('displays all menu items when open', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={defaultItems} />);
    fireEvent.click(screen.getByText('Menu'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders menu items with correct role', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={defaultItems} />);
    fireEvent.click(screen.getByText('Menu'));
    expect(screen.getAllByRole('menuitem')).toHaveLength(3);
  });

  it('calls onSelect when item is clicked', () => {
    const handleSelect = vi.fn();
    render(<Dropdown trigger={<button>Menu</button>} items={defaultItems} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('Menu'));
    fireEvent.click(screen.getByText('Edit'));
    expect(handleSelect).toHaveBeenCalledWith('edit');
  });

  it('closes menu after selection', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={defaultItems} />);
    fireEvent.click(screen.getByText('Menu'));
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('handles disabled items', () => {
    const items = [{ id: 'disabled', label: 'Disabled', disabled: true }];
    const handleSelect = vi.fn();
    render(<Dropdown trigger={<button>Menu</button>} items={items} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('Menu'));
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleSelect).not.toHaveBeenCalled();
  });

  it('renders dividers', () => {
    const items = [
      { id: 'edit', label: 'Edit' },
      { id: 'divider', label: '', divider: true },
      { id: 'delete', label: 'Delete' },
    ];
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);
    fireEvent.click(screen.getByText('Menu'));
    expect(document.querySelector('[class*="divider"]')).toBeInTheDocument();
  });

  it('applies danger class to dangerous items', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={defaultItems} />);
    fireEvent.click(screen.getByText('Menu'));
    const deleteItem = screen.getByText('Delete').closest('button');
    expect(deleteItem?.className).toContain('danger');
  });

  it('renders icon when provided', () => {
    const items = [{ id: 'edit', label: 'Edit', icon: <span data-testid="icon">✏️</span> }];
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);
    fireEvent.click(screen.getByText('Menu'));
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('works in controlled mode', () => {
    const handleOpenChange = vi.fn();
    const { rerender } = render(
      <Dropdown trigger={<button>Menu</button>} items={defaultItems} open={false} onOpenChange={handleOpenChange} />
    );
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Menu'));
    expect(handleOpenChange).toHaveBeenCalledWith(true);

    rerender(
      <Dropdown trigger={<button>Menu</button>} items={defaultItems} open={true} onOpenChange={handleOpenChange} />
    );
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('closes on Escape key', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={defaultItems} />);
    fireEvent.click(screen.getByText('Menu'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={defaultItems} disabled />);
    fireEvent.click(screen.getByText('Menu'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('applies placement classes', () => {
    const { rerender } = render(
      <Dropdown trigger={<button>Menu</button>} items={defaultItems} placement="bottom-start" />
    );
    fireEvent.click(screen.getByText('Menu'));
    expect(screen.getByRole('menu').className).toContain('bottom-start');

    rerender(<Dropdown trigger={<button>Menu</button>} items={defaultItems} placement="top-end" open={true} />);
    expect(screen.getByRole('menu').className).toContain('top-end');
  });

  it('applies custom className', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={defaultItems} className="custom-class" data-testid="dropdown" />);
    expect(screen.getByTestId('dropdown')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Dropdown ref={ref} trigger={<button>Menu</button>} items={defaultItems} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
