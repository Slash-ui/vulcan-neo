import type { Meta, StoryObj } from '@storybook/react-vite';
import { TeamSection } from './TeamSection';
import { Surface } from '../../../foundation/Surface';

const meta: Meta<typeof TeamSection> = {
  title: 'Templates/Marketing/TeamSection',
  component: TeamSection,
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

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Co-Founder',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    bio: 'Sarah has over 15 years of experience in tech leadership.',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    name: 'Michael Chen',
    role: 'CTO & Co-Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    bio: 'Michael leads our engineering team with a passion for innovation.',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    name: 'Emily Davis',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    bio: 'Emily brings creativity and user-centered thinking to everything.',
    social: {
      linkedin: 'https://linkedin.com',
    },
  },
  {
    name: 'James Wilson',
    role: 'Head of Product',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    bio: 'James ensures our products meet customer needs.',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    name: 'Lisa Thompson',
    role: 'Engineering Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    social: {
      github: 'https://github.com',
    },
  },
  {
    name: 'David Martinez',
    role: 'Senior Designer',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
    social: {
      linkedin: 'https://linkedin.com',
    },
  },
];

export const Default: Story = {
  args: {
    eyebrow: 'Our Team',
    title: 'Meet the people behind the product',
    description:
      "We're a diverse group of passionate individuals working together to build something great.",
    members: teamMembers.slice(0, 4),
  },
};

export const ThreeColumns: Story = {
  args: {
    title: 'Leadership Team',
    description: 'The people driving our vision forward.',
    members: teamMembers.slice(0, 3),
    columns: 3,
  },
};

export const CompactVariant: Story = {
  args: {
    eyebrow: 'Team',
    title: 'Our experts',
    members: teamMembers,
    variant: 'compact',
    columns: 3,
  },
};

export const FeaturedVariant: Story = {
  args: {
    eyebrow: 'Leadership',
    title: 'Meet our founders',
    description: 'The visionaries who started it all.',
    members: teamMembers,
    variant: 'featured',
  },
};

export const MinimalInfo: Story = {
  args: {
    title: 'The Team',
    members: teamMembers.slice(0, 4).map((m) => ({
      name: m.name,
      role: m.role,
      image: m.image,
      social: m.social,
    })),
  },
};

export const WithoutSocial: Story = {
  args: {
    title: 'Our People',
    members: teamMembers.slice(0, 4).map((m) => ({
      name: m.name,
      role: m.role,
      image: m.image,
      bio: m.bio,
    })),
  },
};

export const DarkTheme: Story = {
  args: {
    eyebrow: 'Team',
    title: 'Meet the team',
    members: teamMembers.slice(0, 4),
  },
  decorators: [
    (Story) => (
      <Surface theme="dark">
        <Story />
      </Surface>
    ),
  ],
};
