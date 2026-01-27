import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './Pagination';
import { Surface } from '../Surface';

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showFirstLast: {
      control: 'boolean',
    },
    showPrevNext: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const PaginationDemo = (props: Partial<React.ComponentProps<typeof Pagination>>) => {
  const [page, setPage] = useState(1);
  return <Pagination page={page} totalPages={10} onChange={setPage} {...props} />;
};

export const Default: Story = {
  render: () => <PaginationDemo />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}>
      <PaginationDemo size="sm" />
      <PaginationDemo size="md" />
      <PaginationDemo size="lg" />
    </div>
  ),
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return <Pagination page={page} totalPages={20} onChange={setPage} />;
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={3} onChange={setPage} />;
  },
};

export const WithoutFirstLast: Story = {
  render: () => <PaginationDemo showFirstLast={false} />,
};

export const WithoutPrevNext: Story = {
  render: () => <PaginationDemo showPrevNext={false} />,
};

export const SimpleNavigation: Story = {
  render: () => <PaginationDemo showFirstLast={false} showPrevNext={true} />,
};

export const Disabled: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={10} onChange={setPage} disabled />;
  },
};

export const DarkTheme: Story = {
  render: () => <PaginationDemo />,
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
