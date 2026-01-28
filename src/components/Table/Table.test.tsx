import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Table, Column } from './Table';

interface TestData {
  id: number;
  name: string;
  email: string;
}

const defaultColumns: Column<TestData>[] = [
  { key: 'id', header: 'ID', accessor: 'id' },
  { key: 'name', header: 'Name', accessor: 'name' },
  { key: 'email', header: 'Email', accessor: 'email' },
];

const defaultData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

describe('Table', () => {
  it('renders a table element', () => {
    render(<Table columns={defaultColumns} data={defaultData} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<Table columns={defaultColumns} data={defaultData} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders data rows', () => {
    render(<Table columns={defaultColumns} data={defaultData} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('hides header when showHeader is false', () => {
    render(<Table columns={defaultColumns} data={defaultData} showHeader={false} />);
    expect(screen.queryByText('ID')).not.toBeInTheDocument();
    expect(screen.queryByText('Name')).not.toBeInTheDocument();
  });

  it('shows empty message when data is empty', () => {
    render(<Table columns={defaultColumns} data={[]} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('shows custom empty message', () => {
    render(<Table columns={defaultColumns} data={[]} emptyMessage="No users found" />);
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('supports function accessors', () => {
    const columns: Column<TestData>[] = [
      { key: 'fullInfo', header: 'Info', accessor: (row) => `${row.name} (${row.email})` },
    ];
    render(<Table columns={columns} data={defaultData} />);
    expect(screen.getByText('John Doe (john@example.com)')).toBeInTheDocument();
  });

  it('calls onRowClick when row is clicked', () => {
    const handleRowClick = vi.fn();
    render(<Table columns={defaultColumns} data={defaultData} onRowClick={handleRowClick} />);
    fireEvent.click(screen.getByText('John Doe').closest('tr')!);
    expect(handleRowClick).toHaveBeenCalledWith(defaultData[0], 0);
  });

  it('applies selected class to selected rows', () => {
    render(<Table columns={defaultColumns} data={defaultData} selectedRows={[1]} />);
    const firstRow = screen.getByText('John Doe').closest('tr');
    expect(firstRow?.className).toContain('selected');
  });

  it('applies clickable class when onRowClick is provided', () => {
    render(<Table columns={defaultColumns} data={defaultData} onRowClick={() => {}} />);
    const row = screen.getByText('John Doe').closest('tr');
    expect(row?.className).toContain('clickable');
  });

  it('shows loading state', () => {
    render(<Table columns={defaultColumns} data={defaultData} loading />);
    expect(document.querySelector('[class*="loadingSpinner"]')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Table columns={defaultColumns} data={defaultData} size="sm" />);
    expect(document.querySelector('[class*="tableWrapper"]')?.className).toContain('sm');

    rerender(<Table columns={defaultColumns} data={defaultData} size="md" />);
    expect(document.querySelector('[class*="tableWrapper"]')?.className).toContain('md');

    rerender(<Table columns={defaultColumns} data={defaultData} size="lg" />);
    expect(document.querySelector('[class*="tableWrapper"]')?.className).toContain('lg');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Table columns={defaultColumns} data={defaultData} variant="flat" />);
    expect(document.querySelector('[class*="tableWrapper"]')?.className).toContain('flat');

    rerender(<Table columns={defaultColumns} data={defaultData} variant="striped" />);
    expect(document.querySelector('[class*="tableWrapper"]')?.className).toContain('striped');

    rerender(<Table columns={defaultColumns} data={defaultData} variant="bordered" />);
    expect(document.querySelector('[class*="tableWrapper"]')?.className).toContain('bordered');
  });

  it('supports custom rowKey function', () => {
    const handleRowClick = vi.fn();
    render(
      <Table
        columns={defaultColumns}
        data={defaultData}
        rowKey={(row) => `custom-${row.id}`}
        onRowClick={handleRowClick}
      />
    );
    // Should render without errors with custom rowKey
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('applies column alignment', () => {
    const columns: Column<TestData>[] = [
      { key: 'id', header: 'ID', accessor: 'id', align: 'right' },
      { key: 'name', header: 'Name', accessor: 'name', align: 'center' },
    ];
    render(<Table columns={columns} data={defaultData} />);
    const headers = screen.getAllByRole('columnheader');
    expect(headers[0].className).toContain('align-right');
    expect(headers[1].className).toContain('align-center');
  });

  it('applies column width', () => {
    const columns: Column<TestData>[] = [
      { key: 'id', header: 'ID', accessor: 'id', width: '100px' },
    ];
    render(<Table columns={columns} data={defaultData} />);
    const header = screen.getByText('ID');
    expect(header).toHaveStyle({ width: '100px' });
  });

  it('applies custom className', () => {
    render(<Table columns={defaultColumns} data={defaultData} className="custom-table" />);
    expect(document.querySelector('[class*="tableWrapper"]')).toHaveClass('custom-table');
  });
});
