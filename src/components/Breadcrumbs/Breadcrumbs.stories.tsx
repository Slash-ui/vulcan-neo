import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';
import { Surface } from '../Surface';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Molecules/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem>Category</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 4 }}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Settings</BreadcrumbItem>
      <BreadcrumbItem>Profile</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumbs separator={
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    }>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem>Details</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const LongPath: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Category</BreadcrumbItem>
      <BreadcrumbItem href="#">Subcategory</BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem href="#">Item</BreadcrumbItem>
      <BreadcrumbItem>Details</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Settings</BreadcrumbItem>
      <BreadcrumbItem>Account</BreadcrumbItem>
    </Breadcrumbs>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
