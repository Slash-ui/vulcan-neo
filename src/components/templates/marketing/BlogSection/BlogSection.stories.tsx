import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlogSection } from './BlogSection';
import { Surface } from '../../../foundation/Surface';

const meta: Meta<typeof BlogSection> = {
  title: 'Marketing/BlogSection',
  component: BlogSection,
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

const blogPosts = [
  {
    title: 'Getting started with Neomorphism design',
    excerpt:
      'Learn the fundamentals of Neomorphism and how to apply it to your designs.',
    image: 'https://placehold.net/600x400?text=Blog+1',
    category: 'Design',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    date: 'Jan 15, 2026',
    readTime: '5 min read',
    href: '#',
  },
  {
    title: 'Building accessible components in React',
    excerpt:
      'Best practices for creating components that everyone can use.',
    image: 'https://placehold.net/600x400?text=Blog+2',
    category: 'Development',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    date: 'Jan 12, 2026',
    readTime: '8 min read',
    href: '#',
  },
  {
    title: 'The future of design systems',
    excerpt:
      'Exploring trends and predictions for design systems in 2026.',
    image: 'https://placehold.net/600x400?text=Blog+3',
    category: 'Trends',
    author: {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    date: 'Jan 10, 2026',
    readTime: '6 min read',
    href: '#',
  },
  {
    title: 'Performance optimization techniques',
    excerpt:
      'Tips and tricks for making your React applications blazingly fast.',
    image: 'https://placehold.net/600x400?text=Blog+4',
    category: 'Development',
    author: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    date: 'Jan 8, 2026',
    readTime: '10 min read',
    href: '#',
  },
];

export const Default: Story = {
  args: {
    eyebrow: 'Blog',
    title: 'Latest from our team',
    description: 'Insights, tutorials, and updates from our engineering team.',
    posts: blogPosts.slice(0, 3),
  },
};

export const WithViewAll: Story = {
  args: {
    eyebrow: 'Resources',
    title: 'Latest articles',
    posts: blogPosts.slice(0, 3),
    viewAllText: 'View all articles',
    viewAllHref: '/blog',
  },
};

export const TwoColumns: Story = {
  args: {
    title: 'Recent Posts',
    posts: blogPosts,
    columns: 2,
  },
};

export const ListLayout: Story = {
  args: {
    eyebrow: 'Blog',
    title: 'Our latest stories',
    posts: blogPosts,
    variant: 'list',
  },
};

export const FeaturedLayout: Story = {
  args: {
    eyebrow: 'Featured',
    title: 'Top stories this week',
    posts: blogPosts,
    variant: 'featured',
  },
};

export const MinimalPosts: Story = {
  args: {
    title: 'Updates',
    posts: blogPosts.map((post) => ({
      title: post.title,
      image: post.image,
      category: post.category,
      date: post.date,
      readTime: post.readTime,
      href: post.href,
    })),
  },
};

export const DarkTheme: Story = {
  args: {
    eyebrow: 'Blog',
    title: 'Latest articles',
    posts: blogPosts.slice(0, 3),
    viewAllText: 'View all',
    viewAllHref: '/blog',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark">
        <Story />
      </Surface>
    ),
  ],
};
