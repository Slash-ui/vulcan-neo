import type { Meta, StoryObj } from '@storybook/react-vite';
import { TestimonialSection } from './TestimonialSection';
import { Surface } from '../../foundation/Surface';

const meta: Meta<typeof TestimonialSection> = {
  title: 'Marketing/TestimonialSection',
  component: TestimonialSection,
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

const testimonials = [
  {
    quote:
      'This product has completely transformed how our team works. The efficiency gains are incredible.',
    author: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechCorp',
    avatar: 'https://placehold.net/100x100?text=SJ',
    rating: 5,
  },
  {
    quote:
      "Best investment we've made this year. The ROI was visible within the first month.",
    author: 'Michael Chen',
    role: 'CEO',
    company: 'StartupXYZ',
    avatar: 'https://placehold.net/100x100?text=MC',
    rating: 5,
  },
  {
    quote:
      "The customer support is outstanding. They've helped us solve problems we didn't even know we had.",
    author: 'Emily Davis',
    role: 'Product Manager',
    company: 'InnovateCo',
    avatar: 'https://placehold.net/100x100?text=ED',
    rating: 5,
  },
  {
    quote:
      'We tried other solutions, but nothing comes close to the quality and reliability of this platform.',
    author: 'James Wilson',
    role: 'Engineering Lead',
    company: 'DevTeam Inc',
    avatar: 'https://placehold.net/100x100?text=JW',
    rating: 4,
  },
  {
    quote:
      'Simple, intuitive, and powerful. Everything we needed in one place.',
    author: 'Lisa Thompson',
    role: 'Designer',
    company: 'CreativeStudio',
    avatar: 'https://placehold.net/100x100?text=LT',
    rating: 5,
  },
  {
    quote:
      'The onboarding was seamless and the team was productive from day one.',
    author: 'David Martinez',
    role: 'Operations Director',
    company: 'ScaleFast',
    avatar: 'https://placehold.net/100x100?text=DM',
    rating: 5,
  },
];

export const Default: Story = {
  args: {
    eyebrow: 'Testimonials',
    title: 'Loved by teams everywhere',
    description: "Don't just take our word for it.",
    testimonials: testimonials.slice(0, 3),
  },
};

export const TwoColumns: Story = {
  args: {
    title: 'What our customers say',
    testimonials: testimonials.slice(0, 4),
    columns: 2,
  },
};

export const CarouselVariant: Story = {
  args: {
    eyebrow: 'Customer Stories',
    title: 'Hear from our community',
    testimonials,
    variant: 'carousel',
  },
};

export const SingleVariant: Story = {
  args: {
    eyebrow: 'Featured Review',
    title: 'What industry leaders say',
    testimonials: [testimonials[0]],
    variant: 'single',
  },
};

export const MasonryVariant: Story = {
  args: {
    title: 'Customer Reviews',
    testimonials,
    variant: 'masonry',
  },
};

export const WithoutRatings: Story = {
  args: {
    title: 'Trusted by innovators',
    testimonials: testimonials.slice(0, 3).map((t) => ({
      quote: t.quote,
      author: t.author,
      role: t.role,
      company: t.company,
      avatar: t.avatar,
    })),
  },
};

export const DarkTheme: Story = {
  args: {
    eyebrow: 'Testimonials',
    title: 'What people are saying',
    testimonials: testimonials.slice(0, 3),
  },
  decorators: [
    (Story) => (
      <Surface theme="dark">
        <Story />
      </Surface>
    ),
  ],
};
