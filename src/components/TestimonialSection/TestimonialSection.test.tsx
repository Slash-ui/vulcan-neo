import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TestimonialSection } from './TestimonialSection';

const defaultTestimonials = [
  { quote: 'Amazing product!', author: 'John Doe', role: 'CEO', company: 'Acme Inc' },
  { quote: 'Highly recommend!', author: 'Jane Smith', role: 'CTO', company: 'Tech Corp' },
  { quote: 'Best decision ever!', author: 'Bob Wilson' },
];

describe('TestimonialSection', () => {
  it('renders all testimonials in grid variant', () => {
    render(<TestimonialSection testimonials={defaultTestimonials} />);
    expect(screen.getByText('"Amazing product!"')).toBeInTheDocument();
    expect(screen.getByText('"Highly recommend!"')).toBeInTheDocument();
    expect(screen.getByText('"Best decision ever!"')).toBeInTheDocument();
  });

  it('renders author names', () => {
    render(<TestimonialSection testimonials={defaultTestimonials} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
  });

  it('renders author role and company', () => {
    render(<TestimonialSection testimonials={defaultTestimonials} />);
    expect(screen.getByText('CEO, Acme Inc')).toBeInTheDocument();
    expect(screen.getByText('CTO, Tech Corp')).toBeInTheDocument();
  });

  it('renders eyebrow', () => {
    render(
      <TestimonialSection
        testimonials={defaultTestimonials}
        eyebrow="What People Say"
      />
    );
    expect(screen.getByText('What People Say')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(
      <TestimonialSection
        testimonials={defaultTestimonials}
        title="Customer Testimonials"
      />
    );
    expect(screen.getByText('Customer Testimonials')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <TestimonialSection
        testimonials={defaultTestimonials}
        description="See what our customers think"
      />
    );
    expect(screen.getByText('See what our customers think')).toBeInTheDocument();
  });

  it('renders star ratings', () => {
    const testimonials = [
      { quote: 'Great!', author: 'Test', rating: 5 },
    ];
    render(<TestimonialSection testimonials={testimonials} />);
    const stars = document.querySelectorAll('[class*="star"]');
    expect(stars.length).toBe(5);
  });

  it('renders single testimonial in single variant', () => {
    render(
      <TestimonialSection
        testimonials={defaultTestimonials}
        variant="single"
      />
    );
    expect(screen.getByText('"Amazing product!"')).toBeInTheDocument();
    expect(screen.queryByText('"Highly recommend!"')).not.toBeInTheDocument();
  });

  it('navigates carousel with prev/next buttons', () => {
    render(
      <TestimonialSection
        testimonials={defaultTestimonials}
        variant="carousel"
      />
    );

    // Initially shows first testimonial
    expect(screen.getByText('"Amazing product!"')).toBeInTheDocument();

    // Click next
    fireEvent.click(screen.getByLabelText('Next testimonial'));
    expect(screen.getByText('"Highly recommend!"')).toBeInTheDocument();

    // Click prev
    fireEvent.click(screen.getByLabelText('Previous testimonial'));
    expect(screen.getByText('"Amazing product!"')).toBeInTheDocument();
  });

  it('loops carousel at boundaries', () => {
    render(
      <TestimonialSection
        testimonials={defaultTestimonials}
        variant="carousel"
      />
    );

    // Click prev on first item (should go to last)
    fireEvent.click(screen.getByLabelText('Previous testimonial'));
    expect(screen.getByText('"Best decision ever!"')).toBeInTheDocument();

    // Click next to go back to first
    fireEvent.click(screen.getByLabelText('Next testimonial'));
    expect(screen.getByText('"Amazing product!"')).toBeInTheDocument();
  });

  it('navigates carousel with dots', () => {
    render(
      <TestimonialSection
        testimonials={defaultTestimonials}
        variant="carousel"
      />
    );

    fireEvent.click(screen.getByLabelText('Go to testimonial 2'));
    expect(screen.getByText('"Highly recommend!"')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <TestimonialSection
        testimonials={defaultTestimonials}
        variant="grid"
        data-testid="testimonials"
      />
    );
    expect(screen.getByTestId('testimonials').className).toContain('grid');

    rerender(
      <TestimonialSection
        testimonials={defaultTestimonials}
        variant="carousel"
        data-testid="testimonials"
      />
    );
    expect(screen.getByTestId('testimonials').className).toContain('carousel');

    rerender(
      <TestimonialSection
        testimonials={defaultTestimonials}
        variant="single"
        data-testid="testimonials"
      />
    );
    expect(screen.getByTestId('testimonials').className).toContain('single');

    rerender(
      <TestimonialSection
        testimonials={defaultTestimonials}
        variant="masonry"
        data-testid="testimonials"
      />
    );
    expect(screen.getByTestId('testimonials').className).toContain('masonry');
  });

  it('applies custom className', () => {
    render(
      <TestimonialSection
        testimonials={defaultTestimonials}
        className="custom-testimonials"
        data-testid="testimonials"
      />
    );
    expect(screen.getByTestId('testimonials')).toHaveClass('custom-testimonials');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<TestimonialSection ref={ref} testimonials={defaultTestimonials} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
