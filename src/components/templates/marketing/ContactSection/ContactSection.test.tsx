import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ContactSection } from './ContactSection';

describe('ContactSection', () => {
  it('renders title', () => {
    render(<ContactSection title="Contact Us" />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('renders eyebrow', () => {
    render(<ContactSection title="Title" eyebrow="Get in Touch" />);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <ContactSection title="Title" description="We'd love to hear from you" />
    );
    expect(screen.getByText("We'd love to hear from you")).toBeInTheDocument();
  });

  it('renders contact form by default', () => {
    render(<ContactSection title="Title" />);
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('How can we help?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell us more...')).toBeInTheDocument();
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  it('hides form when showForm is false', () => {
    render(<ContactSection title="Title" showForm={false} />);
    expect(screen.queryByPlaceholderText('Your name')).not.toBeInTheDocument();
  });

  it('calls onFormSubmit with form data', () => {
    const handleSubmit = vi.fn();
    render(<ContactSection title="Title" onFormSubmit={handleSubmit} />);

    // Use name attribute for inputs since they use InsetField and Textarea components
    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const subjectInput = document.querySelector('input[name="subject"]') as HTMLInputElement;
    const messageInput = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'General inquiry' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, I have a question.' } });

    fireEvent.click(screen.getByText('Send Message'));

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'General inquiry',
      message: 'Hello, I have a question.',
    });
  });

  it('clears form after submit', async () => {
    const handleSubmit = vi.fn();
    render(<ContactSection title="Title" onFormSubmit={handleSubmit} />);

    // Fill all required fields
    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const subjectInput = document.querySelector('input[name="subject"]') as HTMLInputElement;
    const messageInput = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test' } });
    fireEvent.change(messageInput, { target: { value: 'Hello' } });

    fireEvent.click(screen.getByText('Send Message'));

    // Wait for state update after form submission
    await waitFor(() => {
      expect(nameInput.value).toBe('');
    });
  });

  it('renders contact info items', () => {
    const contactInfo = [
      { title: 'Email Us', description: 'hello@example.com' },
      { title: 'Phone', description: '+1 234 567 890' },
    ];
    render(<ContactSection title="Title" contactInfo={contactInfo} />);

    expect(screen.getByText('Email Us')).toBeInTheDocument();
    expect(screen.getByText('hello@example.com')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('+1 234 567 890')).toBeInTheDocument();
  });

  it('renders contact info with icons', () => {
    const contactInfo = [
      { title: 'Email', description: 'test@test.com', icon: <span data-testid="icon">📧</span> },
    ];
    render(<ContactSection title="Title" contactInfo={contactInfo} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders contact info as link when href provided', () => {
    const contactInfo = [
      { title: 'Email', description: 'hello@example.com', href: 'mailto:hello@example.com' },
    ];
    render(<ContactSection title="Title" contactInfo={contactInfo} />);
    const link = screen.getByText('hello@example.com');
    expect(link).toHaveAttribute('href', 'mailto:hello@example.com');
  });

  it('renders map when mapUrl provided', () => {
    render(
      <ContactSection
        title="Title"
        mapUrl="https://maps.google.com/embed"
      />
    );
    const iframe = screen.getByTitle('Location map');
    expect(iframe).toHaveAttribute('src', 'https://maps.google.com/embed');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <ContactSection title="Title" variant="split" data-testid="contact" />
    );
    expect(screen.getByTestId('contact').className).toContain('split');

    rerender(
      <ContactSection title="Title" variant="centered" data-testid="contact" />
    );
    expect(screen.getByTestId('contact').className).toContain('centered');

    rerender(
      <ContactSection title="Title" variant="info-only" showForm={false} data-testid="contact" />
    );
    expect(screen.getByTestId('contact').className).toContain('info-only');
  });

  it('applies custom className', () => {
    render(
      <ContactSection
        title="Title"
        className="custom-contact"
        data-testid="contact"
      />
    );
    expect(screen.getByTestId('contact')).toHaveClass('custom-contact');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<ContactSection ref={ref} title="Title" />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
