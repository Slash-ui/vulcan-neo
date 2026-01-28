import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ActivityFeed } from './ActivityFeed';

const defaultItems = [
  { id: 1, content: 'User signed up', timestamp: '2 hours ago' },
  { id: 2, content: 'Payment received', timestamp: '4 hours ago' },
];

describe('ActivityFeed', () => {
  it('renders all activity items', () => {
    render(<ActivityFeed items={defaultItems} />);
    expect(screen.getByText('User signed up')).toBeInTheDocument();
    expect(screen.getByText('Payment received')).toBeInTheDocument();
  });

  it('renders timestamps', () => {
    render(<ActivityFeed items={defaultItems} />);
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
    expect(screen.getByText('4 hours ago')).toBeInTheDocument();
  });

  it('shows empty message when items is empty', () => {
    render(<ActivityFeed items={[]} />);
    expect(screen.getByText('No activity yet')).toBeInTheDocument();
  });

  it('shows custom empty message', () => {
    render(<ActivityFeed items={[]} emptyMessage="Nothing to show" />);
    expect(screen.getByText('Nothing to show')).toBeInTheDocument();
  });

  it('renders user avatar when provided', () => {
    const items = [
      {
        id: 1,
        content: 'User action',
        timestamp: 'now',
        user: { name: 'John', avatar: 'https://example.com/avatar.jpg' },
      },
    ];
    render(<ActivityFeed items={items} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(img).toHaveAttribute('alt', 'John');
  });

  it('renders custom icon when provided', () => {
    const items = [
      {
        id: 1,
        content: 'Custom action',
        timestamp: 'now',
        icon: <span data-testid="custom-icon">★</span>,
      },
    ];
    render(<ActivityFeed items={items} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders meta content when provided', () => {
    const items = [
      { id: 1, content: 'Action', timestamp: 'now', meta: <span>View details</span> },
    ];
    render(<ActivityFeed items={items} />);
    expect(screen.getByText('View details')).toBeInTheDocument();
  });

  it('shows connector by default', () => {
    render(<ActivityFeed items={defaultItems} data-testid="feed" />);
    expect(screen.getByTestId('feed').className).toContain('withConnector');
  });

  it('hides connector when showConnector is false', () => {
    render(<ActivityFeed items={defaultItems} showConnector={false} data-testid="feed" />);
    expect(screen.getByTestId('feed').className).not.toContain('withConnector');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<ActivityFeed items={defaultItems} size="sm" data-testid="feed" />);
    expect(screen.getByTestId('feed').className).toContain('sm');

    rerender(<ActivityFeed items={defaultItems} size="md" data-testid="feed" />);
    expect(screen.getByTestId('feed').className).toContain('md');

    rerender(<ActivityFeed items={defaultItems} size="lg" data-testid="feed" />);
    expect(screen.getByTestId('feed').className).toContain('lg');
  });

  it('applies custom className', () => {
    render(<ActivityFeed items={defaultItems} className="custom-feed" data-testid="feed" />);
    expect(screen.getByTestId('feed')).toHaveClass('custom-feed');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<ActivityFeed ref={ref} items={defaultItems} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
