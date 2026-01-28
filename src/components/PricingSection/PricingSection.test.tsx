import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PricingSection } from './PricingSection';

const defaultPlans = [
  {
    name: 'Basic',
    price: 9,
    period: 'month',
    features: ['Feature 1', 'Feature 2'],
    ctaText: 'Get Started',
  },
  {
    name: 'Pro',
    price: 29,
    period: 'month',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    ctaText: 'Get Pro',
    popular: true,
    badge: 'Most Popular',
  },
];

describe('PricingSection', () => {
  it('renders title', () => {
    render(<PricingSection title="Pricing Plans" plans={defaultPlans} />);
    expect(screen.getByText('Pricing Plans')).toBeInTheDocument();
  });

  it('renders eyebrow', () => {
    render(
      <PricingSection title="Title" eyebrow="Simple Pricing" plans={defaultPlans} />
    );
    expect(screen.getByText('Simple Pricing')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <PricingSection
        title="Title"
        description="Choose the right plan for you"
        plans={defaultPlans}
      />
    );
    expect(screen.getByText('Choose the right plan for you')).toBeInTheDocument();
  });

  it('renders all plans', () => {
    render(<PricingSection title="Title" plans={defaultPlans} />);
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('renders plan prices', () => {
    render(<PricingSection title="Title" plans={defaultPlans} />);
    expect(screen.getByText('$9')).toBeInTheDocument();
    expect(screen.getByText('$29')).toBeInTheDocument();
  });

  it('renders plan periods', () => {
    render(<PricingSection title="Title" plans={defaultPlans} />);
    expect(screen.getAllByText('/month').length).toBe(2);
  });

  it('renders plan features', () => {
    render(<PricingSection title="Title" plans={defaultPlans} />);
    expect(screen.getAllByText('Feature 1').length).toBe(2);
    expect(screen.getAllByText('Feature 2').length).toBe(2);
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
  });

  it('renders plan badge', () => {
    render(<PricingSection title="Title" plans={defaultPlans} />);
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<PricingSection title="Title" plans={defaultPlans} />);
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Get Pro')).toBeInTheDocument();
  });

  it('calls CTA onClick', () => {
    const handleClick = vi.fn();
    const plans = [
      { name: 'Test', price: 10, features: [], ctaText: 'Click Me', onCtaClick: handleClick },
    ];
    render(<PricingSection title="Title" plans={plans} />);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('shows billing toggle when enabled', () => {
    render(
      <PricingSection title="Title" plans={defaultPlans} showBillingToggle />
    );
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('Yearly')).toBeInTheDocument();
  });

  it('toggles between monthly and yearly', () => {
    const plans = [
      { name: 'Test', price: 10, yearlyPrice: 100, features: [] },
    ];
    render(
      <PricingSection title="Title" plans={plans} showBillingToggle />
    );

    // Initially monthly
    expect(screen.getByText('$10')).toBeInTheDocument();

    // Toggle to yearly
    fireEvent.click(screen.getByRole('button', { name: '' })); // Toggle button
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('renders string prices', () => {
    const plans = [
      { name: 'Enterprise', price: 'Contact us', features: [] },
    ];
    render(<PricingSection title="Title" plans={plans} />);
    expect(screen.getByText('Contact us')).toBeInTheDocument();
  });

  it('renders included/not included features', () => {
    const plans = [
      {
        name: 'Test',
        price: 10,
        features: [
          { text: 'Included feature', included: true },
          { text: 'Not included', included: false },
        ],
      },
    ];
    render(<PricingSection title="Title" plans={plans} />);
    expect(screen.getByText('Included feature')).toBeInTheDocument();
    expect(screen.getByText('Not included')).toBeInTheDocument();
  });

  it('applies popular class to popular plan', () => {
    render(<PricingSection title="Title" plans={defaultPlans} data-testid="pricing" />);
    const section = screen.getByTestId('pricing');
    const popularCards = section.querySelectorAll('[class*="popularCard"]');
    expect(popularCards.length).toBe(1);
  });

  it('applies custom className', () => {
    render(
      <PricingSection
        title="Title"
        plans={defaultPlans}
        className="custom-pricing"
        data-testid="pricing"
      />
    );
    expect(screen.getByTestId('pricing')).toHaveClass('custom-pricing');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<PricingSection ref={ref} title="Title" plans={defaultPlans} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
