import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Table, Column } from './Table';
import { Surface } from '../../foundation/Surface';
import { Badge } from '../../atoms/Badge';
import { Avatar } from '../../atoms/Avatar';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
}

const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'pending', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop' },
];

const basicColumns: Column<User>[] = [
  { key: 'name', header: 'Name', accessor: 'name' },
  { key: 'email', header: 'Email', accessor: 'email' },
  { key: 'role', header: 'Role', accessor: 'role' },
  { key: 'status', header: 'Status', accessor: 'status' },
];

const meta: Meta<typeof Table<User>> = {
  title: 'Organisms/Table',
  component: Table,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['flat', 'striped', 'bordered'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

export const Default: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
  },
};

export const WithCustomRenderers: Story = {
  render: () => {
    const columns: Column<User>[] = [
      {
        key: 'user',
        header: 'User',
        accessor: (row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Avatar src={row.avatar} name={row.name} size="sm" />
            <div>
              <div style={{ fontWeight: 500 }}>{row.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--neo-text-secondary)' }}>{row.email}</div>
            </div>
          </div>
        ),
      },
      { key: 'role', header: 'Role', accessor: 'role' },
      {
        key: 'status',
        header: 'Status',
        accessor: (row) => (
          <Badge
            variant={row.status === 'active' ? 'convex' : 'flat'}
            size="sm"
          >
            {row.status}
          </Badge>
        ),
      },
    ];

    return <Table columns={columns} data={sampleData} />;
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Flat</p>
        <Table columns={basicColumns} data={sampleData.slice(0, 3)} variant="flat" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Striped</p>
        <Table columns={basicColumns} data={sampleData.slice(0, 3)} variant="striped" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Bordered</p>
        <Table columns={basicColumns} data={sampleData.slice(0, 3)} variant="bordered" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Small</p>
        <Table columns={basicColumns} data={sampleData.slice(0, 3)} size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Medium</p>
        <Table columns={basicColumns} data={sampleData.slice(0, 3)} size="md" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Large</p>
        <Table columns={basicColumns} data={sampleData.slice(0, 3)} size="lg" />
      </div>
    </div>
  ),
};

export const Clickable: Story = {
  render: () => {
    const [selected, setSelected] = useState<number[]>([]);

    const handleRowClick = (row: User) => {
      setSelected((prev) =>
        prev.includes(row.id) ? prev.filter((id) => id !== row.id) : [...prev, row.id]
      );
    };

    return (
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--neo-text-secondary)' }}>
          Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
        </p>
        <Table
          columns={basicColumns}
          data={sampleData}
          onRowClick={handleRowClick}
          selectedRows={selected}
        />
      </div>
    );
  },
};

export const Empty: Story = {
  args: {
    columns: basicColumns,
    data: [],
    emptyMessage: 'No users found. Try adjusting your filters.',
  },
};

export const Loading: Story = {
  args: {
    columns: basicColumns,
    data: [],
    loading: true,
  },
};

export const AlignedColumns: Story = {
  render: () => {
    interface Product {
      id: number;
      name: string;
      quantity: number;
      price: number;
    }

    const products: Product[] = [
      { id: 1, name: 'Product A', quantity: 10, price: 29.99 },
      { id: 2, name: 'Product B', quantity: 25, price: 49.99 },
      { id: 3, name: 'Product C', quantity: 5, price: 99.99 },
    ];

    const columns: Column<Product>[] = [
      { key: 'name', header: 'Product', accessor: 'name', align: 'left' },
      { key: 'quantity', header: 'Quantity', accessor: 'quantity', align: 'center' },
      { key: 'price', header: 'Price', accessor: (row) => `$${row.price.toFixed(2)}`, align: 'right' },
    ];

    return <Table columns={columns} data={products} />;
  },
};

export const DarkTheme: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
