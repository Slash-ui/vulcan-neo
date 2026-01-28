import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorPage } from './ErrorPage';

describe('ErrorPage', () => {
  it('renders default error code', () => {
    render(<ErrorPage />);
    expect(screen.getByText(/404 error/)).toBeInTheDocument();
  });

  it('renders custom error code', () => {
    render(<ErrorPage errorCode="500" />);
    expect(screen.getByText(/500 error/)).toBeInTheDocument();
  });

  it('renders default title', () => {
    render(<ErrorPage />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(<ErrorPage title="Server Error" />);
    expect(screen.getByText('Server Error')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<ErrorPage description="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders primary action button', () => {
    render(<ErrorPage primaryActionText="Home" />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders secondary action button', () => {
    render(<ErrorPage secondaryActionText="Back" />);
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('calls onPrimaryAction when primary button clicked', () => {
    const handlePrimary = vi.fn();
    render(<ErrorPage onPrimaryAction={handlePrimary} />);
    fireEvent.click(screen.getByText('Go home'));
    expect(handlePrimary).toHaveBeenCalled();
  });

  it('calls onSecondaryAction when secondary button clicked', () => {
    const handleSecondary = vi.fn();
    render(<ErrorPage onSecondaryAction={handleSecondary} />);
    fireEvent.click(screen.getByText('Go back'));
    expect(handleSecondary).toHaveBeenCalled();
  });

  it('shows search form when showSearch is true', () => {
    render(<ErrorPage showSearch />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('uses custom search placeholder', () => {
    render(<ErrorPage showSearch searchPlaceholder="Find pages..." />);
    expect(screen.getByPlaceholderText('Find pages...')).toBeInTheDocument();
  });

  it('calls onSearch when search form submitted', () => {
    const handleSearch = vi.fn();
    render(<ErrorPage showSearch onSearch={handleSearch} />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.submit(input.closest('form')!);
    expect(handleSearch).toHaveBeenCalledWith('test query');
  });

  it('renders quick links when provided', () => {
    const quickLinks = [
      { title: 'Home', href: '/' },
      { title: 'Help', href: '/help', description: 'Get assistance' },
    ];
    render(<ErrorPage quickLinks={quickLinks} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
    expect(screen.getByText('Get assistance')).toBeInTheDocument();
  });

  it('renders quick link icons', () => {
    const quickLinks = [
      { title: 'Home', href: '/', icon: <span data-testid="home-icon">🏠</span> },
    ];
    render(<ErrorPage quickLinks={quickLinks} />);
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
  });

  it('renders custom illustration', () => {
    render(
      <ErrorPage
        variant="illustration"
        illustration={<div data-testid="custom-illustration">Custom</div>}
      />
    );
    expect(screen.getByTestId('custom-illustration')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<ErrorPage variant="simple" data-testid="error" />);
    expect(screen.getByTestId('error').className).toContain('simple');

    rerender(<ErrorPage variant="split" data-testid="error" />);
    expect(screen.getByTestId('error').className).toContain('split');

    rerender(<ErrorPage variant="illustration" data-testid="error" />);
    expect(screen.getByTestId('error').className).toContain('illustration');

    rerender(<ErrorPage variant="minimal" data-testid="error" />);
    expect(screen.getByTestId('error').className).toContain('minimal');
  });

  it('renders minimal variant correctly', () => {
    render(<ErrorPage variant="minimal" errorCode="404" title="Not Found" />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<ErrorPage size="sm" data-testid="error" />);
    expect(screen.getByTestId('error').className).toContain('sm');

    rerender(<ErrorPage size="md" data-testid="error" />);
    expect(screen.getByTestId('error').className).toContain('md');

    rerender(<ErrorPage size="lg" data-testid="error" />);
    expect(screen.getByTestId('error').className).toContain('lg');
  });

  it('applies custom className', () => {
    render(<ErrorPage className="custom-error" data-testid="error" />);
    expect(screen.getByTestId('error')).toHaveClass('custom-error');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<ErrorPage ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
