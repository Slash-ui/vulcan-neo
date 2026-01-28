import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CardHeader } from './CardHeader';

describe('CardHeader', () => {
  it('renders title as h3', () => {
    render(<CardHeader title="Card Title" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Card Title');
  });

  it('renders subtitle when provided', () => {
    render(<CardHeader title="Title" subtitle="This is a subtitle" />);
    expect(screen.getByText('This is a subtitle')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<CardHeader title="Title" icon={<span data-testid="icon">📄</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders actions when provided', () => {
    render(<CardHeader title="Title" actions={<button>Edit</button>} />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('does not apply bordered class by default', () => {
    render(<CardHeader title="Title" data-testid="header" />);
    expect(screen.getByTestId('header').className).not.toContain('bordered');
  });

  it('applies bordered class when bordered is true', () => {
    render(<CardHeader title="Title" bordered data-testid="header" />);
    expect(screen.getByTestId('header').className).toContain('bordered');
  });

  it('applies custom className', () => {
    render(<CardHeader title="Title" className="custom-header" data-testid="header" />);
    expect(screen.getByTestId('header')).toHaveClass('custom-header');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<CardHeader ref={ref} title="Title" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders all elements together', () => {
    render(
      <CardHeader
        title="Settings"
        subtitle="Manage your preferences"
        icon={<span>⚙️</span>}
        actions={<button>Save</button>}
      />
    );
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Manage your preferences')).toBeInTheDocument();
    expect(screen.getByText('⚙️')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});
