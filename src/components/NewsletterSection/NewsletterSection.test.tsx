import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NewsletterSection } from './NewsletterSection';

describe('NewsletterSection', () => {
  it('renders title', () => {
    render(<NewsletterSection title="Subscribe to our newsletter" />);
    expect(screen.getByText('Subscribe to our newsletter')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <NewsletterSection
        title="Title"
        description="Get the latest updates"
      />
    );
    expect(screen.getByText('Get the latest updates')).toBeInTheDocument();
  });

  it('renders email input with placeholder', () => {
    render(<NewsletterSection title="Title" />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('renders custom placeholder', () => {
    render(<NewsletterSection title="Title" placeholder="Your email address" />);
    expect(screen.getByPlaceholderText('Your email address')).toBeInTheDocument();
  });

  it('renders submit button with default text', () => {
    render(<NewsletterSection title="Title" />);
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  it('renders custom button text', () => {
    render(<NewsletterSection title="Title" buttonText="Sign Up" />);
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('calls onSubmit with email when form submitted', () => {
    const handleSubmit = vi.fn();
    render(<NewsletterSection title="Title" onSubmit={handleSubmit} />);

    const input = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Subscribe'));

    expect(handleSubmit).toHaveBeenCalledWith('test@example.com');
  });

  it('clears email after submit', () => {
    const handleSubmit = vi.fn();
    render(<NewsletterSection title="Title" onSubmit={handleSubmit} />);

    const input = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Subscribe'));

    expect(input.value).toBe('');
  });

  it('does not call onSubmit with empty email', () => {
    const handleSubmit = vi.fn();
    render(<NewsletterSection title="Title" onSubmit={handleSubmit} />);
    // Just clicking submit without entering email - the form validation or handler logic prevents submit
    const input = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;
    expect(input.value).toBe('');
    fireEvent.click(screen.getByText('Subscribe'));
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('renders privacy text', () => {
    render(
      <NewsletterSection
        title="Title"
        privacyText="We respect your privacy"
      />
    );
    expect(screen.getByText('We respect your privacy')).toBeInTheDocument();
  });

  it('renders image in split variant', () => {
    render(
      <NewsletterSection
        title="Title"
        variant="split"
        image="https://example.com/image.jpg"
        imageAlt="Newsletter image"
      />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(img).toHaveAttribute('alt', 'Newsletter image');
  });

  it('does not render image in simple variant', () => {
    render(
      <NewsletterSection
        title="Title"
        variant="simple"
        image="https://example.com/image.jpg"
      />
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <NewsletterSection title="Title" variant="simple" data-testid="newsletter" />
    );
    expect(screen.getByTestId('newsletter').className).toContain('simple');

    rerender(
      <NewsletterSection title="Title" variant="card" data-testid="newsletter" />
    );
    expect(screen.getByTestId('newsletter').className).toContain('card');

    rerender(
      <NewsletterSection title="Title" variant="split" data-testid="newsletter" />
    );
    expect(screen.getByTestId('newsletter').className).toContain('split');
  });

  it('applies background classes correctly', () => {
    const { rerender } = render(
      <NewsletterSection title="Title" background="default" data-testid="newsletter" />
    );
    expect(screen.getByTestId('newsletter').className).toContain('bg-default');

    rerender(
      <NewsletterSection title="Title" background="primary" data-testid="newsletter" />
    );
    expect(screen.getByTestId('newsletter').className).toContain('bg-primary');
  });

  it('applies custom className', () => {
    render(
      <NewsletterSection
        title="Title"
        className="custom-newsletter"
        data-testid="newsletter"
      />
    );
    expect(screen.getByTestId('newsletter')).toHaveClass('custom-newsletter');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<NewsletterSection ref={ref} title="Title" />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
