import type { Meta, StoryObj } from '@storybook/react-vite';
import { CareersSection } from './CareersSection';
import { Surface } from '../Surface';

const meta: Meta<typeof CareersSection> = {
  title: 'Marketing/CareersSection',
  component: CareersSection,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light">
        <Story />
      </Surface>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const positions = [
  {
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time' as const,
    href: '#',
    description:
      'Join our team to build the next generation of our product using React and TypeScript.',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'New York, NY',
    type: 'Full-time' as const,
    href: '#',
    description:
      'Shape the future of our product experience and design beautiful interfaces.',
  },
  {
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Remote' as const,
    href: '#',
    description:
      'Help us scale our infrastructure and improve our deployment processes.',
  },
  {
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Austin, TX',
    type: 'Full-time' as const,
    href: '#',
    description:
      'Lead our marketing efforts and help grow our user base.',
  },
  {
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote',
    type: 'Remote' as const,
    href: '#',
  },
  {
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'London, UK',
    type: 'Full-time' as const,
    href: '#',
  },
];

export const Default: Story = {
  args: {
    eyebrow: 'Careers',
    title: 'Join our team',
    description:
      "We're looking for passionate people to help us build the future.",
    positions,
  },
};

export const CardsLayout: Story = {
  args: {
    eyebrow: 'Open Positions',
    title: "We're hiring!",
    description: 'Find your next opportunity with us.',
    positions: positions.slice(0, 4),
    variant: 'cards',
  },
};

export const GroupedByDepartment: Story = {
  args: {
    title: 'Open Positions',
    description: 'Browse opportunities by department.',
    positions,
    variant: 'grouped',
  },
};

export const WithViewAll: Story = {
  args: {
    title: 'Featured Positions',
    positions: positions.slice(0, 3),
    viewAllText: 'View all positions',
    viewAllHref: '/careers',
  },
};

export const EmptyState: Story = {
  args: {
    eyebrow: 'Careers',
    title: 'Join our team',
    description: "We're always looking for talented people.",
    positions: [],
    emptyMessage:
      "We don't have any open positions right now, but we'd love to hear from you! Send your resume to careers@example.com",
  },
};

export const RemotePositions: Story = {
  args: {
    title: 'Remote Opportunities',
    description: 'Work from anywhere in the world.',
    positions: positions.filter((p) => p.type === 'Remote'),
  },
};

export const DarkTheme: Story = {
  args: {
    eyebrow: 'Careers',
    title: 'Build with us',
    positions: positions.slice(0, 4),
  },
  decorators: [
    (Story) => (
      <Surface theme="dark">
        <Story />
      </Surface>
    ),
  ],
};
