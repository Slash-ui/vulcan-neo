import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FAQSection } from './FAQSection';

const defaultItems = [
  { question: 'What is your product?', answer: 'Our product is amazing.' },
  { question: 'How does pricing work?', answer: 'We offer flexible pricing.' },
  { question: 'Can I get a demo?', answer: 'Yes, contact us for a demo.' },
];

describe('FAQSection', () => {
  it('renders title', () => {
    render(<FAQSection title="Frequently Asked Questions" items={defaultItems} />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
  });

  it('renders eyebrow', () => {
    render(<FAQSection title="Title" items={defaultItems} eyebrow="FAQ" />);
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <FAQSection
        title="Title"
        items={defaultItems}
        description="Find answers to common questions"
      />
    );
    expect(screen.getByText('Find answers to common questions')).toBeInTheDocument();
  });

  it('renders all questions', () => {
    render(<FAQSection title="Title" items={defaultItems} />);
    expect(screen.getByText('What is your product?')).toBeInTheDocument();
    expect(screen.getByText('How does pricing work?')).toBeInTheDocument();
    expect(screen.getByText('Can I get a demo?')).toBeInTheDocument();
  });

  it('toggles answer visibility on click', () => {
    render(<FAQSection title="Title" items={defaultItems} />);

    const questionButton = screen.getByText('What is your product?').closest('button');
    expect(questionButton).toHaveAttribute('aria-expanded', 'false');

    // Open
    fireEvent.click(questionButton!);
    expect(questionButton).toHaveAttribute('aria-expanded', 'true');

    // Close
    fireEvent.click(questionButton!);
    expect(questionButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes other items when opening new one by default', () => {
    render(<FAQSection title="Title" items={defaultItems} />);

    const firstQuestion = screen.getByText('What is your product?').closest('button');
    const secondQuestion = screen.getByText('How does pricing work?').closest('button');

    // Open first
    fireEvent.click(firstQuestion!);
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');

    // Open second (first should close)
    fireEvent.click(secondQuestion!);
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
  });

  it('allows multiple items open when allowMultiple is true', () => {
    render(<FAQSection title="Title" items={defaultItems} allowMultiple />);

    const firstQuestion = screen.getByText('What is your product?').closest('button');
    const secondQuestion = screen.getByText('How does pricing work?').closest('button');

    // Open first
    fireEvent.click(firstQuestion!);
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');

    // Open second (first should stay open)
    fireEvent.click(secondQuestion!);
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders grid variant with questions and answers visible', () => {
    render(<FAQSection title="Title" items={defaultItems} variant="grid" />);

    expect(screen.getByText('What is your product?')).toBeInTheDocument();
    expect(screen.getByText('Our product is amazing.')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <FAQSection title="Title" items={defaultItems} variant="accordion" data-testid="faq" />
    );
    expect(screen.getByTestId('faq').className).toContain('accordion');

    rerender(
      <FAQSection title="Title" items={defaultItems} variant="grid" data-testid="faq" />
    );
    expect(screen.getByTestId('faq').className).toContain('grid');

    rerender(
      <FAQSection title="Title" items={defaultItems} variant="two-column" data-testid="faq" />
    );
    expect(screen.getByTestId('faq').className).toContain('two-column');
  });

  it('applies custom className', () => {
    render(
      <FAQSection
        title="Title"
        items={defaultItems}
        className="custom-faq"
        data-testid="faq"
      />
    );
    expect(screen.getByTestId('faq')).toHaveClass('custom-faq');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<FAQSection ref={ref} title="Title" items={defaultItems} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
