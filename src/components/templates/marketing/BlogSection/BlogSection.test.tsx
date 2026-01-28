import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BlogSection } from './BlogSection';

const defaultPosts = [
  {
    title: 'Getting Started',
    excerpt: 'Learn how to get started with our product.',
    category: 'Tutorial',
    date: 'Jan 15, 2024',
  },
  {
    title: 'Best Practices',
    excerpt: 'Discover best practices for success.',
    category: 'Guide',
    date: 'Jan 10, 2024',
  },
];

describe('BlogSection', () => {
  it('renders title', () => {
    render(<BlogSection title="Latest Posts" posts={defaultPosts} />);
    expect(screen.getByText('Latest Posts')).toBeInTheDocument();
  });

  it('renders eyebrow', () => {
    render(
      <BlogSection title="Title" posts={defaultPosts} eyebrow="Our Blog" />
    );
    expect(screen.getByText('Our Blog')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <BlogSection
        title="Title"
        posts={defaultPosts}
        description="Stay updated with our latest news"
      />
    );
    expect(screen.getByText('Stay updated with our latest news')).toBeInTheDocument();
  });

  it('renders all posts', () => {
    render(<BlogSection title="Title" posts={defaultPosts} />);
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    expect(screen.getByText('Best Practices')).toBeInTheDocument();
  });

  it('renders post excerpts', () => {
    render(<BlogSection title="Title" posts={defaultPosts} />);
    expect(screen.getByText('Learn how to get started with our product.')).toBeInTheDocument();
  });

  it('renders post categories', () => {
    render(<BlogSection title="Title" posts={defaultPosts} />);
    expect(screen.getByText('Tutorial')).toBeInTheDocument();
    expect(screen.getByText('Guide')).toBeInTheDocument();
  });

  it('renders post dates', () => {
    render(<BlogSection title="Title" posts={defaultPosts} />);
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
    expect(screen.getByText('Jan 10, 2024')).toBeInTheDocument();
  });

  it('renders post images', () => {
    const posts = [
      { title: 'Post', image: 'https://example.com/image.jpg' },
    ];
    render(<BlogSection title="Title" posts={posts} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(img).toHaveAttribute('alt', 'Post');
  });

  it('renders author info', () => {
    const posts = [
      {
        title: 'Post',
        author: { name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
      },
    ];
    render(<BlogSection title="Title" posts={posts} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders read time', () => {
    const posts = [{ title: 'Post', readTime: '5 min read' }];
    render(<BlogSection title="Title" posts={posts} />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('renders post as link when href provided', () => {
    const posts = [{ title: 'Post Title', href: '/blog/post' }];
    render(<BlogSection title="Title" posts={posts} />);
    const link = screen.getByText('Post Title').closest('a');
    expect(link).toHaveAttribute('href', '/blog/post');
  });

  it('renders view all link', () => {
    render(
      <BlogSection
        title="Title"
        posts={defaultPosts}
        viewAllText="View All Posts"
        viewAllHref="/blog"
      />
    );
    const link = screen.getByText('View All Posts');
    expect(link).toHaveAttribute('href', '/blog');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <BlogSection title="Title" posts={defaultPosts} variant="grid" data-testid="blog" />
    );
    expect(screen.getByTestId('blog').className).toContain('grid');

    rerender(
      <BlogSection title="Title" posts={defaultPosts} variant="list" data-testid="blog" />
    );
    expect(screen.getByTestId('blog').className).toContain('list');

    rerender(
      <BlogSection title="Title" posts={defaultPosts} variant="featured" data-testid="blog" />
    );
    expect(screen.getByTestId('blog').className).toContain('featured');
  });

  it('applies custom className', () => {
    render(
      <BlogSection
        title="Title"
        posts={defaultPosts}
        className="custom-blog"
        data-testid="blog"
      />
    );
    expect(screen.getByTestId('blog')).toHaveClass('custom-blog');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<BlogSection ref={ref} title="Title" posts={defaultPosts} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
