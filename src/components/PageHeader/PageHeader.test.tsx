import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('renders title as h1', () => {
    render(<PageHeader title="Page Title" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page Title');
  });

  it('renders in a header element', () => {
    render(<PageHeader title="Page Title" />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<PageHeader title="Title" description="This is a description" />);
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('renders breadcrumb when provided', () => {
    render(
      <PageHeader
        title="Title"
        breadcrumb={<nav data-testid="breadcrumb">Home / Products</nav>}
      />
    );
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
  });

  it('renders actions when provided', () => {
    render(
      <PageHeader title="Title" actions={<button>Create New</button>} />
    );
    expect(screen.getByText('Create New')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <PageHeader title="Title" icon={<span data-testid="icon">📄</span>} />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies bordered class by default', () => {
    render(<PageHeader title="Title" data-testid="header" />);
    expect(screen.getByTestId('header').className).toContain('bordered');
  });

  it('removes bordered class when bordered is false', () => {
    render(<PageHeader title="Title" bordered={false} data-testid="header" />);
    expect(screen.getByTestId('header').className).not.toContain('bordered');
  });

  it('applies custom className', () => {
    render(<PageHeader title="Title" className="custom-header" data-testid="header" />);
    expect(screen.getByTestId('header')).toHaveClass('custom-header');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<PageHeader ref={ref} title="Title" />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('renders all elements together', () => {
    render(
      <PageHeader
        title="Dashboard"
        description="Overview of your account"
        breadcrumb={<span>Home</span>}
        actions={<button>Settings</button>}
        icon={<span>🏠</span>}
      />
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Overview of your account')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('🏠')).toBeInTheDocument();
  });
});
