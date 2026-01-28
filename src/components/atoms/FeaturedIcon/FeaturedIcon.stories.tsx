import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeaturedIcon } from './FeaturedIcon';
import { Surface } from '../foundation/Surface';

const meta: Meta<typeof FeaturedIcon> = {
  title: 'Atoms/FeaturedIcon',
  component: FeaturedIcon,
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
      options: ['sm', 'md', 'lg', 'xl'],
    },
    elevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const Default: Story = {
  args: {
    children: <StarIcon />,
    variant: 'convex',
    size: 'md',
    elevation: 'mid',
  },
};

export const Variants: Story = {
  render: () => (
    <>
      <FeaturedIcon variant="convex"><StarIcon /></FeaturedIcon>
      <FeaturedIcon variant="concave"><StarIcon /></FeaturedIcon>
      <FeaturedIcon variant="flat"><StarIcon /></FeaturedIcon>
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <FeaturedIcon size="sm"><StarIcon /></FeaturedIcon>
      <FeaturedIcon size="md"><StarIcon /></FeaturedIcon>
      <FeaturedIcon size="lg"><StarIcon /></FeaturedIcon>
      <FeaturedIcon size="xl"><StarIcon /></FeaturedIcon>
    </>
  ),
};

export const Elevations: Story = {
  render: () => (
    <>
      <FeaturedIcon elevation="low"><StarIcon /></FeaturedIcon>
      <FeaturedIcon elevation="mid"><StarIcon /></FeaturedIcon>
      <FeaturedIcon elevation="high"><StarIcon /></FeaturedIcon>
    </>
  ),
};

export const Colors: Story = {
  render: () => (
    <>
      <FeaturedIcon color="default"><BellIcon /></FeaturedIcon>
      <FeaturedIcon color="primary"><BellIcon /></FeaturedIcon>
      <FeaturedIcon color="success"><BellIcon /></FeaturedIcon>
      <FeaturedIcon color="warning"><BellIcon /></FeaturedIcon>
      <FeaturedIcon color="error"><BellIcon /></FeaturedIcon>
    </>
  ),
};

export const Shapes: Story = {
  render: () => (
    <>
      <FeaturedIcon shape="circle"><StarIcon /></FeaturedIcon>
      <FeaturedIcon shape="square"><StarIcon /></FeaturedIcon>
    </>
  ),
};

export const DarkTheme: Story = {
  args: {
    children: <StarIcon />,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', display: 'flex', gap: '1.5rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
