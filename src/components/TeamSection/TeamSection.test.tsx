import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TeamSection } from './TeamSection';

const defaultMembers = [
  { name: 'John Doe', role: 'CEO' },
  { name: 'Jane Smith', role: 'CTO' },
  { name: 'Bob Wilson', role: 'Designer' },
];

describe('TeamSection', () => {
  it('renders title', () => {
    render(<TeamSection title="Our Team" members={defaultMembers} />);
    expect(screen.getByText('Our Team')).toBeInTheDocument();
  });

  it('renders eyebrow', () => {
    render(
      <TeamSection title="Title" members={defaultMembers} eyebrow="Meet the Team" />
    );
    expect(screen.getByText('Meet the Team')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <TeamSection
        title="Title"
        members={defaultMembers}
        description="The people behind the product"
      />
    );
    expect(screen.getByText('The people behind the product')).toBeInTheDocument();
  });

  it('renders all team members', () => {
    render(<TeamSection title="Title" members={defaultMembers} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
  });

  it('renders member roles', () => {
    render(<TeamSection title="Title" members={defaultMembers} />);
    expect(screen.getByText('CEO')).toBeInTheDocument();
    expect(screen.getByText('CTO')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
  });

  it('renders member images', () => {
    const members = [
      { name: 'John', role: 'CEO', image: 'https://example.com/john.jpg' },
    ];
    render(<TeamSection title="Title" members={members} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/john.jpg');
    expect(img).toHaveAttribute('alt', 'John');
  });

  it('renders member bio in grid variant', () => {
    const members = [
      { name: 'John', role: 'CEO', bio: 'Experienced leader with 20 years in tech.' },
    ];
    render(<TeamSection title="Title" members={members} variant="grid" />);
    expect(screen.getByText('Experienced leader with 20 years in tech.')).toBeInTheDocument();
  });

  it('does not render member bio in compact variant', () => {
    const members = [
      { name: 'John', role: 'CEO', bio: 'Bio text here' },
    ];
    render(<TeamSection title="Title" members={members} variant="compact" />);
    expect(screen.queryByText('Bio text here')).not.toBeInTheDocument();
  });

  it('renders social links', () => {
    const members = [
      {
        name: 'John',
        role: 'CEO',
        social: {
          twitter: 'https://twitter.com/john',
          linkedin: 'https://linkedin.com/in/john',
          github: 'https://github.com/john',
        },
      },
    ];
    render(<TeamSection title="Title" members={members} />);

    expect(screen.getByLabelText('twitter')).toHaveAttribute('href', 'https://twitter.com/john');
    expect(screen.getByLabelText('linkedin')).toHaveAttribute('href', 'https://linkedin.com/in/john');
    expect(screen.getByLabelText('github')).toHaveAttribute('href', 'https://github.com/john');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <TeamSection title="Title" members={defaultMembers} variant="grid" data-testid="team" />
    );
    expect(screen.getByTestId('team').className).toContain('grid');

    rerender(
      <TeamSection title="Title" members={defaultMembers} variant="compact" data-testid="team" />
    );
    expect(screen.getByTestId('team').className).toContain('compact');

    rerender(
      <TeamSection title="Title" members={defaultMembers} variant="featured" data-testid="team" />
    );
    expect(screen.getByTestId('team').className).toContain('featured');
  });

  it('applies custom className', () => {
    render(
      <TeamSection
        title="Title"
        members={defaultMembers}
        className="custom-team"
        data-testid="team"
      />
    );
    expect(screen.getByTestId('team')).toHaveClass('custom-team');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<TeamSection ref={ref} title="Title" members={defaultMembers} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
