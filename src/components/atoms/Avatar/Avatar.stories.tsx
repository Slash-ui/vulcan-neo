import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import { Surface } from '../foundation/Surface';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['convex', 'concave', 'flat'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'busy', 'away'],
    },
    statusBorder: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop';

export const Default: Story = {
  args: {
    src: sampleImage,
    alt: 'User avatar',
    variant: 'convex',
    size: 'md',
  },
};

export const WithFallback: Story = {
  args: {
    fallback: 'JD',
    variant: 'convex',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <>
      <Avatar variant="convex" fallback="AB" />
      <Avatar variant="concave" fallback="CD" />
      <Avatar variant="flat" fallback="EF" />
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <Avatar size="xs" fallback="XS" />
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
    </>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <>
      <Avatar src={sampleImage} status="online" alt="Online user" />
      <Avatar src={sampleImage} status="away" alt="Away user" />
      <Avatar src={sampleImage} status="busy" alt="Busy user" />
      <Avatar src={sampleImage} status="offline" alt="Offline user" />
    </>
  ),
};

export const StatusSizes: Story = {
  render: () => (
    <>
      <Avatar size="xs" fallback="XS" status="online" />
      <Avatar size="sm" fallback="SM" status="online" />
      <Avatar size="md" fallback="MD" status="online" />
      <Avatar size="lg" fallback="LG" status="online" />
      <Avatar size="xl" fallback="XL" status="online" />
    </>
  ),
};

export const WithoutStatusBorder: Story = {
  args: {
    src: sampleImage,
    status: 'online',
    statusBorder: false,
    alt: 'User avatar',
  },
};

export const ImageError: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    fallback: 'ER',
    alt: 'Error fallback',
  },
};

export const DarkTheme: Story = {
  args: {
    fallback: 'DT',
    status: 'online',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1.5rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
